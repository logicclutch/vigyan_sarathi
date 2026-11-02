import { useState } from 'react'
import { CircleCheck, CircleX, RefreshCw, Scale, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { claims } from '@/content/scientificTemper'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'

type Kind = 'evidence' | 'claim'

export function ClaimSorter() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<Kind | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const total = claims.length
  const claim = claims[index] ?? claims[0]!
  const correct = choice !== null && choice === claim.kind

  const pick = (kind: Kind) => {
    if (choice) return
    setChoice(kind)
    if (kind === claim.kind) setScore((value) => value + 1)
  }
  const next = () => {
    if (index + 1 >= total) setDone(true)
    else {
      setIndex(index + 1)
      setChoice(null)
    }
  }
  const restart = () => {
    setIndex(0)
    setChoice(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-navy-950 p-8 text-white sm:p-12" role="status">
        <p className="text-h2 font-bold">{fmt(t(ui.temper.resultTitle), { score, total })}</p>
        <p className="mt-4 max-w-xl text-lg text-white/75">{t(ui.temper.resultBody)}</p>
        <Button variant="light" icon={<RefreshCw />} iconPosition="left" className="mt-8" onClick={restart}>
          {t(ui.quiz.restart)}
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/8 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="numeral text-sm font-semibold text-ink-500">{fmt(t(ui.temper.progress), { n: index + 1, total })}</span>
        <div className="flex gap-1" aria-hidden="true">
          {claims.map((_, i) => (
            <span key={i} className={cn('h-1.5 w-5 rounded-full', i < index ? 'bg-electric-500' : i === index ? 'bg-amber-400' : 'bg-ink-900/10')} />
          ))}
        </div>
      </div>
      <p key={index} className="mt-6 text-h3 font-bold text-ink-900 motion-safe:animate-fade-in">
        “{t(claim.statement)}”
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => pick('evidence')}
          disabled={choice !== null}
          aria-pressed={choice === 'evidence'}
          className={cn(
            'flex items-center gap-3 rounded-2xl border px-5 py-4 text-left font-semibold transition-colors',
            choice === null && 'border-ink-900/15 hover:border-mint-500 hover:bg-mint-100',
            choice !== null && claim.kind === 'evidence' && 'border-mint-500 bg-mint-100 text-ink-900',
            choice === 'evidence' && claim.kind !== 'evidence' && 'border-rose-400 bg-rose-100',
            choice !== null && choice !== 'evidence' && claim.kind !== 'evidence' && 'opacity-50',
          )}
        >
          <Scale aria-hidden="true" className="size-5 shrink-0 text-mint-500" />
          {t(ui.temper.isEvidence)}
        </button>
        <button
          type="button"
          onClick={() => pick('claim')}
          disabled={choice !== null}
          aria-pressed={choice === 'claim'}
          className={cn(
            'flex items-center gap-3 rounded-2xl border px-5 py-4 text-left font-semibold transition-colors',
            choice === null && 'border-ink-900/15 hover:border-amber-500 hover:bg-amber-100',
            choice !== null && claim.kind === 'claim' && 'border-mint-500 bg-mint-100 text-ink-900',
            choice === 'claim' && claim.kind !== 'claim' && 'border-rose-400 bg-rose-100',
            choice !== null && choice !== 'claim' && claim.kind !== 'claim' && 'opacity-50',
          )}
        >
          <MessageCircleQuestion aria-hidden="true" className="size-5 shrink-0 text-amber-500" />
          {t(ui.temper.isClaim)}
        </button>
      </div>

      <div aria-live="polite" className="mt-6 min-h-6">
        {choice && (
          <div className={cn('rounded-2xl p-5 motion-safe:animate-fade-in', correct ? 'bg-mint-100' : 'bg-rose-100')}>
            <p className={cn('flex items-center gap-2 font-bold', correct ? 'text-teal-700' : 'text-rose-700')}>
              {correct ? <CircleCheck aria-hidden="true" className="size-5" /> : <CircleX aria-hidden="true" className="size-5" />}
              {correct ? t(ui.temper.correct) : t(ui.temper.incorrect)}{' '}
              <span className="font-semibold text-ink-800">{claim.kind === 'evidence' ? t(ui.temper.answerEvidence) : t(ui.temper.answerClaim)}</span>
            </p>
            <p className="mt-2 text-ink-700">{t(claim.why)}</p>
            <Button size="sm" className="mt-4" arrow onClick={next}>
              {index + 1 >= total ? t(ui.quiz.finish) : t(ui.a11y.next)}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
