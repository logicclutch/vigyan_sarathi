import { useState } from 'react'
import { ArrowUpRight, ShieldCheck, Timer } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { IconTile } from '@/components/ui/IconTile'
import { SearchInput } from '@/components/ui/SearchInput'
import { Section } from '@/components/ui/Section'
import { pageMeta } from '@/content/pages'
import { teacherCategories, teachersIntro } from '@/content/teachers/index'
import { resources } from '@/content/teachers/resources'
import type { GradeBand, Resource, ResourceCategory, ResourceStatus, ResourceType } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'
import { matches } from '@/lib/search'
import { Seo } from '@/lib/seo'
import { useHashOpen } from '@/lib/useHashOpen'

type CategoryFilter = 'all' | ResourceCategory
type TypeFilter = 'all' | ResourceType
type GradeFilter = 'all' | GradeBand
type StatusFilter = 'all' | ResourceStatus

const CATEGORY_KEYS = new Set<string>(teacherCategories.map((item) => item.key))
const TYPES: ResourceType[] = ['guide', 'activity', 'demo', 'quiz', 'slides', 'training', 'link']
const GRADES: GradeBand[] = ['6-8', '9-10', '11-12', 'all']
const categoryMeta = Object.fromEntries(teacherCategories.map((item) => [item.key, item])) as Record<ResourceCategory, (typeof teacherCategories)[number]>

