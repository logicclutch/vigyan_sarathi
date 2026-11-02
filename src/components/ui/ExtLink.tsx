import type { ComponentPropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

interface ExtLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string
  icon?: boolean
}

/** External anchor: new tab, safe rel, screen-reader hint, small arrow. */
export function ExtLink({ href, icon = true, className, children, ...rest }: ExtLinkProps) {
  const { t } = useLanguage()
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn('inline-flex items-center gap-1 underline-offset-4 hover:underline', className)}
      {...rest}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
      <span className="sr-only"> ({t(ui.a11y.external)})</span>
    </a>
  )
}
