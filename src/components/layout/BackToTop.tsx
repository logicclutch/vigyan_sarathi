import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

export function BackToTop() {
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && window.scrollY > 640)
  const { t } = useLanguage()
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setVisible(window.scrollY > 640))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label={t(ui.a11y.backToTop)}
      data-visible={visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      className={cn(
        'fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-navy-900 text-white shadow-lift ring-1 ring-white/15 transition-[opacity,transform,background-color] duration-300 hover:bg-electric-500',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  )
}
