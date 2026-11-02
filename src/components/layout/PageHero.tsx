import type { ReactNode } from 'react'
import { MoleculeConstellation } from '@/components/science/MoleculeConstellation'
import { OrbitRings } from '@/components/science/OrbitRings'
import { Starfield } from '@/components/science/Starfield'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'

interface PageHeroProps {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  motif?: 'stars' | 'orbits' | 'molecule' | 'blueprint' | 'dots' | 'none'
  glow?: 'electric' | 'amber' | 'cyan' | 'violet' | 'mint'
  actions?: ReactNode
  align?: 'left' | 'center'
  compact?: boolean
  children?: ReactNode
  className?: string
}

const GLOWS = {
  electric: 'bg-electric-600/35',
  amber: 'bg-amber-400/25',
  cyan: 'bg-cyan-400/25',
  violet: 'bg-violet-500/30',
  mint: 'bg-mint-400/25',
} as const

/** Compact dark hero used by inner pages. Keeps the header legible everywhere. */
export function PageHero({
  eyebrow,
  title,
  lead,
  motif = 'stars',
  glow = 'electric',
  actions,
  align = 'left',
  compact = false,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-navy-950 text-white', className)}>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-b from-navy-900 via-navy-950 to-navy-950" />
      <div aria-hidden="true" className={cn('absolute -right-24 top-0 -z-10 size-[560px] rounded-full blur-3xl', GLOWS[glow])} />
      {motif === 'stars' && <Starfield className="-z-10 opacity-75" seed={11} />}
      {motif === 'blueprint' && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint opacity-60 mask-fade-b" />}
      {motif === 'dots' && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots-light opacity-35 mask-fade-b" />}
      {motif === 'orbits' && (
        <OrbitRings className="absolute -right-40 top-1/2 -z-10 w-[680px] -translate-y-1/2 opacity-70 max-lg:hidden" />
      )}
      {motif === 'molecule' && (
        <MoleculeConstellation className="absolute -right-6 bottom-0 -z-10 w-[540px] opacity-90 max-lg:hidden" />
      )}
      <div
        className={cn(
          'container-x relative pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)]',
          compact ? 'pb-12 sm:pb-16' : 'pb-16 sm:pb-20 lg:pb-28',
          align === 'center' && 'text-center',
        )}
      >
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
          {eyebrow && (
            <Eyebrow tone="dark" className={cn(align === 'center' && 'justify-center')}>
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="mt-4 text-h1 font-bold text-white">{title}</h1>
          {lead && <p className="mt-6 text-lead text-white/78">{lead}</p>}
          {actions && <div className={cn('mt-8 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>{actions}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
