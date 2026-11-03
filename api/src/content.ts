import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { Hono } from 'hono'
import { config, paths, readJson, writeJsonAtomic } from './config'
import { requireAuth, type AppEnv } from './auth'

const KEY = /^[a-z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)*$/
const MAX_BYTES = 2 * 1024 * 1024

interface Meta {
  updatedAt: string
  updatedBy: string
}
type MetaMap = Record<string, Meta>
const metaFile = join(paths.content, '_meta.json')
const readMeta = () => readJson<MetaMap>(metaFile, {})
const writeMeta = (meta: MetaMap) => writeJsonAtomic(metaFile, meta)
const docFile = (key: string) => join(paths.content, `${key}.json`)

/** Structural sanity: objects/arrays only, bounded depth and string sizes, bilingual strings complete. */
export function validateDoc(doc: unknown, path = '$', depth = 0): string | null {
  if (depth > 14) return `${path}: too deeply nested`
  if (doc === null) return null
  if (typeof doc === 'string') return doc.length > 20000 ? `${path}: text too long` : null
  if (typeof doc === 'number' || typeof doc === 'boolean') return null
  if (Array.isArray(doc)) {
    for (let i = 0; i < doc.length; i += 1) {
      const error = validateDoc(doc[i], `${path}[${i}]`, depth + 1)
      if (error) return error
    }
    return null
  }
  if (typeof doc === 'object') {
    const record = doc as Record<string, unknown>
    if ('hi' in record || 'en' in record) {
      const keys = Object.keys(record)
      if (keys.length === 2 && keys.includes('hi') && keys.includes('en') && (typeof record.hi !== 'string' || typeof record.en !== 'string')) {
        return `${path}: bilingual field needs both Hindi and English text`
      }
    }
    for (const [k, v] of Object.entries(record)) {
      const error = validateDoc(v, `${path}.${k}`, depth + 1)
      if (error) return error
    }
    return null
  }
  return `${path}: unsupported value`
}

function snapshot(key: string, by: string) {
  const file = docFile(key)
  if (!existsSync(file)) return
  const dir = join(paths.history, key)
  mkdirSync(dir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  writeJsonAtomic(join(dir, `${stamp}.json`), { savedAt: new Date().toISOString(), savedBy: by, doc: JSON.parse(readFileSync(file, 'utf8')) })
  const versions = readdirSync(dir).filter((f) => f.endsWith('.json')).sort()
  for (const old of versions.slice(0, Math.max(0, versions.length - config.keepHistory))) unlinkSync(join(dir, old))
}

export const contentRoutes = new Hono<AppEnv>()
  .use('*', requireAuth)
  .get('/', (c) => c.json({ modules: readMeta() }))
  .get('/:key', (c) => {
    const key = c.req.param('key')
    if (!KEY.test(key)) return c.json({ error: 'bad-key' }, 400)
    const file = docFile(key)
    if (!existsSync(file)) return c.json({ doc: null, meta: null })
    return c.json({ doc: JSON.parse(readFileSync(file, 'utf8')), meta: readMeta()[key] ?? null })
  })
  .put('/:key', async (c) => {
    const key = c.req.param('key')
    if (!KEY.test(key)) return c.json({ error: 'bad-key' }, 400)
    const raw = await c.req.text()
    if (raw.length > MAX_BYTES) return c.json({ error: 'too-large' }, 413)
    let body: { doc?: unknown }
    try {
      body = JSON.parse(raw)
    } catch {
      return c.json({ error: 'bad-json' }, 400)
    }
    if (body.doc === undefined || body.doc === null || typeof body.doc !== 'object') return c.json({ error: 'doc-required' }, 400)
    const problem = validateDoc(body.doc)
    if (problem) return c.json({ error: 'invalid', detail: problem }, 400)
    const by = c.get('user').email
    snapshot(key, by)
    writeJsonAtomic(docFile(key), body.doc)
    const meta = readMeta()
    meta[key] = { updatedAt: new Date().toISOString(), updatedBy: by }
    writeMeta(meta)
    return c.json({ meta: meta[key] })
  })
  .delete('/:key', (c) => {
    const key = c.req.param('key')
    if (!KEY.test(key)) return c.json({ error: 'bad-key' }, 400)
    snapshot(key, c.get('user').email)
    rmSync(docFile(key), { force: true })
    const meta = readMeta()
    delete meta[key]
    writeMeta(meta)
    return c.body(null, 204)
  })
  .get('/:key/history', (c) => {
    const key = c.req.param('key')
    if (!KEY.test(key)) return c.json({ error: 'bad-key' }, 400)
    const dir = join(paths.history, key)
    if (!existsSync(dir)) return c.json({ versions: [] })
    const versions = readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .sort()
      .reverse()
      .map((f) => {
        const entry = readJson<{ savedAt: string; savedBy: string }>(join(dir, f), { savedAt: '', savedBy: '' })
        return { id: f.slice(0, -5), savedAt: entry.savedAt, savedBy: entry.savedBy }
      })
    return c.json({ versions })
  })
  .post('/:key/restore', async (c) => {
    const key = c.req.param('key')
    const { id } = await c.req.json<{ id?: string }>().catch(() => ({}) as { id?: string })
    if (!KEY.test(key) || !id || !/^[0-9TZ-]+$/.test(id)) return c.json({ error: 'bad-request' }, 400)
    const file = join(paths.history, key, `${id}.json`)
    if (!existsSync(file)) return c.json({ error: 'not-found' }, 404)
    const entry = readJson<{ doc: unknown }>(file, { doc: null })
    if (entry.doc === null) return c.json({ error: 'not-found' }, 404)
    const by = c.get('user').email
    snapshot(key, by)
    writeJsonAtomic(docFile(key), entry.doc)
    const meta = readMeta()
    meta[key] = { updatedAt: new Date().toISOString(), updatedBy: by }
    writeMeta(meta)
    return c.json({ doc: entry.doc, meta: meta[key] })
  })
