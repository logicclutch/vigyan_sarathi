import { useMemo, useState } from 'react'
import { Timer, TriangleAlert } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { IconTile } from '@/components/ui/IconTile'
import { experiments } from '@/content/students/experiments'
import type { Difficulty, Topic } from '@/content/types'
import { ui } from '@/content/ui'
import { StepChecklist } from '@/features/students/StepChecklist'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'
import { useHashOpen } from '@/lib/useHashOpen'

type TopicFilter = 'all' | Topic
type DifficultyFilter = 'all' | Difficulty
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

export default function StudentsExperiments() {
  const { t } = useLanguage()
  const [topic, setTopic] = useState<TopicFilter>('all')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [openId, setOpenId] = useHashOpen((id) => experiments.some((e) => e.id === id))
  const open = experiments.find((e) => e.id === openId) ?? null

  const topics = useMemo(() => Array.from(new Set(experiments.map((e) => e.topic))), [])
  const filtered = experiments.filter((e) => (topic === 'all' || e.topic === topic) && (difficulty === 'all' || e.difficulty === difficulty))
  const topicOptions: ChipOption<TopicFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...topics.map((key) => ({ value: key, label: t(ui.topics[key]) }))]
  const difficultyOptions: ChipOption<DifficultyFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...DIFFICULTIES.map((key) => ({ value: key, label: t(ui.difficulty[key]) }))]

  return (
    <StudentSectionLayout
      sectionKey="experiments"
      count={filtered.length}
      toolbar={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <FilterChips options={topicOptions} value={topic} onChange={setTopic} label={t(ui.filters.topic)} size="sm" />
          <FilterChips options={difficultyOptions} value={difficulty} onChange={setDifficulty} label={t(ui.filters.difficulty)} size="sm" />
        </div>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} action={<Button variant="outline" size="sm" onClick={() => { setTopic('all'); setDifficulty('all') }}>{t(ui.search.clearFilters)}</Button>} />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((experiment, i) => (
            <li key={experiment.id} id={experiment.id} className="scroll-mt-40">
              <button
                type="button"
                onClick={() => setOpenId(experiment.id)}
                className="group flex h-full w-full flex-col rounded-3xl bg-white p-6 text-left ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconTile icon="flask" tint={i % 2 === 0 ? 'cyan' : 'electric'} variant="soft" />
                  <div className="flex flex-wrap justify-end gap-2">
                    <Badge tone="neutral">{t(ui.topics[experiment.topic])}</Badge>
                    <Badge tone={experiment.difficulty === 'easy' ? 'mint' : experiment.difficulty === 'medium' ? 'amber' : 'rose'}>{t(ui.difficulty[experiment.difficulty])}</Badge>
                  </div>
                </div>
                <h2 className="mt-5 text-h3 font-bold">{t(experiment.title)}</h2>
                <p className="mt-2 text-ink-600">{t(experiment.summary)}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-ink-500">
                    <Timer aria-hidden="true" className="size-4" />
                    {fmt(t(ui.labels.minutes), { n: experiment.minutes })}
                  </span>
                  <span className="font-semibold text-electric-600">{t(ui.students.openExperiment)} →</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={open !== null}
        onClose={() => setOpenId(null)}
        title={open ? t(open.title) : ''}
        description={open ? `${t(ui.topics[open.topic])} · ${t(ui.difficulty[open.difficulty])} · ${fmt(t(ui.labels.minutes), { n: open.minutes })}` : undefined}
        size="lg"
      >
        {open && (
          <div key={open.id} className="space-y-8">
            <p className="text-lg text-ink-700">{t(open.summary)}</p>
            <div className="rounded-2xl bg-amber-100/80 p-5 ring-1 ring-amber-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t(ui.labels.predict)}</p>
              <p className="mt-2 font-semibold text-ink-900">{t(open.predict)}</p>
            </div>
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
              <div className="mt-3">
                <StepChecklist steps={open.steps} />
              </div>
            </div>
            {open.safety && (
              <div className="flex gap-3 rounded-2xl bg-rose-100 p-5">
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-rose-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{t(ui.labels.safety)}</p>
                  <p className="mt-1 text-ink-800">{t(open.safety)}</p>
                </div>
              </div>
            )}
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.labels.science)}</p>
              <p className="mt-2 text-white/85">{t(open.science)}</p>
            </div>
          </div>
        )}
      </Dialog>
    </StudentSectionLayout>
  )
}
