import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocation } from 'react-router'
import { Button } from '@/components/ui/Button'
import { IconTile } from '@/components/ui/IconTile'
import { exampleQuestion, temperSteps } from '@/content/scientificTemper'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'
import { TINTS } from '@/lib/tints'

const NAV_KEYS = new Set(['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'])

/** Accessible tab-based explorer for the six steps of the scientific process. */
export function ProcessExplorer() {
  const { lang, t } = useLanguage()
  const { hash } = useLocation()
  const [active, setActive] = useState(() => Math.max(0, temperSteps.findIndex((step) => `#${step.key}` === hash)))
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const total = temperSteps.length
  const step = temperSteps[active] ?? temperSteps[0]!

  const go = (index: number, focus = false) => {
    const next = (index + total) % total
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!NAV_KEYS.has(event.key)) return
    event.preventDefault()
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') go(active + 1, true)
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') go(active - 1, true)
    else if (event.key === 'Home') go(0, true)
    else go(total - 1, true)
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="min-w-0 lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <div
            role="tablist"
            aria-label={t(ui.temper.stepsLabel)}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-4 flex min-w-0 max-w-[calc(100%+2rem)] snap-x gap-2 overflow-x-auto px-4 pb-2 scrollbar-none lg:mx-0 lg:max-w-full lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {temperSteps.map((item, i) => {
              const selected = i === active
              return (
                <button
                  key={item.key}
                  id={`tab-${item.key}`}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${item.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  className={cn(
                    'flex shrink-0 snap-start items-center gap-3 rounded-2xl px-4 py-3 text-left transition-[background-color,color,box-shadow] duration-300 lg:w-full',
                    selected ? 'bg-white text-navy-950 shadow-soft' : 'glass text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <IconTile icon={item.icon} tint={item.tint} variant={selected ? 'soft' : 'glass'} size="sm" />
                  <span className="flex flex-col">
                    <span className={cn('numeral text-[11px] uppercase tracking-[0.18em]', selected ? 'text-ink-500' : 'text-white/50')} lang="en">
                      {String(i + 1).padStart(2, '0')}
                      {lang === 'hi' ? ` · ${item.english}` : ''}
                    </span>
                    <span className="font-semibold">{t(item.label)}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <div className="mt-6 hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block" aria-hidden="true">
            <div
              className="h-full rounded-full bg-cyan-300 transition-[width] duration-500 ease-out-expo"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 lg:col-span-8">
        <div
          key={step.key}
          id={`panel-${step.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${step.key}`}
          tabIndex={0}
          className="rounded-3xl bg-white p-6 text-ink-900 shadow-lift motion-safe:animate-fade-in sm:p-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn('numeral rounded-full px-3 py-1 text-xs font-semibold', TINTS[step.tint].soft, TINTS[step.tint].text)}>
              {fmt(t(ui.temper.stepOf), { n: active + 1, total })}
            </span>
            {lang === 'hi' && (
              <span lang="en" className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                {step.english}
              </span>
            )}
          </div>
          <h3 className="mt-4 text-h1 font-bold">{t(step.label)}</h3>
          <p className="mt-4 text-lead text-ink-700">{t(step.summary)}</p>
          <p className="mt-5 text-lg text-ink-600">{t(step.detail)}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-amber-100/80 p-5 ring-1 ring-amber-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{t(ui.temper.exampleLabel)}</p>
              <p className="mt-2 text-sm font-semibold text-ink-700">{t(exampleQuestion)}</p>
              <p className="mt-3 text-ink-800">{t(step.example)}</p>
            </div>
            <div className="rounded-2xl border border-cyan-300 bg-cyan-100/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-800">{t(ui.labels.tryThis)}</p>
              <p className="mt-3 text-ink-800">{t(step.prompt)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/10 pt-6">
            <Button variant="outline" size="sm" icon={<ArrowLeft />} iconPosition="left" onClick={() => go(active - 1)} disabled={active === 0}>
              {t(ui.cta.prevStep)}
            </Button>
            {active < total - 1 ? (
              <Button size="sm" icon={<ArrowRight />} onClick={() => go(active + 1)}>
                {t(ui.cta.nextStep)}
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => go(0)}>
                {t(ui.cta.reset)}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
