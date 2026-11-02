import { Badge } from '@/components/ui/Badge'
import { DecorNumeral } from '@/components/ui/DecorNumeral'
import { Dialog } from '@/components/ui/Dialog'
import { IconTile } from '@/components/ui/IconTile'
import { modelIdeas } from '@/content/students/models'
import type { Tint } from '@/content/types'
import { ui } from '@/content/ui'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'
import { useHashOpen } from '@/lib/useHashOpen'
import { TINTS } from '@/lib/tints'

const TINT_CYCLE: Tint[] = ['violet', 'cyan', 'amber', 'mint', 'electric', 'orange', 'teal', 'rose']

export default function StudentsModels() {
  const { t } = useLanguage()
  const [openId, setOpenId] = useHashOpen((id) => modelIdeas.some((m) => m.id === id))
  const open = modelIdeas.find((m) => m.id === openId) ?? null

  return (
    <StudentSectionLayout sectionKey="models" count={modelIdeas.length}>
      <ol className="divide-y divide-ink-900/10 border-y border-ink-900/10">
        {modelIdeas.map((model, i) => {
          const tint = TINT_CYCLE[i % TINT_CYCLE.length] ?? 'violet'
          return (
            <li key={model.id} id={model.id} className="scroll-mt-40">
              <button
                type="button"
                onClick={() => setOpenId(model.id)}
                className="group grid w-full items-center gap-4 py-6 text-left sm:grid-cols-12 sm:gap-6"
              >
                <DecorNumeral value={String(i + 1).padStart(2, '0')} className="text-5xl font-bold leading-none text-navy-900/10 sm:col-span-2" />
                <span className="flex items-center gap-4 sm:col-span-6">
                  <IconTile icon="shapes" tint={tint} />
                  <span>
                    <span className="block text-xl font-bold text-ink-900 group-hover:text-electric-600">{t(model.title)}</span>
                    <span className="mt-1 block text-ink-600">{t(model.summary)}</span>
                  </span>
                </span>
                <span className="flex flex-wrap gap-2 sm:col-span-3">
                  <Badge tone="neutral">{t(ui.topics[model.topic])}</Badge>
                  <Badge tone="neutral">{t(ui.grades[model.grade])}</Badge>
                </span>
                <span className={`text-sm font-semibold sm:col-span-1 sm:justify-self-end ${TINTS[tint].text}`}>{t(ui.students.openModel)} →</span>
              </button>
            </li>
          )
        })}
      </ol>

      <Dialog open={open !== null} onClose={() => setOpenId(null)} title={open ? t(open.title) : ''} description={open ? `${t(ui.topics[open.topic])} · ${t(ui.grades[open.grade])}` : undefined}>
        {open && (
          <div key={open.id} className="space-y-8">
            <p className="text-lg text-ink-700">{t(open.summary)}</p>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">{t(ui.labels.howTo)}</h3>
              <ol className="mt-3 space-y-3">
                {open.howTo.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="numeral grid size-7 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{i + 1}</span>
                    <p className="text-ink-800">{t(step)}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{t(ui.labels.concept)}</p>
              <p className="mt-2 text-white/85">{t(open.concept)}</p>
            </div>
          </div>
        )}
      </Dialog>
    </StudentSectionLayout>
  )
}
