import { cn } from '@/lib/cn'

/**
 * Oversized decorative numerals/initials rendered through CSS `content`, so they
 * are never read by assistive tech and never counted as low-contrast text.
 */
export function DecorNumeral({ value, className, lang = 'en' }: { value: string; className?: string; lang?: string }) {
  return <span aria-hidden="true" lang={lang} data-n={value} className={cn('numeral select-none before:content-[attr(data-n)]', className)} />
}
