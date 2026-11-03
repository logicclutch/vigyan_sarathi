export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }
export type Path = (string | number)[]

export function isLocalized(value: unknown): value is { hi: string; en: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const record = value as Record<string, unknown>
  const keys = Object.keys(record)
  return keys.length === 2 && typeof record.hi === 'string' && typeof record.en === 'string'
}

export function isPlainObject(value: unknown): value is Record<string, Json> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

export function clone<T>(value: T): T {
  return value === undefined ? value : (JSON.parse(JSON.stringify(value)) as T)
}

/** Immutable update at a path. */
export function setAt(root: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value
  const [head, ...rest] = path
  if (Array.isArray(root)) {
    const next = root.slice()
    next[head as number] = setAt(root[head as number] ?? null, rest, value)
    return next
  }
  const obj = isPlainObject(root) ? root : {}
  return { ...obj, [head as string]: setAt(obj[head as string] ?? null, rest, value) }
}

const kind = (v: unknown) => (isLocalized(v) ? 'localized' : Array.isArray(v) ? 'array' : v === null || v === undefined ? 'empty' : typeof v)

/** Compares a candidate document with the built-in structure; returns the first mismatching path or null. */
export function checkShape(template: unknown, value: unknown, path = '$'): string | null {
  const tk = kind(template)
  const vk = kind(value)
  if (tk === 'empty') return null
  if (tk === 'localized') return vk === 'localized' ? null : `${path} (expected Hindi + English text)`
  if (tk === 'array') {
    if (vk !== 'array') return `${path} (expected a list)`
    const itemTemplate = (template as unknown[])[0]
    if (itemTemplate === undefined) return null
    for (let i = 0; i < (value as unknown[]).length; i += 1) {
      const error = checkShape(itemTemplate, (value as unknown[])[i], `${path}[${i}]`)
      if (error) return error
    }
    return null
  }
  if (tk === 'object') {
    if (vk !== 'object') return `${path} (expected an object)`
    for (const [k, v] of Object.entries(template as Record<string, unknown>)) {
      if (!(k in (value as Record<string, unknown>))) return `${path}.${k} (missing)`
      const error = checkShape(v, (value as Record<string, unknown>)[k], `${path}.${k}`)
      if (error) return error
    }
    return null
  }
  if (vk === 'empty' && (tk === 'string' || tk === 'number' || tk === 'boolean')) return null
  return tk === vk ? null : `${path} (expected ${tk})`
}

export function humanize(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
}

const SUMMARY_KEYS = ['title', 'name', 'label', 'heading', 'question', 'q', 'myth', 'statement', 'text', 'id', 'key', 'slug', 'src']

export function summarize(item: Json, index: number): string {
  if (isLocalized(item)) return item.hi || item.en || `#${index + 1}`
  if (typeof item === 'string') return item || `#${index + 1}`
  if (isPlainObject(item)) {
    for (const key of SUMMARY_KEYS) {
      const v = item[key]
      if (isLocalized(v)) return v.hi || v.en || `#${index + 1}`
      if (typeof v === 'string' && v) return v
    }
  }
  return `#${index + 1}`
}

const LONG_KEYS = new Set([
  'body', 'summary', 'intro', 'story', 'answer', 'explanation', 'detail', 'example', 'prompt', 'why', 'description', 'lead', 'text',
  'science', 'predict', 'extend', 'concept', 'safety', 'path', 'subjects', 'fact', 'myth', 'known', 'lesson', 'quote', 'a', 'statement',
  'blurb', 'message', 'paragraphs', 'welcome',
])
export function isLongText(key: string, sample: string): boolean {
  return LONG_KEYS.has(key) || sample.length > 90 || sample.includes('\n')
}
