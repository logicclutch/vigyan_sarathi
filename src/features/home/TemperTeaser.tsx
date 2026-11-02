import { Link } from 'react-router'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { home } from '@/content/home'
import { temperQuote, temperSteps } from '@/content/scientificTemper'
import { ui } from '@/content/ui'
import { MindsetStages } from '@/features/temper/MindsetStages'
import { useLanguage } from '@/i18n/useLanguage'

export function TemperTeaser() {
  const { lang, t } = useLanguage()
  return (
    <Section tone="midnight" motif="blueprint" aria-labelledby="temper-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading id="temper-title" tone="dark" eyebrow={t(home.temper.eyebrow)} title={t(home.temper.title)} lead={t(home.temper.lead)} />
            <MindsetStages className="mt-6" compact />
            <Button to="/scientific-temper" variant="light" arrow className="mt-8">
              {t(ui.cta.exploreTemper)}
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {temperSteps.map((step, i) => (
              <Reveal as="li" key={step.key} delay={i * 0.06}>
                <Link
                  to={`/scientific-temper#${step.key}`}
                  className="glass group flex h-full flex-col gap-3 rounded-2xl p-4 transition-colors duration-300 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <IconTile icon={step.icon} tint={step.tint} variant="glass" size="sm" />
                    <span className="numeral text-xs text-white/60">0{i + 1}</span>
                  </div>
                  <p className="font-semibold text-white">{t(step.label)}</p>
                  {lang === 'hi' && (
                    <p lang="en" className="-mt-2 text-xs uppercase tracking-wider text-white/60">
                      {step.english}
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2} className="mt-8 rounded-3xl border border-amber-300/30 bg-amber-400/10 p-6 sm:p-8">
            <p className="text-h3 font-bold text-amber-200">{t(temperQuote)}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
