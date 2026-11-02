import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { PageHero } from '@/components/layout/PageHero'
import { IconTile } from '@/components/ui/IconTile'
import { Section } from '@/components/ui/Section'
import { pageMeta } from '@/content/pages'
import { studentSectionMap, studentSections } from '@/content/students/index'
import type { StudentSectionKey, Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'
import { Seo } from '@/lib/seo'
import { TINTS } from '@/lib/tints'

const GLOW: Record<Tint, 'electric' | 'amber' | 'cyan' | 'violet' | 'mint'> = {
  electric: 'electric',
  cyan: 'cyan',
  amber: 'amber',
  orange: 'amber',
  mint: 'mint',
  rose: 'violet',
  violet: 'violet',
  navy: 'electric',
  teal: 'cyan',
}

interface Props {
  sectionKey: StudentSectionKey
  toolbar?: ReactNode
  count?: number
  intro?: ReactNode
  children: ReactNode
}

export function StudentSectionLayout({ sectionKey, toolbar, count, intro, children }: Props) {
  const { t } = useLanguage()
  const section = studentSectionMap[sectionKey]
  return (
    <>
      <Seo title={section.title} description={section.description} path={`/students/${sectionKey}`} />
      <PageHero
        eyebrow={
          <Link to="/students" className="inline-flex items-center gap-1.5 hover:underline">
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            {t(pageMeta.students.title)}
          </Link>
        }
        title={t(section.title)}
        lead={t(section.description)}
        motif="dots"
        glow={GLOW[section.tint]}
        compact
      >
        {intro}
      </PageHero>
      {toolbar && (
        <div className="sticky top-(--header-h) z-30 border-b border-ink-900/10 bg-cream-50/90 backdrop-blur">
          <div className="container-x flex min-w-0 flex-wrap items-center gap-3 py-3">
            {toolbar}
            {count !== undefined && <span className="numeral ml-auto text-sm text-ink-500">{fmt(t(ui.labels.items), { count })}</span>}
          </div>
        </div>
      )}
      <Section tone="cream" aria-label={t(section.title)}>
        <div className="container-x">{children}</div>
      </Section>
      <OtherSections current={sectionKey} />
    </>
  )
}

export function OtherSections({ current }: { current: StudentSectionKey }) {
  const { t } = useLanguage()
  return (
    <Section tone="paper" motif="lines" padded={false} aria-label={t(ui.students.otherSections)}>
      <div className="container-x py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.students.otherSections)}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {studentSections
            .filter((section) => section.key !== current)
            .map((section) => (
              <li key={section.key}>
                <Link
                  to={`/students/${section.key}`}
                  className={`inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium ring-1 ring-ink-900/10 transition-colors hover:ring-ink-900/30 ${TINTS[section.tint].text}`}
                >
                  <IconTile icon={section.icon} tint={section.tint} size="sm" className="size-7 rounded-full [&_svg]:size-3.5" />
                  <span className="text-ink-800">{t(section.short)}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Section>
  )
}
