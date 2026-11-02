import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { DecorNumeral } from '@/components/ui/DecorNumeral'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { home } from '@/content/home'
import { projects } from '@/content/students/projects'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'

export function FeaturedProjects() {
  const { t } = useLanguage()
  const featured = projects.filter((project) => project.featured).slice(0, 3)
  const list = featured.length === 3 ? featured : projects.slice(0, 3)
  return (
    <Section tone="white" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeading id="projects-title" align="center" eyebrow={t(home.projects.eyebrow)} title={t(home.projects.title)} lead={t(home.projects.lead)} />
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink-900/10">
          {list.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 0.08} className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0">
              <DecorNumeral value={`0${i + 1}`} className="text-6xl font-bold leading-none text-electric-500/20" />
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="electric">{t(ui.topics[project.topic])}</Badge>
                <Badge tone="neutral">{t(ui.difficulty[project.difficulty])}</Badge>
                <Badge tone="neutral">{t(ui.grades[project.grade])}</Badge>
              </div>
              <h3 className="mt-4 text-h3 font-bold">{t(project.title)}</h3>
              <p className="mt-3 text-ink-600">{t(project.summary)}</p>
              <Link to={`/students/projects#${project.id}`} className="mt-auto inline-flex pt-6 text-sm font-semibold text-electric-600 hover:underline">
                {t(ui.cta.details)} →
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
