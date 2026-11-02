import type { LucideProps } from 'lucide-react'
import { ICONS, type IconName } from '@/lib/icons'

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName
  /** Provide a label when the icon carries meaning; otherwise it is decorative. */
  label?: string
}

export function Icon({ name, label, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  const Cmp = ICONS[name]
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...rest}
    />
  )
}
