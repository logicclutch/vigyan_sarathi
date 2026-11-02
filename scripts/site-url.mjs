// Resolves the public site URL for builds: explicit VITE_SITE_URL first, then the URL the
// hosting platform exposes at build time (Vercel, Netlify, Cloudflare Pages), else ''.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function fromDotenv(name) {
  for (const file of ['.env.local', '.env']) {
    const path = join(root, file)
    if (!existsSync(path)) continue
    const match = readFileSync(path, 'utf8').match(new RegExp(`^${name}=(.*)$`, 'm'))
    if (match && match[1].trim()) return match[1].trim().replace(/^['"]|['"]$/g, '')
  }
  return ''
}

export function resolveSiteUrl(env = process.env) {
  const explicit = env.VITE_SITE_URL || fromDotenv('VITE_SITE_URL')
  if (explicit) return explicit.replace(/\/$/, '')
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.VERCEL_URL && env.VERCEL_ENV === 'production') return `https://${env.VERCEL_URL}`
  if (env.URL && env.NETLIFY) return env.URL.replace(/\/$/, '')
  if (env.CF_PAGES_URL) return env.CF_PAGES_URL.replace(/\/$/, '')
  return ''
}
