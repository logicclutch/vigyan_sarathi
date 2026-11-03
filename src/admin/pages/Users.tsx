import { useEffect, useState, type FormEvent } from 'react'
import { Trash2, UserPlus } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, ApiError, type AdminUser } from '../api'
import { A } from '../strings'
import { useAdminAuth } from '../useAdminAuth'
import { INPUT_CLASS, formatStamp } from '../components/helpers'
import { AdminButton, Field, Notice, Panel } from '../components/ui'

export default function UsersPage() {
  const { t, lang } = useLanguage()
  const { user: me } = useAdminAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'editor'>('editor')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const refresh = () => api<{ users: AdminUser[] }>('/users').then((d) => setUsers(d.users)).catch(() => undefined)
  useEffect(() => {
    void refresh()
  }, [])

  if (me?.role !== 'admin') return <Notice tone="warn">{t(A.adminsOnly)}</Notice>

  const create = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await api('/users', { method: 'POST', body: { email, password, role } })
      setEmail('')
      setPassword('')
      setRole('editor')
      await refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.code : 'error')
    } finally {
      setBusy(false)
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm(t(A.deleteUserConfirm))) return
    try {
      await api(`/users/${id}`, { method: 'DELETE' })
      await refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.code : 'error')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t(A.users)}</h1>
        <p className="mt-2 text-sm text-ink-600">{t(A.roleHint)}</p>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <Panel title={t(A.newUser)}>
        <form onSubmit={create} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <Field label={t(A.email)} id="new-email">
            <input id="new-email" type="email" required autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} />
          </Field>
          <Field label={t(A.password)} id="new-password" hint={t(A.passwordRule)}>
            <input id="new-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT_CLASS} />
          </Field>
          <Field label={t(A.role)} id="new-role">
            <select id="new-role" value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'editor')} className={INPUT_CLASS}>
              <option value="editor">{t(A.editor)}</option>
              <option value="admin">{t(A.admin)}</option>
            </select>
          </Field>
          <AdminButton type="submit" disabled={busy} className="h-11">
            <UserPlus aria-hidden="true" className="size-4" /> {t(A.create)}
          </AdminButton>
        </form>
      </Panel>
      <Panel title={t(A.users)}>
        <ul className="divide-y divide-ink-900/8">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span>
                <span className="font-semibold text-ink-900">{u.email}</span>{' '}
                <span className="rounded-full bg-ink-900/5 px-2 py-0.5 text-xs font-semibold text-ink-600">{u.role === 'admin' ? t(A.admin) : t(A.editor)}</span>
                <span className="block text-xs text-ink-500">{formatStamp(u.createdAt, lang)}</span>
              </span>
              {u.id !== me.id && (
                <AdminButton tone="danger" onClick={() => remove(u.id)} aria-label={t(A.remove)} className="h-9 px-3">
                  <Trash2 aria-hidden="true" className="size-4" />
                </AdminButton>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
