import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, ApiError, type AdminUser } from '../api'
import { A } from '../strings'
import { useAdminAuth } from '../useAdminAuth'
import { INPUT_CLASS } from '../components/helpers'
import { AdminButton, Field, Notice, Panel } from '../components/ui'

export default function AccountPage() {
  const { t } = useLanguage()
  const { user, refresh } = useAdminAuth()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailPassword, setEmailPassword] = useState('')
  const [emailStatus, setEmailStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [emailBusy, setEmailBusy] = useState(false)

  const submitEmail = async (event: FormEvent) => {
    event.preventDefault()
    setEmailBusy(true)
    setEmailStatus(null)
    try {
      await api<{ user: AdminUser }>('/auth/email', { method: 'POST', body: { password: emailPassword, email: newEmail } })
      setNewEmail('')
      setEmailPassword('')
      await refresh()
      setEmailStatus({ ok: true, text: t(A.emailChanged) })
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'unreachable'
      setEmailStatus({
        ok: false,
        text: code === 'invalid-credentials' ? t(A.invalidCredentials) : code === 'exists' ? t(A.emailExists) : code === 'invalid-email' ? t(A.emailInvalid) : t(A.unreachable),
      })
    } finally {
      setEmailBusy(false)
    }
  }

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
            <input id="pw-next" type="password" required minLength={8} autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={INPUT_CLASS} />
          </Field>
          {status && <Notice tone={status.ok ? 'success' : 'error'}>{status.text}</Notice>}
          <AdminButton type="submit" disabled={busy || !current || next.length < 8}>
            {t(A.changePassword)}
          </AdminButton>
        </form>
      </Panel>
      <Panel title={t(A.changeEmail)} className="max-w-lg">
        <form onSubmit={submitEmail} className="space-y-4">
          <Field label={t(A.newEmail)} id="email-next">
            <input id="email-next" type="email" required autoComplete="username" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={INPUT_CLASS} />
          </Field>
          <Field label={t(A.confirmWithPassword)} id="email-password">
            <input id="email-password" type="password" required autoComplete="current-password" value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} className={INPUT_CLASS} />
          </Field>
          {emailStatus && <Notice tone={emailStatus.ok ? 'success' : 'error'}>{emailStatus.text}</Notice>}
          <AdminButton type="submit" disabled={emailBusy || !newEmail || !emailPassword}>
            {t(A.changeEmail)}
          </AdminButton>
        </form>
      </Panel>
    </div>
  )
}
