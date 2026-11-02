import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { OrbitRings } from '@/components/science/OrbitRings'
import { Starfield } from '@/components/science/Starfield'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { IconTile } from '@/components/ui/IconTile'
import { QuoteBlock } from '@/components/ui/QuoteBlock'
import { Section } from '@/components/ui/Section'
import { pageMeta } from '@/content/pages'
import { site } from '@/content/site'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { mission, vision } from '@/content/visionMission'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

const VISION_TINTS: Tint[] = ['amber', 'violet', 'cyan', 'mint', 'rose', 'teal', 'orange']
const MISSION_TINTS: Tint[] = ['amber', 'cyan', 'electric', 'violet', 'orange', 'mint']

export default function VisionMission() {
  const { t } = useLanguage()
  const meta = pageMeta.visionMission
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/vision-mission" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="orbits" compact />

      <Section tone="midnight" aria-labelledby="vision-title" className="border-t border-white/10">
        <Starfield className="-z-10 opacity-80" seed={31} count={130} />
        <div aria-hidden="true" className="absolute -left-32 top-1/3 -z-10 size-[520px] rounded-full bg-electric-600/25 blur-3xl" />
        <div className="container-x">
          <Reveal className="max-w-4xl">
            <Eyebrow tone="dark">{t(vision.label)}</Eyebrow>
            <h2 id="vision-title" className="mt-6 text-h1 font-bold text-white">
              {t(vision.statement)}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mt-14">
            <p className="max-w-2xl text-lead text-white/80">{t(vision.intro)}</p>
            <Stagger as="ul" className="mt-6 flex flex-wrap gap-3">
              {vision.points.map((point, i) => (
                <StaggerItem key={i} index={i} as="li" className="glass flex items-center gap-3 rounded-2xl py-3 pl-3 pr-5">
                  <IconTile icon={point.icon} tint={VISION_TINTS[i] ?? 'amber'} variant="glass" size="sm" />
                  <span className="text-lg font-semibold">{t(point.text)}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" motif="lines" aria-labelledby="mission-title">
        <OrbitRings tone="light" className="absolute -right-56 -top-40 -z-10 w-[820px] opacity-70" />
        <div className="container-x">
          <Reveal className="max-w-4xl">
            <Eyebrow>{t(mission.label)}</Eyebrow>
            <h2 id="mission-title" className="mt-6 text-h1 font-bold text-ink-900">
              {t(mission.statement)}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mt-14">
            <p className="max-w-2xl text-lead text-ink-600">{t(mission.intro)}</p>
            <Stagger as="ol" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mission.points.map((point, i) => (
                <StaggerItem key={i} index={i} as="li" className="flex items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-ink-900/8">
                  <IconTile icon={point.icon} tint={MISSION_TINTS[i] ?? 'electric'} />
                  <div>
                    <span className="numeral text-xs font-semibold text-ink-500" lang="en">
                      0{i + 1}
                    </span>
                    <p className="mt-1 text-lg font-semibold text-ink-900">{t(point.text)}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" aria-label={t(site.message)}>
        <div className="container-x grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <QuoteBlock size="xl" quote={t(site.tagline)} attribution={t(site.message)} />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Button to="/objectives" variant="secondary" arrow>
              {t(ui.cta.allObjectives)}
            </Button>
            <Button to="/scientific-temper" variant="outline">
              {t(ui.cta.exploreTemper)}
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
