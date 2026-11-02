import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2' | 'h3'
  size?: 'display' | 'h1' | 'h2' | 'h3'
  className?: string
  id?: string
}

const SIZE = { display: 'text-display', h1: 'text-h1', h2: 'text-h2', h3: 'text-h3' } as const

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  size = 'h2',
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={cn(align === 'center' && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag id={id} className={cn('mt-4 font-bold', SIZE[size], dark ? 'text-white' : 'text-ink-900')}>
        {title}
      </Tag>
      {lead && <p className={cn('mt-5 text-lead', dark ? 'text-white/75' : 'text-ink-600')}>{lead}</p>}
    </div>
  )
}
