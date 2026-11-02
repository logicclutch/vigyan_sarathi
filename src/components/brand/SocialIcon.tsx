import type { SocialKey } from '@/content/types'

/** Simple, brand-neutral glyphs (Lucide v1 removed brand icons). */
export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
  switch (name) {
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M14 8h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V8.8c0-.5.3-.8.5-.8Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...common}>
          <path d="M4 20l1.3-3.8A8 8 0 1 1 8.4 19L4 20Z" />
          <path d="M9.2 8.8c.2-.4.5-.4.8-.4h.5l.7 1.7-.6.8c.5 1 1.4 1.9 2.4 2.4l.8-.6 1.7.7v.5c0 .3 0 .6-.4.8-.6.4-1.5.4-2.3 0a7.4 7.4 0 0 1-3.6-3.6c-.4-.8-.4-1.7 0-2.3Z" />
        </svg>
      )
  }
}
