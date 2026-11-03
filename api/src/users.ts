import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto'
import { config, paths, readJson, writeJsonAtomic } from './config'

export type Role = 'admin' | 'editor'
export interface User {
  id: string
  email: string
  role: Role
  passwordHash: string
  createdAt: string
}
export type PublicUser = Omit<User, 'passwordHash'>

export const PASSWORD_MIN = 8

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex')
  return `scrypt:${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split(':')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const candidate = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 })
  const expected = Buffer.from(hash, 'hex')
  return candidate.length === expected.length && timingSafeEqual(candidate, expected)
}

export function loadUsers(): User[] {
  return readJson<User[]>(paths.users, [])
}

function saveUsers(users: User[]) {
  writeJsonAtomic(paths.users, users)
}

export const toPublic = ({ passwordHash: _hash, ...rest }: User): PublicUser => rest

export function findUserByEmail(email: string): User | undefined {
  const needle = email.trim().toLowerCase()
  return loadUsers().find((user) => user.email === needle)
}

export function findUserById(id: string): User | undefined {
  return loadUsers().find((user) => user.id === id)
}

export function createUser(email: string, password: string, role: Role): PublicUser {
  const users = loadUsers()
  const normalised = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalised)) throw new Error('invalid-email')
  if (password.length < PASSWORD_MIN) throw new Error('weak-password')
  if (users.some((user) => user.email === normalised)) throw new Error('exists')
  const user: User = { id: randomUUID(), email: normalised, role, passwordHash: hashPassword(password), createdAt: new Date().toISOString() }
  users.push(user)
  saveUsers(users)
  return toPublic(user)
}

export function deleteUser(id: string) {
  const users = loadUsers()
  const next = users.filter((user) => user.id !== id)
  if (next.length === users.length) throw new Error('not-found')
  if (!next.some((user) => user.role === 'admin')) throw new Error('last-admin')
  saveUsers(next)
}

export function setEmail(id: string, email: string) {
  const normalised = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalised)) throw new Error('invalid-email')
  const users = loadUsers()
  if (users.some((entry) => entry.email === normalised && entry.id !== id)) throw new Error('exists')
  const user = users.find((entry) => entry.id === id)
  if (!user) throw new Error('not-found')
  user.email = normalised
  saveUsers(users)
  return toPublic(user)
}

export function setPassword(id: string, password: string) {
  if (password.length < PASSWORD_MIN) throw new Error('weak-password')
  const users = loadUsers()
  const user = users.find((entry) => entry.id === id)
  if (!user) throw new Error('not-found')
  user.passwordHash = hashPassword(password)
  saveUsers(users)
}

/** Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD when no users exist yet. */
export function ensureInitialAdmin() {
  const users = loadUsers()
  if (users.length > 0) return
  if (!config.adminEmail || !config.adminPassword) {
    console.warn('[users] no users exist and ADMIN_EMAIL / ADMIN_PASSWORD are not set: nobody can sign in')
    return
  }
  try {
    createUser(config.adminEmail, config.adminPassword, 'admin')
    console.log(`[users] created initial admin ${config.adminEmail}`)
  } catch (error) {
    console.error('[users] could not create initial admin:', (error as Error).message)
  }
}
