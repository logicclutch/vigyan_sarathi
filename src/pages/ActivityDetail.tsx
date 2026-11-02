import { Check } from 'lucide-react'
import { useParams } from 'react-router'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { DevReviewBadge } from '@/components/ui/DevReviewBadge'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { activities, activityMap } from '@/content/activities'
import { home } from '@/content/home'
import { pageMeta } from '@/content/pages'
import { ui } from '@/content/ui'
import { ActivityTile } from '@/features/activities/ActivityTile'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'
import { TINTS } from '@/lib/tints'
import NotFound from './NotFound'

const GLOW = { electric: 'electric', cyan: 'cyan', amber: 'amber', orange: 'amber', mint: 'mint', rose: 'violet', violet: 'violet', navy: 'electric', teal: 'cyan' } as const

export default function ActivityDetail() {
  const { slug = '' } = useParams()
  const { t } = useLanguage()
  const activity = activityMap[slug]
  if (!activity) return <NotFound />

  const index = activities.findIndex((item) => item.slug === activity.slug)
  const related = [1, 2, 3].map((offset) => activities[(index + offset) % activities.length]!)
  const tint = TINTS[activity.tint]

  return (
    <>
      <Seo title={activity.title} description={activity.short} path={`/activities/${activity.slug}`} type="article" />
      <PageHero
        eyebrow={t(pageMeta.activities.title)}
        title={t(activity.title)}
        lead={t(activity.short)}
        motif="orbits"
        glow={GLOW[activity.tint]}
        actions={
          <>
            <Button to="/contact?intent=school" variant="light" arrow>
              {t(home.programs.invite)}
            </Button>
            <Button to="/activities" variant="outline-light">
              {t(ui.cta.allActivities)}
            </Button>
          </>
        }
      />

      <Section tone="cream" motif="lines" aria-label={t(activity.title)}>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {activity.motto && <p className="mb-6 text-h2 font-bold text-electric-700">“{t(activity.motto)}”</p>}
              <DevReviewBadge review={activity.review} className="mb-4" />
              <p className="text-lead text-ink-800">{t(activity.intro)}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <h2 className="text-h3 font-bold">{t(ui.labels.whatHappens)}</h2>
              <ol className="mt-6 space-y-4">
                {activity.whatHappens.map((item, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/8">
                    <span className={`numeral grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold ${tint.solid}`}>{i + 1}</span>
                    <p className="pt-1 text-ink-700">{t(item)}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <aside className="lg:col-span-5">
            <Reveal delay={0.15} className="rounded-3xl bg-navy-950 p-8 text-white lg:sticky lg:top-28">
              <IconTile icon={activity.icon} tint={activity.tint} variant="glass" size="xl" />
              <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.labels.forWhom)}</h2>
              <p className="mt-2 text-lg">{t(activity.forWhom)}</p>
              <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.labels.outcomes)}</h2>
              <ul className="mt-3 space-y-3">
                {activity.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-amber-300" />
                    <span className="text-white/85">{t(outcome)}</span>
                  </li>
                ))}
              </ul>
              <Button to="/contact?intent=school" variant="light" arrow className="mt-8 w-full">
                {t(home.programs.invite)}
              </Button>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="related-title">
        <div className="container-x">
          <h2 id="related-title" className="text-h2 font-bold">
            {t(ui.labels.related)}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="min-h-56">
                <ActivityTile activity={item} />
              </li>
            ))}
          </ul>
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
      />
    </>
  )
}
