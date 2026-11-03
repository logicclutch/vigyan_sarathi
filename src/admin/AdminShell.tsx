import { useState, type ReactNode } from 'react'
import { ExternalLink, FileText, Images, LayoutDashboard, LogOut, Menu, Rocket, UserCog, Users, X } from 'lucide-react'
import { NavLink } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { GROUP_ORDER, modules } from './registry'
import { A, GROUP_LABELS, MODULE_LABELS } from './strings'
import { useAdminAuth } from './useAdminAuth'

const LINK = 'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white'
const ACTIVE = 'bg-white/15 text-white'

export function AdminShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const { user, logout } = useAdminAuth()
  const [open, setOpen] = useState(false)

  const top = [
    { to: '/admin', label: A.overview, icon: LayoutDashboard, end: true },
    { to: '/admin/publish', label: A.publish, icon: Rocket },
    { to: '/admin/media', label: A.media, icon: Images },
    ...(user?.role === 'admin' ? [{ to: '/admin/users', label: A.users, icon: Users }] : []),
    { to: '/admin/account', label: A.account, icon: UserCog },
  ]

  const nav = (
    <nav aria-label={t(A.panel)} className="space-y-6">
      <ul className="space-y-1">
        {top.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => cn(LINK, isActive && ACTIVE)}>
              <Icon aria-hidden="true" className="size-4" /> {t(label)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{t(A.content)}</p>
        {GROUP_ORDER.map((group) => (
          <details key={group} className="group/g" open={false}>
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white [&::-webkit-details-marker]:hidden">
              <FileText aria-hidden="true" className="size-4" /> {t(GROUP_LABELS[group] ?? { hi: group, en: group })}
            </summary>
            <ul className="mb-2 ml-4 space-y-0.5 border-l border-white/10 pl-2">
              {modules
                .filter((m) => m.group === group)
                .map((m) => (
                  <li key={m.key}>
                    <NavLink to={`/admin/content/${m.key}`} onClick={() => setOpen(false)} className={({ isActive }) => cn('block rounded-lg px-2 py-1.5 text-[13px] text-white/70 hover:bg-white/10 hover:text-white', isActive && 'bg-white/15 text-white')}>
                      {t(MODULE_LABELS[m.key] ?? { hi: m.key, en: m.key })}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </details>
        ))}
      </div>
    </nav>
  )

  return (
    <div className="min-h-dvh bg-cream-50 text-ink-900 lg:grid lg:grid-cols-[18rem_1fr]">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-navy-950 px-4 py-3 text-white lg:hidden">
        <Logo tone="dark" />
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="admin-nav" className="grid size-10 place-items-center rounded-full hover:bg-white/10">
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          <span className="sr-only">{t(A.sections)}</span>
        </button>
      </header>
      <aside id="admin-nav" className={cn('bg-navy-950 text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col', open ? 'block' : 'hidden lg:flex')}>
        <div className="hidden items-center justify-between gap-3 px-5 pt-5 lg:flex">
          <Logo tone="dark" />
        </div>
        <div className="px-3 pt-4 pb-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <p className="mb-4 px-3 text-xs text-white/60">
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 font-semibold text-amber-200">{t(A.panel)}</span>
          </p>
          {nav}
        </div>
        <div className="space-y-3 border-t border-white/10 px-5 py-4 text-xs text-white/70">
          <p className="truncate">
            {t(A.loggedInAs)} <span className="font-semibold text-white">{user?.email}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <LanguageSwitcher tone="dark" />
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 font-semibold text-white hover:bg-white/10">
              <ExternalLink aria-hidden="true" className="size-3.5" /> {t(A.openSite)}
            </a>
            <button type="button" onClick={() => void logout()} className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 font-semibold text-white hover:bg-white/10">
              <LogOut aria-hidden="true" className="size-3.5" /> {t(A.signOut)}
            </button>
          </div>
        </div>
      </aside>
      <main id="main" className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  )
}
