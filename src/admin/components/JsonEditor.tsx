import { useId, useState } from 'react'
import { ChevronDown, ChevronUp, Copy, Plus, Trash2 } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'
import { fmt } from '@/lib/format'
import { A } from '../strings'
import { enumOptions, isUploadField } from './enums'
import { clone, humanize, isLocalized, isLongText, isPlainObject, summarize, type Json, type Path } from './jsonUtils'
import { UploadField } from './UploadField'

const INPUT =
  'w-full rounded-xl border border-ink-900/15 bg-white px-3 text-sm text-ink-900 outline-none transition-[border-color,box-shadow] focus:border-electric-500 focus:ring-4 focus:ring-electric-500/15'

interface EditorProps {
  value: Json
  template: Json | undefined
  path: Path
  moduleKey: string
  itemTemplates?: Record<string, unknown>
  onChange: (next: Json) => void
  /** Lets a child update sibling fields (used by image uploads to fill width/height). */
  onSiblings?: (patch: Record<string, Json>) => void
}

function FieldLabel({ htmlFor, name }: { htmlFor?: string; name: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
      {humanize(name)}
    </label>
  )
}

function LocalizedField({ value, name, onChange, long }: { value: { hi: string; en: string }; name: string; onChange: (v: Json) => void; long: boolean }) {
  const { t } = useLanguage()
  const id = useId()
  const Input = long ? 'textarea' : 'input'
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {(['hi', 'en'] as const).map((lang) => (
        <div key={lang} className="min-w-0">
          <label htmlFor={`${id}-${lang}`} className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
            {humanize(name)} <span className="rounded bg-ink-900/6 px-1.5 py-0.5 text-[10px] normal-case tracking-normal">{lang === 'hi' ? t(A.hindi) : t(A.english)}</span>
          </label>
          <Input
            id={`${id}-${lang}`}
            lang={lang}
            value={value[lang]}
            rows={long ? 3 : undefined}
            onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
            className={cn(INPUT, long ? 'min-h-20 py-2 leading-relaxed' : 'h-10', lang === 'hi' && 'font-hindi')}
          />
        </div>
      ))}
    </div>
  )
}

