import { cn } from '@/lib/cn'

const NODES = [
  { x: 200, y: 120, r: 7, c: '#67e8f9' },
  { x: 290, y: 120, r: 6, c: '#ffffff' },
  { x: 335, y: 200, r: 8, c: '#3b82f6' },
  { x: 290, y: 280, r: 6, c: '#ffffff' },
  { x: 200, y: 280, r: 7, c: '#67e8f9' },
  { x: 155, y: 200, r: 6, c: '#ffffff' },
  { x: 380, y: 72, r: 9, c: '#fbbf24' },
  { x: 440, y: 236, r: 6, c: '#ffffff' },
  { x: 500, y: 320, r: 7, c: '#67e8f9' },
  { x: 118, y: 340, r: 8, c: '#3b82f6' },
  { x: 72, y: 128, r: 6, c: '#ffffff' },
] as const

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 6],
  [2, 7],
  [7, 8],
  [4, 9],
  [5, 10],
]

/** A gently floating molecule / constellation hybrid. */
export function MoleculeConstellation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={cn('h-auto', className)} aria-hidden="true" focusable="false">
      <g className="motion-safe:animate-float-slow">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
        ))}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill={n.c} opacity="0.12" />
            {(i === 6 || i === 2) && (
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 2}
                fill="none"
                stroke={n.c}
                strokeOpacity="0.6"
                className="motion-safe:animate-pulse-ring"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: i === 6 ? '0s' : '1.4s' }}
              />
            )}
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
          </g>
        ))}
      </g>
    </svg>
  )
}
