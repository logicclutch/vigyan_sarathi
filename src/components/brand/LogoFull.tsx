import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { LOGO_FULL_VIEWBOX } from './logoMeta'
import { LOGO_TONES, type LogoTone } from './logoTones'

interface LogoFullProps {
  className?: string
  tone?: LogoTone
  title?: string
  style?: CSSProperties
}

/** Mark plus the Devanagari wordmark exactly as supplied, for large brand placements. */
export function LogoFull({ className, tone = 'light', title, style }: LogoFullProps) {
  return (
    <svg
      viewBox={LOGO_FULL_VIEWBOX}
      className={cn('block', className)}
      style={{ ...LOGO_TONES[tone], ...style }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <use href="/logo.svg#full" />
    </svg>
  )
}
