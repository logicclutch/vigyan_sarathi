export type Lang = 'hi' | 'en'

export type Localized<T = string> = { hi: T; en: T }

export const LANGS = ['hi', 'en'] as const
export const DEFAULT_LANG: Lang = 'hi'

export const LANG_META: Record<Lang, { label: string; short: string; locale: string; ogLocale: string }> = {
  hi: { label: 'हिन्दी', short: 'हिं', locale: 'hi-IN', ogLocale: 'hi_IN' },
  en: { label: 'English', short: 'EN', locale: 'en-IN', ogLocale: 'en_IN' },
}

export function isLang(value: unknown): value is Lang {
  return value === 'hi' || value === 'en'
}

export function otherLang(lang: Lang): Lang {
  return lang === 'hi' ? 'en' : 'hi'
}
