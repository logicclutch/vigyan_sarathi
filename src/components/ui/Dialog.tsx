import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: 'md' | 'lg' | 'xl'
  tone?: 'light' | 'dark'
  /** Optional element rendered above the title (badges, icon tiles…) */
  kicker?: ReactNode
}

const SIZES = { md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' } as const

/** Accessible modal built on the native <dialog> element (focus trap, Esc, focus return). */
export function Dialog({ open, onClose, title, description, children, footer, size = 'lg', tone = 'light', kicker }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { t } = useLanguage()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  }, [open])

  const dark = tone === 'dark'

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      className={cn(
        'm-auto w-[calc(100%-1.5rem)] rounded-3xl p-0 shadow-lift backdrop:bg-navy-950/75 backdrop:backdrop-blur-sm open:motion-safe:animate-dialog-in',
        SIZES[size],
        dark ? 'bg-navy-900 text-white' : 'bg-white text-ink-900',
      )}
    >
      {open && (
        <div className="max-h-[88dvh] overflow-y-auto overscroll-contain">
          <div
            className={cn(
              'sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-8',
              dark ? 'border-white/10 bg-navy-900/95' : 'border-ink-900/10 bg-white/95 backdrop-blur',
            )}
          >
            <div className="min-w-0">
              {kicker && <div className="mb-2">{kicker}</div>}
              <h2 id={titleId} className="text-h3 font-bold">
                {title}
              </h2>
              {description && <p className={cn('mt-1 text-sm', dark ? 'text-white/70' : 'text-ink-500')}>{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t(ui.a11y.close)}
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-full transition-colors',
                dark ? 'bg-white/10 hover:bg-white/20' : 'bg-ink-900/5 hover:bg-ink-900/10',
              )}
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="px-5 py-6 sm:px-8 sm:py-7">{children}</div>
          {footer && (
            <div className={cn('border-t px-5 py-4 sm:px-8', dark ? 'border-white/10' : 'border-ink-900/10')}>{footer}</div>
          )}
        </div>
      )}
    </dialog>
  )
}
