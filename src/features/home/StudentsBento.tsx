import { useState } from 'react'
import { Brain, CircleX, FlaskConical, RefreshCw, Scale, Sparkles, Timer } from 'lucide-react'
import { Link } from 'react-router'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Starfield } from '@/components/science/Starfield'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { home } from '@/content/home'
import { experiments } from '@/content/students/experiments'
import { facts } from '@/content/students/facts'
import { myths } from '@/content/students/myths'
import { quizSets } from '@/content/students/quiz'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { dailyIndex } from '@/lib/daily'
import { fmt } from '@/lib/format'

export function StudentsBento() {
  const { t } = useLanguage()
  const [factIndex, setFactIndex] = useState(() => dailyIndex(facts.length))
  const [revealed, setRevealed] = useState(false)
  const fact = facts[factIndex]
  const experiment = experiments[dailyIndex(experiments.length, 3)]
  const myth = myths[dailyIndex(myths.length, 5)]
  const totalQuestions = quizSets.reduce((sum, set) => sum + set.questions.length, 0)
  if (!fact || !experiment || !myth) return null

  return (
    <Section tone="sand" motif="dots" aria-labelledby="students-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="students-title" eyebrow={t(home.students.eyebrow)} title={t(home.students.title)} lead={t(home.students.lead)} />
          <Button to="/students" variant="secondary" arrow className="shrink-0">
            {t(ui.cta.forStudents)}
          </Button>
        </div>

        <Stagger className="mt-12 grid gap-4 lg:grid-cols-12">
          <StaggerItem index={0} as="article" className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-ink-900/8 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="amber" icon={<Sparkles />}>
                {t(home.students.tiles.fact)}
              </Badge>
              <Badge tone="neutral">{t(ui.topics[fact.topic])}</Badge>
            </div>
            <h3 className="mt-5 text-h3 font-bold">{t(fact.title)}</h3>
            <p className="mt-3 text-lg text-ink-600">{t(fact.body)}</p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
              <Button variant="outline" size="sm" icon={<RefreshCw />} iconPosition="left" onClick={() => setFactIndex((i) => (i + 1) % facts.length)}>
                {t(ui.cta.surpriseMe)}
              </Button>
              <Link to="/students/facts" className="text-sm font-semibold text-electric-600 hover:underline">
                {t(ui.cta.viewAll)}
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem index={1} as="article" className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white sm:p-8 lg:col-span-5">
            <Starfield className="opacity-70" seed={13} count={60} />
            <div className="relative flex h-full flex-col">
              <div>
                <Badge tone="glass" icon={<Brain />}>
                  {t(home.students.tiles.quiz)}
                </Badge>
              </div>
              <h3 className="mt-5 text-h3 font-bold">{t(home.students.quizBlurb)}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {quizSets.map((set) => (
                  <li key={set.id} className="rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">
                    {t(set.title)} <span className="numeral text-white/50">· {set.questions.length}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-white/55">{fmt(t(ui.labels.questions), { count: totalQuestions })}</p>
              <div className="mt-auto pt-8">
                <Button to="/students/quiz" variant="light" arrow>
                  {t(ui.cta.startQuiz)}
                </Button>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem index={2} as="article" className="flex flex-col rounded-3xl bg-cyan-100/70 p-7 ring-1 ring-cyan-200 sm:p-8 lg:col-span-5">
            <div>
              <Badge tone="cyan" icon={<FlaskConical />}>
                {t(home.students.tiles.experiment)}
              </Badge>
            </div>
            <h3 className="mt-5 text-h3 font-bold">{t(experiment.title)}</h3>
            <p className="mt-3 text-ink-600">{t(experiment.summary)}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-ink-600">
              <span className="inline-flex items-center gap-1.5">
                <Timer aria-hidden="true" className="size-4" />
                {fmt(t(ui.labels.minutes), { n: experiment.minutes })}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t(ui.difficulty[experiment.difficulty])}</span>
            </div>
            <div className="mt-auto pt-8">
              <Button to={`/students/experiments#${experiment.id}`} variant="outline" size="sm" arrow>
                {t(ui.cta.tryIt)}
              </Button>
            </div>
          </StaggerItem>

          <StaggerItem index={3} as="article" className="flex flex-col rounded-3xl bg-amber-100/80 p-7 ring-1 ring-amber-200 sm:p-8 lg:col-span-7">
            <div>
              <Badge tone="amber" icon={<Scale />}>
                {t(home.students.tiles.myth)}
              </Badge>
            </div>
            <p className="mt-5 text-h3 font-bold">“{t(myth.myth)}”</p>
            <div aria-live="polite" className="mt-4">
              {revealed ? (
                <div className="rounded-2xl bg-white/75 p-5 ring-1 ring-amber-300/50">
                  <p className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                    <CircleX aria-hidden="true" className="size-4" />
                    {t(ui.labels.myth)}
                  </p>
                  <p className="mt-2 font-semibold text-ink-900">{t(myth.fact)}</p>
                  <p className="mt-2 text-ink-600">{t(myth.explanation)}</p>
                </div>
              ) : (
                <p className="text-ink-600">{t(home.students.mythPrompt)}</p>
              )}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
              <Button variant="secondary" size="sm" aria-expanded={revealed} onClick={() => setRevealed((value) => !value)}>
                {revealed ? t(ui.cta.hideAnswer) : t(ui.cta.showAnswer)}
              </Button>
              <Link to="/students/myths" className="text-sm font-semibold text-electric-600 hover:underline">
                {t(ui.cta.viewAll)}
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  )
}
