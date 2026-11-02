import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/Button'
import { pageMeta } from '@/content/pages'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { Seo } from '@/lib/seo'

export default function NotFound() {
  const { t } = useLanguage()
  const meta = pageMeta.notFound
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/404" noindex />
      <PageHero
        eyebrow={t(meta.eyebrow)}
        title={t(meta.title)}
        lead={t(meta.lead)}
        motif="orbits"
        className="min-h-[70dvh]"
        actions={
          <>
            <Button to="/" variant="light" arrow>
              {t(ui.cta.home)}
            </Button>
            <Button to="/contact" variant="outline-light">
              {t(ui.cta.contact)}
            </Button>
          </>
        }
      />
    </>
  )
}
