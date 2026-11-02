// Viewport-sized frames of one route (for close visual review). Usage:
//   node scripts/frames.mjs <route> <width> [baseUrl] [outDir]
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from '@playwright/test'

const [route = '/', widthArg = '1440', base = 'http://localhost:4173', out = './.screenshots/frames'] = process.argv.slice(2)
const width = Number(widthArg)
const height = width < 768 ? 812 : 900
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
await page.goto(base + route, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const total = await page.evaluate(() => document.body.scrollHeight)
const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')
let i = 0
for (let y = 0; y < total; y += height) {
  await page.evaluate((top) => window.scrollTo(0, top), y)
  await page.waitForTimeout(950)
  await page.screenshot({ path: join(out, `${name}@${width}-${String(i).padStart(2, '0')}.png`) })
  i += 1
}
await browser.close()
console.log(`${i} frames for ${route} at ${width}px → ${out}`)
