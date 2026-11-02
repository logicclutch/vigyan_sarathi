import type { Tint } from '@/content/types'

export interface TintClasses {
  /** Solid fill with readable foreground */
  solid: string
  /** Text colour on light surfaces (>= 4.5:1 on white/cream) */
  text: string
  /** Vivid colour for icons on soft surfaces (not for text) */
  icon: string
  /** Soft tinted surface */
  soft: string
  /** Text colour on the soft surface */
  softText: string
  /** Border colour */
  border: string
  /** Small dot / marker */
  dot: string
  /** Text colour on dark surfaces */
  onDark: string
  /** Glow shadow for dark surfaces */
  glow: string
  /** Gradient stops */
  gradient: string
}

export const TINTS: Record<Tint, TintClasses> = {
  electric: {
    solid: 'bg-electric-500 text-white',
    text: 'text-electric-700',
    icon: 'text-electric-600',
    soft: 'bg-electric-100',
    softText: 'text-electric-700',
    border: 'border-electric-200',
    dot: 'bg-electric-500',
    onDark: 'text-electric-300',
    glow: 'shadow-[0_0_60px_-16px_rgb(59_130_246/0.7)]',
    gradient: 'from-electric-500 to-cyan-400',
  },
  cyan: {
    solid: 'bg-cyan-400 text-navy-950',
    text: 'text-cyan-700',
    icon: 'text-cyan-500',
    soft: 'bg-cyan-100',
    softText: 'text-navy-800',
    border: 'border-cyan-200',
    dot: 'bg-cyan-400',
    onDark: 'text-cyan-300',
    glow: 'shadow-[0_0_60px_-16px_rgb(34_211_238/0.7)]',
    gradient: 'from-cyan-400 to-electric-400',
  },
  amber: {
    solid: 'bg-amber-400 text-navy-950',
    text: 'text-amber-800',
    icon: 'text-amber-500',
    soft: 'bg-amber-100',
    softText: 'text-ink-800',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
    onDark: 'text-amber-300',
    glow: 'shadow-[0_0_60px_-16px_rgb(251_191_36/0.7)]',
    gradient: 'from-amber-400 to-orange-500',
  },
  orange: {
    solid: 'bg-orange-500 text-white',
    text: 'text-orange-700',
    icon: 'text-orange-500',
    soft: 'bg-orange-500/10',
    softText: 'text-ink-800',
    border: 'border-orange-400/40',
    dot: 'bg-orange-500',
    onDark: 'text-orange-400',
    glow: 'shadow-[0_0_60px_-16px_rgb(249_115_22/0.7)]',
    gradient: 'from-orange-500 to-amber-400',
  },
  mint: {
    solid: 'bg-mint-500 text-white',
    text: 'text-mint-700',
    icon: 'text-mint-500',
    soft: 'bg-mint-100',
    softText: 'text-ink-800',
    border: 'border-mint-400/40',
    dot: 'bg-mint-400',
    onDark: 'text-mint-400',
    glow: 'shadow-[0_0_60px_-16px_rgb(52_211_153/0.7)]',
    gradient: 'from-mint-400 to-teal-400',
  },
  rose: {
    solid: 'bg-rose-500 text-white',
    text: 'text-rose-700',
    icon: 'text-rose-500',
    soft: 'bg-rose-100',
    softText: 'text-ink-800',
    border: 'border-rose-400/40',
    dot: 'bg-rose-400',
    onDark: 'text-rose-400',
    glow: 'shadow-[0_0_60px_-16px_rgb(251_113_133/0.7)]',
    gradient: 'from-rose-400 to-orange-400',
  },
  violet: {
    solid: 'bg-violet-500 text-white',
    text: 'text-violet-700',
    icon: 'text-violet-500',
    soft: 'bg-violet-100',
    softText: 'text-ink-800',
    border: 'border-violet-400/40',
    dot: 'bg-violet-400',
    onDark: 'text-violet-400',
    glow: 'shadow-[0_0_60px_-16px_rgb(167_139_250/0.7)]',
    gradient: 'from-violet-400 to-electric-400',
  },
  navy: {
    solid: 'bg-navy-900 text-white',
    text: 'text-navy-800',
    icon: 'text-navy-800',
    soft: 'bg-navy-900/8',
    softText: 'text-navy-900',
    border: 'border-navy-900/15',
    dot: 'bg-navy-700',
    onDark: 'text-white',
    glow: 'shadow-[0_0_60px_-16px_rgb(16_34_74/0.7)]',
    gradient: 'from-navy-800 to-electric-600',
  },
  teal: {
    solid: 'bg-teal-500 text-white',
    text: 'text-teal-700',
    icon: 'text-teal-500',
    soft: 'bg-teal-100',
    softText: 'text-ink-800',
    border: 'border-teal-400/40',
    dot: 'bg-teal-400',
    onDark: 'text-teal-400',
    glow: 'shadow-[0_0_60px_-16px_rgb(45_212_191/0.7)]',
    gradient: 'from-teal-400 to-cyan-400',
  },
}
