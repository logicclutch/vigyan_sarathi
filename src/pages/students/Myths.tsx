import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { myths } from '@/content/students/myths'
import type { Topic } from '@/content/types'
import { ui } from '@/content/ui'
import { FlipCard } from '@/features/students/FlipCard'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'

type TopicFilter = 'all' | Topic

export default function StudentsMyths() {
  const { t } = useLanguage()
  const [topic, setTopic] = useState<TopicFilter>('all')
  const topics = useMemo(() => Array.from(new Set(myths.map((m) => m.topic))), [])
  const filtered = myths.filter((m) => topic === 'all' || m.topic === topic)
  const options: ChipOption<TopicFilter>[] = [{ value: 'all', label: t(ui.filters.all), count: myths.length }, ...topics.map((key) => ({ value: key, label: t(ui.topics[key]), count: myths.filter((m) => m.topic === key).length }))]

  return (
    <StudentSectionLayout
      sectionKey="myths"
      count={filtered.length}
      intro={<p className="mt-8 max-w-xl text-white/70">{t(ui.students.flipHint)}</p>}
      toolbar={<FilterChips options={options} value={topic} onChange={setTopic} label={t(ui.filters.topic)} size="sm" />}
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} action={<Button variant="outline" size="sm" onClick={() => setTopic('all')}>{t(ui.search.clearFilters)}</Button>} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((myth) => (
            <li key={myth.id} className="scroll-mt-40">
              <FlipCard myth={myth} />
            </li>
          ))}
        </ul>
      )}
    </StudentSectionLayout>
  )
}
