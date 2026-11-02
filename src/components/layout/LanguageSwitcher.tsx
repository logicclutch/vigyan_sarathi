import { ui } from '@/content/ui'
import { LANGS, LANG_META } from '@/i18n/types'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

interface LanguageSwitcherProps {
  tone?: 'dark' | 'light'
  className?: string
}

export function LanguageSwitcher({ tone = 'dark', className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage()
  const dark = tone === 'dark'
  return (
    <div
      role="group"
      aria-label={t(ui.a11y.language)}
      className={cn(
        'inline-flex shrink-0 rounded-full p-1 text-xs font-semibold',
        dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-ink-900/5 ring-1 ring-ink-900/10',
        className,
      )}
    >
      {LANGS.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={LANG_META[code].label}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={cn(
              'min-w-10 rounded-full px-3 py-1.5 transition-colors duration-200',
              active
                ? dark
                  ? 'bg-white text-navy-900'
                  : 'bg-navy-900 text-white'
                : dark
                  ? 'text-white/85 hover:text-white'
                  : 'text-ink-600 hover:text-ink-900',
            )}
          >
            {LANG_META[code].short}
          </button>
        )
      })}
    </div>
  )
}
