import { expect, test } from '@playwright/test'
import { revealAll, watchIssues } from './helpers'
import { NOT_FOUND_TITLE, ROUTES } from './routes'

test.describe('every route renders cleanly', () => {
  for (const route of ROUTES) {
    test(`${route} has a heading, metadata, Hindi default and no runtime issues`, async ({ page }) => {
      const issues = watchIssues(page)
      await page.goto(route, { waitUntil: 'networkidle' })
      await expect(page.locator('h1').first()).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute('lang', 'hi')
      await expect(page).toHaveTitle(/विज्ञान सारथी|Vigyan Sarathi/)
      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description, 'meta description').toBeTruthy()
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
      await revealAll(page)
      // nothing hidden by a reveal that never fired
      const hiddenReveals = await page.locator('[data-inview="false"]').count()
      expect(hiddenReveals, 'elements still hidden after scrolling through the page').toBe(0)
      expect(issues, JSON.stringify(issues, null, 2)).toEqual([])
    })
  }
})

test('unknown routes show the 404 page and ask not to be indexed', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page.locator('h1')).toHaveText(NOT_FOUND_TITLE)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.getByRole('link', { name: /होम पर जाएँ/ }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('every internal link on every page resolves to a real page', async ({ page }) => {
  test.slow()
  const seen = new Set<string>()
  const queue = [...ROUTES] as string[]
  const broken: string[] = []
  while (queue.length) {
    const route = queue.shift()!
    if (seen.has(route)) continue
    seen.add(route)
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1').first()).toBeVisible()
    const h1 = (await page.locator('h1').first().textContent())?.trim()
    if (h1 === NOT_FOUND_TITLE && route !== '/this-page-does-not-exist') broken.push(route)
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''))
    for (const href of hrefs) {
      const path = href.split('#')[0]!.split('?')[0]!
      if (path && !seen.has(path) && !path.startsWith('/fonts') && !path.startsWith('/placeholders')) queue.push(path)
    }
  }
  expect(broken, 'internal links leading to the 404 page').toEqual([])
  expect(seen.size).toBeGreaterThan(ROUTES.length)
})

test('external links point to reachable public resources', async ({ page, playwright }) => {
  test.slow()
  const urls = new Set<string>()
  for (const route of ['/students/news', '/students/scientists', '/teachers']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await page.locator('a[href^="http"]').first().waitFor()
    for (const href of await page.locator('a[href^="http"]').evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).href))) urls.add(href)
  }
  expect(urls.size).toBeGreaterThan(10)
  // Some public sites answer non-browser clients with 403/429; those are reachable, not dead.
  const api = await playwright.request.newContext({ ignoreHTTPSErrors: true })
  const dead: string[] = []
  const blocked: string[] = []
  for (const url of urls) {
    try {
      const response = await api.get(url, { timeout: 20_000, maxRedirects: 5, headers: { 'User-Agent': 'Mozilla/5.0 (link check)' } })
      const status = response.status()
      if (status === 404 || status === 410 || status >= 500) dead.push(`${status} ${url}`)
      else if (status >= 400) blocked.push(`${status} ${url}`)
    } catch (error) {
      dead.push(`${String(error).slice(0, 80)} ${url}`)
    }
  }
  await api.dispose()
  if (blocked.length) console.log('bot-blocked but reachable:', blocked)
  expect(dead, 'external links that are missing or erroring').toEqual([])
})
