import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { NavLink } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { primaryNav } from '@/content/nav'
import { site } from '@/content/site'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    else if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      id="mobile-menu"
      aria-label={t(ui.a11y.mainNav)}
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy-950 p-0 text-white open:motion-safe:animate-menu-in"
    >
      {open && (
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="container-x flex h-(--header-h) shrink-0 items-center justify-between">
            <Logo tone="dark" />
            <button
              type="button"
              onClick={onClose}
              aria-label={t(ui.a11y.closeMenu)}
              className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="container-x flex-1 py-6">
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-2xl px-4 py-3 text-2xl font-semibold transition-colors',
                        isActive ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    {t(item.label)}
                  </NavLink>
                  {item.children && (
                    <ul className="ml-5 mt-1 space-y-0.5 border-l border-white/10 pl-4" aria-label={t(ui.a11y.menuSub)}>
                      {item.children
                        .filter((child) => child.to !== item.to)
                        .map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={onClose}
                              className={({ isActive }) =>
                                cn(
                                  'block rounded-xl px-3 py-2 text-base transition-colors',
                                  isActive ? 'text-cyan-200' : 'text-white/65 hover:text-white',
                                )
                              }
                            >
                              {t(child.label)}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-x flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-white/10 py-5">
            <LanguageSwitcher tone="dark" />
            <Button to="/contact?intent=join" size="sm" variant="light" arrow>
              {t(ui.cta.join)}
            </Button>
          </div>
          <p className="container-x shrink-0 pb-6 text-sm text-white/45" lang="hi">
            {site.tagline.hi}
          </p>
        </div>
      )}
    </dialog>
  )
}
