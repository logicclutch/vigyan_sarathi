import { useState } from 'react'
import { CircleCheck, CircleX, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconTile } from '@/components/ui/IconTile'
import { quizSets } from '@/content/students/quiz'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'
import { TINTS } from '@/lib/tints'
import { useHashOpen } from '@/lib/useHashOpen'

export function QuizEngine() {
  const { t } = useLanguage()
  const [setId, setSetId] = useHashOpen((id) => quizSets.some((set) => set.id === id))
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const set = quizSets.find((item) => item.id === setId) ?? null

  const start = (id: string | null) => {
    setSetId(id)
    setIndex(0)
    setChoice(null)
    setScore(0)
    setFinished(false)
  }

  if (!set) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.quiz.chooseSet)}</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {quizSets.map((item) => (
            <li key={item.id} id={item.id}>
              <button
                type="button"
                onClick={() => start(item.id)}
                className={cn(
                  'group flex h-full w-full flex-col rounded-3xl p-6 text-left ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift',
                  TINTS[item.tint].soft,
                )}
              >
                <IconTile icon={item.icon} tint={item.tint} variant="outline" />
                <h3 className="mt-5 text-h3 font-bold">{t(item.title)}</h3>
                <p className="mt-2 text-ink-600">{t(item.description)}</p>
                <span className="mt-auto pt-6 text-sm font-semibold text-electric-600">
                  {fmt(t(ui.labels.questions), { count: item.questions.length })} →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const total = set.questions.length

  if (finished) {
    const ratio = score / total
    const message = ratio >= 0.8 ? ui.quiz.resultGreat : ratio >= 0.5 ? ui.quiz.resultGood : ui.quiz.resultTry
    return (
      <div className="rounded-3xl bg-navy-950 p-8 text-white sm:p-12" role="status" data-testid="quiz-result">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
          {t(ui.quiz.yourScore)} · {t(set.title)}
        </p>
        <p className="numeral mt-3 text-display font-bold">
          {score}
          <span className="text-white/35">/{total}</span>
        </p>
        <p className="mt-4 max-w-xl text-lg text-white/80">{t(message)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="light" icon={<RefreshCw />} iconPosition="left" onClick={() => start(set.id)}>
            {t(ui.quiz.restart)}
          </Button>
          <Button variant="outline-light" onClick={() => start(null)}>
            {t(ui.quiz.another)}
          </Button>
        </div>
      </div>
    )
  }

  const question = set.questions[index]!
  const answered = choice !== null
  const isRight = choice === question.answer

  const pick = (i: number) => {
    if (answered) return
    setChoice(i)
    if (i === question.answer) setScore((value) => value + 1)
  }
  const next = () => {
    if (index + 1 >= total) setFinished(true)
    else {
      setIndex(index + 1)
      setChoice(null)
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/8 sm:p-10" data-testid="quiz-question">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', TINTS[set.tint].soft, TINTS[set.tint].text)}>{t(set.title)}</span>
        <span className="numeral text-sm font-semibold text-ink-500">{fmt(t(ui.quiz.question), { n: index + 1, total })}</span>
      </div>
      <div className="mt-4 flex gap-1" aria-hidden="true">
        {set.questions.map((_, i) => (
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < index ? 'bg-electric-500' : i === index ? 'bg-amber-400' : 'bg-ink-900/10')} />
        ))}
      </div>
      <h3 key={question.id} className="mt-6 text-h3 font-bold motion-safe:animate-fade-in">
        {t(question.q)}
      </h3>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map((option, i) => {
          const state = !answered ? 'idle' : i === question.answer ? 'correct' : i === choice ? 'wrong' : 'dim'
          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => pick(i)}
                aria-pressed={i === choice}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors',
                  state === 'idle' && 'border-ink-900/15 hover:border-electric-500 hover:bg-electric-100/60',
                  state === 'correct' && 'border-mint-500 bg-mint-100',
                  state === 'wrong' && 'border-rose-400 bg-rose-100',
                  state === 'dim' && 'border-ink-900/10 opacity-50',
                )}
              >
                <span
                  lang="en"
                  className={cn(
                    'numeral grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold',
                    state === 'correct' ? 'bg-mint-500 text-white' : state === 'wrong' ? 'bg-rose-500 text-white' : 'bg-ink-900/6 text-ink-700',
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium">{t(option)}</span>
                {state === 'correct' && <CircleCheck aria-hidden="true" className="ml-auto size-5 shrink-0 text-mint-500" />}
                {state === 'wrong' && <CircleX aria-hidden="true" className="ml-auto size-5 shrink-0 text-rose-700" />}
              </button>
            </li>
          )
        })}
      </ol>
      <div aria-live="polite" className="mt-6 min-h-6">
        {answered ? (
          <div className={cn('rounded-2xl p-5 motion-safe:animate-fade-in', isRight ? 'bg-mint-100' : 'bg-rose-100')}>
            <p className={cn('font-bold', isRight ? 'text-teal-700' : 'text-rose-700')}>{isRight ? t(ui.quiz.correct) : t(ui.quiz.incorrect)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.quiz.explanation)}</p>
            <p className="mt-1 text-ink-700">{t(question.explanation)}</p>
            <Button size="sm" className="mt-4" arrow onClick={next}>
              {index + 1 >= total ? t(ui.quiz.finish) : t(ui.quiz.next)}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-ink-500">{t(ui.quiz.selectHint)}</p>
        )}
      </div>
    </div>
  )
}
