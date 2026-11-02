import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Myth } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/** Myth on the front, fact on the back. Button semantics, keyboard friendly, reduced-motion aware. */
export function FlipCard({ myth }: { myth: Myth }) {
  const { t } = useLanguage()
  const [flipped, setFlipped] = useState(false)
  const reduce = usePrefersReducedMotion()
  return (
    <div className="perspective h-full min-h-80" id={myth.id}>
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
        className={cn(
          'preserve-3d relative block h-full min-h-80 w-full rounded-3xl text-left transition-transform duration-700 ease-out-expo focus-visible:outline-offset-4',
          !reduce && flipped && '[transform:rotateY(180deg)]',
        )}
      >
        <div
          aria-hidden={flipped}
          className={cn(
            'backface-hidden absolute inset-0 flex flex-col rounded-3xl bg-rose-100 p-6 ring-1 ring-rose-200',
            reduce && flipped && 'invisible',
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <Badge tone="rose">{t(ui.students.mythLabel)}</Badge>
            <Badge tone="neutral">{t(ui.topics[myth.topic])}</Badge>
          </div>
          <p className="mt-6 text-xl font-bold text-ink-900">“{t(myth.myth)}”</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-rose-700">
            <RefreshCw aria-hidden="true" className="size-4" />
            {t(ui.students.flipHint)}
          </span>
        </div>
        <div
          aria-hidden={!flipped}
          className={cn(
            'backface-hidden absolute inset-0 flex flex-col overflow-y-auto rounded-3xl bg-mint-100 p-6 ring-1 ring-mint-400/40',
            reduce ? (flipped ? '' : 'invisible') : '[transform:rotateY(180deg)]',
          )}
        >
          <Badge tone="mint">{t(ui.students.factLabel)}</Badge>
          <p className="mt-5 text-lg font-bold text-ink-900">{t(myth.fact)}</p>
          <p className="mt-3 text-sm text-ink-700">{t(myth.explanation)}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-teal-700">
            <RefreshCw aria-hidden="true" className="size-4" />
            {t(ui.students.flipBack)}
          </span>
        </div>
      </button>
    </div>
  )
}
