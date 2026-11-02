import { cn } from '@/lib/cn'
import { Logomark } from './Logomark'

interface LogoProps {
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MARK = { sm: 'h-8 w-auto', md: 'h-9 w-auto sm:h-10', lg: 'h-14 w-auto' } as const
const HINDI = { sm: 'text-base', md: 'text-lg sm:text-xl', lg: 'text-2xl' } as const

/** Logomark + bilingual wordmark. The wordmark stays live text so it stays crisp and themeable. */
export function Logo({ tone = 'dark', size = 'md', className }: LogoProps) {
  const onDark = tone === 'dark'
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Logomark tone={tone} className={MARK[size]} />
      <span className="flex flex-col leading-none">
        <span lang="hi" className={cn('whitespace-nowrap font-hindi font-bold', HINDI[size], onDark ? 'text-white' : 'text-navy-900')}>
          विज्ञान सारथी
        </span>
        <span
          lang="en"
          className={cn('mt-1 whitespace-nowrap font-sans text-[0.6rem] font-semibold uppercase tracking-[0.22em]', onDark ? 'text-cyan-200' : 'text-electric-700')}
        >
          Vigyan Sarathi
        </span>
      </span>
    </span>
  )
}
