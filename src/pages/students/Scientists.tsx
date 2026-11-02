import { useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { DecorNumeral } from '@/components/ui/DecorNumeral'
import { ExtLink } from '@/components/ui/ExtLink'
import { SearchInput } from '@/components/ui/SearchInput'
import { EmptyState } from '@/components/ui/EmptyState'
import { scientists } from '@/content/students/scientists'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { matches } from '@/lib/search'
import { TINTS } from '@/lib/tints'

const TINT_CYCLE: Tint[] = ['orange', 'electric', 'violet', 'cyan', 'amber', 'mint', 'rose', 'teal', 'navy', 'electric']

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export default function StudentsScientists() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const filtered = scientists.filter((s) => matches(query, [s.name.hi, s.name.en, s.field.hi, s.field.en, s.known.hi, s.known.en, ...s.tags]))

  return (
    <StudentSectionLayout
      sectionKey="scientists"
      count={filtered.length}
      toolbar={<SearchInput value={query} onChange={setQuery} label={t(ui.search.label)} placeholder={t(ui.search.placeholder)} className="w-full sm:w-80" />}
    >
      {filtered.length === 0 ? (
        <EmptyState title={t(ui.search.noResults)} />
      ) : (
        <ol className="space-y-6">
          {filtered.map((scientist, i) => {
            const tint = TINT_CYCLE[i % TINT_CYCLE.length] ?? 'electric'
            const flipped = i % 2 === 1
            return (
              <Reveal as="li" key={scientist.id} id={scientist.id} className="scroll-mt-40" delay={0.03}>
                <article className="grid gap-6 rounded-3xl bg-white p-6 ring-1 ring-ink-900/8 sm:p-8 lg:grid-cols-12 lg:gap-10">
                  <div className={cn('lg:col-span-4', flipped && 'lg:order-2')}>
                    <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-navy-950 p-5 text-white">
                      <div aria-hidden="true" className={cn('absolute -right-12 -top-12 size-56 rounded-full opacity-60 blur-3xl', TINTS[tint].dot)} />
                      <DecorNumeral value={initials(scientist.name.en)} className="absolute -right-4 -top-6 text-[9rem] font-bold leading-none text-white/10" />
                      <div className="relative">
                        <p className="numeral text-xs uppercase tracking-[0.2em] text-cyan-200" lang="en">
                          {scientist.years}
                        </p>
                        <p className="mt-1 text-xl font-bold">{t(scientist.name)}</p>
                        <p className="text-sm text-white/80">{t(scientist.field)}</p>
                      </div>
                    </div>
                  </div>
                  <div className={cn('lg:col-span-8', flipped && 'lg:order-1')}>
                    <Badge tone="neutral">{t(ui.labels.knownFor)}</Badge>
                    <h2 className="mt-3 text-h3 font-bold">{t(scientist.known)}</h2>
                    <details className="group mt-4">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-electric-600 hover:underline [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">{t(ui.students.readStory)} ↓</span>
                        <span className="hidden group-open:inline">{t(ui.cta.seeLess)} ↑</span>
                      </summary>
                      <p className="mt-3 text-ink-700">{t(scientist.story)}</p>
                    </details>
                    <div className="mt-5 rounded-2xl bg-amber-100/70 p-4 ring-1 ring-amber-200">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t(ui.labels.lesson)}</p>
                      <p className="mt-1 font-medium text-ink-900">{t(scientist.lesson)}</p>
                    </div>
                    {scientist.url && (
                      <ExtLink href={scientist.url} className="mt-4 text-sm font-semibold text-electric-600">
                        {t(ui.students.moreOnWikipedia)}
                      </ExtLink>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ol>
      )}
    </StudentSectionLayout>
  )
}
