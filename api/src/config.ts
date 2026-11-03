import { randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const siteSrcDir = resolve(process.env.SITE_SRC_DIR ?? process.cwd())
const isProd = process.env.NODE_ENV === 'production'

export const config = {
  port: Number(process.env.PORT ?? 3000),
  isProd,
  siteSrcDir,
  dataDir: resolve(process.env.DATA_DIR ?? join(siteSrcDir, '.data')),
  releasesDir: resolve(process.env.RELEASES_DIR ?? join(siteSrcDir, '.releases')),
  siteUrl: (process.env.VITE_SITE_URL ?? (process.env.SITE_DOMAIN ? `https://${process.env.SITE_DOMAIN}` : '')).replace(/\/$/, ''),
  adminEmail: (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD ?? '',
  autoPublishOnStart: process.env.AUTO_PUBLISH_ON_START === 'true',
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProd,
  sessionHours: 12,
  keepReleases: 5,
  keepHistory: 20,
}

export const paths = {
  content: join(config.dataDir, 'content'),
  history: join(config.dataDir, 'history'),
  uploads: join(config.dataDir, 'uploads'),
  users: join(config.dataDir, 'users.json'),
  secret: join(config.dataDir, 'session-secret'),
  publish: join(config.dataDir, 'publish.json'),
}

for (const dir of [config.dataDir, paths.content, paths.history, paths.uploads, config.releasesDir]) mkdirSync(dir, { recursive: true })

export function sessionSecret(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 24) return process.env.SESSION_SECRET
  if (existsSync(paths.secret)) return readFileSync(paths.secret, 'utf8').trim()
  const secret = randomBytes(48).toString('base64url')
  writeFileSync(paths.secret, secret, { mode: 0o600 })
  return secret
}

/** Atomic JSON write: temp file then rename. */
export function writeJsonAtomic(file: string, value: unknown) {
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`
  writeFileSync(tmp, JSON.stringify(value, null, 2))
  renameSync(tmp, file)
}

export function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as T
  } catch {
    return fallback
  }
}
