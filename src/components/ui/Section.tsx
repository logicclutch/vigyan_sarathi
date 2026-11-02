import type { ComponentPropsWithoutRef } from 'react'
import { Starfield } from '@/components/science/Starfield'
import { cn } from '@/lib/cn'

export type SectionTone = 'cream' | 'white' | 'paper' | 'sand' | 'navy' | 'midnight' | 'electric'
export type SectionMotif = 'none' | 'blueprint' | 'dots' | 'lines' | 'stars' | 'glow'

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  tone?: SectionTone
  motif?: SectionMotif
  padded?: boolean
  /** Defer rendering work for long pages (content-visibility: auto) */
  lazy?: boolean
}

const TONES: Record<SectionTone, string> = {
  cream: 'bg-cream-50 text-ink-900',
  white: 'bg-white text-ink-900',
  paper: 'bg-cream-100 text-ink-900',
  sand: 'bg-[#f6efe2] text-ink-900',
  navy: 'bg-navy-900 text-white',
  midnight: 'bg-navy-950 text-white',
  electric: 'bg-electric-600 text-white',
}

function isDarkTone(tone: SectionTone) {
  return tone === 'navy' || tone === 'midnight' || tone === 'electric'
}

export function Section({ tone = 'cream', motif = 'none', padded = true, lazy = false, className, children, ...rest }: SectionProps) {
  const dark = isDarkTone(tone)
  return (
    <section
      className={cn('relative isolate overflow-hidden', TONES[tone], padded && 'section-y', lazy && 'cv-auto', className)}
      {...rest}
    >
      {motif === 'blueprint' && (
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 -z-10 mask-fade-b', dark ? 'bg-blueprint opacity-70' : 'bg-blueprint-light opacity-80')}
        />
      )}
      {motif === 'dots' && (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10', dark ? 'bg-dots-light opacity-30' : 'bg-dots opacity-40')} />
      )}
      {motif === 'lines' && <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-paper-lines opacity-80" />}
      {motif === 'stars' && <Starfield className="-z-10 opacity-80" />}
      {motif === 'glow' && <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-glow-electric" />}
      {children}
    </section>
  )
}
