import { OrbitRings } from '@/components/science/OrbitRings'
import { Starfield } from '@/components/science/Starfield'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { mission, vision } from '@/content/visionMission'
import { useLanguage } from '@/i18n/useLanguage'

export function VisionMissionDuo() {
  const { t } = useLanguage()
  return (
    <section aria-labelledby="vm-title" className="grid lg:grid-cols-2">
      <h2 id="vm-title" className="sr-only">
        {t(home.visionMission.title)}
      </h2>
      <div className="relative isolate overflow-hidden bg-navy-950 px-5 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <Starfield className="-z-10 opacity-80" seed={5} />
        <div aria-hidden="true" className="absolute -left-20 bottom-0 -z-10 size-[420px] rounded-full bg-electric-600/25 blur-3xl" />
        <div className="mx-auto max-w-xl lg:ml-auto lg:mr-10">
          <Eyebrow tone="dark">{t(vision.label)}</Eyebrow>
          <p className="mt-6 text-h2 font-bold">{t(vision.statement)}</p>
          <Button to="/vision-mission" variant="ghost-light" arrow className="mt-8">
            {t(ui.cta.readMore)}
          </Button>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-cream-100 px-5 py-20 text-ink-900 sm:px-10 lg:px-16 lg:py-28">
        <OrbitRings tone="light" className="absolute -right-48 -top-48 -z-10 w-[680px] opacity-80" />
        <div className="mx-auto max-w-xl lg:ml-10 lg:mr-auto">
          <Eyebrow>{t(mission.label)}</Eyebrow>
          <p className="mt-6 text-h2 font-bold">{t(mission.statement)}</p>
          <Button to="/vision-mission" variant="ghost" arrow className="mt-8">
            {t(ui.cta.readMore)}
          </Button>
        </div>
      </div>
    </section>
  )
}
