import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, ApiError } from '../api'
import { A } from '../strings'
import { useAdminAuth } from '../useAdminAuth'
import { INPUT_CLASS } from '../components/helpers'
import { AdminButton, Field, Notice, Panel } from '../components/ui'

export default function AccountPage() {
  const { t } = useLanguage()
  const { user } = useAdminAuth()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setStatus(null)
    try {
      await api('/auth/password', { method: 'POST', body: { current, next } })
      setCurrent('')
      setNext('')
      setStatus({ ok: true, text: t(A.passwordChanged) })
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'unreachable'
      setStatus({ ok: false, text: code === 'invalid-credentials' ? t(A.invalidCredentials) : code === 'weak-password' ? t(A.passwordRule) : t(A.unreachable) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t(A.account)}</h1>
        <p className="mt-2 text-sm text-ink-600">
          {t(A.loggedInAs)} <span className="font-semibold">{user?.email}</span> · {user?.role === 'admin' ? t(A.admin) : t(A.editor)}
        </p>
      </div>
      <Panel title={t(A.changePassword)} className="max-w-lg">
        <form onSubmit={submit} className="space-y-4">
          <Field label={t(A.currentPassword)} id="pw-current">
            <input id="pw-current" type="password" required autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={INPUT_CLASS} />
          </Field>
          <Field label={t(A.newPassword)} id="pw-next" hint={t(A.passwordRule)}>
            <input id="pw-next" type="password" required minLength={10} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={INPUT_CLASS} />
          </Field>
          {status && <Notice tone={status.ok ? 'success' : 'error'}>{status.text}</Notice>}
          <AdminButton type="submit" disabled={busy || !current || next.length < 10}>
            {t(A.changePassword)}
          </AdminButton>
        </form>
      </Panel>
    </div>
  )
}
