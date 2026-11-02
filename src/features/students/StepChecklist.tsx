import { useState } from 'react'
import type { L } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'

/** Numbered steps you can tick off while doing the experiment. */
export function StepChecklist({ steps }: { steps: L[] }) {
  const { t } = useLanguage()
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false))
  const completed = done.filter(Boolean).length
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-500">{t(ui.students.checklistLabel)}</p>
        <p className="numeral text-sm font-semibold text-electric-600" aria-live="polite">
          {fmt(t(ui.students.stepsDone), { done: completed, total: steps.length })}
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-900/8" aria-hidden="true">
        <div className="h-full rounded-full bg-electric-500 transition-[width] duration-500 ease-out-expo" style={{ width: `${(completed / steps.length) * 100}%` }} />
      </div>
      <ol className="mt-4 space-y-2">
        {steps.map((step, i) => (
          <li key={i}>
            <label className="flex cursor-pointer gap-3 rounded-2xl bg-cream-50 p-3.5 ring-1 ring-ink-900/8 transition-colors has-[:checked]:bg-mint-100/70">
              <input
                type="checkbox"
                checked={done[i] ?? false}
                onChange={(event) => setDone((prev) => prev.map((value, j) => (j === i ? event.target.checked : value)))}
                className="mt-1 size-4 shrink-0 accent-electric-500"
              />
              <span className={cn('text-ink-800 transition-colors', done[i] && 'text-ink-500 line-through')}>
                <span className="numeral mr-2 font-semibold text-ink-500">{i + 1}.</span>
                {t(step)}
              </span>
            </label>
          </li>
        ))}
      </ol>
    </div>
  )
}
