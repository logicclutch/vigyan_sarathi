// Renders public/og.png (1200x630), public/apple-touch-icon.png (180) and public/icon-512.png (512)
// with the locally installed Google Chrome through Playwright. Run: node scripts/make-og.mjs
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(pathToFileURL(join(root, 'scripts/og.html')).href)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(root, 'public/og.png'), type: 'png' })
  console.log('wrote public/og.png')

  for (const [size, file] of [[180, 'apple-touch-icon.png'], [512, 'icon-512.png']]) {
    const icon = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 })
    const svg = readFileSync(join(root, 'public/favicon.svg'), 'utf8').replace('<svg ', `<svg width="${size}" height="${size}" `)
    await icon.setContent(`<!doctype html><html><body style="margin:0;background:#050b1a">${svg}</body></html>`)
    await icon.screenshot({ path: join(root, 'public', file), type: 'png' })
    await icon.close()
    console.log(`wrote public/${file}`)
  }
} finally {
  await browser.close()
}
