// Copies the font subsets we self-host from the fontsource packages into public/fonts.
// Run with `npm run fonts` after upgrading the font packages.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  ['@fontsource-variable/inter', 'inter-latin-wght-normal.woff2'],
  ['@fontsource-variable/inter', 'inter-latin-ext-wght-normal.woff2'],
  ['@fontsource-variable/noto-sans-devanagari', 'noto-sans-devanagari-devanagari-wght-normal.woff2'],
  ['@fontsource-variable/noto-sans-devanagari', 'noto-sans-devanagari-latin-wght-normal.woff2'],
  ['@fontsource-variable/noto-sans-devanagari', 'noto-sans-devanagari-latin-ext-wght-normal.woff2'],
]
const out = join(root, 'public', 'fonts')
mkdirSync(out, { recursive: true })
for (const [pkg, file] of files) {
  copyFileSync(join(root, 'node_modules', pkg, 'files', file), join(out, file))
}
console.log(`Synced ${files.length} font files to public/fonts`)
