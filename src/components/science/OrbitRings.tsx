import { cn } from '@/lib/cn'

interface OrbitRingsProps {
  className?: string
  /** 'dark' = light strokes for dark backgrounds; 'light' = navy strokes for paper backgrounds */
  tone?: 'dark' | 'light'
}

/** Concentric dashed rings that slowly counter-rotate. Decorative background art. */
export function OrbitRings({ className, tone = 'dark' }: OrbitRingsProps) {
  const ring = tone === 'dark' ? 'rgba(255,255,255,0.09)' : 'rgba(16,34,74,0.14)'
  const ringAccent = tone === 'dark' ? 'rgba(103,232,249,0.16)' : 'rgba(37,99,235,0.18)'
  return (
    <svg viewBox="0 0 800 800" className={cn('h-auto', className)} aria-hidden="true" focusable="false">
      <g className="motion-safe:animate-orbit-slow" style={{ transformOrigin: '400px 400px' }}>
        <circle cx="400" cy="400" r="390" fill="none" stroke={ring} strokeWidth="1" strokeDasharray="3 14" />
        <circle cx="790" cy="400" r="4" fill="#fbbf24" />
      </g>
      <g className="motion-safe:animate-orbit-reverse" style={{ transformOrigin: '400px 400px' }}>
        <circle cx="400" cy="400" r="300" fill="none" stroke={ringAccent} strokeWidth="1" />
        <circle cx="400" cy="100" r="3" fill={tone === 'dark' ? '#67e8f9' : '#2563eb'} />
      </g>
      <g className="motion-safe:animate-orbit" style={{ transformOrigin: '400px 400px' }}>
        <circle cx="400" cy="400" r="210" fill="none" stroke={ring} strokeWidth="1" strokeDasharray="1 8" />
        <circle cx="610" cy="400" r="3.5" fill={tone === 'dark' ? '#60a5fa' : '#f97316'} />
      </g>
      <circle cx="400" cy="400" r="120" fill="none" stroke={ring} strokeWidth="1" />
    </svg>
  )
}
