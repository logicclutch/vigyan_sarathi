import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'light'
  | 'outline'
  | 'outline-light'
  | 'ghost'
  | 'ghost-light'
  | 'amber'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  /** Append the default arrow icon */
  arrow?: boolean
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps & { to: string; href?: never } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    'to' | 'className' | 'children'
  >
type AnchorButtonProps = CommonProps & { href: string; to?: never } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className' | 'children'
  >
type NativeButtonProps = CommonProps & { to?: never; href?: never } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className' | 'children'
  >

export type ButtonProps = LinkButtonProps | AnchorButtonProps | NativeButtonProps

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-electric-500 text-white shadow-[0_10px_30px_-10px_rgb(37_99_235/0.7)] hover:bg-electric-400 hover:shadow-[0_14px_34px_-10px_rgb(59_130_246/0.8)]',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800',
  light: 'bg-white text-navy-900 hover:bg-cream-100',
  outline: 'border border-ink-900/15 bg-transparent text-ink-900 hover:border-ink-900/40 hover:bg-white',
  'outline-light': 'border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10',
  ghost: 'bg-transparent text-electric-600 hover:bg-electric-100',
  'ghost-light': 'bg-transparent text-cyan-200 hover:bg-white/10 hover:text-white',
  amber: 'bg-amber-400 text-navy-950 shadow-[0_10px_30px_-10px_rgb(251_191_36/0.7)] hover:bg-amber-300',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm [&_svg]:size-4',
  md: 'h-12 px-6 text-[0.95rem] [&_svg]:size-[1.125rem]',
  lg: 'h-14 px-8 text-base [&_svg]:size-5',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconPosition = 'right', arrow = false, className, children, ...rest } =
    props
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)
  const trailing = icon && iconPosition === 'right' ? icon : arrow ? <ArrowRight aria-hidden="true" /> : null
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {trailing && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{trailing}</span>
      )}
    </>
  )

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest
    return (
      <Link to={to} className={classes} {...(linkRest as Omit<ComponentPropsWithoutRef<typeof Link>, 'to'>)}>
        {content}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(anchorRest as ComponentPropsWithoutRef<'a'>)}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {content}
    </button>
  )
}
