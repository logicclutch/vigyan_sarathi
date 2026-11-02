import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { OrbitRings } from '@/components/science/OrbitRings'
import { IconTile } from '@/components/ui/IconTile'
import type { Activity } from '@/content/types'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { trackSpotlight } from '@/lib/spotlight'
import { TINTS } from '@/lib/tints'

interface ActivityTileProps {
  activity: Activity
  featured?: boolean
  className?: string
}

export function ActivityTile({ activity, featured = false, className }: ActivityTileProps) {
  const { t } = useLanguage()
  const tint = TINTS[activity.tint]
  return (
    <Link
      to={`/activities/${activity.slug}`}
      onPointerMove={trackSpotlight}
      className={cn(
        'spotlight group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift sm:p-8',
        tint.soft,
        className,
      )}
    >
      {featured && <OrbitRings tone="light" className="pointer-events-none absolute -bottom-40 -right-40 w-[460px] opacity-60" />}
      <div className="relative flex items-start justify-between gap-4">
        <IconTile icon={activity.icon} tint={activity.tint} variant="outline" size={featured ? 'lg' : 'md'} />
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-ink-400 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900"
        />
      </div>
      <div className={cn('relative', featured ? 'mt-16 sm:mt-24' : 'mt-10')}>
        <h3 className={cn('font-bold', featured ? 'text-h2' : 'text-h3')}>{t(activity.title)}</h3>
        <p className={cn('mt-2 text-ink-600', featured ? 'max-w-md text-lg' : 'text-sm sm:text-base')}>{t(activity.short)}</p>
      </div>
    </Link>
  )
}
