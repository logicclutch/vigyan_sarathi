import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { sign, verify } from 'hono/jwt'
import { config, sessionSecret } from './config'
import { PASSWORD_MIN, findUserByEmail, findUserById, setPassword, toPublic, verifyPassword, type PublicUser, type Role } from './users'

export type AppEnv = { Variables: { user: PublicUser } }

const COOKIE = 'vs_admin'
const SECRET = sessionSecret()

const attempts = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 10
const WINDOW_MS = 15 * 60 * 1000

function clientIp(headers: { get(name: string): string | null | undefined }): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'local'
}

function throttled(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > LIMIT
}

async function issueSession(userId: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + config.sessionHours * 3600
  return sign({ sub: userId, exp }, SECRET, 'HS256')
}

export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const token = getCookie(c, COOKIE)
  if (!token) return c.json({ error: 'unauthenticated' }, 401)
  try {
    const payload = await verify(token, SECRET, 'HS256')
    const user = typeof payload.sub === 'string' ? findUserById(payload.sub) : undefined
    if (!user) return c.json({ error: 'unauthenticated' }, 401)
    c.set('user', toPublic(user))
    await next()
  } catch {
    return c.json({ error: 'unauthenticated' }, 401)
  }
})

export const requireRole = (role: Role) =>
  createMiddleware<AppEnv>(async (c, next) => {
    if (c.get('user')?.role !== role) return c.json({ error: 'forbidden' }, 403)
    await next()
  })

/** Mutations must carry a custom header: browsers only add it from same-origin scripts. */
export const csrfGuard = createMiddleware(async (c, next) => {
  const method = c.req.method
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS' && c.req.header('x-requested-with') !== 'vigyan-admin') {
    return c.json({ error: 'csrf' }, 403)
  }
  await next()
})

export const authRoutes = new Hono<AppEnv>()
  .post('/login', async (c) => {
    const ip = clientIp(c.req.raw.headers)
    if (throttled(ip)) return c.json({ error: 'too-many-attempts' }, 429)
    const body = await c.req.json<{ email?: string; password?: string }>().catch(() => ({}) as { email?: string; password?: string })
    const email = String(body.email ?? '')
    const password = String(body.password ?? '')
    const user = findUserByEmail(email)
    if (!user || !verifyPassword(password, user.passwordHash)) return c.json({ error: 'invalid-credentials' }, 401)
    attempts.delete(ip)
    setCookie(c, COOKIE, await issueSession(user.id), {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'Strict',
      path: '/',
      maxAge: config.sessionHours * 3600,
    })
    return c.json({ user: toPublic(user) })
  })
  .post('/logout', (c) => {
    deleteCookie(c, COOKIE, { path: '/' })
    return c.body(null, 204)
  })
  .get('/me', requireAuth, (c) => c.json({ user: c.get('user') }))
  .post('/password', requireAuth, async (c) => {
    const body = await c.req.json<{ current?: string; next?: string }>().catch(() => ({}) as { current?: string; next?: string })
    const user = findUserById(c.get('user').id)
    if (!user || !verifyPassword(String(body.current ?? ''), user.passwordHash)) return c.json({ error: 'invalid-credentials' }, 401)
    if (String(body.next ?? '').length < PASSWORD_MIN) return c.json({ error: 'weak-password', min: PASSWORD_MIN }, 400)
    setPassword(user.id, String(body.next))
    return c.body(null, 204)
  })