export default function Teachers() {
  const { t } = useLanguage()
  const meta = pageMeta.teachers
  const [params, setParams] = useSearchParams()
  const rawCategory = params.get('category')
  const category: CategoryFilter = rawCategory && CATEGORY_KEYS.has(rawCategory) ? (rawCategory as ResourceCategory) : 'all'
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TypeFilter>('all')
  const [grade, setGrade] = useState<GradeFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [openId, setOpenId] = useHashOpen((id) => resources.some((r) => r.id === id && r.kind === 'written' && r.status === 'available'))
  const open = resources.find((r) => r.id === openId) ?? null

  const setCategory = (value: CategoryFilter) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('category')
    else next.set('category', value)
    setParams(next, { replace: true })
  }

  const filtered = resources.filter(
    (r) =>
      (category === 'all' || r.category === category) &&
      (type === 'all' || r.type === type) &&
      (grade === 'all' || r.grade === grade || r.grade === 'all') &&
      (status === 'all' || r.status === status) &&
      matches(query, [r.title.hi, r.title.en, r.summary.hi, r.summary.en, ...r.tags]),
  )
  const available = resources.filter((r) => r.status === 'available').length
  const soon = resources.length - available

  const categoryOptions: ChipOption<CategoryFilter>[] = [
    { value: 'all', label: t(ui.teachers.categoryAll), count: resources.length },
    ...teacherCategories.map((item) => ({ value: item.key, label: t(ui.resourceCategories[item.key]), count: resources.filter((r) => r.category === item.key).length })),
  ]
  const typeOptions: ChipOption<TypeFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...TYPES.map((key) => ({ value: key, label: t(ui.resourceTypes[key]) }))]
  const gradeOptions: ChipOption<GradeFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...GRADES.filter((key) => key !== 'all').map((key) => ({ value: key, label: t(ui.grades[key]) }))]
  const statusOptions: ChipOption<StatusFilter>[] = [
    { value: 'all', label: t(ui.filters.all) },
    { value: 'available', label: t(ui.filters.availableNow), count: available },
    { value: 'coming-soon', label: t(ui.filters.comingSoon), count: soon },
  ]
  const clear = () => {
    setQuery('')
    setType('all')
    setGrade('all')
    setStatus('all')
    setCategory('all')
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/teachers" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="blueprint" glow="electric" compact>
        <p className="numeral mt-8 text-sm text-cyan-200/80">{fmt(t(ui.teachers.summary), { total: resources.length, available, soon })}</p>
      </PageHero>

      <div className="sticky top-(--header-h) z-30 border-b border-ink-900/10 bg-cream-50/90 backdrop-blur">
        <div className="container-x flex flex-wrap items-center gap-3 py-3">
          <SearchInput value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholderTeachers)} className="w-full sm:w-80" id="teachers-search" />
          <FilterChips options={statusOptions} value={status} onChange={setStatus} label={t(ui.filters.status)} size="sm" />
          <span className="numeral ml-auto text-sm text-ink-500">{fmt(t(ui.labels.items), { count: filtered.length })}</span>
        </div>
      </div>

      <Section tone="paper" motif="lines" aria-label={t(meta.title)}>
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-36">
              <p className="text-lg font-semibold text-ink-900">{t(teachersIntro.provides)}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.filters.category)}</p>
                <FilterChips className="mt-3 lg:flex-col lg:items-stretch" options={categoryOptions} value={category} onChange={setCategory} label={t(ui.filters.category)} size="sm" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.filters.type)}</p>
                <FilterChips className="mt-3" options={typeOptions} value={type} onChange={setType} label={t(ui.filters.type)} size="sm" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.filters.grade)}</p>
                <FilterChips className="mt-3" options={gradeOptions} value={grade} onChange={setGrade} label={t(ui.filters.grade)} size="sm" />
              </div>
              <div className="rounded-2xl bg-white p-5 text-sm text-ink-600 ring-1 ring-ink-900/8">
                <p className="font-semibold text-ink-900">{t(ui.teachers.howToUse)}</p>
                <p className="mt-2">{t(ui.teachers.howToUseBody)}</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-9">
            {filtered.length === 0 ? (
              <EmptyState icon="library" title={t(ui.teachers.noResults)} action={<Button variant="outline" size="sm" onClick={clear}>{t(ui.search.clearFilters)}</Button>} />
            ) : (
              <ol className="divide-y divide-ink-900/10 rounded-3xl border border-ink-900/10 bg-white px-5 sm:px-7">
                {filtered.map((resource, i) => (
                  <ResourceRow key={resource.id} resource={resource} index={i} onOpen={() => setOpenId(resource.id)} />
                ))}
              </ol>
            )}
          </div>
        </div>
      </Section>

      <Dialog
        open={open !== null}
        onClose={() => setOpenId(null)}
        title={open ? t(open.title) : ''}
        description={open ? `${t(ui.resourceCategories[open.category])} · ${t(ui.resourceTypes[open.type])} · ${t(ui.grades[open.grade])}` : undefined}
        size="lg"
      >
        {open && (
          <div key={open.id} className="space-y-8">
            <p className="text-lg text-ink-700">{t(open.summary)}</p>
            {open.minutes && (
              <p className="inline-flex items-center gap-2 text-sm text-ink-500">
                <Timer aria-hidden="true" className="size-4" />
                {fmt(t(ui.labels.minutes), { n: open.minutes })}
              </p>
            )}
            {open.sections?.map((section, i) => (
              <section key={i}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">{t(section.heading)}</h3>
                {section.text && <p className="mt-3 text-ink-800">{t(section.text)}</p>}
                {section.items && (
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-ink-800">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric-500" />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="flex flex-wrap gap-2">
              {open.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Dialog>

      <CtaBand
        eyebrow={t(ui.resourceCategories.training)}
        title={t(ui.teachers.ctaTitle)}
        body={t(ui.teachers.ctaBody)}
        primary={
          <Button to="/contact?intent=teacher" size="lg" variant="amber" arrow>
            {t(ui.cta.join)}
          </Button>
        }
        secondary={
          <Button to="/activities/teacher-development" size="lg" variant="outline-light">
            {t(ui.cta.learnMore)}
          </Button>
        }
      />
    </>
  )
}

function ResourceRow({ resource, index, onOpen }: { resource: Resource; index: number; onOpen: () => void }) {
  const { t } = useLanguage()
  const meta = categoryMeta[resource.category]
  const soon = resource.status === 'coming-soon'
  return (
    <Reveal as="li" id={resource.id} delay={Math.min(index, 8) * 0.03} y={10} className="scroll-mt-40">
      <article className={cn('grid gap-4 py-5 md:grid-cols-12 md:items-center md:gap-6', soon && 'opacity-95')}>
        <div className="flex items-start gap-4 md:col-span-7">
          <IconTile icon={meta.icon} tint={meta.tint} variant={soon ? 'outline' : 'soft'} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold">{t(resource.title)}</h2>
              {soon && <Badge tone="amber">{t(ui.resourceStatus['coming-soon'])}</Badge>}
              {resource.kind === 'link' && (
                <Badge tone="electric" icon={<ShieldCheck />}>
                  {t(ui.labels.verified)}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-ink-600">{t(resource.summary)}</p>
            {soon && <p className="mt-1 text-xs text-amber-800">{t(ui.labels.uploadPending)}</p>}
            {resource.source && (
              <p className="mt-1 text-xs text-ink-500" lang="en">
                {t(ui.labels.source)}: {resource.source}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-3">
          <Badge tone="neutral">{t(ui.resourceTypes[resource.type])}</Badge>
          <Badge tone="neutral">{t(ui.grades[resource.grade])}</Badge>
          {resource.minutes && (
            <Badge tone="neutral" icon={<Timer />}>
              {fmt(t(ui.labels.minutes), { n: resource.minutes })}
            </Badge>
          )}
        </div>
        <div className="md:col-span-2 md:justify-self-end">
          {soon ? (
            <Button to={`/contact?intent=teacher&resource=${resource.id}`} variant="outline" size="sm">
              {t(ui.cta.requestResource)}
            </Button>
          ) : resource.kind === 'link' && resource.url ? (
            <Button href={resource.url} variant="outline" size="sm" icon={<ArrowUpRight />}>
              {t(ui.cta.openResource)}
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={onOpen}>
              {t(ui.cta.read)}
            </Button>
          )}
        </div>
      </article>
    </Reveal>
  )
}
