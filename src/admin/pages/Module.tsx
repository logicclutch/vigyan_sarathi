import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ChevronLeft, History, RotateCcw, Save } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { api, ApiError, type ContentMeta } from '../api'
import { JsonEditor } from '../components/JsonEditor'
import { checkShape, clone, type Json } from '../components/jsonUtils'
import { formatStamp } from '../components/helpers'
import { AdminButton, Notice, Panel } from '../components/ui'
import { moduleMap } from '../registry'
import { A, GROUP_LABELS, MODULE_LABELS } from '../strings'

interface Version {
  id: string
  savedAt: string
  savedBy: string
}

export default function ModulePage() {
  const { key = '' } = useParams()
  return <ModuleEditor key={key} moduleKey={key} />
}

function ModuleEditor({ moduleKey: key }: { moduleKey: string }) {
  const { t, lang } = useLanguage()
  const module = moduleMap[key]
  const [doc, setDoc] = useState<Json | null>(null)
  const [saved, setSaved] = useState<Json | null>(null)
  const [meta, setMeta] = useState<ContentMeta | null>(null)
  const [mode, setMode] = useState<'form' | 'raw'>('form')
  const [raw, setRaw] = useState('')
  const [status, setStatus] = useState<{ tone: 'info' | 'success' | 'error' | 'warn'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [versions, setVersions] = useState<Version[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!module) return
    let cancelled = false
    api<{ doc: Json | null; meta: ContentMeta | null }>(`/content/${key}`)
      .then((data) => {
        if (cancelled) return
        setDoc(data.doc ?? clone(module.defaults as Json))
        setSaved(data.doc ?? null)
        setMeta(data.meta)
      })
      .catch((err: unknown) => {
        if (!cancelled) setStatus({ tone: 'error', text: err instanceof ApiError ? err.code : 'error' })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [key, module])

  const dirty = useMemo(() => doc !== null && JSON.stringify(doc) !== JSON.stringify(saved ?? module?.defaults ?? null), [doc, saved, module])

  useEffect(() => {
    if (!dirty) return
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  if (!module) {
    return (
      <Notice tone="error">
        {t(A.error)}: <code>{key}</code>
      </Notice>
    )
  }

  const save = async () => {
    if (doc === null) return
    const mismatch = checkShape(module.defaults, doc)
    if (mismatch) {
      setStatus({ tone: 'error', text: `${t(A.shapeMismatch)} ${mismatch}` })
      return
    }
    setBusy(true)
    try {
      const data = await api<{ meta: ContentMeta }>(`/content/${key}`, { method: 'PUT', body: { doc } })
      setSaved(clone(doc))
      setMeta(data.meta)
      setVersions(null)
      setStatus({ tone: 'success', text: `${t(A.saved)} · ${t(A.needsPublish)}` })
    } catch (err) {
      setStatus({ tone: 'error', text: err instanceof ApiError ? `${err.code}${err.detail ? `: ${err.detail}` : ''}` : 'error' })
    } finally {
      setBusy(false)
    }
  }

  const reset = async () => {
    if (!window.confirm(t(A.resetConfirm))) return
    setBusy(true)
    try {
      await api(`/content/${key}`, { method: 'DELETE' })
      setDoc(clone(module.defaults as Json))
      setSaved(null)
      setMeta(null)
      setVersions(null)
      setStatus({ tone: 'success', text: `${t(A.usingDefault)} · ${t(A.needsPublish)}` })
    } catch (err) {
      setStatus({ tone: 'error', text: err instanceof ApiError ? err.code : 'error' })
    } finally {
      setBusy(false)
    }
  }

  const openRaw = () => {
    setRaw(JSON.stringify(doc, null, 2))
    setMode('raw')
  }

  const applyRaw = () => {
    try {
      const parsed = JSON.parse(raw) as Json
      const mismatch = checkShape(module.defaults, parsed)
      if (mismatch) {
        setStatus({ tone: 'error', text: `${t(A.shapeMismatch)} ${mismatch}` })
        return
      }
      setDoc(parsed)
      setMode('form')
      setStatus(null)
    } catch (err) {
      setStatus({ tone: 'error', text: `${t(A.jsonInvalid)} ${(err as Error).message}` })
    }
  }

  const loadHistory = async () => {
    try {
      const data = await api<{ versions: Version[] }>(`/content/${key}/history`)
      setVersions(data.versions)
    } catch {
      setVersions([])
    }
  }

  const restore = async (id: string) => {
    setBusy(true)
    try {
      const data = await api<{ doc: Json; meta: ContentMeta }>(`/content/${key}/restore`, { method: 'POST', body: { id } })
      setDoc(data.doc)
      setSaved(clone(data.doc))
      setMeta(data.meta)
      setVersions(null)
      setStatus({ tone: 'success', text: `${t(A.restore)}: ${t(A.saved)} · ${t(A.needsPublish)}` })
    } catch (err) {
      setStatus({ tone: 'error', text: err instanceof ApiError ? err.code : 'error' })
    } finally {
      setBusy(false)
    }
  }

  const label = MODULE_LABELS[key] ?? { hi: key, en: key }
  const group = GROUP_LABELS[module.group] ?? { hi: module.group, en: module.group }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs font-semibold text-ink-500 hover:text-electric-700">
            <ChevronLeft aria-hidden="true" className="size-3.5" /> {t(group)}
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-ink-900 sm:text-3xl">{t(label)}</h1>
          <p className="mt-1 text-xs text-ink-500">
            <code className="font-mono">{key}</code>
            {meta ? ` · ${t(A.updatedBy)}: ${meta.updatedBy} · ${formatStamp(meta.updatedAt, lang)}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', dirty ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300' : saved ? 'bg-mint-100 text-mint-700 ring-1 ring-mint-400/40' : 'bg-ink-900/5 text-ink-500')}>
            {dirty ? t(A.unsaved) : saved ? t(A.customised) : t(A.usingDefault)}
          </span>
          <AdminButton tone="secondary" onClick={() => (mode === 'form' ? openRaw() : setMode('form'))} disabled={loading}>
            {mode === 'form' ? t(A.raw) : t(A.form)}
          </AdminButton>
          <AdminButton tone="secondary" onClick={loadHistory} disabled={loading}>
            <History aria-hidden="true" className="size-4" /> {t(A.history)}
          </AdminButton>
          {saved && (
            <AdminButton tone="danger" onClick={reset} disabled={busy || loading}>
              <RotateCcw aria-hidden="true" className="size-4" /> {t(A.reset)}
            </AdminButton>
          )}
          <AdminButton onClick={save} disabled={busy || loading || !dirty || mode === 'raw'}>
            <Save aria-hidden="true" className="size-4" /> {busy ? t(A.saving) : t(A.save)}
          </AdminButton>
        </div>
      </div>

      {status && <Notice tone={status.tone}>{status.text}</Notice>}
      {!status && !loading && <Notice tone="info">{saved ? t(A.editedNote) : t(A.defaultsNote)}</Notice>}

      {versions && (
        <Panel title={t(A.history)} actions={<AdminButton tone="ghost" onClick={() => setVersions(null)}>×</AdminButton>}>
          {versions.length === 0 ? (
            <p className="text-sm text-ink-500">{t(A.noHistory)}</p>
          ) : (
            <ul className="divide-y divide-ink-900/8">
              {versions.map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span>
                    {formatStamp(v.savedAt, lang)} <span className="text-ink-500">· {v.savedBy}</span>
                  </span>
                  <AdminButton tone="secondary" onClick={() => restore(v.id)} disabled={busy}>
                    {t(A.restore)}
                  </AdminButton>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}

      {loading ? (
        <p className="text-sm text-ink-500">{t(A.loading)}</p>
      ) : mode === 'raw' ? (
        <Panel actions={<AdminButton onClick={applyRaw}>{t(A.applyJson)}</AdminButton>}>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            spellCheck={false}
            aria-label="JSON"
            className="min-h-[60vh] w-full rounded-xl border border-ink-900/15 bg-ink-900 p-4 font-mono text-xs leading-relaxed text-cream-50 outline-none focus:ring-4 focus:ring-electric-500/25"
          />
        </Panel>
      ) : (
        doc !== null && (
          <Panel>
            <JsonEditor value={doc} template={module.defaults as Json} path={[]} moduleKey={key} itemTemplates={module.itemTemplates} onChange={setDoc} />
          </Panel>
        )
      )}
    </div>
  )
}
