import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { SocialIcon } from '@/components/brand/SocialIcon'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { OrbitRings } from '@/components/science/OrbitRings'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { DevReviewBadge } from '@/components/ui/DevReviewBadge'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { contactFaqs, joinWays } from '@/content/contact'
import { pageMeta } from '@/content/pages'
import { SOCIAL_LABELS, site } from '@/content/site'
import { resources } from '@/content/teachers/resources'
import type { SocialKey, Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { ContactForm } from '@/features/contact/ContactForm'
import { intentToSubject } from '@/features/contact/contactLogic'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'
import { Seo } from '@/lib/seo'

const WAY_TINTS: Tint[] = ['amber', 'electric', 'rose', 'cyan']

export default function Contact() {
  const { t } = useLanguage()
  const meta = pageMeta.contact
  const [params, setParams] = useSearchParams()
  const intent = params.get('intent')
  const subject = intentToSubject(intent)
  const resourceId = params.get('resource')
  const requested = resourceId ? resources.find((r) => r.id === resourceId) : undefined
  const initialMessage = requested ? fmt(t(ui.form.resourceRequest), { title: t(requested.title) }) : ''
  const socials = (Object.entries(site.social) as [SocialKey, string | undefined][]).filter((entry): entry is [SocialKey, string] => Boolean(entry[1]))
  const address = site.contact.address?.hi ? site.contact.address : undefined
  const hours = site.contact.hours?.hi ? site.contact.hours : undefined
  const hasDetails = Boolean(site.contact.email || site.contact.phone || address || hours)

  const chooseWay = (nextSubject: string) => {
    const next = new URLSearchParams(params)
    next.set('intent', nextSubject)
    next.delete('resource')
    setParams(next, { replace: true })
    document.getElementById('contact-form')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/contact" />
      <PageHero eyebrow={t(meta.eyebrow)} title={t(meta.title)} lead={t(meta.lead)} motif="orbits" glow="amber" compact />

      <Section tone="cream" motif="lines" aria-label={t(meta.title)}>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 space-y-10 lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow={t(ui.contact.joinTitle)} title={t(ui.contact.joinTitle)} lead={t(ui.contact.joinBody)} />
              <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {joinWays.map((way, i) => (
                  <li key={way.id}>
                    <button
                      type="button"
                      onClick={() => chooseWay(way.subject)}
                      aria-pressed={subject === way.subject}
                      className="group flex w-full items-center gap-4 py-4 text-left"
                    >
                      <IconTile icon={way.icon} tint={WAY_TINTS[i] ?? 'electric'} variant={subject === way.subject ? 'solid' : 'soft'} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-ink-900 group-hover:text-electric-600">{t(way.title)}</span>
                        <span className="block text-sm text-ink-600">{t(way.body)}</span>
                      </span>
                      <span aria-hidden="true" className="text-ink-400 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 text-white sm:p-8">
              <OrbitRings className="absolute -right-32 -top-32 w-[420px] opacity-60" />
              <div className="relative">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.contact.detailsTitle)}</h2>
                {hasDetails ? (
                  <ul className="mt-5 space-y-4">
                    {site.contact.email && (
                      <li className="flex items-start gap-3">
                        <Mail aria-hidden="true" className="mt-1 size-4 text-amber-300" />
                        <a href={`mailto:${site.contact.email}`} className="break-all hover:text-cyan-200">
                          {site.contact.email}
                        </a>
                      </li>
                    )}
                    {site.contact.phone && (
                      <li className="flex items-start gap-3">
                        <Phone aria-hidden="true" className="mt-1 size-4 text-amber-300" />
                        <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-200">
                          {site.contact.phone}
                        </a>
                      </li>
                    )}
                    {address && (
                      <li className="flex items-start gap-3">
                        <MapPin aria-hidden="true" className="mt-1 size-4 text-amber-300" />
                        <span>{t(address)}</span>
                      </li>
                    )}
                    {hours && (
                      <li className="flex items-start gap-3">
                        <Clock aria-hidden="true" className="mt-1 size-4 text-amber-300" />
                        <span>{t(hours)}</span>
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="mt-5">
                    <ul className="space-y-3 text-white/80">
                      {[
                        { icon: Mail, label: ui.contact.email },
                        { icon: Phone, label: ui.contact.phone },
                        { icon: MapPin, label: ui.contact.address },
                      ].map(({ icon: Icon, label }, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Icon aria-hidden="true" className="size-4 text-amber-300" />
                          <span>{t(label)}</span>
                          <Badge tone="glass" className="ml-auto">
                            {t(ui.contact.pending)}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-white/55">{t(ui.contact.pendingNote)}</p>
                  </div>
                )}
                {socials.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.contact.social)}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {socials.map(([key, url]) => (
                        <li key={key}>
                          <a href={url} target="_blank" rel="noreferrer noopener" aria-label={SOCIAL_LABELS[key]} className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-cyan-300 hover:text-navy-950">
                            <SocialIcon name={key} className="size-5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.contact.mapTitle)}</h2>
              {site.contact.mapEmbedUrl ? (
                <iframe
                  title={t(ui.contact.mapTitle)}
                  src={site.contact.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-3 aspect-[4/3] w-full rounded-3xl border-0 ring-1 ring-ink-900/10"
                />
              ) : (
                <div className="bg-blueprint-light mt-3 flex aspect-[4/3] items-center justify-center rounded-3xl bg-cream-100 ring-1 ring-ink-900/10">
                  <div className="text-center">
                    <IconTile icon="mapPin" tint="amber" size="lg" className="mx-auto" />
                    <p className="mt-3 max-w-xs text-sm text-ink-500">{t(ui.contact.mapPlaceholder)}</p>
                  </div>
                </div>
              )}
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={0.05} id="contact-form" className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/8 sm:p-10">
              <SectionHeading eyebrow={t(ui.contact.formTitle)} title={t(ui.contact.formTitle)} lead={t(ui.contact.formIntro)} as="h2" size="h3" />
              <div className="mt-8">
                <ContactForm key={`${subject}-${resourceId ?? ''}`} initialSubject={subject} initialMessage={initialMessage} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={t({ hi: 'अक्सर पूछे जाने वाले प्रश्न', en: 'Frequently asked questions' })} />
            <DevReviewBadge review className="mt-4" />
          </div>
          <div className="lg:col-span-8">
            <Accordion name="contact-faq" items={contactFaqs.map((faq) => ({ id: faq.id, title: t(faq.q), body: <p>{t(faq.a)}</p> }))} />
          </div>
        </div>
      </Section>
    </>
  )
}
