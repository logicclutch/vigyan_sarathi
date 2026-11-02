import { Eyebrow } from '@/components/ui/Eyebrow'
import { Marquee } from '@/components/ui/Marquee'
import { Section } from '@/components/ui/Section'
import { home } from '@/content/home'
import { site } from '@/content/site'
import { useLanguage } from '@/i18n/useLanguage'

export function JourneyStrip() {
  const { lang, t } = useLanguage()
  return (
    <>
      <div className="border-y border-white/10 bg-navy-900 py-4 text-white">
        <Marquee items={home.marquee[lang]} />
      </div>
      <Section id="journey" tone="navy" motif="dots" padded={false} aria-labelledby="journey-title">
        <div className="container-x py-16 lg:py-24">
          <Eyebrow tone="dark">{t(home.journey.eyebrow)}</Eyebrow>
          <h2 id="journey-title" className="sr-only">
            {t(site.tagline)}
          </h2>
          <ol className="relative mt-8 grid gap-8 max-md:before:absolute max-md:before:bottom-4 max-md:before:left-6 max-md:before:top-4 max-md:before:w-px max-md:before:bg-cyan-300/30 md:grid-cols-4">
            <svg aria-hidden="true" className="absolute left-0 top-6 hidden h-px w-full md:block" focusable="false">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(103,232,249,0.45)" strokeWidth="1" strokeDasharray="6 8" className="motion-safe:animate-dash" />
            </svg>
            {home.journey.nodes.map((node, i) => (
              <li key={i} className="relative flex gap-5 md:block">
                <span className="numeral relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-navy-950 font-semibold text-cyan-200 ring-1 ring-cyan-300/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="md:mt-5">
                  <p className="text-xl font-bold sm:text-2xl">{t(node.label)}</p>
                  <p className="mt-1 text-sm text-white/60">{t(node.hint)}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl text-lead font-medium text-white/85">{t(site.tagline)}</p>
        </div>
      </Section>
    </>
  )
}
