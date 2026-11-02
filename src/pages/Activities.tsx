import { PageHero } from '@/components/layout/PageHero'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { Section } from '@/components/ui/Section'
import { activities } from '@/content/activities'
import { home } from '@/content/home'
import { pageMeta } from '@/content/pages'
import { ui } from '@/content/ui'
import { ActivityTile } from '@/features/activities/ActivityTile'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

export default function Activities() {
  const { t } = useLanguage()
  const meta = pageMeta.activities
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/activities" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="orbits" />
      <Section tone="cream" motif="dots" aria-label={t(meta.title)}>
        <div className="container-x">
          <Stagger as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, i) => (
              <StaggerItem key={activity.slug} index={i} as="li" className="min-h-64">
                <ActivityTile activity={activity} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
      <CtaBand
        eyebrow={t(home.programs.eyebrow)}
        title={t(home.programs.invite)}
        body={t(home.programs.lead)}
        primary={
          <Button to="/contact?intent=school" size="lg" variant="amber" arrow>
            {t(home.programs.invite)}
          </Button>
        }
        secondary={
          <Button to="/contact?intent=join" size="lg" variant="outline-light">
            {t(ui.cta.join)}
          </Button>
        }
      />
    </>
  )
}
