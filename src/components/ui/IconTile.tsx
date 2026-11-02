import type { Tint } from '@/content/types'
import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'
import { TINTS } from '@/lib/tints'
import { Icon } from './Icon'

interface IconTileProps {
  icon: IconName
  tint?: Tint
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'soft' | 'solid' | 'glass' | 'outline'
  className?: string
}

const SIZES = {
  sm: 'size-9 rounded-xl [&_svg]:size-4',
  md: 'size-12 rounded-2xl [&_svg]:size-5',
  lg: 'size-14 rounded-2xl [&_svg]:size-6',
  xl: 'size-20 rounded-3xl [&_svg]:size-9',
} as const

export function IconTile({ icon, tint = 'electric', size = 'md', variant = 'soft', className }: IconTileProps) {
  const t = TINTS[tint]
  const variantClass =
    variant === 'solid'
      ? t.solid
      : variant === 'glass'
        ? cn('bg-white/10 ring-1 ring-white/15', t.onDark)
        : variant === 'outline'
          ? cn('bg-white ring-1 ring-ink-900/10', t.icon)
          : cn(t.soft, t.icon)
  return (
    <span className={cn('grid shrink-0 place-items-center', SIZES[size], variantClass, className)}>
      <Icon name={icon} />
    </span>
  )
}
