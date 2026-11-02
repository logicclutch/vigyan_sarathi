import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { PageHero } from '@/components/layout/PageHero'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBand } from '@/components/ui/CtaBand'
import { DevReviewBadge } from '@/components/ui/DevReviewBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { Lightbox } from '@/components/ui/Lightbox'
import { Section } from '@/components/ui/Section'
import { galleryCategories, galleryItems } from '@/content/gallery'
import { home } from '@/content/home'
import { pageMeta } from '@/content/pages'
import type { GalleryCategory } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'
import { Seo } from '@/lib/seo'

type CategoryFilter = 'all' | GalleryCategory
const KEYS = new Set<string>(galleryCategories.map((category) => category.key))

export default function Gallery() {
  const { t } = useLanguage()
  const meta = pageMeta.gallery
  const [params, setParams] = useSearchParams()
  const rawCategory = params.get('category')
  const category: CategoryFilter = rawCategory && KEYS.has(rawCategory) ? (rawCategory as GalleryCategory) : 'all'
  const [index, setIndex] = useState<number | null>(null)

  const setCategory = (value: CategoryFilter) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('category')
    else next.set('category', value)
    setParams(next, { replace: true })
    setIndex(null)
  }

  const filtered = galleryItems.filter((item) => category === 'all' || item.category === category)
  const options: ChipOption<CategoryFilter>[] = [
    { value: 'all', label: t(ui.filters.all), count: galleryItems.length },
    ...galleryCategories.map((item) => ({ value: item.key, label: t(item.label), count: galleryItems.filter((g) => g.category === item.key).length })),
  ]
  const labelFor = (key: GalleryCategory) => galleryCategories.find((item) => item.key === key)?.label
  const hasPlaceholders = filtered.some((item) => item.placeholder)

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/gallery" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="stars" glow="violet" compact />

      <div className="sticky top-(--header-h) z-30 border-b border-white/10 bg-navy-950/85 text-white backdrop-blur">
        <div className="container-x flex flex-wrap items-center gap-3 py-3">
          <FilterChips options={options} value={category} onChange={setCategory} label={t(ui.gallery.filterLabel)} tone="dark" size="sm" className="flex-1" />
          <span className="numeral ml-auto text-sm text-white/60">{fmt(t(ui.labels.items), { count: filtered.length })}</span>
        </div>
      </div>

      <Section tone="midnight" aria-label={t(meta.title)}>
        <div className="container-x">
          {hasPlaceholders && import.meta.env.DEV && (
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <DevReviewBadge review />
              <span>{t(ui.gallery.placeholderNote)}</span>
            </div>
          )}
          {filtered.length === 0 ? (
            <EmptyState tone="dark" icon="image" title={t(ui.search.noResults)} action={<Button variant="light" size="sm" onClick={() => setCategory('all')}>{t(ui.search.clearFilters)}</Button>} />
          ) : (
            <Stagger as="ul" className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3 [&>li]:break-inside-avoid" step={0.04}>
              {filtered.map((item, i) => {
                const label = labelFor(item.category)
                return (
                  <StaggerItem key={item.id} index={i} as="li">
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      className="group relative block w-full overflow-hidden rounded-2xl ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-cyan-400"
                    >
                      <img
                        src={item.src}
                        alt=""
                        width={item.w}
                        height={item.h}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/5 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                      {item.placeholder && (
                        <Badge tone="glass" className="absolute left-3 top-3">
                          {t(ui.labels.placeholder)}
                        </Badge>
                      )}
                      <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-left">
                        <span>
                          {label && <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">{t(label)}</span>}
                          <span className="block text-sm font-semibold text-white">{t(item.caption)}</span>
                          <span className="sr-only">. {t(item.alt)}. {t(ui.gallery.open)}</span>
                        </span>
                        <Maximize2 aria-hidden="true" className="size-4 shrink-0 text-white/70 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                      </span>
                    </button>
                  </StaggerItem>
                )
              })}
            </Stagger>
          )}
        </div>
      </Section>

      <Lightbox
        items={filtered.map((item) => ({ src: item.src, alt: t(item.alt), caption: t(item.caption), w: item.w, h: item.h }))}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />

      <CtaBand
        eyebrow={t(home.cta.eyebrow)}
        title={t(home.programs.invite)}
        body={t(home.programs.lead)}
        primary={
          <Button to="/contact?intent=school" size="lg" variant="amber" arrow>
            {t(home.programs.invite)}
          </Button>
        }
      />
    </>
  )
}
