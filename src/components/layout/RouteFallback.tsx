import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'

export function RouteFallback() {
  const { t } = useLanguage()
  return (
    <div className="min-h-dvh bg-navy-950" role="status" aria-live="polite">
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-cyan-400/80 motion-safe:animate-pulse" />
      <span className="sr-only">{t(ui.a11y.loading)}</span>
    </div>
  )
}
