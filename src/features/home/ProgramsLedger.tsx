import { ArrowRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { activities } from '@/content/activities'
import { home } from '@/content/home'
import { site } from '@/content/site'
import { ui } from '@/content/ui'
import { LANG_META } from '@/i18n/types'
import { useLanguage } from '@/i18n/useLanguage'

export function ProgramsLedger() {
  const { lang, t } = useLanguage()
  const events = [...site.events].sort((a, b) => a.date.localeCompare(b.date))
  const dateFormat = new Intl.DateTimeFormat(LANG_META[lang].locale, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Section tone="navy" motif="glow" aria-labelledby="programs-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading id="programs-title" tone="dark" eyebrow={t(home.programs.eyebrow)} title={t(home.programs.title)} lead={t(home.programs.lead)} />
            <div className="glass mt-8 flex items-start gap-4 rounded-2xl p-5">
              <CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-300" />
              <p className="text-sm text-white/75">{t(ui.labels.datesNote)}</p>
            </div>
            <Button to="/contact?intent=school" variant="light" arrow className="mt-6">
              {t(home.programs.invite)}
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          {events.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(home.programs.upcoming)}</h3>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {events.map((event) => (
                  <li key={event.id} className="grid gap-1 py-4 sm:grid-cols-12 sm:items-center">
                    <time dateTime={event.date} className="numeral text-sm text-amber-300 sm:col-span-3">
                      {dateFormat.format(new Date(event.date))}
                    </time>
                    <span className="font-semibold sm:col-span-6">{t(event.title)}</span>
                    {event.location && <span className="text-sm text-white/60 sm:col-span-3">{t(event.location)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {activities.map((activity, i) => (
              <Reveal as="li" key={activity.slug} delay={i * 0.03} y={10}>
                <Link to={`/activities/${activity.slug}`} className="group grid items-center gap-x-5 gap-y-1 py-4 sm:grid-cols-12">
                  <span className="numeral text-sm text-white/60 sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex items-center gap-3 sm:col-span-5">
                    <IconTile icon={activity.icon} tint={activity.tint} variant="glass" size="sm" />
                    <span className="font-semibold text-white group-hover:text-cyan-200">{t(activity.title)}</span>
                  </span>
                  <span className="text-sm text-white/60 sm:col-span-5">{t(activity.forWhom)}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-4 text-white/40 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-200 sm:col-span-1 sm:block sm:justify-self-end"
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
