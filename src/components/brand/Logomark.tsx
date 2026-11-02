import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { LOGO_MARK_VIEWBOX } from './logoMeta'
import { LOGO_TONES, type LogoTone } from './logoTones'

interface LogomarkProps {
  className?: string
  tone?: LogoTone
  /** Provide a title to make the mark meaningful; otherwise it is decorative. */
  title?: string
  style?: CSSProperties
}

/**
 * The organisation's logo artwork (charioteer, atom, book, lotus), vectorised from the supplied
 * image into /logo-mark.svg. Referenced with <use> so the artwork is cached once and never
 * bundled; the CSS variables above colour it to match the surface.
 */
export function Logomark({ className, tone = 'dark', title, style }: LogomarkProps) {
  return (
    <svg
      viewBox={LOGO_MARK_VIEWBOX}
      className={cn('block shrink-0', className)}
      style={{ ...LOGO_TONES[tone], ...style }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <use href="/logo-mark.svg#mark" />
    </svg>
  )
}
