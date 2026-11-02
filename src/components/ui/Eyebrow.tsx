import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps extends ComponentPropsWithoutRef<'p'> {
  tone?: 'light' | 'dark'
  as?: 'p' | 'span' | 'div'
  line?: boolean
}

export function Eyebrow({ tone = 'light', as: Tag = 'p', line = true, className, children, ...rest }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2.5 text-eyebrow font-semibold uppercase tracking-[0.16em]',
        tone === 'dark' ? 'text-cyan-300' : 'text-electric-600',
        className,
      )}
      {...rest}
    >
      {line && <span aria-hidden="true" className={cn('h-px w-6', tone === 'dark' ? 'bg-cyan-300/70' : 'bg-electric-500/60')} />}
      <span>{children}</span>
    </Tag>
  )
}
