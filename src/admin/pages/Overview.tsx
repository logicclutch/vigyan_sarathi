import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CircleCheck, CircleDashed, Rocket } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { fmt } from '@/lib/format'
import { api, type ContentMeta, type PublishStatus } from '../api'
import { GROUP_ORDER, modules } from '../registry'
import { A, GROUP_LABELS, MODULE_LABELS } from '../strings'
import { formatStamp } from '../components/helpers'
import { Notice, Panel } from '../components/ui'

export default function OverviewPage() {
  const { t, lang } = useLanguage()
  const [meta, setMeta] = useState<Record<string, ContentMeta>>({})
  const [publish, setPublish] = useState<PublishStatus | null>(null)

  useEffect(() => {
    void api<{ modules: Record<string, ContentMeta> }>('/content').then((d) => setMeta(d.modules)).catch(() => undefined)
    void api<PublishStatus>('/publish/status').then(setPublish).catch(() => undefined)
  }, [])

  const customised = Object.keys(meta).length
  const latestEdit = Object.values(meta).reduce((max, m) => (m.updatedAt > max ? m.updatedAt : max), '')
  const lastPublished = publish?.last?.state === 'succeeded' ? (publish.last.finishedAt ?? '') : ''
  const needsPublish = latestEdit !== '' && latestEdit > lastPublished

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t(A.overview)}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">{t(A.welcome)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{t(A.sections)}</p>
          <p className="numeral mt-1 text-3xl font-bold text-ink-900">{modules.length}</p>
          <p className="text-sm text-ink-600">{fmt(t(A.customisedCount), { n: customised })}</p>
        </Panel>
        <Panel>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">{t(A.lastPublish)}</p>
          <p className="mt-1 text-lg font-bold text-ink-900">{lastPublished ? formatStamp(lastPublished, lang) : t(A.never)}</p>
          {publish?.running && <p className="text-sm text-electric-700">{t(A.publishing)}</p>}
        </Panel>
        <Panel className="flex flex-col justify-between gap-3">
          {needsPublish ? <Notice tone="warn">{t(A.needsPublish)}</Notice> : <Notice tone="success">{t(A.publishOk)}</Notice>}
          <Link to="/admin/publish" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-electric-600">
            <Rocket aria-hidden="true" className="size-4" /> {t(A.publish)}
          </Link>
        </Panel>
      </div>

      {GROUP_ORDER.map((group) => {
        const items = modules.filter((m) => m.group === group)
        return (
          <Panel key={group} title={t(GROUP_LABELS[group] ?? { hi: group, en: group })}>
            <ul className="divide-y divide-ink-900/8">
              {items.map((m) => {
                const info = meta[m.key]
                return (
                  <li key={m.key}>
                    <Link to={`/admin/content/${m.key}`} className="flex items-center gap-3 py-3 hover:text-electric-700">
                      {info ? <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-mint-500" /> : <CircleDashed aria-hidden="true" className="size-5 shrink-0 text-ink-300" />}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{t(MODULE_LABELS[m.key] ?? { hi: m.key, en: m.key })}</span>
                        <span className="block text-xs text-ink-500">
                          <code className="font-mono">{m.key}</code>
                          {info && ` · ${t(A.updatedBy)}: ${info.updatedBy} · ${formatStamp(info.updatedAt, lang)}`}
                        </span>
                      </span>
                      <span className={info ? 'rounded-full bg-mint-100 px-2.5 py-0.5 text-xs font-semibold text-mint-700 ring-1 ring-mint-400/40' : 'rounded-full bg-ink-900/5 px-2.5 py-0.5 text-xs font-semibold text-ink-500'}>
                        {info ? t(A.customised) : t(A.usingDefault)}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Panel>
        )
      })}
    </div>
  )
}
