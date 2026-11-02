import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from '@/lib/useInView'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

interface StaggerProps extends ComponentPropsWithoutRef<'div'> {
  amount?: number
  /** seconds between children */
  step?: number
  as?: 'div' | 'ul' | 'ol' | 'section'
}

/** Parent that reveals its <StaggerItem index={i}> children one after another. */
export function Stagger({ amount = 0.15, step = 0.08, as = 'div', className, style, children, ...rest }: StaggerProps) {
  const Tag = as as 'div'
  const [ref, inView] = useInView<HTMLDivElement>({ amount })
  const reduce = usePrefersReducedMotion()
  return (
    <Tag
      ref={ref as never}
      data-inview={inView || reduce}
      className={cn('group/stagger', className)}
      style={{ ...style, '--stagger-step': `${step}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}

interface StaggerItemProps extends ComponentPropsWithoutRef<'div'> {
  index?: number
  as?: 'div' | 'li' | 'article'
}

export function StaggerItem({ index = 0, as = 'div', className, style, children, ...rest }: StaggerItemProps) {
  const Tag = as as 'div'
  return (
    <Tag
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out-expo group-data-[inview=false]/stagger:translate-y-4 group-data-[inview=false]/stagger:opacity-0',
        className,
      )}
      style={{ ...style, transitionDelay: `calc(${index} * var(--stagger-step, 0.08s))` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
