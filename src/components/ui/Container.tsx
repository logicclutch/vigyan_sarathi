import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'article' | 'nav' | 'header' | 'footer' | 'aside'
}

export function Container({ as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag className={cn('container-x', className)} {...rest} />
}
