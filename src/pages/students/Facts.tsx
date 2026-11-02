import { useMemo, useRef, useState } from 'react'
import { Shuffle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { SearchInput } from '@/components/ui/SearchInput'
import { facts } from '@/content/students/facts'
import type { Topic } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { matches } from '@/lib/search'
import { useHashId } from '@/lib/useHashId'

type TopicFilter = 'all' | Topic
const NOTE_TONES = ['bg-white', 'bg-amber-100/70', 'bg-cyan-100/60', 'bg-white', 'bg-violet-100/60', 'bg-mint-100/60']

export default function StudentsFacts() {
  const { t } = useLanguage()
  const hashId = useHashId()
  const [topic, setTopic] = useState<TopicFilter>('all')
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState<string>(hashId)
  const listRef = useRef<HTMLUListElement>(null)

  const topics = useMemo(() => Array.from(new Set(facts.map((fact) => fact.topic))), [])
  const filtered = facts.filter((fact) => (topic === 'all' || fact.topic === topic) && matches(query, [fact.title.hi, fact.title.en, fact.body.hi, fact.body.en, ...fact.tags]))
  const options: ChipOption<TopicFilter>[] = [{ value: 'all', label: t(ui.filters.all), count: facts.length }, ...topics.map((key) => ({ value: key, label: t(ui.topics[key]), count: facts.filter((f) => f.topic === key).length }))]

  const surprise = () => {
    const pool = filtered.length ? filtered : facts
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (!pick) return
    setHighlight(pick.id)
    const el = listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(pick.id)}`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  return (
    <StudentSectionLayout
      sectionKey="facts"
      count={filtered.length}
      toolbar={
        <>
          <SearchInput value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholder)} className="w-full sm:w-72" />
          <FilterChips options={options} value={topic} onChange={setTopic} label={t(ui.filters.topic)} size="sm" className="flex-1" />
          <Button variant="outline" size="sm" icon={<Shuffle />} iconPosition="left" onClick={surprise}>
            {t(ui.cta.surpriseMe)}
          </Button>
        </>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} action={<Button variant="outline" size="sm" onClick={() => { setQuery(''); setTopic('all') }}>{t(ui.search.clearFilters)}</Button>} />
      ) : (
        <ul ref={listRef} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {filtered.map((fact, i) => (
            <li key={fact.id} id={fact.id} className="scroll-mt-40">
              <article
                className={cn(
                  'rounded-3xl p-6 ring-1 transition-[box-shadow,transform] duration-500',
                  NOTE_TONES[i % NOTE_TONES.length],
                  highlight === fact.id ? 'ring-2 ring-amber-400 shadow-lift' : 'ring-ink-900/8',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="neutral">{t(ui.topics[fact.topic])}</Badge>
                  <span className="numeral text-xs text-ink-500" lang="en">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{t(fact.title)}</h2>
                <p className="mt-2 text-ink-700">{t(fact.body)}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </StudentSectionLayout>
  )
}
