import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { DecorNumeral } from '@/components/ui/DecorNumeral'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { home } from '@/content/home'
import { objectives } from '@/content/objectives'
import { pageMeta } from '@/content/pages'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { mission, vision } from '@/content/visionMission'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

const TINT_CYCLE: Tint[] = ['electric', 'amber', 'cyan', 'violet', 'mint', 'orange', 'rose', 'teal', 'navy', 'electric']

export default function Objectives() {
  const { t } = useLanguage()
  const meta = pageMeta.objectives
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/objectives" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="blueprint" glow="cyan" compact />

      <Section tone="cream" motif="blueprint" aria-label={t(meta.title)}>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(vision.label)}</p>
              <p className="mt-2 text-lg text-ink-700">{t(vision.statement)}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(mission.label)}</p>
              <p className="mt-2 text-ink-600">{t(mission.statement)}</p>
              <nav aria-label={t(ui.labels.sections)} className="mt-8 hidden lg:block">
                <ol className="grid grid-cols-5 gap-2">
                  {objectives.map((objective) => (
                    <li key={objective.n}>
                      <a
                        href={`#objective-${objective.n}`}
                        className="numeral grid h-10 place-items-center rounded-xl bg-white text-sm font-semibold text-ink-600 ring-1 ring-ink-900/10 transition-colors hover:bg-navy-900 hover:text-white"
                      >
                        {String(objective.n).padStart(2, '0')}
                        <span className="sr-only"> {t(objective.title)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>
          <ol className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-8">
            {objectives.map((objective, i) => (
              <Reveal as="li" key={objective.n} id={`objective-${objective.n}`} delay={0.04} y={14} className="scroll-mt-28">
                <article className="grid gap-5 py-8 sm:grid-cols-12 sm:items-center sm:gap-8 lg:py-9">
                  <DecorNumeral value={String(objective.n).padStart(2, '0')} className="text-6xl font-bold leading-none text-navy-900/10 sm:col-span-3 sm:text-7xl lg:text-8xl" />
                  <div className="flex items-start gap-4 sm:col-span-9">
                    <IconTile icon={objective.icon} tint={TINT_CYCLE[i] ?? 'electric'} className="mt-1" />
                    <h2 className="text-h3 font-bold leading-snug">
                      <span className="sr-only">{objective.n}. </span>
                      {t(objective.title)}
                    </h2>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand
        eyebrow={t(home.cta.eyebrow)}
        title={t(home.cta.title)}
        body={t(home.cta.body)}
        primary={
          <Button to="/contact?intent=join" size="lg" variant="amber" arrow>
            {t(ui.cta.join)}
          </Button>
        }
        secondary={
          <Button to="/scientific-temper" size="lg" variant="outline-light">
            {t(ui.cta.exploreTemper)}
          </Button>
        }
      />
    </>
  )
}
