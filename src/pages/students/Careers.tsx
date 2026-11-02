import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { IconTile } from '@/components/ui/IconTile'
import { SearchInput } from '@/components/ui/SearchInput'
import { careers } from '@/content/students/careers'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { matches } from '@/lib/search'

const TINT_CYCLE: Tint[] = ['rose', 'electric', 'mint', 'amber', 'cyan', 'violet', 'orange', 'teal', 'navy', 'electric']

export default function StudentsCareers() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const filtered = careers.filter((c) => matches(query, [c.title.hi, c.title.en, c.summary.hi, c.summary.en, c.subjects.hi, c.subjects.en, ...c.tags]))

  return (
    <StudentSectionLayout
      sectionKey="careers"
      count={filtered.length}
      toolbar={<SearchInput value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholder)} className="w-full sm:w-80" />}
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} />
      ) : (
        <ol className="divide-y divide-ink-900/10 overflow-hidden rounded-3xl border border-ink-900/10 bg-white">
          {filtered.map((career, i) => (
            <li key={career.id} id={career.id} className="scroll-mt-40">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 transition-colors hover:bg-cream-50 sm:px-7 [&::-webkit-details-marker]:hidden">
                  <IconTile icon={career.icon} tint={TINT_CYCLE[i % TINT_CYCLE.length] ?? 'electric'} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold">{t(career.title)}</span>
                    <span className="mt-0.5 block text-sm text-ink-600">{t(career.summary)}</span>
                  </span>
                  <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-ink-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="grid gap-6 px-5 pb-7 sm:grid-cols-2 sm:px-7 sm:pl-[5.5rem]">
                  <div className="rounded-2xl bg-cream-50 p-5 ring-1 ring-ink-900/8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.labels.path)}</p>
                    <p className="mt-2 text-ink-800">{t(career.path)}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-100/70 p-5 ring-1 ring-amber-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t(ui.labels.subjects)}</p>
                    <p className="mt-2 text-ink-800">{t(career.subjects)}</p>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>
      )}
    </StudentSectionLayout>
  )
}
