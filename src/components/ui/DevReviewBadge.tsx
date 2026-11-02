import { Pencil } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

/**
 * Visible only in development builds: marks copy that was drafted and is
 * waiting for the organisation's approval (review: true in the content file).
 */
export function DevReviewBadge({ review, className }: { review?: boolean; className?: string }) {
  const { t } = useLanguage()
  if (!import.meta.env.DEV || !review) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 ring-1 ring-amber-300',
        className,
      )}
      title="review: true in the content file (dev only). See CONTENT-REVIEW.md"
    >
      <Pencil className="size-3" aria-hidden="true" />
      {t(ui.labels.draft)}
    </span>
  )
}
