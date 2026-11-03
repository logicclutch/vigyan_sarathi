import { expect, test } from '@playwright/test'

/**
 * Admin panel smoke test. Runs only when the admin API is reachable and
 * ADMIN_E2E_EMAIL / ADMIN_E2E_PASSWORD are set (locally: start `npm run api`
 * with ADMIN_EMAIL / ADMIN_PASSWORD, then export the same values).
 */
const email = process.env.ADMIN_E2E_EMAIL
const password = process.env.ADMIN_E2E_PASSWORD

test.describe('admin panel', () => {
  test.skip(!email || !password, 'ADMIN_E2E_EMAIL / ADMIN_E2E_PASSWORD not set')
  // Every project edits the same stored section, so the projects must not overlap.
  test.describe.configure({ mode: 'serial' })

  test('is hidden from search engines and requires sign-in', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/साइन इन|Sign in/)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('signs in, edits a section, saves and resets it', async ({ page }, testInfo) => {
    const key = { desktop: 'scientificTemper.heading', tablet: 'scientificTemper.quote', mobile: 'scientificTemper.teachingsLabel' }[testInfo.project.name] ?? 'scientificTemper.heading'
    await page.goto('/admin')
    await page.getByLabel(/ईमेल|Email/).fill(email!)
    await page.getByLabel(/पासवर्ड|Password/).fill(password!)
    await page.getByRole('button', { name: /साइन इन|Sign in/ }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/सारांश|Overview/)

    await page.goto(`/admin/content/${key}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const hindi = page.locator('input[lang="hi"], textarea[lang="hi"]').first()
    await expect(hindi).toBeVisible()
    const original = await hindi.inputValue()
    await hindi.fill(`${original} ✓`)
    await page.getByRole('button', { name: /^(सहेजें|Save)$/ }).click()
    await expect(page.getByRole('status')).toContainText(/सहेजा गया|Saved/)

    await page.reload()
    await expect(page.locator('input[lang="hi"], textarea[lang="hi"]').first()).toHaveValue(`${original} ✓`)

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /मूल सामग्री|Reset to built-in/ }).click()
    await expect(page.locator('input[lang="hi"], textarea[lang="hi"]').first()).toHaveValue(original)
  })
})
