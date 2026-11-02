import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { IconTile } from '@/components/ui/IconTile'
import { projects } from '@/content/students/projects'
import type { Difficulty, GradeBand, Topic } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { useHashOpen } from '@/lib/useHashOpen'

type TopicFilter = 'all' | Topic
type GradeFilter = 'all' | GradeBand
const GRADES: GradeBand[] = ['6-8', '9-10', '11-12']
const DIFF_TONE: Record<Difficulty, 'mint' | 'amber' | 'rose'> = { easy: 'mint', medium: 'amber', hard: 'rose' }

export default function StudentsProjects() {
  const { t } = useLanguage()
  const [topic, setTopic] = useState<TopicFilter>('all')
  const [grade, setGrade] = useState<GradeFilter>('all')
  const [openId, setOpenId] = useHashOpen((id) => projects.some((p) => p.id === id))
  const open = projects.find((p) => p.id === openId) ?? null

  const topics = useMemo(() => Array.from(new Set(projects.map((p) => p.topic))), [])
  const filtered = projects.filter((p) => (topic === 'all' || p.topic === topic) && (grade === 'all' || p.grade === grade || p.grade === 'all'))
  const topicOptions: ChipOption<TopicFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...topics.map((key) => ({ value: key, label: t(ui.topics[key]) }))]
  const gradeOptions: ChipOption<GradeFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...GRADES.map((key) => ({ value: key, label: t(ui.grades[key]) }))]

  return (
    <StudentSectionLayout
      sectionKey="projects"
      count={filtered.length}
      toolbar={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <FilterChips options={topicOptions} value={topic} onChange={setTopic} label={t(ui.filters.topic)} size="sm" />
          <FilterChips options={gradeOptions} value={grade} onChange={setGrade} label={t(ui.filters.grade)} size="sm" />
        </div>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} action={<Button variant="outline" size="sm" onClick={() => { setTopic('all'); setGrade('all') }}>{t(ui.search.clearFilters)}</Button>} />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.id} id={project.id} className="scroll-mt-40">
              <button
                type="button"
                onClick={() => setOpenId(project.id)}
                className="group flex h-full w-full flex-col rounded-3xl bg-white p-6 text-left ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon="clipboard" tint="mint" />
                  {project.featured && (
                    <Badge tone="amber" icon={<Star />}>
                      {t({ hi: 'चुनिंदा', en: 'Featured' })}
                    </Badge>
                  )}
                </div>
                <h2 className="mt-5 text-h3 font-bold">{t(project.title)}</h2>
                <p className="mt-2 text-ink-600">{t(project.summary)}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <Badge tone="neutral">{t(ui.topics[project.topic])}</Badge>
                  <Badge tone={DIFF_TONE[project.difficulty]}>{t(ui.difficulty[project.difficulty])}</Badge>
                  <Badge tone="neutral">{t(ui.grades[project.grade])}</Badge>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open !== null} onClose={() => setOpenId(null)} title={open ? t(open.title) : ''} description={open ? `${t(ui.topics[open.topic])} · ${t(ui.grades[open.grade])}` : undefined}>
        {open && (
          <div key={open.id} className="space-y-8">
            <p className="text-lg text-ink-700">{t(open.summary)}</p>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.labels.materials)}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {open.materials.map((material, i) => (
                  <li key={i} className="rounded-full bg-cream-100 px-3 py-1.5 text-sm text-ink-800 ring-1 ring-ink-900/8">
                    {t(material)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.labels.steps)}</h3>
              <ol className="mt-3 space-y-3">
                {open.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="numeral grid size-7 shrink-0 place-items-center rounded-full bg-mint-100 text-xs font-bold text-teal-700">{i + 1}</span>
                    <p className="text-ink-800">{t(step)}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.labels.extend)}</p>
              <p className="mt-2 text-white/85">{t(open.extend)}</p>
            </div>
          </div>
        )}
      </Dialog>
    </StudentSectionLayout>
  )
}
