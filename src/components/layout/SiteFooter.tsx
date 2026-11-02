import { Link } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { SocialIcon } from '@/components/brand/SocialIcon'
import { footerNav } from '@/content/nav'
import { SOCIAL_LABELS, site } from '@/content/site'
import type { NavItem, SocialKey } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { LanguageSwitcher } from './LanguageSwitcher'

function FooterColumn({ title, links }: { title: string; links: NavItem[] }) {
  const { t } = useLanguage()
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-white/85 transition-colors hover:text-cyan-200">
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  const { t } = useLanguage()
  const year = YEAR
  const socials = (Object.entries(site.social) as [SocialKey, string | undefined][]).filter(
    (entry): entry is [SocialKey, string] => Boolean(entry[1]),
  )

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots-light opacity-25 mask-fade-b" />
      <div aria-hidden="true" className="absolute -right-32 -top-32 -z-10 size-[420px] rounded-full bg-electric-600/20 blur-3xl" />
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" size="lg" />
            <p className="mt-6 max-w-md text-lg text-white/80">{t(site.tagline)}</p>
            <p className="mt-4 text-sm text-cyan-200/80">{t(site.message)}</p>
          </div>
          <nav aria-label={t(ui.a11y.footerNav)} className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title={t(ui.footer.explore)} links={footerNav.explore} />
            <FooterColumn title={t(ui.footer.corners)} links={footerNav.corners} />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{t(ui.footer.connect)}</h2>
              <ul className="mt-4 space-y-2.5 text-white/85">
                <li>
                  <Link to="/contact" className="transition-colors hover:text-cyan-200">
                    {t(ui.cta.contact)}
                  </Link>
                </li>
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="break-all transition-colors hover:text-cyan-200">
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {site.contact.phone && (
                  <li>
                    <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-cyan-200">
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                {!site.contact.email && !site.contact.phone && (
                  <li className="text-sm text-white/50">{t(ui.footer.contactPending)}</li>
                )}
              </ul>
              {socials.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {socials.map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={SOCIAL_LABELS[key]}
                        className="grid size-10 place-items-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-cyan-300 hover:text-navy-950"
                      >
                        <SocialIcon name={key} className="size-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t(site.name)}. {t(ui.footer.rights)}
          </p>
          <LanguageSwitcher tone="dark" />
        </div>
      </div>
    </footer>
  )
}
