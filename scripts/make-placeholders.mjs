// Generates the placeholder gallery images (SVG) into public/placeholders/.
// Idempotent: run `node scripts/make-placeholders.mjs` any time; files are overwritten.
// Keep ITEMS in sync with src/content/gallery.ts (category, number, width, height).
import { mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'placeholders')
mkdirSync(outDir, { recursive: true })

const ITEMS = [
  ['workshops', 1, 1200, 900],
  ['workshops', 2, 900, 1200],
  ['workshops', 3, 1600, 900],
  ['exhibitions', 1, 1200, 900],
  ['exhibitions', 2, 900, 1200],
  ['exhibitions', 3, 1000, 1000],
  ['students', 1, 1200, 900],
  ['students', 2, 900, 1200],
  ['students', 3, 1600, 900],
  ['experiments', 1, 1200, 900],
  ['experiments', 2, 900, 1200],
  ['experiments', 3, 1000, 1000],
  ['events', 1, 1200, 900],
  ['events', 2, 900, 1200],
  ['events', 3, 1600, 900],
  ['awareness', 1, 1200, 900],
  ['awareness', 2, 900, 1200],
  ['awareness', 3, 1000, 1000],
]

const LABELS = {
  workshops: 'Workshops',
  exhibitions: 'Science Exhibitions',
  students: 'Student Activities',
  experiments: 'Experiments',
  events: 'Events',
  awareness: 'Awareness Programmes',
}

const CYAN = '#9be9f7'
const AMBER = '#fbbf24'
const BLUE = '#60a5fa'

