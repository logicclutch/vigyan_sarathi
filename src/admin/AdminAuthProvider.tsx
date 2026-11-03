import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, type AdminUser } from './api'
import { AdminAuthContext } from './authContext'

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(
    () =>
      api<{ user: AdminUser }>('/auth/me')
        .then((data) => setUser(data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false)),
    [],
  )

  useEffect(() => {
    void refresh()
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{ user: AdminUser }>('/auth/login', { method: 'POST', body: { email, password } })
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => undefined)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, logout, refresh }), [user, loading, login, logout, refresh])
  return <AdminAuthContext value={value}>{children}</AdminAuthContext>
}
