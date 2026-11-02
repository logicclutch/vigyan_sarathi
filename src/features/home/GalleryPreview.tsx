import { Link } from 'react-router'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { galleryCategories, galleryItems } from '@/content/gallery'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

const SPANS = ['col-span-2 row-span-2', '', '', '', '', '']

export function GalleryPreview() {
  const { t } = useLanguage()
  const picks = galleryCategories
    .map((category) => galleryItems.find((item) => item.category === category.key))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 6)
  const labelFor = (key: string) => galleryCategories.find((category) => category.key === key)?.label

  return (
    <Section tone="midnight" aria-labelledby="gallery-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="gallery-title" tone="dark" eyebrow={t(home.gallery.eyebrow)} title={t(home.gallery.title)} lead={t(home.gallery.lead)} />
          <Button to="/gallery" variant="outline-light" arrow className="shrink-0">
            {t(ui.cta.openGallery)}
          </Button>
        </div>
        <Stagger className="mt-12 grid grid-cols-2 auto-rows-[150px] gap-3 sm:auto-rows-[190px] md:grid-cols-3 md:auto-rows-[210px]">
          {picks.map((item, i) => {
            const label = labelFor(item.category)
            return (
              <StaggerItem key={item.id} index={i} className={cn(SPANS[i])}>
                <Link
                  to={`/gallery?category=${item.category}`}
                  className="group relative block h-full overflow-hidden rounded-2xl ring-1 ring-white/10"
                >
                  <span className="sr-only">{t(item.alt)}. </span>
                  <img
                    src={item.src}
                    alt=""
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                  {item.placeholder && (
                    <Badge tone="glass" className="absolute left-3 top-3">
                      {t(ui.labels.placeholder)}
                    </Badge>
                  )}
                  {label && <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{t(label)}</span>}
                </Link>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </Section>
  )
}
