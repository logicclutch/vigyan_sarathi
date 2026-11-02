import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { primaryNav } from '@/content/nav'
import type { NavItem } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

const LINK = 'inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.9rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white'
const LINK_ACTIVE = 'bg-white/10 text-white'

function NavDropdown({ item }: { item: NavItem }) {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const children = item.children ?? []
  const active = children.some((child) => pathname === child.to || pathname.startsWith(`${child.to}/`))

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = window.setTimeout(() => setOpen(false), 140)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(LINK, (active || open) && LINK_ACTIVE)}
      >
        {t(item.label)}
        <ChevronDown aria-hidden="true" className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2">
          <div className="glass-strong min-w-60 rounded-2xl p-2 shadow-lift motion-safe:animate-menu-in">
            {children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-xl px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                    isActive && 'bg-white/10 text-white',
                  )
                }
              >
                {t(child.label)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SiteHeader() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300',
        scrolled ? 'glass-strong shadow-soft' : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-(--header-h) items-center justify-between gap-4">
        <Link to="/" className="shrink-0 rounded-xl">
          <Logo tone="dark" />
        </Link>

        <nav aria-label={t(ui.a11y.mainNav)} className="hidden items-center gap-0.5 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.to} item={item} />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(LINK, isActive && LINK_ACTIVE)}
              >
                {t(item.label)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher tone="dark" />
          <div className="hidden xl:block">
            <Button to="/contact?intent=join" size="sm" variant="light">
              {t(ui.cta.join)}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t(ui.a11y.openMenu)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
