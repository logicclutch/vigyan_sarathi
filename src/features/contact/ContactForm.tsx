import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { CircleCheck, Copy, Send, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import {
  SUBJECT_KEYS,
  composeMessage,
  emptyValues,
  submitContact,
  validate,
  type ContactErrors,
  type ContactField,
  type ContactValues,
  type SubjectKey,
} from './contactLogic'

type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'copy' | 'error'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  children: (props: { id: string; 'aria-invalid': boolean | undefined; 'aria-describedby': string | undefined }) => ReactNode
}

function Field({ id, label, error, hint, children }: FieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-800">
        {label}
      </label>
      <div className="mt-1.5">{children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}</div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-700" role="alert">
          <TriangleAlert aria-hidden="true" className="size-4" />
          {error}
        </p>
      )}
    </div>
  )
}

const INPUT =
  'h-12 w-full rounded-2xl border bg-white px-4 text-base text-ink-900 outline-none transition-[border-color,box-shadow] placeholder:text-ink-400 focus:ring-4 focus:ring-electric-500/15 aria-[invalid=true]:border-rose-400 aria-[invalid=true]:ring-rose-400/15 border-ink-900/15 focus:border-electric-500'

interface ContactFormProps {
  initialSubject: SubjectKey
  initialMessage?: string
}

export function ContactForm({ initialSubject, initialMessage = '' }: ContactFormProps) {
  const { lang, t } = useLanguage()
  const base = useId()
  const [values, setValues] = useState<ContactValues>(() => emptyValues(initialSubject, initialMessage))
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const update = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key as ContactField]) setErrors(validate(next, t))
  }
  const blur = (key: ContactField) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    setErrors(validate(values, t))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values, t)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true, consent: true })
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0]
      document.getElementById(`${base}-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const outcome = await submitContact(values, lang)
      setStatus(outcome)
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(emptyValues(initialSubject))
    setErrors({})
    setTouched({})
    setStatus('idle')
    setCopied(false)
  }

  const copyMessage = async () => {
    const { subject, body } = composeMessage(values, lang)
    const text = `${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      const area = document.getElementById(`${base}-composed`) as HTMLTextAreaElement | null
      area?.select()
      setCopied(false)
    }
  }

  if (status === 'sent' || status === 'mailto' || status === 'copy') {
    const { subject, body } = composeMessage(values, lang)
    const title = status === 'sent' ? ui.form.successTitle : status === 'mailto' ? ui.form.mailtoTitle : ui.form.copyTitle
    const desc = status === 'sent' ? ui.form.successBody : status === 'mailto' ? ui.form.mailtoBody : ui.form.copyBody
    return (
      <div role="status" className="rounded-3xl bg-mint-100 p-7 ring-1 ring-mint-400/40 sm:p-9" data-testid="contact-success">
        <CircleCheck aria-hidden="true" className="size-10 text-teal-700" />
        <h3 className="mt-4 text-h3 font-bold text-ink-900">{t(title)}</h3>
        <p className="mt-2 text-ink-700">{t(desc)}</p>
        {status !== 'sent' && (
          <div className="mt-6">
            <label htmlFor={`${base}-composed`} className="sr-only">
              {t(ui.form.message)}
            </label>
            <textarea id={`${base}-composed`} readOnly rows={8} value={`${subject}\n\n${body}`} className="w-full rounded-2xl border border-ink-900/10 bg-white p-4 text-sm text-ink-800" />
            <Button variant="secondary" size="sm" icon={<Copy />} iconPosition="left" className="mt-3" onClick={copyMessage}>
              {copied ? t(ui.cta.copied) : t(ui.cta.copy)}
            </Button>
          </div>
        )}
        <Button variant="outline" size="sm" className="mt-6" onClick={reset}>
          {t(ui.form.sendAnother)}
        </Button>
      </div>
    )
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" data-testid="contact-form">
      {hasErrors && (
        <p role="alert" className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-medium text-rose-700">
          {t(ui.form.fixErrors)}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">
          <span className="font-semibold">{t(ui.form.errorTitle)}</span> {t(ui.form.errorBody)}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${base}-name`} label={t(ui.form.name)} error={errors.name}>
          {(a11y) => <input {...a11y} name="name" type="text" autoComplete="name" required value={values.name} onChange={(e) => update('name', e.target.value)} onBlur={() => blur('name')} className={INPUT} />}
        </Field>
        <Field id={`${base}-email`} label={t(ui.form.email)} error={errors.email}>
          {(a11y) => <input {...a11y} name="email" type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={(e) => update('email', e.target.value)} onBlur={() => blur('email')} className={INPUT} />}
        </Field>
        <Field id={`${base}-phone`} label={t(ui.form.phone)} error={errors.phone}>
          {(a11y) => <input {...a11y} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} onBlur={() => blur('phone')} className={INPUT} />}
        </Field>
        <Field id={`${base}-subject`} label={t(ui.form.subject)} error={errors.subject}>
          {(a11y) => (
            <select {...a11y} name="subject" value={values.subject} onChange={(e) => update('subject', e.target.value as SubjectKey)} className={cn(INPUT, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%235b667b%27 stroke-width=%272%27%3E%3Cpath d=%27m4 6 4 4 4-4%27/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10')}>
              {SUBJECT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(ui.form.subjects[key])}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <Field id={`${base}-message`} label={t(ui.form.message)} error={errors.message}>
        {(a11y) => <textarea {...a11y} name="message" rows={6} required value={values.message} onChange={(e) => update('message', e.target.value)} onBlur={() => blur('message')} className={cn(INPUT, 'h-auto py-3')} />}
      </Field>
      {/* honeypot: hidden from people, tempting for bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${base}-website`}>Website</label>
        <input id={`${base}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update('website', e.target.value)} />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
          <input
            id={`${base}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            onBlur={() => blur('consent')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${base}-consent-error` : undefined}
            className="mt-1 size-4 shrink-0 accent-electric-500"
          />
          <span>{t(ui.form.consent)}</span>
        </label>
        {errors.consent && (
          <p id={`${base}-consent-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-700">
            <TriangleAlert aria-hidden="true" className="size-4" />
            {errors.consent}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" icon={<Send />} disabled={status === 'submitting'}>
          {status === 'submitting' ? t(ui.form.sending) : t(ui.form.send)}
        </Button>
        <p className="text-xs text-ink-500">{t(ui.contact.privacy)}</p>
      </div>
    </form>
  )
}
