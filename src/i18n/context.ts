import { createContext } from 'react'
import type { Lang, Localized } from './types'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: <T>(value: Localized<T>) => T
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
