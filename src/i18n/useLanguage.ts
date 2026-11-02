import { useContext } from 'react'
import { LanguageContext, type LanguageContextValue } from './context'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

export function useT() {
  return useLanguage().t
}
