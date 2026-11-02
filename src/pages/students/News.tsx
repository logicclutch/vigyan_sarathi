import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { ExtLink } from '@/components/ui/ExtLink'
import { FilterChips, type ChipOption } from '@/components/ui/FilterChips'
import { IconTile } from '@/components/ui/IconTile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/content/site'
import { newsSources, newsTips } from '@/content/students/news'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { LANG_META } from '@/i18n/types'
import { useLanguage } from '@/i18n/useLanguage'

type KindFilter = 'all' | 'india' | 'global'
const TIP_TINTS: Tint[] = ['amber', 'cyan', 'mint', 'violet', 'electric', 'orange']

export default function StudentsNews() {
  const { lang, t } = useLanguage()
  const [kind, setKind] = useState<KindFilter>('all')
  const sources = newsSources.filter((source) => kind === 'all' || source.kind === kind)
  const options: ChipOption<KindFilter>[] = [
    { value: 'all', label: t(ui.filters.all), count: newsSources.length },
    { value: 'india', label: t(ui.students.sourcesIndia), count: newsSources.filter((s) => s.kind === 'india').length },
    { value: 'global', label: t(ui.students.sourcesGlobal), count: newsSources.filter((s) => s.kind === 'global').length },
  ]
  const dateFormat = new Intl.DateTimeFormat(LANG_META[lang].locale, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <StudentSectionLayout sectionKey="news">
      <div className="space-y-20">
        {site.newsItems.length > 0 && (
          <section aria-labelledby="org-news">
            <SectionHeading id="org-news" eyebrow={t(ui.students.orgNewsTitle)} title={t(ui.students.orgNewsTitle)} />
            <ul className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {site.newsItems.map((item) => (
                <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                  <time dateTime={item.date} className="numeral text-sm text-ink-500 sm:col-span-3">
                    {dateFormat.format(new Date(item.date))}
                  </time>
                  <div className="sm:col-span-9">
                    <h3 className="text-lg font-bold">{item.url ? <ExtLink href={item.url}>{t(item.title)}</ExtLink> : t(item.title)}</h3>
                    <p className="mt-1 text-ink-600">{t(item.summary)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="sources-title">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="sources-title" eyebrow={t(ui.labels.source)} title={t(ui.students.sourcesTitle)} lead={t(ui.students.sourcesLead)} />
            <FilterChips options={options} value={kind} onChange={setKind} label={t(ui.filters.category)} size="sm" />
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {sources.map((source, i) => (
              <Reveal as="li" key={source.id} delay={i * 0.03} y={10}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <IconTile icon={source.kind === 'india' ? 'landmark' : 'globe'} tint={source.kind === 'india' ? 'amber' : 'electric'} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-bold text-ink-900 group-hover:text-electric-600">{t(source.name)}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-ink-400 group-hover:text-electric-600" />
                    </span>
                    <span className="mt-1 block text-sm text-ink-600">{t(source.description)}</span>
                    <span className="mt-2 inline-flex items-center gap-2">
                      <Badge tone="neutral">{source.kind === 'india' ? t(ui.students.sourcesIndia) : t(ui.students.sourcesGlobal)}</Badge>
                      <span className="truncate text-xs text-ink-500" lang="en">
                        {source.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </span>
                    </span>
                    <span className="sr-only"> ({t(ui.a11y.external)})</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tips-title" className="rounded-3xl bg-navy-950 p-7 text-white sm:p-10">
          <SectionHeading id="tips-title" tone="dark" eyebrow={t(ui.temper.habitsEyebrow)} title={t(ui.students.tipsTitle)} lead={t(ui.students.tipsLead)} />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsTips.map((tip, i) => (
              <li key={tip.id} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <IconTile icon={tip.icon} tint={TIP_TINTS[i % TIP_TINTS.length] ?? 'amber'} variant="glass" size="sm" />
                  <span className="numeral text-xs text-white/60" lang="en">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{t(tip.title)}</h3>
                <p className="mt-1 text-sm text-white/70">{t(tip.body)}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </StudentSectionLayout>
  )
}
