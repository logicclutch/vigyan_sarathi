import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function AdminButton({ tone = 'primary', className, ...props }: ComponentPropsWithoutRef<'button'> & { tone?: 'primary' | 'secondary' | 'danger' | 'ghost' }) {
  const tones = {
    primary: 'bg-electric-500 text-white hover:bg-electric-400 shadow-[0_8px_24px_-10px_rgb(37_99_235/0.7)]',
    secondary: 'border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40',
    danger: 'bg-rose-100/70 text-rose-700 ring-1 ring-rose-400/40 hover:bg-rose-100',
    ghost: 'text-ink-700 hover:bg-ink-900/5',
  }
  return (
    <button
      type="button"
      {...props}
      className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50', tones[tone], className)}
    />
  )
}

export function Panel({ title, children, actions, className }: { title?: ReactNode; children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-3xl border border-ink-900/10 bg-white p-5 shadow-[0_10px_30px_-24px_rgb(5_11_26/0.5)] sm:p-6', className)}>
      {(title || actions) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="text-lg font-bold text-ink-900">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'success' | 'error' | 'warn'; children: ReactNode }) {
  const tones = {
    info: 'bg-electric-100/60 text-electric-700 ring-electric-200',
    success: 'bg-mint-100 text-mint-700 ring-mint-400/40',
    error: 'bg-rose-100 text-rose-700 ring-rose-400/40',
    warn: 'bg-amber-100 text-amber-800 ring-amber-300',
  }
  return (
    <p role={tone === 'error' ? 'alert' : 'status'} className={cn('rounded-xl px-4 py-3 text-sm ring-1', tones[tone])}>
      {children}
    </p>
  )
}

export function Field({ label, id, children, hint }: { label: ReactNode; id: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  )
}

