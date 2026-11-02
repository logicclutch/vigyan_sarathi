import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'

export interface LightboxItem {
  src: string
  alt: string
  caption?: string
  w: number
  h: number
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}

/** Full-screen image viewer on <dialog>: keyboard arrows, swipe, Esc, focus return, neighbour preloading. */
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const { t } = useLanguage()
  const open = index !== null && items.length > 0
  const item = open ? items[index] : undefined

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const neighbours = [items[(index - 1 + items.length) % items.length], items[(index + 1) % items.length]]
    for (const neighbour of neighbours) {
      if (!neighbour) continue
      const img = new Image()
      img.src = neighbour.src
    }
  }, [open, index, items])

  const go = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + items.length) % items.length)
  }
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft') go(-1)
    if (event.key === 'ArrowRight') go(1)
  }
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return
    const dx = event.clientX - startX.current
    startX.current = null
    if (dx > 50) go(-1)
    else if (dx < -50) go(1)
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={onKeyDown}
      aria-label={item?.alt}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy-950/95 p-0 text-white backdrop:bg-navy-950/90 open:motion-safe:animate-fade-in"
    >
      {item && index !== null && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="numeral text-sm text-white/70">{fmt(t(ui.gallery.counter), { n: index + 1, total: items.length })}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t(ui.a11y.close)}
              className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-14 pb-4 sm:px-20" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <figure key={item.src} className="flex max-h-full max-w-5xl flex-col items-center motion-safe:animate-dialog-in">
              <img src={item.src} alt={item.alt} width={item.w} height={item.h} className="max-h-[72dvh] w-auto max-w-full rounded-xl object-contain shadow-lift" />
              {item.caption && <figcaption className="mt-4 text-center text-sm text-white/75">{item.caption}</figcaption>}
            </figure>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t(ui.gallery.prev)}
                  className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-6 sm:size-12"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t(ui.gallery.next)}
                  className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-6 sm:size-12"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
