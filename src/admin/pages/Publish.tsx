import { useCallback, useEffect, useState } from 'react'
import { Rocket } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, type PublishStatus } from '../api'
import { A } from '../strings'
import { formatStamp } from '../components/helpers'
import { AdminButton, Notice, Panel } from '../components/ui'

export default function PublishPage() {
  const { t, lang } = useLanguage()
  const [status, setStatus] = useState<PublishStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => api<PublishStatus>('/publish/status').then(setStatus).catch(() => undefined), [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    if (!status?.running && !status?.queued) return
    const id = window.setInterval(() => void refresh(), 2500)
    return () => window.clearInterval(id)
  }, [status?.running, status?.queued, refresh])

  const publish = async () => {
    setError(null)
    try {
      const data = await api<PublishStatus>('/publish', { method: 'POST' })
      setStatus(data)
    } catch {
      setError(t(A.unreachable))
    }
  }

  const record = status?.running ?? status?.last ?? null
  const siteUrl = window.location.origin

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t(A.publish)}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">{t(A.publishIntro)}</p>
      </div>
      <Panel
        actions={
          <AdminButton onClick={publish} disabled={Boolean(status?.running)}>
            <Rocket aria-hidden="true" className="size-4" /> {status?.running ? t(A.publishing) : t(A.publishNow)}
          </AdminButton>
        }
        title={t(A.lastPublish)}
      >
        {error && <Notice tone="error">{error}</Notice>}
        {status?.queued && <Notice tone="info">{t(A.publishQueued)}</Notice>}
        {record ? (
          <div className="space-y-3">
            <p className="text-sm">
              <span
                className={
                  record.state === 'succeeded'
                    ? 'rounded-full bg-mint-100 px-2.5 py-0.5 text-xs font-semibold text-mint-700 ring-1 ring-mint-400/40'
                    : record.state === 'failed'
                      ? 'rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-400/40'
                      : 'rounded-full bg-electric-100 px-2.5 py-0.5 text-xs font-semibold text-electric-700 ring-1 ring-electric-200'
                }
              >
                {record.state === 'succeeded' ? t(A.publishOk) : record.state === 'failed' ? t(A.publishFailed) : t(A.publishing)}
              </span>{' '}
              <span className="text-ink-600">
                {formatStamp(record.finishedAt ?? record.startedAt, lang)} · {record.trigger}
              </span>
            </p>
            {record.state === 'succeeded' && (
              <p className="text-sm">
                <a href={siteUrl} target="_blank" rel="noreferrer" className="font-semibold text-electric-700 underline-offset-4 hover:underline">
                  {t(A.openSite)}
                </a>
              </p>
            )}
            <details className="rounded-xl bg-ink-900 text-cream-50" open={record.state !== 'succeeded'}>
              <summary className="cursor-pointer px-4 py-2 text-xs font-semibold">{t(A.log)}</summary>
              <pre className="max-h-96 overflow-auto px-4 pb-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">{record.log.join('\n')}</pre>
            </details>
          </div>
        ) : (
          <p className="text-sm text-ink-500">{t(A.never)}</p>
        )}
      </Panel>
    </div>
  )
}
