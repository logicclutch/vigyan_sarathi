import { temperDefinition } from '@/content/scientificTemper'
import { useLanguage } from '@/i18n/useLanguage'
import { cn } from '@/lib/cn'

const STYLES = [
  'border-white/15 bg-white/5 text-white/70',
  'border-cyan-300/50 bg-cyan-400/10 text-cyan-100',
  'border-amber-300/60 bg-amber-400/15 text-amber-100',
]

/** “मैंने सुना है” → “क्या यह सत्य है?” → “इसका प्रमाण क्या है?” — the mindset in three steps. */
export function MindsetStages({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useLanguage()
  return (
    <ol className={cn('flex flex-wrap items-center gap-x-3 gap-y-3', className)}>
      {temperDefinition.stages.map((stage, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className={cn('rounded-2xl border font-semibold', compact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-base sm:text-lg', STYLES[i])}>{t(stage)}</span>
          {i < temperDefinition.stages.length - 1 && (
            <span aria-hidden="true" className="text-xl text-cyan-300">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
