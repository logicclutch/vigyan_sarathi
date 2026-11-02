import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { revealAll } from './helpers'
import { ROUTES } from './routes'

test.describe('accessibility (axe-core)', () => {
  for (const route of ROUTES) {
    test(`${route} has no serious or critical violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      await revealAll(page)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
      const serious = results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
      const summary = serious.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join('\n  ')}`).join('\n')
      expect(serious, summary).toEqual([])
    })
  }
})
