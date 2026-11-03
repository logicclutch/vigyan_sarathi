import { createContext } from 'react'
import type { AdminUser } from './api'

export interface AdminAuthValue {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export const AdminAuthContext = createContext<AdminAuthValue | null>(null)
