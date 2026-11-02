import { site } from '@/content/site'
import { ui } from '@/content/ui'
import type { Lang, Localized } from '@/i18n/types'
import { fmt } from '@/lib/format'

export type SubjectKey = keyof typeof ui.form.subjects
export const SUBJECT_KEYS = Object.keys(ui.form.subjects) as SubjectKey[]

export interface ContactValues {
  name: string
  email: string
  phone: string
  subject: SubjectKey
  message: string
  consent: boolean
  /** honeypot: must stay empty */
  website: string
}

export type ContactField = 'name' | 'email' | 'phone' | 'subject' | 'message' | 'consent'
export type ContactErrors = Partial<Record<ContactField, string>>
export type SubmitOutcome = 'sent' | 'mailto' | 'copy'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s()-]{6,19}$/

export function emptyValues(subject: SubjectKey = 'general', message = ''): ContactValues {
  return { name: '', email: '', phone: '', subject, message, consent: false, website: '' }
}

export function intentToSubject(intent: string | null): SubjectKey {
  switch (intent) {
    case 'join':
    case 'volunteer':
      return 'join'
    case 'school':
      return 'school'
    case 'teacher':
      return 'teacher'
    case 'student':
      return 'student'
    case 'partnership':
      return 'partnership'
    default:
      return 'general'
  }
}

export function validate(values: ContactValues, t: <T>(v: Localized<T>) => T): ContactErrors {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2) errors.name = fmt(t(ui.form.tooShort), { n: 2 })
  if (!values.email.trim()) errors.email = t(ui.form.required)
  else if (!EMAIL.test(values.email.trim())) errors.email = t(ui.form.invalidEmail)
  if (values.phone.trim() && !PHONE.test(values.phone.trim())) errors.phone = t(ui.form.invalidPhone)
  if (values.message.trim().length < 20) errors.message = fmt(t(ui.form.tooShort), { n: 20 })
  if (!values.consent) errors.consent = t(ui.form.consentRequired)
  return errors
}

export function composeMessage(values: ContactValues, lang: Lang): { subject: string; body: string } {
  const subjectLabel = ui.form.subjects[values.subject][lang]
  const subject = fmt(ui.form.composedSubject[lang], { subject: subjectLabel })
  const lines = [
    `${ui.form.name[lang]}: ${values.name.trim()}`,
    `${ui.form.email[lang]}: ${values.email.trim()}`,
    values.phone.trim() ? `${ui.form.phone[lang].replace(/\s*\(.*\)$/, '')}: ${values.phone.trim()}` : null,
    `${ui.form.subject[lang]}: ${subjectLabel}`,
    '',
    values.message.trim(),
  ].filter((line): line is string => line !== null)
  return { subject, body: lines.join('\n') }
}

/**
 * Sends the message. With VITE_CONTACT_ENDPOINT configured it POSTs JSON; otherwise it
 * opens a prefilled mail client (when an email is configured) or hands the composed text
 * back so the visitor can copy it. The button is never a dead end.
 */
export async function submitContact(values: ContactValues, lang: Lang): Promise<SubmitOutcome> {
  if (values.website) return 'sent' // honeypot filled: pretend success, send nothing
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: ui.form.subjects[values.subject].en,
        message: values.message.trim(),
        language: lang,
      }),
    })
    if (!response.ok) throw new Error(`Contact endpoint responded ${response.status}`)
    return 'sent'
  }
  if (site.contact.email) {
    const { subject, body } = composeMessage(values, lang)
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return 'mailto'
  }
  return 'copy'
}