export function JsonEditor(props: EditorProps) {
  const { value, template, path, moduleKey, onChange, onSiblings } = props
  const name = String(path[path.length - 1] ?? '')
  const id = useId()
  const shape = template !== undefined ? template : value

  if (isLocalized(shape) || isLocalized(value)) {
    const v = isLocalized(value) ? value : { hi: '', en: '' }
    const sample = isLocalized(shape) ? shape.hi : v.hi
    return <LocalizedField value={v} name={name} onChange={onChange} long={isLongText(name, sample)} />
  }

  if (typeof shape === 'string' || typeof value === 'string') {
    const str = typeof value === 'string' ? value : ''
    if (isUploadField(moduleKey, name)) {
      return (
        <div>
          <FieldLabel htmlFor={id} name={name} />
          <UploadField id={id} value={str} onChange={(url, meta) => {
            onChange(url)
            if (meta) onSiblings?.({ w: meta.w, h: meta.h, placeholder: false })
          }} />
        </div>
      )
    }
    const options = enumOptions(moduleKey, name)
    if (options) {
      return (
        <div>
          <FieldLabel htmlFor={id} name={name} />
          <select id={id} value={str} onChange={(e) => onChange(e.target.value)} className={cn(INPUT, 'h-10')}>
            {!options.includes(str) && <option value={str}>{str || '—'}</option>}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }
    const long = isLongText(name, typeof shape === 'string' ? shape : str)
    return (
      <div>
        <FieldLabel htmlFor={id} name={name} />
        {long ? (
          <textarea id={id} value={str} rows={3} onChange={(e) => onChange(e.target.value)} className={cn(INPUT, 'min-h-20 py-2 leading-relaxed')} />
        ) : (
          <input id={id} type="text" value={str} onChange={(e) => onChange(e.target.value)} className={cn(INPUT, 'h-10')} />
        )}
      </div>
    )
  }

  if (typeof shape === 'number' || typeof value === 'number') {
    return (
      <div>
        <FieldLabel htmlFor={id} name={name} />
        <input
          id={id}
          type="number"
          value={typeof value === 'number' ? value : ''}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className={cn(INPUT, 'h-10 max-w-48')}
        />
      </div>
    )
  }

  if (typeof shape === 'boolean' || typeof value === 'boolean') {
    return (
      <label className="inline-flex items-center gap-2 text-sm font-medium text-ink-800">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-electric-500" />
        {humanize(name)}
      </label>
    )
  }

  if (Array.isArray(shape) || Array.isArray(value)) {
    return <ArrayField {...props} />
  }

  if (isPlainObject(shape) || isPlainObject(value)) {
    return <ObjectField {...props} />
  }

  return <p className="text-sm text-ink-400">—</p>
}

function ObjectField({ value, template, path, moduleKey, itemTemplates, onChange }: EditorProps) {
  const obj = isPlainObject(value) ? value : {}
  const tpl = isPlainObject(template) ? template : {}
  const keys = Array.from(new Set([...Object.keys(tpl), ...Object.keys(obj)]))
  const depth = path.length
  return (
    <div className={cn('grid min-w-0 grid-cols-1 gap-4', depth > 0 && 'rounded-2xl border border-ink-900/10 bg-cream-50/60 p-4')}>
      {keys.map((key) => (
        <JsonEditor
          key={key}
          value={obj[key] ?? null}
          template={tpl[key]}
          path={[...path, key]}
          moduleKey={moduleKey}
          itemTemplates={itemTemplates}
          onChange={(next) => onChange({ ...obj, [key]: next })}
          onSiblings={(patch) => onChange({ ...obj, [key]: obj[key] ?? null, ...patch })}
        />
      ))}
    </div>
  )
}

function ArrayField({ value, template, path, moduleKey, itemTemplates, onChange }: EditorProps) {
  const { t } = useLanguage()
  const items = Array.isArray(value) ? value : []
  const tplArray = Array.isArray(template) ? template : []
  const name = String(path[path.length - 1] ?? '')
  const pathKey = path.filter((p) => typeof p === 'string').join('.')
  const itemTemplate: Json | undefined = (tplArray[0] ?? (itemTemplates?.[pathKey] as Json | undefined) ?? (itemTemplates?.[name] as Json | undefined) ?? items[0]) as Json | undefined
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const simple = items.every((item) => typeof item === 'string') && (itemTemplate === undefined || typeof itemTemplate === 'string')

  const update = (index: number, next: Json) => onChange(items.map((item, i) => (i === index ? next : item)))
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index))
  const move = (index: number, delta: number) => {
    const to = index + delta
    if (to < 0 || to >= items.length) return
    const next = items.slice()
    const [moved] = next.splice(index, 1)
    next.splice(to, 0, moved as Json)
    onChange(next)
  }
  const add = (from?: Json) => {
    const base = from !== undefined ? clone(from) : itemTemplate !== undefined ? clone(itemTemplate) : ''
    onChange([...items, base])
    setOpen((prev) => ({ ...prev, [items.length]: true }))
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
          {humanize(name)} <span className="numeral ml-1 normal-case tracking-normal text-ink-400">· {fmt(t(A.items), { n: items.length })}</span>
        </p>
        <button type="button" onClick={() => add()} className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-electric-600">
          <Plus aria-hidden="true" className="size-3.5" /> {t(A.add)}
        </button>
      </div>
      {simple ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <input type="text" value={String(item)} onChange={(e) => update(i, e.target.value)} className={cn(INPUT, 'h-10')} aria-label={`${humanize(name)} ${i + 1}`} />
              <button type="button" onClick={() => remove(i)} aria-label={t(A.remove)} className="grid size-9 shrink-0 place-items-center rounded-full text-ink-500 hover:bg-rose-100 hover:text-rose-700">
                <Trash2 aria-hidden="true" className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="space-y-2">
          {items.map((item, i) => {
            const isOpen = open[i] ?? false
            return (
              <li key={i} className="min-w-0 rounded-2xl border border-ink-900/10 bg-white">
                <div className="flex items-center gap-2 px-3 py-2">
                  <button type="button" onClick={() => setOpen((prev) => ({ ...prev, [i]: !isOpen }))} aria-expanded={isOpen} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                    <span className="numeral w-6 shrink-0 text-xs text-ink-400">{i + 1}</span>
                    <span className="truncate text-sm font-semibold text-ink-900">{summarize(item, i)}</span>
                    <ChevronDown aria-hidden="true" className={cn('ml-auto size-4 shrink-0 text-ink-400 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button type="button" onClick={() => move(i, -1)} aria-label={t(A.moveUp)} className="grid size-8 place-items-center rounded-full text-ink-500 hover:bg-ink-900/5" disabled={i === 0}>
                      <ChevronUp aria-hidden="true" className="size-4" />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} aria-label={t(A.moveDown)} className="grid size-8 place-items-center rounded-full text-ink-500 hover:bg-ink-900/5" disabled={i === items.length - 1}>
                      <ChevronDown aria-hidden="true" className="size-4" />
                    </button>
                    <button type="button" onClick={() => add(item)} aria-label={t(A.duplicate)} className="grid size-8 place-items-center rounded-full text-ink-500 hover:bg-ink-900/5">
                      <Copy aria-hidden="true" className="size-4" />
                    </button>
                    <button type="button" onClick={() => remove(i)} aria-label={t(A.remove)} className="grid size-8 place-items-center rounded-full text-ink-500 hover:bg-rose-100 hover:text-rose-700">
                      <Trash2 aria-hidden="true" className="size-4" />
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="min-w-0 border-t border-ink-900/10 p-3">
                    <JsonEditor
                      value={item}
                      template={itemTemplate}
                      path={[...path, i]}
                      moduleKey={moduleKey}
                      itemTemplates={itemTemplates}
                      onChange={(next) => update(i, next)}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
