import { cn } from '@/lib/cn'

interface MarqueeProps {
  items: string[]
  className?: string
  tone?: 'dark' | 'light'
}

/** Slow horizontal ticker. Pauses on hover and never moves under reduced motion. */
export function Marquee({ items, className, tone = 'dark' }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((word, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className={cn('px-6 text-lg font-semibold sm:px-8 sm:text-xl', tone === 'dark' ? 'text-white/85' : 'text-ink-800')}>{word}</span>
          <span aria-hidden="true" className="text-amber-400">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn('mask-fade-x overflow-hidden', className)}>
      <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
