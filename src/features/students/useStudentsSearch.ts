import { useMemo } from 'react'
import type { StudentSectionKey } from '@/content/types'
import { matches } from '@/lib/search'
import { searchIndex, type SearchItem } from './searchIndex'

export type SectionFilter = 'all' | StudentSectionKey

export function useStudentsSearch(query: string, section: SectionFilter) {
  return useMemo(() => {
    const matched = searchIndex.filter((item) => matches(query, [item.title.hi, item.title.en, item.summary.hi, item.summary.en, ...item.tags]))
    const counts = matched.reduce<Partial<Record<StudentSectionKey, number>>>((acc, item) => {
      acc[item.section] = (acc[item.section] ?? 0) + 1
      return acc
    }, {})
    const results: SearchItem[] = section === 'all' ? matched : matched.filter((item) => item.section === section)
    return { results, counts, total: matched.length }
  }, [query, section])
}
