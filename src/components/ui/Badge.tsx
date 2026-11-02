import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'neutral' | 'electric' | 'cyan' | 'amber' | 'mint' | 'rose' | 'violet' | 'dark' | 'glass'

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-ink-900/6 text-ink-700 ring-1 ring-ink-900/10',
  electric: 'bg-electric-100 text-electric-700',
  cyan: 'bg-cyan-100 text-navy-800',
  amber: 'bg-amber-100 text-amber-800',
  mint: 'bg-mint-100 text-mint-700',
  rose: 'bg-rose-100 text-rose-700',
  violet: 'bg-violet-100 text-violet-700',
  dark: 'bg-navy-900 text-white',
  glass: 'bg-white/10 text-white ring-1 ring-white/15',
}

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  tone?: BadgeTone
  icon?: ReactNode
}

export function Badge({ tone = 'neutral', icon, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none [&_svg]:size-3.5',
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  )
}
