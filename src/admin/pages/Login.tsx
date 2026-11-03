import { useState, type FormEvent } from 'react'
import { Logo } from '@/components/brand/Logo'
import { useLanguage } from '@/i18n/useLanguage'
import { ApiError } from '../api'
import { A } from '../strings'
import { useAdminAuth } from '../useAdminAuth'
import { INPUT_CLASS } from '../components/helpers'
import { AdminButton, Field, Notice } from '../components/ui'

export default function LoginPage() {
  const { t } = useLanguage()
  const { login } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await login(email, password)
    } catch (err) {
      const code = err instanceof ApiError ? err.code : 'unreachable'
      setError(code === 'invalid-credentials' ? t(A.invalidCredentials) : code === 'too-many-attempts' ? t(A.tooMany) : t(A.unreachable))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-navy-950 px-4 py-12 text-ink-900">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Logo tone="light" />
          <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">{t(A.panel)}</span>
        </div>
        <h1 className="text-2xl font-bold">{t(A.signIn)}</h1>
        <p className="mt-1 text-sm text-ink-600">{t(A.loginIntro)}</p>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <Field label={t(A.email)} id="admin-email">
            <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} />
          </Field>
          <Field label={t(A.password)} id="admin-password">
            <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT_CLASS} />
          </Field>
          {error && <Notice tone="error">{error}</Notice>}
          <AdminButton type="submit" disabled={busy || !email || !password} className="w-full">
            {t(A.signIn)}
          </AdminButton>
        </form>
      </div>
    </main>
  )
}
