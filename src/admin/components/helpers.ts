export const INPUT_CLASS =
  'h-11 w-full rounded-xl border border-ink-900/15 bg-white px-3 text-sm text-ink-900 outline-none transition-[border-color,box-shadow] focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15'

export function formatStamp(iso: string | undefined | null, lang: string): string {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}
