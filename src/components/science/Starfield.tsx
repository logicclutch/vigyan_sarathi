import { useMemo } from 'react'
import { cn } from '@/lib/cn'

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StarfieldProps {
  count?: number
  seed?: number
  className?: string
  twinkle?: boolean
}

/** Deterministic SVG starfield; a third of the stars twinkle (motion-safe only). */
export function Starfield({ count = 110, seed = 7, className, twinkle = true }: StarfieldProps) {
  const stars = useMemo(() => {
    const rand = mulberry32(seed)
    return Array.from({ length: count }, (_, i) => ({
      x: Math.round(rand() * 1000 * 10) / 10,
      y: Math.round(rand() * 600 * 10) / 10,
      r: Math.round((0.5 + rand() * 1.3) * 100) / 100,
      o: Math.round((0.25 + rand() * 0.7) * 100) / 100,
      d: Math.round(rand() * 5 * 10) / 10,
      t: i % 3 === 0,
    }))
  }, [count, seed])

  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#fff"
          opacity={s.o}
          className={twinkle && s.t ? 'motion-safe:animate-twinkle' : undefined}
          style={twinkle && s.t ? { animationDelay: `${s.d}s` } : undefined}
        />
      ))}
    </svg>
  )
}
