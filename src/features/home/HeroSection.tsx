import { useRef, type PointerEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { AtomOrbit } from '@/components/science/AtomOrbit'
import { Starfield } from '@/components/science/Starfield'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { home } from '@/content/home'
import { site } from '@/content/site'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

export function HeroSection() {
  const { lang, t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    ref.current.style.setProperty('--px', px.toFixed(3))
    ref.current.style.setProperty('--py', py.toFixed(3))
  }
  const onPointerLeave = () => {
    ref.current?.style.setProperty('--px', '0')
    ref.current?.style.setProperty('--py', '0')
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white"
    >
      <Starfield count={150} seed={3} className="-z-10" />
      <div aria-hidden="true" className="absolute -right-[12%] -top-[14%] -z-10 size-[72vmin] rounded-full bg-electric-600/30 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-[25%] -left-[18%] -z-10 size-[64vmin] rounded-full bg-cyan-500/15 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-t from-navy-950 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-center pb-20 pt-[calc(var(--header-h)+1.5rem)] sm:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Eyebrow tone="dark">{t(site.name)}</Eyebrow>
              <span className="text-sm text-white/55">{t(home.hero.kicker)}</span>
            </div>
            {lang === 'en' && (
              <p lang="hi" className="mt-5 font-hindi text-xl font-semibold text-cyan-200/90 sm:text-2xl">
                {site.heroHeading.hi}
              </p>
            )}
            <h1 id="hero-title" className="mt-4 text-display font-bold text-white">
              {t(site.heroHeading)}
            </h1>
            <p lang="en" className="mt-5 font-sans text-lead font-medium text-cyan-200">
              {site.heroSubtitle}
            </p>
            <p className="mt-6 max-w-xl text-lg text-white/75">{t(home.hero.intro)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/activities" size="lg" arrow>
                {t(ui.cta.explore)}
              </Button>
              <Button to="/contact?intent=join" size="lg" variant="outline-light">
                {t(ui.cta.join)}
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {home.hero.chips.map((chip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-400" />
                  {t(chip)}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div
              className="mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-none"
              style={{
                transform: 'translate3d(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 14px), 0)',
                transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <AtomOrbit labels={home.hero.orbitLabels[lang]} className="drop-shadow-[0_0_60px_rgba(34,211,238,0.22)]" />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#journey"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white md:flex"
      >
        {t(home.hero.scrollHint)}
        <ChevronDown aria-hidden="true" className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
