import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { storage } from '@/lib/storage'
import { LanguageContext } from './context'
import { DEFAULT_LANG, isLang, otherLang, type Lang, type Localized } from './types'

const STORAGE_KEY = 'vs-lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromQuery)) return fromQuery
  const saved = storage.get(STORAGE_KEY)
  return isLang(saved) ? saved : DEFAULT_LANG
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    storage.set(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((current) => otherLang(current)), [])
  const t = useCallback(<T,>(value: Localized<T>) => value[lang], [lang])

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t])

  return <LanguageContext value={value}>{children}</LanguageContext>
}
