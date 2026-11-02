import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface ChipOption<V extends string> {
  value: V
  label: ReactNode
  count?: number
}

interface FilterChipsProps<V extends string> {
  options: ChipOption<V>[]
  value: V
  onChange: (value: V) => void
  label: string
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export function FilterChips<V extends string>({
  options,
  value,
  onChange,
  label,
  tone = 'light',
  size = 'md',
  className,
}: FilterChipsProps<V>) {
  const dark = tone === 'dark'
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'min-w-0 max-w-[calc(100%+2rem)] -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:max-w-full sm:flex-wrap sm:overflow-visible sm:px-0',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full border font-medium transition-colors duration-200',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              active
                ? dark
                  ? 'border-cyan-300 bg-cyan-300 text-navy-950'
                  : 'border-navy-900 bg-navy-900 text-white'
                : dark
                  ? 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
                  : 'border-ink-900/12 bg-white text-ink-700 hover:border-ink-900/35 hover:text-ink-900',
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={cn('numeral text-xs', active ? 'opacity-90' : dark ? 'text-white/60' : 'text-ink-500')}>{option.count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
