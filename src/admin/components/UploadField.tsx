import { useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { api, ApiError } from '../api'
import { A } from '../strings'

interface UploadFieldProps {
  value: string
  onChange: (url: string, meta?: { w: number; h: number }) => void
  id: string
}

export function UploadField({ value, onChange, id }: UploadFieldProps) {
  const { t } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = async (file: File) => {
    setBusy(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const result = await api<{ url: string }>('/uploads', { method: 'POST', form })
      const meta = await new Promise<{ w: number; h: number } | undefined>((resolve) => {
        const img = new Image()
        img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
        img.onerror = () => resolve(undefined)
        img.src = result.url
      })
      onChange(result.url, meta)
    } catch (err) {
      setError(err instanceof ApiError ? err.code : 'upload-failed')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-wrap items-start gap-3">
      {value && <img src={value} alt="" className="h-20 w-28 rounded-xl object-cover ring-1 ring-ink-900/10" />}
      <div className="min-w-0 flex-1 space-y-2">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-ink-900/15 bg-white px-3 text-sm outline-none focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15"
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink-900/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink-800 hover:border-ink-900/40">
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
          <span className="text-xs text-ink-500">{t(A.uploadHint)}</span>
          {error && <span className="text-xs font-semibold text-rose-700">{error}</span>}
        </div>
      </div>
    </div>
  )
}
