import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from '@/lib/useInView'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

interface RevealProps extends ComponentPropsWithoutRef<'div'> {
  /** seconds */
  delay?: number
  /** px of upward travel */
  y?: number
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'figure' | 'header' | 'p' | 'span'
}

/** Fade + rise when scrolled into view. CSS-only; disabled under prefers-reduced-motion. */
export function Reveal({ delay = 0, y = 18, once = true, amount = 0.2, as = 'div', className, style, children, ...rest }: RevealProps) {
  // Rendered tag is dynamic; typed as 'div' so the shared HTML props spread cleanly.
  const Tag = as as 'div'
  const [ref, inView] = useInView<HTMLDivElement>({ once, amount })
  const reduce = usePrefersReducedMotion()
  const hidden = !inView && !reduce
  const inline: CSSProperties = {
    ...style,
    transform: hidden ? `translateY(${y}px)` : undefined,
    transitionDelay: delay ? `${delay}s` : undefined,
  }
  return (
    <Tag
      ref={ref as never}
      data-inview={!hidden}
      className={cn('transition-[opacity,transform] duration-700 ease-out-expo', hidden && 'opacity-0', className)}
      style={inline}
      {...rest}
    >
      {children}
    </Tag>
  )
}
