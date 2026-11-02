import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { home } from '@/content/home'
import { teacherCategories } from '@/content/teachers/index'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'

export function TeachersLedger() {
  const { t } = useLanguage()
  return (
    <Section tone="paper" motif="lines" aria-labelledby="teachers-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionHeading id="teachers-title" eyebrow={t(home.teachers.eyebrow)} title={t(home.teachers.title)} lead={t(home.teachers.lead)} />
            <Button to="/teachers" variant="secondary" arrow className="mt-8">
              {t(ui.cta.forTeachers)}
            </Button>
          </Reveal>
        </div>
        <ol className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-8">
          {teacherCategories.map((category, i) => (
            <Reveal as="li" key={category.key} delay={i * 0.03} y={10}>
              <Link to={`/teachers?category=${category.key}`} className="group grid items-center gap-x-5 gap-y-2 py-4 sm:grid-cols-12">
                <span className="numeral text-sm text-ink-500 sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex items-center gap-3 sm:col-span-5">
                  <IconTile icon={category.icon} tint={category.tint} size="sm" />
                  <span className="font-semibold text-ink-900 group-hover:text-electric-600">{t(ui.resourceCategories[category.key])}</span>
                </span>
                <span className="text-sm text-ink-600 sm:col-span-5">{t(category.blurb)}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden size-4 text-ink-400 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-600 sm:col-span-1 sm:block sm:justify-self-end"
                />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
