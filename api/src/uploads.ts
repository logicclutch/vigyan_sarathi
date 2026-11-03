import { randomBytes } from 'node:crypto'
import { existsSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Hono } from 'hono'
import { paths } from './config'
import { requireAuth, type AppEnv } from './auth'

const MAX_BYTES = 10 * 1024 * 1024
const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }
const SAFE_NAME = /^[a-z0-9-]+\.(jpg|png|webp|gif)$/

function sniff(buffer: Buffer): string | null {
  if (buffer.length < 12) return null
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg'
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp'
  if (buffer.subarray(0, 6).toString('ascii') === 'GIF87a' || buffer.subarray(0, 6).toString('ascii') === 'GIF89a') return 'image/gif'
  return null
}

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'image'

export function listUploads() {
  if (!existsSync(paths.uploads)) return []
  return readdirSync(paths.uploads)
    .filter((f) => SAFE_NAME.test(f))
    .map((name) => {
      const stats = statSync(join(paths.uploads, name))
      return { name, url: `/uploads/${name}`, size: stats.size, uploadedAt: stats.mtime.toISOString() }
    })
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
}

export const uploadRoutes = new Hono<AppEnv>()
  .use('*', requireAuth)
  .get('/', (c) => c.json({ files: listUploads() }))
  .post('/', async (c) => {
    const body = await c.req.parseBody()
    const file = body.file
    if (!(file instanceof File)) return c.json({ error: 'file-required' }, 400)
    if (file.size > MAX_BYTES) return c.json({ error: 'too-large', max: MAX_BYTES }, 413)
    const buffer = Buffer.from(await file.arrayBuffer())
    const type = sniff(buffer)
    if (!type || !TYPES[type]) return c.json({ error: 'unsupported-type' }, 415)
    const name = `${slug(file.name)}-${randomBytes(4).toString('hex')}.${TYPES[type]}`
    writeFileSync(join(paths.uploads, name), buffer)
    return c.json({ name, url: `/uploads/${name}`, size: buffer.length })
  })
  .delete('/:name', (c) => {
    const name = c.req.param('name')
    if (!SAFE_NAME.test(name)) return c.json({ error: 'bad-name' }, 400)
    const file = join(paths.uploads, name)
    if (!existsSync(file)) return c.json({ error: 'not-found' }, 404)
    unlinkSync(file)
    return c.body(null, 204)
  })
