import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
// Point the suites at a deployed site with E2E_BASE_URL=https://example.com npm run test:e2e
const liveBaseURL = process.env.E2E_BASE_URL?.replace(/\/$/, '')
const baseURL = liveBaseURL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    locale: 'hi-IN',
  },
  webServer: liveBaseURL
    ? undefined
    : {
        command: `npm run preview -- --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 768, height: 1024 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
})
