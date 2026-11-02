import type { Page } from '@playwright/test'

export interface PageIssue {
  type: string
  text: string
}

/** Collects console errors/warnings, page errors and failed requests for the lifetime of the page. */
export function watchIssues(page: Page): PageIssue[] {
  const issues: PageIssue[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') issues.push({ type: `console.${msg.type()}`, text: msg.text() })
  })
  page.on('pageerror', (error) => issues.push({ type: 'pageerror', text: String(error) }))
  page.on('requestfailed', (request) => issues.push({ type: 'requestfailed', text: `${request.url()} ${request.failure()?.errorText ?? ''}` }))
  page.on('response', (response) => {
    if (response.status() >= 400) issues.push({ type: `http ${response.status()}`, text: response.url() })
  })
  return issues
}

/** Walks down the page so IntersectionObserver-driven reveals fire, then returns to the top. */
export async function revealAll(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    const step = Math.max(300, Math.floor(window.innerHeight * 0.6))
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 60))
    }
    // Under heavy parallel load IntersectionObserver callbacks can be skipped while gliding;
    // bring anything still hidden into view explicitly.
    for (let pass = 0; pass < 4; pass += 1) {
      const hidden = Array.from(document.querySelectorAll('[data-inview="false"]'))
      if (hidden.length === 0) break
      for (const el of hidden) {
        el.scrollIntoView({ block: 'center' })
        await new Promise((resolve) => setTimeout(resolve, 140))
      }
      await new Promise((resolve) => setTimeout(resolve, 400))
    }
    window.scrollTo(0, 0)
  })
}
