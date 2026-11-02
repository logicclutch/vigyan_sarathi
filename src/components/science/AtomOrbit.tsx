import { useEffect, useId, useRef } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

interface AtomOrbitProps {
  /** Three short labels that ride the electrons (e.g. question / experiment / evidence). */
  labels?: readonly [string, string, string]
  className?: string
}

const C = 300
const RX = 232
const RY = 88
const ELLIPSE = `M ${C - RX} ${C} A ${RX} ${RY} 0 1 1 ${C + RX} ${C} A ${RX} ${RY} 0 1 1 ${C - RX} ${C}`

const ORBITS = [
  { rotate: -18, duration: 26, color: '#22d3ee', begin: -4 },
  { rotate: 42, duration: 34, color: '#fbbf24', begin: -15 },
  { rotate: 102, duration: 42, color: '#60a5fa', begin: -27 },
] as const

/**
 * The hero centrepiece: a living atom. Electrons follow true elliptical paths
 * (SMIL animateMotion), the nucleus breathes, outer rings drift. Everything is
 * SVG + CSS; off-screen it pauses and under reduced motion it holds still.
 */
export function AtomOrbit({ labels, className }: AtomOrbitProps) {
  const reduce = usePrefersReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const svg = ref.current
    if (!svg || reduce) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) svg.unpauseAnimations()
        else svg.pauseAnimations()
      },
      { threshold: 0 },
    )
    io.observe(svg)
    return () => io.disconnect()
  }, [reduce])

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={cn('h-auto w-full overflow-visible', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${id}-core`} cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#a5f3fc" />
          <stop offset="70%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#2563eb" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx={C} cy={C} r="262" fill={`url(#${id}-glow)`} />

      {/* drifting outer rings */}
      <g className="motion-safe:animate-orbit-slow" style={{ transformOrigin: '300px 300px' }}>
        <circle cx={C} cy={C} r="286" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" strokeDasharray="2 11" />
      </g>
      <g className="motion-safe:animate-orbit-reverse" style={{ transformOrigin: '300px 300px' }}>
        <circle cx={C} cy={C} r="266" fill="none" stroke="rgba(103,232,249,0.16)" strokeWidth="1" strokeDasharray="1 7" />
        <circle cx={C + 266} cy={C} r="2.2" fill="#67e8f9" opacity="0.8" />
      </g>

      {/* orbits + electrons */}
      {ORBITS.map((orbit, i) => (
        <g key={i} transform={`rotate(${orbit.rotate} ${C} ${C})`}>
          <path id={`${id}-orbit-${i}`} d={ELLIPSE} fill="none" stroke="rgba(255,255,255,0.17)" strokeWidth="1.25" />
          <path
            d={ELLIPSE}
            fill="none"
            stroke={orbit.color}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="70 1400"
            strokeLinecap="round"
          />
          <g>
            <circle r="18" fill={orbit.color} opacity="0.22" filter={`url(#${id}-blur)`} />
            <circle r="7" fill={orbit.color} />
            <circle r="2.8" cx="-1.5" cy="-1.5" fill="#fff" opacity="0.9" />
            {labels && (
              <g transform={`rotate(${-orbit.rotate})`} className="max-sm:hidden">
                <text
                  x="16"
                  y="5"
                  fill="#f8fafc"
                  fontSize="15"
                  fontWeight="600"
                  style={{ paintOrder: 'stroke', stroke: 'rgba(5,11,26,0.85)', strokeWidth: 5, strokeLinejoin: 'round' }}
                >
                  {labels[i]}
                </text>
              </g>
            )}
            {!reduce && (
              <animateMotion dur={`${orbit.duration}s`} repeatCount="indefinite" begin={`${orbit.begin}s`} rotate="0">
                <mpath href={`#${id}-orbit-${i}`} />
              </animateMotion>
            )}
          </g>
        </g>
      ))}

      {/* nucleus */}
      <g className="motion-safe:animate-breathe" style={{ transformOrigin: '300px 300px' }}>
        <circle cx={C} cy={C} r="54" fill={`url(#${id}-glow)`} />
        <circle cx={C - 10} cy={C + 7} r="17" fill={`url(#${id}-core)`} />
        <circle cx={C + 11} cy={C + 8} r="17" fill={`url(#${id}-core)`} opacity="0.92" />
        <circle cx={C} cy={C - 11} r="17" fill={`url(#${id}-core)`} opacity="0.97" />
      </g>
    </svg>
  )
}
