import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { home } from '@/content/home'
import { pageMeta } from '@/content/pages'
import { ui } from '@/content/ui'
import { ActivitiesMosaic } from '@/features/home/ActivitiesMosaic'
import { FeaturedProjects } from '@/features/home/FeaturedProjects'
import { GalleryPreview } from '@/features/home/GalleryPreview'
import { HeroSection } from '@/features/home/HeroSection'
import { IntroSection } from '@/features/home/IntroSection'
import { JourneyStrip } from '@/features/home/JourneyStrip'
import { ProgramsLedger } from '@/features/home/ProgramsLedger'
import { StudentsBento } from '@/features/home/StudentsBento'
import { TeachersLedger } from '@/features/home/TeachersLedger'
import { TemperTeaser } from '@/features/home/TemperTeaser'
import { VisionMissionDuo } from '@/features/home/VisionMissionDuo'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

export default function Home() {
  const { t } = useLanguage()
  const meta = pageMeta.home
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" />
      <HeroSection />
      <JourneyStrip />
      <IntroSection />
      <VisionMissionDuo />
      <ActivitiesMosaic />
      <TemperTeaser />
      <StudentsBento />
      <TeachersLedger />
      <FeaturedProjects />
      <ProgramsLedger />
      <GalleryPreview />
      <CtaBand
        eyebrow={t(home.cta.eyebrow)}
        title={t(home.cta.title)}
        body={t(home.cta.body)}
        primary={
          <Button to="/contact?intent=join" size="lg" variant="amber" arrow>
            {t(ui.cta.join)}
          </Button>
        }
        secondary={
          <Button to="/contact" size="lg" variant="outline-light">
            {t(ui.cta.contact)}
          </Button>
        }
      />
    </>
  )
}
