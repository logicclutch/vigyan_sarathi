import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Link2, Trash2 } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, ApiError } from '../api'
import { A } from '../strings'
import { formatStamp } from '../components/helpers'
import { AdminButton, Notice, Panel } from '../components/ui'

interface Upload {
  name: string
  url: string
  size: number
  uploadedAt: string
}

export default function MediaPage() {
  const { t, lang } = useLanguage()
  const [files, setFiles] = useState<Upload[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const refresh = () => api<{ files: Upload[] }>('/uploads').then((d) => setFiles(d.files)).catch(() => undefined)
  useEffect(() => {
    void refresh()
  }, [])

  const upload = async (file: File) => {
    setBusy(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      await api('/uploads', { method: 'POST', form })
      await refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.code : 'upload-failed')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const remove = async (name: string) => {
    if (!window.confirm(t(A.deleteConfirm))) return
    await api(`/uploads/${name}`, { method: 'DELETE' }).catch(() => undefined)
    await refresh()
  }

  const copy = async (url: string) => {
    const absolute = `${window.location.origin}${url}`
    try {
      await navigator.clipboard.writeText(absolute)
      setCopied(url)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      window.prompt('URL', absolute)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t(A.media)}</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">{t(A.mediaIntro)}</p>
      </div>
      <Panel
        actions={
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-electric-500 px-4 text-sm font-semibold text-white hover:bg-electric-400">
            <ImagePlus aria-hidden="true" className="size-4" />
            {busy ? t(A.uploading) : t(A.upload)}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void upload(file)
              }}
            />
          </label>
        }
        title={t(A.uploadHint)}
      >
        {error && <Notice tone="error">{error}</Notice>}
        {files.length === 0 ? (
          <p className="text-sm text-ink-500">{t(A.noFiles)}</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <li key={file.name} className="overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50">
                <img src={file.url} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="space-y-2 p-3">
                  <p className="truncate font-mono text-xs text-ink-700" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-ink-500">
                    {(file.size / 1024).toFixed(0)} KB · {formatStamp(file.uploadedAt, lang)}
                  </p>
                  <div className="flex items-center gap-2">
                    <AdminButton tone="secondary" onClick={() => copy(file.url)} className="h-9 px-3 text-xs">
                      <Link2 aria-hidden="true" className="size-3.5" /> {copied === file.url ? t(A.copied) : t(A.copyUrl)}
                    </AdminButton>
                    <AdminButton tone="danger" onClick={() => remove(file.name)} className="h-9 px-3 text-xs" aria-label={t(A.remove)}>
                      <Trash2 aria-hidden="true" className="size-3.5" />
                    </AdminButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
