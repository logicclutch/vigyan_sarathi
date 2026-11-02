// Visual QA helper: screenshots every route at phone/tablet/desktop widths from a running server,
// and reports console errors, page errors and failed requests. Usage:
//   node scripts/screenshots.mjs [baseUrl=http://localhost:4173] [outDir=./.screenshots]
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:4173'
const out = process.argv[3] ?? './.screenshots'
const routes = [
  '/', '/about', '/vision-mission', '/objectives', '/scientific-temper', '/activities', '/activities/science-workshops',
  '/students', '/students/facts', '/students/experiments', '/students/quiz', '/students/projects', '/students/models',
  '/students/scientists', '/students/questions', '/students/news', '/students/careers', '/students/myths',
  '/teachers', '/gallery', '/contact', '/does-not-exist',
]
const widths = [375, 768, 1440]
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' })
const issues = []
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: width < 768 ? 812 : 900 }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  page.on('console', (msg) => { if (['error', 'warning'].includes(msg.type())) issues.push({ width, route: page.url(), type: `console.${msg.type()}`, text: msg.text().slice(0, 300) }) })
  page.on('pageerror', (err) => issues.push({ width, route: page.url(), type: 'pageerror', text: String(err).slice(0, 300) }))
  page.on('requestfailed', (req) => issues.push({ width, route: page.url(), type: 'requestfailed', text: `${req.url()} ${req.failure()?.errorText ?? ''}` }))
  page.on('response', (res) => { if (res.status() >= 400) issues.push({ width, route: page.url(), type: `http ${res.status()}`, text: res.url() }) })
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    // Walk down the page so scroll-reveal animations run, then return to the top.
    await page.evaluate(async () => {
      await document.fonts.ready
      const step = Math.max(300, Math.floor(window.innerHeight * 0.6))
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 70))
      }
      await new Promise((r) => setTimeout(r, 900))
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 400))
    })
    const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')
    await page.screenshot({ path: join(out, `${name}@${width}.png`), fullPage: true })
  }
  await context.close()
}
await browser.close()
const summary = issues.reduce((acc, i) => { const k = `${i.type}: ${i.text}`; acc[k] = (acc[k] ?? 0) + 1; return acc }, {})
console.log(`captured ${routes.length * widths.length} screenshots to ${out}`)
console.log(Object.keys(summary).length ? 'ISSUES:' : 'no console errors, page errors or failed requests')
for (const [k, n] of Object.entries(summary)) console.log(` ${n}× ${k}`)
