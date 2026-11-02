import type { ReactNode } from 'react'
import { OrbitRings } from '@/components/science/OrbitRings'
import { Starfield } from '@/components/science/Starfield'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

interface CtaBandProps {
  eyebrow?: ReactNode
  title: ReactNode
  body?: ReactNode
  primary?: ReactNode
  secondary?: ReactNode
  className?: string
}

export function CtaBand({ eyebrow, title, body, primary, secondary, className }: CtaBandProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-navy-950 text-white', className)}>
      <Starfield className="-z-10 opacity-70" seed={21} count={80} />
      <OrbitRings className="absolute -right-48 -top-56 -z-10 w-[760px] opacity-60 max-md:hidden" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 size-[520px] rounded-full bg-electric-600/30 blur-3xl" />
      <div className="container-x section-y">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
            <h2 className="mt-4 text-h1 font-bold">{title}</h2>
            {body && <p className="mt-6 max-w-2xl text-lead text-white/75">{body}</p>}
          </div>
          {(primary || secondary) && (
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              {primary}
              {secondary}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
