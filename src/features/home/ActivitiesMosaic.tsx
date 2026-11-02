import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { activityMap } from '@/content/activities'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { ActivityTile } from '@/features/activities/ActivityTile'
import { useLanguage } from '@/i18n/useLanguage'

const FEATURED = [
  { slug: 'science-workshops', span: 'sm:col-span-2 lg:col-span-7 lg:row-span-2', featured: true },
  { slug: 'hands-on-experiments', span: 'lg:col-span-5' },
  { slug: 'science-exhibitions', span: 'lg:col-span-5' },
  { slug: 'science-quiz', span: 'lg:col-span-4' },
  { slug: 'space-astronomy', span: 'lg:col-span-4' },
  { slug: 'teacher-development', span: 'lg:col-span-4' },
] as const

export function ActivitiesMosaic() {
  const { t } = useLanguage()
  return (
    <Section tone="white" aria-labelledby="activities-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="activities-title" eyebrow={t(home.activities.eyebrow)} title={t(home.activities.title)} lead={t(home.activities.lead)} />
          <Button to="/activities" variant="outline" arrow className="shrink-0">
            {t(ui.cta.allActivities)}
          </Button>
        </div>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(190px,auto)]">
          {FEATURED.map((item, i) => {
            const activity = activityMap[item.slug]
            if (!activity) return null
            return (
              <StaggerItem key={item.slug} index={i} className={item.span}>
                <ActivityTile activity={activity} featured={'featured' in item && item.featured} />
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
