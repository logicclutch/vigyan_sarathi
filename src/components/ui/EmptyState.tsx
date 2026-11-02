import type { ReactNode } from 'react'
import type { IconName } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { IconTile } from './IconTile'

interface EmptyStateProps {
  icon?: IconName
  title: ReactNode
  body?: ReactNode
  action?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function EmptyState({ icon = 'search', title, body, action, tone = 'light', className }: EmptyStateProps) {
  const dark = tone === 'dark'
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center rounded-3xl border border-dashed px-6 py-14 text-center',
        dark ? 'border-white/15 text-white' : 'border-ink-900/15 text-ink-900',
        className,
      )}
    >
      <IconTile icon={icon} tint="amber" variant={dark ? 'glass' : 'soft'} size="lg" />
      <p className="mt-5 text-lg font-semibold">{title}</p>
      {body && <p className={cn('mt-2 max-w-md', dark ? 'text-white/70' : 'text-ink-500')}>{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
