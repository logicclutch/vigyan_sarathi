import { Link } from 'react-router'
import { LogoFull } from '@/components/brand/LogoFull'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { OrbitRings } from '@/components/science/OrbitRings'
import { Starfield } from '@/components/science/Starfield'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { DevReviewBadge } from '@/components/ui/DevReviewBadge'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { IconTile } from '@/components/ui/IconTile'
import { QuoteBlock } from '@/components/ui/QuoteBlock'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutSections, audiences, learningCulture, type AboutSection } from '@/content/about'
import { activities } from '@/content/activities'
import { home } from '@/content/home'
import { pageMeta } from '@/content/pages'
import { temperSteps } from '@/content/scientificTemper'
import { site } from '@/content/site'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { vision } from '@/content/visionMission'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { Seo } from '@/lib/seo'

const AUDIENCE_TINTS: Tint[] = ['electric', 'cyan', 'amber', 'mint']
const EFFORT_WORDS = [
  { word: { hi: 'जिज्ञासा', en: 'Curiosity' }, tint: 'text-amber-300' },
  { word: { hi: 'खोज', en: 'Discovery' }, tint: 'text-cyan-300' },
  { word: { hi: 'आनंद', en: 'Joy' }, tint: 'text-orange-400' },
] as const

function Aside({ id }: { id: string }) {
  const { t } = useLanguage()
  switch (id) {
    case 'what':
      return (
        <div className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-[#fdefd0] p-8 ring-1 ring-ink-900/8 sm:p-12">
          <OrbitRings tone="light" className="absolute -z-10 w-[150%] opacity-50" />
          <LogoFull tone="light" title={t(site.name)} className="w-full max-w-md" />
        </div>
      )
    case 'activities':
      return (
        <ul className="grid gap-2 rounded-3xl bg-white p-4 ring-1 ring-ink-900/8 sm:grid-cols-2 sm:p-5">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link
                to={`/activities/${activity.slug}`}
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-cream-50"
              >
                <IconTile icon={activity.icon} tint={activity.tint} size="sm" />
                <span className="font-semibold text-ink-800 group-hover:text-electric-700">{t(activity.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )
    case 'belief':
      return (
        <div className="relative overflow-hidden rounded-3xl bg-amber-100 p-8 ring-1 ring-amber-200 sm:p-10">
          <OrbitRings tone="light" className="absolute -bottom-32 -right-32 w-[420px] opacity-60" />
          <div className="relative">
            <QuoteBlock size="lg" quote={t(learningCulture.message)} attribution={t(learningCulture.messageLabel)} />
          </div>
        </div>
      )
    case 'effort':
      return (
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
          <Starfield className="-z-10 opacity-70" seed={27} count={70} />
          <ol className="space-y-3">
            {EFFORT_WORDS.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="numeral text-sm text-white/45" lang="en">
                  0{i + 1}
                </span>
                <span className={cn('text-h2 font-bold', item.tint)}>{t(item.word)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/65">{t({ hi: 'डर नहीं, कठिनाई नहीं।', en: 'Not fear. Not difficulty.' })}</p>
        </div>
      )
    default:
      return (
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
          <Starfield className="-z-10 opacity-70" seed={23} count={70} />
          <Eyebrow tone="dark">{t(vision.label)}</Eyebrow>
          <p className="mt-4 text-h3 font-bold">{t(vision.statement)}</p>
          <Button to="/vision-mission" variant="ghost-light" arrow className="mt-6">
            {t(ui.cta.visionMission)}
          </Button>
        </div>
      )
  }
}

function AboutRow({ section, index }: { section: AboutSection; index: number }) {
  const { t } = useLanguage()
  const flipped = index % 2 === 1
  return (
    <Section tone={index % 2 === 0 ? 'cream' : 'white'} motif={index % 2 === 0 ? 'lines' : 'none'} aria-labelledby={`about-${section.id}`} lazy>
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={cn('lg:col-span-6', flipped && 'lg:order-2')}>
          <Reveal>
            <Eyebrow>{t(section.eyebrow)}</Eyebrow>
            <h2 id={`about-${section.id}`} className="mt-4 text-h2 font-bold">
              {t(section.title)}
            </h2>
            <DevReviewBadge review={section.review} className="mt-3" />
            <div className="mt-6 space-y-5 text-lg text-ink-700">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{t(paragraph)}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className={cn('lg:col-span-6', flipped && 'lg:order-1')}>
          <Aside id={section.id} />
        </Reveal>
      </div>
    </Section>
  )
}

export default function About() {
  const { t } = useLanguage()
  const meta = pageMeta.about
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/about" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="molecule" glow="amber" />

      <Section tone="cream" padded={false} className="border-b border-ink-900/10">
        <ul className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-ink-900/10">
          {audiences.map((audience, i) => (
            <li key={i} className="flex gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <IconTile icon={audience.icon} tint={AUDIENCE_TINTS[i] ?? 'electric'} />
              <div>
                <p className="font-bold">{t(audience.title)}</p>
                <p className="text-sm text-ink-600">{t(audience.body)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {aboutSections.map((section, i) => (
        <AboutRow key={section.id} section={section} index={i} />
      ))}

      <Section tone="midnight" motif="blueprint" aria-labelledby="culture-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="culture-title" tone="dark" eyebrow={t(learningCulture.eyebrow)} title={t(learningCulture.title)} lead={t(learningCulture.intro)} />
          </Reveal>
          <Reveal delay={0.05} className="mt-12">
            <p className="text-lg text-white/80">{t(learningCulture.lead)}</p>
            <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
              {learningCulture.steps.map((step, i) => {
                const match = temperSteps[i]
                return (
                  <li key={i} className="flex items-center gap-3">
                    <Link to={`/scientific-temper#${match?.key ?? ''}`} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-white/10">
                      {match && <IconTile icon={match.icon} tint={match.tint} variant="glass" size="sm" />}
                      <span className="text-lg font-semibold">{t(step)}</span>
                    </Link>
                    {i < learningCulture.steps.length - 1 && (
                      <span aria-hidden="true" className="text-xl text-cyan-300">
                        →
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="mt-14 max-w-3xl">
            <QuoteBlock tone="dark" size="xl" quote={t(learningCulture.message)} attribution={t(learningCulture.messageLabel)} />
          </Reveal>
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
          <Button to="/activities" size="lg" variant="outline-light">
            {t(ui.cta.explore)}
          </Button>
        }
      />
    </>
  )
}
