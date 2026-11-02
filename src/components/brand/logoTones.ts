import type { CSSProperties } from 'react'

export type LogoTone = 'light' | 'dark'

/** Palette per surface: the original artwork colours on light surfaces, ivory line-art on dark ones. */
export const LOGO_TONES: Record<LogoTone, CSSProperties> = {
  light: { '--logo-ink': '#3d2f19', '--logo-teal': '#176b74', '--logo-rust': '#b85d25', '--logo-gold': '#d8a030' } as CSSProperties,
  dark: { '--logo-ink': '#f3e9d2', '--logo-teal': '#5fc0cf', '--logo-rust': '#ee8a4a', '--logo-gold': '#f5c04a' } as CSSProperties,
}
