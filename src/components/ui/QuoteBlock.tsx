import type { ReactNode } from 'react'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/cn'

interface QuoteBlockProps {
  quote: ReactNode
  attribution?: ReactNode
  tone?: 'light' | 'dark'
  size?: 'md' | 'lg' | 'xl'
  align?: 'left' | 'center'
  className?: string
}

const SIZES = { md: 'text-h3', lg: 'text-h2', xl: 'text-h1' } as const

export function QuoteBlock({ quote, attribution, tone = 'light', size = 'lg', align = 'left', className }: QuoteBlockProps) {
  const dark = tone === 'dark'
  return (
    <figure className={cn('relative', align === 'center' && 'mx-auto text-center', className)}>
      <Quote
        aria-hidden="true"
        className={cn(
          'absolute -top-6 size-12 rotate-180',
          align === 'center' ? 'left-1/2 -translate-x-1/2' : '-left-2',
          dark ? 'text-cyan-300/25' : 'text-electric-500/15',
        )}
      />
      <blockquote className={cn('relative font-semibold', SIZES[size], dark ? 'text-white' : 'text-ink-900')}>{quote}</blockquote>
      {attribution && (
        <figcaption className={cn('mt-5 text-sm font-medium', dark ? 'text-cyan-200/80' : 'text-electric-600')}>{attribution}</figcaption>
      )}
    </figure>
  )
}
