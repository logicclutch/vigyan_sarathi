import { useMemo, useState } from 'react'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { SearchInput } from '@/components/ui/SearchInput'
import { questions } from '@/content/students/questions'
import type { Topic } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { matches } from '@/lib/search'

type TopicFilter = 'all' | Topic

export default function StudentsQuestions() {
  const { t } = useLanguage()
  const [topic, setTopic] = useState<TopicFilter>('all')
  const [query, setQuery] = useState('')
  const topics = useMemo(() => Array.from(new Set(questions.map((q) => q.topic))), [])
  const filtered = questions.filter((q) => (topic === 'all' || q.topic === topic) && matches(query, [q.question.hi, q.question.en, q.answer.hi, q.answer.en, ...q.tags]))
  const options: ChipOption<TopicFilter>[] = [{ value: 'all', label: t(ui.filters.all) }, ...topics.map((key) => ({ value: key, label: t(ui.topics[key]) }))]

  return (
    <StudentSectionLayout
      sectionKey="questions"
      count={filtered.length}
      toolbar={
        <>
          <SearchInput value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholder)} className="w-full sm:w-72" />
          <FilterChips options={options} value={topic} onChange={setTopic} label={t(ui.filters.topic)} size="sm" className="flex-1" />
        </>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} action={<Button variant="outline" size="sm" onClick={() => { setQuery(''); setTopic('all') }}>{t(ui.search.clearFilters)}</Button>} />
      ) : (
        <div className="mx-auto max-w-4xl">
          <Accordion
            name="student-questions"
            items={filtered.map((q) => ({
              id: q.id,
              title: <span id={q.id} className="scroll-mt-40">{t(q.question)}</span>,
              meta: <Badge tone="neutral">{t(ui.topics[q.topic])}</Badge>,
              body: <p className="text-ink-700">{t(q.answer)}</p>,
            }))}
          />
        </div>
      )}
    </StudentSectionLayout>
  )
}
