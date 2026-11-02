import { useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Starfield } from '@/components/science/Starfield'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { IconTile } from '@/components/ui/IconTile'
import { SearchInput } from '@/components/ui/SearchInput'
import { Section } from '@/components/ui/Section'
import { pageMeta } from '@/content/pages'
import { facts } from '@/content/students/facts'
import { studentSectionMap, studentSections, studentsIntro } from '@/content/students/index'
import { ui } from '@/content/ui'
import { searchIndex, sectionCounts } from '@/features/students/searchIndex'
import { useStudentsSearch, type SectionFilter } from '@/features/students/useStudentsSearch'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { dailyIndex } from '@/lib/daily'
import { fmt } from '@/lib/format'
import { Seo } from '@/lib/seo'
import { trackSpotlight } from '@/lib/spotlight'
import { TINTS } from '@/lib/tints'

const SPANS: Record<string, string> = {
  facts: 'lg:col-span-7',
  experiments: 'lg:col-span-5',
  quiz: 'lg:col-span-4',
  projects: 'lg:col-span-4',
  models: 'lg:col-span-4',
  scientists: 'lg:col-span-5',
  questions: 'lg:col-span-7',
  news: 'lg:col-span-4',
  careers: 'lg:col-span-4',
  myths: 'lg:col-span-4',
}

export default function Students() {
  const { t } = useLanguage()
  const meta = pageMeta.students
  const [query, setQuery] = useState('')
  const [section, setSection] = useState<SectionFilter>('all')
  const { results, counts, total } = useStudentsSearch(query, section)
  const searching = query.trim().length > 0
  const spark = facts[dailyIndex(facts.length, 1)]

  const chipOptions: ChipOption<SectionFilter>[] = [
    { value: 'all', label: t(ui.filters.all), count: total },
    ...studentSections.filter((item) => (counts[item.key] ?? 0) > 0).map((item) => ({ value: item.key, label: t(item.short), count: counts[item.key] })),
  ]

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/students" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="dots" glow="amber">
        <div className="mt-10 max-w-2xl">
          <SearchInput tone="dark" value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholder)} id="students-search" />
          <p className="numeral mt-3 text-sm text-white/55">{fmt(t(ui.labels.items), { count: searchIndex.length })}</p>
        </div>
        <figure className="mt-10 max-w-2xl border-l-2 border-amber-300 pl-5">
          <blockquote className="text-h3 font-bold text-white">{t(studentsIntro.motto)}</blockquote>
          <figcaption className="mt-2 text-sm text-cyan-200/80">{t(studentsIntro.thinkingLabel)}</figcaption>
        </figure>
      </PageHero>

      {searching ? (
        <Section tone="cream" aria-live="polite" aria-label={fmt(t(ui.students.resultsFor), { q: query })}>
          <div className="container-x">
            <h2 className="text-h3 font-bold">{fmt(t(ui.students.resultsFor), { q: query })}</h2>
            <FilterChips className="mt-5" options={chipOptions} value={section} onChange={setSection} label={t(ui.filters.section)} />
            {results.length === 0 ? (
              <EmptyState
                className="mt-8"
                title={t(ui.search.noResults)}
                body={t(ui.students.noResults)}
                action={
                  <Button variant="outline" size="sm" onClick={() => setQuery('')}>
                    {t(ui.search.clear)}
                  </Button>
                }
              />
            ) : (
              <ul className="mt-6 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {results.map((item) => {
                  const sectionMeta = studentSectionMap[item.section]
                  return (
                    <li key={`${item.section}-${item.id}`}>
                      <Link to={item.href} className="group grid gap-2 py-4 sm:grid-cols-12 sm:items-start sm:gap-6">
                        <span className="sm:col-span-3">
                          <Badge tone="neutral" icon={<IconTile icon={sectionMeta.icon} tint={sectionMeta.tint} size="sm" className="size-5 rounded-md [&_svg]:size-3" />}>
                            {t(sectionMeta.short)}
                          </Badge>
                        </span>
                        <span className="sm:col-span-8">
                          <span className="font-semibold text-ink-900 group-hover:text-electric-600">{t(item.title)}</span>
                          <span className="mt-1 line-clamp-2 block text-sm text-ink-600">{t(item.summary)}</span>
                        </span>
                        <ArrowUpRight aria-hidden="true" className="hidden size-4 text-ink-400 group-hover:text-electric-600 sm:col-span-1 sm:block sm:justify-self-end" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </Section>
      ) : (
        <Section tone="sand" motif="dots" aria-label={t(ui.students.allSections)}>
          <div className="container-x">
            {spark && (
              <Reveal className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white sm:p-10">
                <Starfield className="opacity-70" seed={41} count={80} />
                <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-9">
                    <Badge tone="glass" icon={<Sparkles />}>
                      {t(ui.students.sparkEyebrow)}
                    </Badge>
                    <p className="mt-4 text-h3 font-bold">{t(spark.title)}</p>
                    <p className="mt-2 max-w-3xl text-white/75">{t(spark.body)}</p>
                  </div>
                  <div className="lg:col-span-3 lg:justify-self-end">
                    <Button to="/students/facts" variant="light" arrow>
                      {t(ui.cta.viewAll)}
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}

            <h2 className="mt-12 text-h3 font-bold">{t(studentsIntro.find)}</h2>
            <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {studentSections.map((item, i) => {
                const dark = item.key === 'quiz'
                const tint = TINTS[item.tint]
                return (
                  <StaggerItem key={item.key} index={i} as="li" className={cn('min-h-52', SPANS[item.key])}>
                    <Link
                      to={`/students/${item.key}`}
                      onPointerMove={trackSpotlight}
                      className={cn(
                        'spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 ring-1 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift sm:p-7',
                        dark ? 'bg-navy-950 text-white ring-white/10' : cn(tint.soft, 'ring-ink-900/8'),
                      )}
                    >
                      {dark && <Starfield className="opacity-60" seed={19} count={50} />}
                      <div className="relative flex items-start justify-between gap-4">
                        <IconTile icon={item.icon} tint={item.tint} variant={dark ? 'glass' : 'outline'} />
                        <Badge tone={dark ? 'glass' : 'neutral'} className="numeral">
                          {fmt(t(item.key === 'quiz' ? ui.labels.questions : ui.labels.items), { count: sectionCounts[item.key] })}
                        </Badge>
                      </div>
                      <h2 className="relative mt-8 text-h3 font-bold">{t(item.title)}</h2>
                      <p className={cn('relative mt-2 text-sm sm:text-base', dark ? 'text-white/70' : 'text-ink-600')}>{t(item.description)}</p>
                      <span className={cn('relative mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold', dark ? 'text-cyan-200' : 'text-electric-600')}>
                        {t(ui.cta.learnMore)}
                        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </Section>
      )}

      <CtaBand
        eyebrow={t(ui.temper.ctaTitle)}
        title={t(ui.students.quizIntro)}
        primary={
          <Button to="/students/quiz" size="lg" variant="amber" arrow>
            {t(ui.cta.startQuiz)}
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
