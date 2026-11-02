import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { IconTile } from '@/components/ui/IconTile'
import { QuoteBlock } from '@/components/ui/QuoteBlock'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { pageMeta } from '@/content/pages'
import { temperDefinition, temperHeading, temperIntro, temperTeachings, temperTeachingsLabel } from '@/content/scientificTemper'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { ClaimSorter } from '@/features/temper/ClaimSorter'
import { MindsetStages } from '@/features/temper/MindsetStages'
import { ProcessExplorer } from '@/features/temper/ProcessExplorer'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

const TEACHING_TINTS: Tint[] = ['amber', 'cyan', 'violet']

export default function ScientificTemper() {
  const { lang, t } = useLanguage()
  const meta = pageMeta.temper
  const [first, ...rest] = temperTeachings
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/scientific-temper" />
      <PageHero
        eyebrow={t(temperHeading)}
        title={t(meta.title)}
        lead={t(temperDefinition.lead)}
        motif="blueprint"
        glow="cyan"
        actions={
          <Button href="#process" variant="light" arrow>
            {t(ui.temper.startJourney)}
          </Button>
        }
      >
        <div className="mt-12 max-w-3xl">
          <p className="text-lg text-white/80">{t(temperDefinition.body)}</p>
          <MindsetStages className="mt-6" />
        </div>
      </PageHero>

      <Section id="process" tone="midnight" motif="blueprint" className="scroll-mt-20" aria-labelledby="process-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="process-title" tone="dark" eyebrow={t(ui.temper.processEyebrow)} title={t(ui.temper.processTitle)} lead={t(temperIntro)} />
          </Reveal>
          <div className="mt-12">
            <ProcessExplorer />
          </div>
        </div>
      </Section>

      <Section tone="paper" motif="lines" aria-labelledby="teachings-title">
        <div className="container-x">
          <SectionHeading id="teachings-title" align="center" eyebrow={t(ui.temper.habitsEyebrow)} title={t(temperTeachingsLabel)} />
          {first && (
            <Reveal className="mx-auto mt-12 max-w-4xl text-center">
              <QuoteBlock size="xl" align="center" quote={t(first.text)} />
            </Reveal>
          )}
          <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            {rest.map((teaching, i) => (
              <StaggerItem key={i} index={i} as="li" className="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-ink-900/8">
                <IconTile icon={teaching.icon} tint={TEACHING_TINTS[i + 1] ?? 'cyan'} />
                <p className="text-xl font-semibold text-ink-900">{t(teaching.text)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="sorter-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading id="sorter-title" eyebrow={t(ui.temper.sorterEyebrow)} title={t(ui.temper.sorterTitle)} lead={t(ui.temper.sorterIntro)} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ClaimSorter />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow={t(ui.temper.ctaTitle)}
        title={lang === 'hi' ? 'अब खेल-खेल में परखें।' : 'Now test it, playfully.'}
        body={t(ui.temper.ctaBody)}
        primary={
          <Button to="/students/quiz" size="lg" variant="amber" arrow>
            {t(ui.cta.startQuiz)}
          </Button>
        }
        secondary={
          <Button to="/students/myths" size="lg" variant="outline-light">
            {t(ui.labels.myth)} vs {t(ui.labels.fact)}
          </Button>
        }
      />
    </>
  )
}
