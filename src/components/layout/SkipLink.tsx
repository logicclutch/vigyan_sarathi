import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'

export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-amber-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-950 focus:shadow-lift"
    >
      {t(ui.a11y.skip)}
    </a>
  )
}
