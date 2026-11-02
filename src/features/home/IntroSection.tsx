import { Reveal } from '@/components/motion/Reveal'
import { Starfield } from '@/components/science/Starfield'
import { Button } from '@/components/ui/Button'
import { QuoteBlock } from '@/components/ui/QuoteBlock'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { learningCulture } from '@/content/about'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'

export function IntroSection() {
  const { t } = useLanguage()
  return (
    <Section tone="cream" motif="lines" aria-labelledby="intro-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading id="intro-title" eyebrow={t(home.intro.eyebrow)} title={t(home.intro.title)} />
          </Reveal>
          <Reveal delay={0.1} className="relative mt-10 overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
            <Starfield className="opacity-70" seed={9} count={70} />
            <div className="relative">
              <QuoteBlock tone="dark" size="lg" quote={t(learningCulture.message)} attribution={t(learningCulture.messageLabel)} />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-6">
            <Button to="/about" variant="ghost" arrow>
              {t(ui.cta.aboutUs)}
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          {home.intro.paragraphs.map((paragraph, i) => (
            <Reveal key={i} as="p" delay={i * 0.05} className="text-lg text-ink-700 [&+p]:mt-5">
              {t(paragraph)}
            </Reveal>
          ))}
          <ol className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {home.intro.principles.map((principle, i) => (
              <Reveal key={i} as="li" delay={0.05 * i} className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                <span className="numeral text-sm font-semibold text-electric-600 sm:col-span-2 sm:pt-1">0{i + 1}</span>
                <div className="sm:col-span-10">
                  <h3 className="text-lg font-bold">{t(principle.title)}</h3>
                  <p className="mt-1 text-ink-600">{t(principle.body)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
