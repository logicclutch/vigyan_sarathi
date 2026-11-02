import { useId } from 'react'
import { Search, X } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder: string
  tone?: 'light' | 'dark'
  className?: string
  id?: string
}

export function SearchInput({ value, onChange, label, placeholder, tone = 'light', className, id }: SearchInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const { t } = useLanguage()
  const dark = tone === 'dark'
  return (
    <div className={cn('relative', className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className={cn('pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2', dark ? 'text-white/50' : 'text-ink-400')}
      />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'h-13 w-full rounded-full border pl-12 pr-12 text-base outline-none transition-[border-color,box-shadow] placeholder:text-ink-400 focus:ring-4',
          dark
            ? 'border-white/15 bg-white/5 text-white placeholder:text-white/45 focus:border-cyan-300 focus:ring-cyan-300/20'
            : 'border-ink-900/12 bg-white text-ink-900 focus:border-electric-500 focus:ring-electric-500/15',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t(ui.search.clear)}
          className={cn(
            'absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full transition-colors',
            dark ? 'text-white/70 hover:bg-white/10' : 'text-ink-500 hover:bg-ink-900/5',
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
