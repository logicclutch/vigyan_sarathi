import { spawn } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, readlinkSync, renameSync, rmSync, symlinkSync } from 'node:fs'
import { join } from 'node:path'
import { Hono } from 'hono'
import { config, paths, readJson, writeJsonAtomic } from './config'
import { requireAuth, type AppEnv } from './auth'

export interface PublishRecord {
  id: string
  state: 'running' | 'succeeded' | 'failed'
  trigger: string
  startedAt: string
  finishedAt?: string
  release?: string
  log: string[]
}

class Publisher {
  current: PublishRecord | null = null
  /** True once the first publish requested at startup has finished, whatever the outcome. */
  startupDone = false
  last: PublishRecord | null = readJson<PublishRecord | null>(paths.publish, null)
  private queued: string | null = null

  get currentRelease(): string | null {
    const link = join(config.releasesDir, 'current')
    try {
      return existsSync(link) ? readlinkSync(link) : null
    } catch {
      return null
    }
  }

  status() {
    return { running: this.current, last: this.last, queued: this.queued !== null, currentRelease: this.currentRelease }
  }

  request(trigger: string): 'started' | 'queued' {
    if (this.current) {
      this.queued = trigger
      return 'queued'
    }
    void this.run(trigger)
    return 'started'
  }

  private async run(trigger: string) {
    const id = new Date().toISOString().replace(/[:.]/g, '-')
    const record: PublishRecord = { id, state: 'running', trigger, startedAt: new Date().toISOString(), log: [] }
    this.current = record
    const push = (line: string) => {
      for (const part of line.split('\n')) if (part.trim()) record.log.push(part.slice(0, 400))
      if (record.log.length > 300) record.log.splice(0, record.log.length - 300)
    }
    try {
      push(`[publish] building (trigger: ${trigger}) with CONTENT_DATA_DIR=${paths.content}`)
      const code = await new Promise<number>((resolve) => {
        const child = spawn('npm', ['run', 'build'], {
          cwd: config.siteSrcDir,
          env: { ...process.env, CI: 'true', NO_COLOR: '1', FORCE_COLOR: '0', VITE_SITE_URL: config.siteUrl, CONTENT_DATA_DIR: paths.content, NODE_ENV: 'production' },
        })
        child.stdout.on('data', (chunk: Buffer) => push(chunk.toString()))
        child.stderr.on('data', (chunk: Buffer) => push(chunk.toString()))
        child.on('error', (error) => {
          push(`[publish] spawn error: ${error.message}`)
          resolve(1)
        })
        child.on('close', (exitCode) => resolve(exitCode ?? 1))
      })
      if (code !== 0) throw new Error(`build exited with code ${code}`)
      const dist = join(config.siteSrcDir, 'dist')
      if (!existsSync(join(dist, 'index.html'))) throw new Error('build produced no dist/index.html')
      const releaseDir = join(config.releasesDir, id)
      cpSync(dist, releaseDir, { recursive: true })
      const link = join(config.releasesDir, 'current')
      const tmp = `${link}.tmp-${process.pid}`
      rmSync(tmp, { force: true })
      symlinkSync(releaseDir, tmp)
      renameSync(tmp, link)
      record.release = releaseDir
      this.prune(releaseDir)
      record.state = 'succeeded'
      push(`[publish] live: ${releaseDir}`)
    } catch (error) {
      record.state = 'failed'
      push(`[publish] FAILED: ${(error as Error).message}`)
    } finally {
      record.finishedAt = new Date().toISOString()
      if (trigger === 'startup') this.startupDone = true
      this.last = record
      this.current = null
      writeJsonAtomic(paths.publish, record)
      if (this.queued) {
        const next = this.queued
        this.queued = null
        void this.run(next)
      }
    }
  }

  private prune(keep: string) {
    const dirs = readdirSync(config.releasesDir)
      .filter((d) => /^\d{4}-/.test(d))
      .sort()
    for (const old of dirs.slice(0, Math.max(0, dirs.length - config.keepReleases))) {
      const full = join(config.releasesDir, old)
      if (full !== keep) rmSync(full, { recursive: true, force: true })
    }
  }
}

export const publisher = new Publisher()

export const publishRoutes = new Hono<AppEnv>()
  .use('*', requireAuth)
  .get('/status', (c) => c.json(publisher.status()))
  .post('/', (c) => c.json({ result: publisher.request(`admin:${c.get('user').email}`), ...publisher.status() }, 202))

export function ensureReleasesDir() {
  mkdirSync(config.releasesDir, { recursive: true })
}
