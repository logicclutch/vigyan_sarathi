// Vite plugin: exposes `virtual:content-overrides`, an object keyed by content module key, read from
// JSON files written by the admin API (CONTENT_DATA_DIR, default ./.data/content). Missing dir = no overrides.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const VIRTUAL = 'virtual:content-overrides'
const RESOLVED = '\0' + VIRTUAL

export default function contentOverrides({ dir = process.env.CONTENT_DATA_DIR || '.data/content' } = {}) {
  const absDir = resolve(dir)
  const load = () => {
    const out = {}
    if (!existsSync(absDir)) return out
    for (const file of readdirSync(absDir)) {
      if (!file.endsWith('.json') || file.startsWith('_')) continue
      try {
        out[file.slice(0, -5)] = JSON.parse(readFileSync(join(absDir, file), 'utf8'))
      } catch (error) {
        console.warn(`[content-overrides] skipping ${file}: ${error.message}`)
      }
    }
    return out
  }
  return {
    name: 'content-overrides',
    resolveId(id) {
      if (id === VIRTUAL) return RESOLVED
      return null
    },
    load(id) {
      if (id !== RESOLVED) return null
      const data = load()
      const keys = Object.keys(data)
      if (keys.length) console.log(`[content-overrides] ${keys.length} module(s) overridden from ${absDir}`)
      return `export default ${JSON.stringify(data)}`
    },
    configureServer(server) {
      server.watcher.add(absDir)
      const refresh = (path) => {
        if (!path.startsWith(absDir)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('change', refresh)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}