// Each illustration is drawn in a 240 x 200 box centred on the origin.
const ART = {
  workshops: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-104" y="-66" width="60" height="124" rx="10"/>
      <path d="M-112 -66h76"/>
      <path d="M-100 16h52" opacity=".6"/>
      <path d="M-14 -82h40"/>
      <path d="M-6 -82v46L-56 50a10 10 0 0 0 9 16h94a10 10 0 0 0 9 -16L26 -36v-46"/>
      <path d="M-40 26h80" opacity=".6"/>
    </g>
    <g fill="${AMBER}">
      <circle cx="-70" cy="-12" r="5"/><circle cx="-86" cy="6" r="3"/><circle cx="-62" cy="30" r="3.5"/>
      <circle cx="4" cy="46" r="5"/><circle cx="-14" cy="56" r="3"/><circle cx="20" cy="60" r="3.5"/>
    </g>`,
  exhibitions: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-104" y="-84" width="208" height="132" rx="10"/>
      <path d="M-72 48v46M72 48v46M-96 94h48M48 94h48"/>
      <path d="M-66 14l26 -48l26 48z"/>
      <circle cx="22" cy="-18" r="24"/>
      <rect x="56" y="-36" width="30" height="44" rx="4"/>
    </g>
    <circle cx="22" cy="-18" r="7" fill="${AMBER}"/>`,
  students: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round">
      <circle cx="-74" cy="6" r="18"/><path d="M-112 76a38 38 0 0 1 76 0"/>
      <circle cx="0" cy="-10" r="20"/><path d="M-42 66a42 42 0 0 1 84 0"/>
      <circle cx="76" cy="8" r="18"/><path d="M38 78a38 38 0 0 1 76 0"/>
    </g>
    <g fill="none" stroke="${AMBER}" stroke-width="4" stroke-linejoin="round">
      <path d="M-116 -78h56a8 8 0 0 1 8 8v22a8 8 0 0 1 -8 8h-28l-14 12v-12h-14a8 8 0 0 1 -8 -8v-22a8 8 0 0 1 8 -8z"/>
      <path d="M58 -86h56a8 8 0 0 1 8 8v22a8 8 0 0 1 -8 8h-14v12l-14 -12h-28a8 8 0 0 1 -8 -8v-22a8 8 0 0 1 8 -8z"/>
    </g>
    <g fill="${AMBER}"><circle cx="-96" cy="-59" r="3"/><circle cx="-84" cy="-59" r="3"/><circle cx="-72" cy="-59" r="3"/></g>
    <path d="M72 -67h30" stroke="${AMBER}" stroke-width="4" stroke-linecap="round"/>`,
  experiments: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-114" y="-48" width="228" height="16" rx="5"/>
      <path d="M-102 -32v116M102 -32v116M-114 84h228"/>
      <path d="M-87 -48v88a12 12 0 0 0 24 0v-88"/>
      <path d="M-37 -48v88a12 12 0 0 0 24 0v-88"/>
      <path d="M13 -48v88a12 12 0 0 0 24 0v-88"/>
      <path d="M63 -48v88a12 12 0 0 0 24 0v-88"/>
      <path d="M-96 -64h42M-46 -64h42M4 -64h42M54 -64h42" opacity=".7"/>
    </g>
    <g opacity=".85">
      <path d="M-87 10v30a12 12 0 0 0 24 0v-30z" fill="${AMBER}"/>
      <path d="M-37 -4v44a12 12 0 0 0 24 0v-44z" fill="${BLUE}"/>
      <path d="M13 18v22a12 12 0 0 0 24 0v-22z" fill="${CYAN}"/>
      <path d="M63 4v36a12 12 0 0 0 24 0v-36z" fill="${AMBER}"/>
    </g>`,
  events: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-20" y="-96" width="40" height="76" rx="20"/>
      <path d="M-12 -72h24M-12 -58h24M-12 -44h24" opacity=".6"/>
      <path d="M-40 -46a40 40 0 0 0 80 0"/>
      <path d="M0 -6v34M-26 28h52"/>
      <path d="M-116 92q116 -72 232 0"/>
    </g>
    <g fill="${AMBER}">
      <circle cx="-84" cy="-30" r="4"/><circle cx="92" cy="-40" r="5"/><circle cx="-104" cy="20" r="3"/><circle cx="106" cy="14" r="3"/>
    </g>`,
  awareness: `
    <g fill="none" stroke="${CYAN}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="-44" cy="4" r="56"/>
      <ellipse cx="-44" cy="4" rx="24" ry="56"/>
      <path d="M-100 4h112M-92 -26h96M-92 34h96" opacity=".7"/>
    </g>
    <g fill="none" stroke="${AMBER}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M40 72C40 -2 82 -48 116 -64C120 10 92 56 40 72Z"/>
      <path d="M44 68Q78 18 110 -56"/>
    </g>`,
}

function svg(category, n, w, h) {
  const label = LABELS[category].toUpperCase()
  const u = Math.min(w, h) / 1000
  const s = (u * 2.4).toFixed(3)
  const pad = Math.round(48 * u)
  const small = Math.round(26 * u)
  const num = Math.round(120 * u)
  const pillW = Math.round(176 * u)
  const pillH = Math.round(44 * u)
  const cy = h / 2 - 20 * u
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${LABELS[category]} placeholder ${n}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1630"/><stop offset="1" stop-color="#10224a"/></linearGradient>
<radialGradient id="glow" cx="50%" cy="46%" r="52%"><stop offset="0" stop-color="#2563eb" stop-opacity=".5"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(34,211,238,0.08)" stroke-width="1"/></pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#grid)"/>
<rect width="${w}" height="${h}" fill="url(#glow)"/>
<g transform="translate(${w / 2} ${cy.toFixed(1)}) scale(${s})">${ART[category]}</g>
<g font-family="system-ui, sans-serif" font-weight="600">
<text x="${pad}" y="${h - pad}" font-size="${small}" letter-spacing="${(small * 0.18).toFixed(1)}" fill="rgba(255,255,255,0.78)">${label}</text>
<text x="${w - pad}" y="${h - pad + num * 0.08}" font-size="${num}" text-anchor="end" fill="rgba(255,255,255,0.08)">${String(n).padStart(2, '0')}</text>
<rect x="${w - pad - pillW}" y="${pad}" width="${pillW}" height="${pillH}" rx="${pillH / 2}" fill="rgba(251,191,36,0.14)" stroke="rgba(251,191,36,0.6)" stroke-width="${Math.max(1, Math.round(2 * u))}"/>
<text x="${w - pad - pillW / 2}" y="${pad + pillH * 0.66}" font-size="${Math.round(20 * u)}" letter-spacing="${(3 * u).toFixed(1)}" text-anchor="middle" fill="#fbbf24">PLACEHOLDER</text>
</g>
</svg>
`
}

let max = 0
for (const [category, n, w, h] of ITEMS) {
  const file = join(outDir, `${category}-${n}.svg`)
  writeFileSync(file, svg(category, n, w, h))
  max = Math.max(max, statSync(file).size)
}
console.log(`Wrote ${ITEMS.length} placeholder SVGs to public/placeholders (largest ${(max / 1024).toFixed(1)} KB)`)
