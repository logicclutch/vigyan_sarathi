import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface AccordionEntry {
  id: string
  title: ReactNode
  body: ReactNode
  meta?: ReactNode
}

interface AccordionProps {
  items: AccordionEntry[]
  /** Same name on all entries makes them exclusive (native behaviour). */
  name?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function Accordion({ items, name, tone = 'light', className }: AccordionProps) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'divide-y overflow-hidden rounded-3xl border',
        dark ? 'divide-white/10 border-white/10 bg-white/5' : 'divide-ink-900/10 border-ink-900/10 bg-white',
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.id} name={name} className="group">
          <summary
            className={cn(
              'flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold transition-colors sm:px-7 [&::-webkit-details-marker]:hidden',
              dark ? 'hover:bg-white/5' : 'hover:bg-cream-50',
            )}
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span>{item.title}</span>
              {item.meta && <span className={cn('text-xs font-medium', dark ? 'text-white/55' : 'text-ink-500')}>{item.meta}</span>}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn('size-5 shrink-0 transition-transform duration-300 group-open:rotate-180', dark ? 'text-white/50' : 'text-ink-400')}
            />
          </summary>
          <div className={cn('px-5 pb-6 sm:px-7', dark ? 'text-white/80' : 'text-ink-600')}>{item.body}</div>
        </details>
      ))}
    </div>
  )
}
