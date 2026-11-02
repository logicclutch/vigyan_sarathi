import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

test('with prefers-reduced-motion the decorative animations are off and content is visible immediately', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const animated = await page.locator('svg g[class*="animate-"]').evaluateAll((nodes) =>
    nodes.map((node) => getComputedStyle(node).animationName).filter((name) => name && name !== 'none'),
  )
  expect(animated, 'CSS animations still running under reduced motion').toEqual([])
  await expect(page.locator('animateMotion')).toHaveCount(0)
  expect(await page.locator('[data-inview="false"]').count()).toBe(0)
})
