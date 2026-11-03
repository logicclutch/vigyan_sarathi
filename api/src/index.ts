import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { authRoutes, csrfGuard, requireAuth, requireRole, type AppEnv } from './auth'
import { config } from './config'
import { contentRoutes } from './content'
import { ensureReleasesDir, publisher, publishRoutes } from './publish'
import { uploadRoutes } from './uploads'
import { createUser, deleteUser, ensureInitialAdmin, loadUsers, toPublic, type Role } from './users'

ensureReleasesDir()
ensureInitialAdmin()

const app = new Hono<AppEnv>()
if (!config.isProd) app.use('*', logger())
app.use('/api/*', csrfGuard)

app.get('/api/health', (c) => {
  const ready = publisher.currentRelease !== null || !config.autoPublishOnStart || publisher.startupDone
  return c.json({ ok: ready, release: publisher.currentRelease, publishing: publisher.current !== null }, ready ? 200 : 503)
})

app.route('/api/auth', authRoutes)
app.route('/api/content', contentRoutes)
app.route('/api/uploads', uploadRoutes)
app.route('/api/publish', publishRoutes)

const users = new Hono<AppEnv>()
  .use('*', requireAuth, requireRole('admin'))
  .get('/', (c) => c.json({ users: loadUsers().map(toPublic) }))
  .post('/', async (c) => {
    const body = await c.req.json<{ email?: string; password?: string; role?: Role }>().catch(() => ({}) as { email?: string; password?: string; role?: Role })
    const role: Role = body.role === 'admin' ? 'admin' : 'editor'
    try {
      return c.json({ user: createUser(String(body.email ?? ''), String(body.password ?? ''), role) }, 201)
    } catch (error) {
      return c.json({ error: (error as Error).message }, 400)
    }
  })
  .delete('/:id', (c) => {
    if (c.req.param('id') === c.get('user').id) return c.json({ error: 'cannot-delete-self' }, 400)
    try {
      deleteUser(c.req.param('id'))
      return c.body(null, 204)
    } catch (error) {
      return c.json({ error: (error as Error).message }, 400)
    }
  })
app.route('/api/users', users)

app.notFound((c) => c.json({ error: 'not-found' }, 404))
app.onError((error, c) => {
  console.error(error)
  return c.json({ error: 'server-error' }, 500)
})

serve({ fetch: app.fetch, port: config.port, hostname: '0.0.0.0' }, (info) => {
  console.log(`[api] listening on :${info.port} (data: ${config.dataDir}, releases: ${config.releasesDir}, site: ${config.siteUrl || 'origin'})`)
  if (config.autoPublishOnStart) publisher.request('startup')
})
