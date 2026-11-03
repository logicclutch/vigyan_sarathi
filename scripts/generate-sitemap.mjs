// Writes public/sitemap.xml and public/robots.txt from the route table.
// Uses VITE_SITE_URL from the environment or .env / .env.local (no trailing slash).
import { readFileSync, writeFileSync } from 'node:fs'
import { resolveSiteUrl } from './site-url.mjs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const base = resolveSiteUrl()
const activitiesSource = readFileSync(join(root, 'src/content/activities.ts'), 'utf8')
const slugs = [...activitiesSource.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1])
const studentSections = ['facts', 'experiments', 'quiz', 'projects', 'models', 'scientists', 'questions', 'news', 'careers', 'myths']

const routes = [
  '/',
  '/about',
  '/vision-mission',
  '/objectives',
  '/scientific-temper',
  '/activities',
  ...slugs.map((slug) => `/activities/${slug}`),
  '/students',
  ...studentSections.map((key) => `/students/${key}`),
  '/teachers',
  '/gallery',
  '/contact',
]

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((route) => {
    const priority = route === '/' ? '1.0' : route.split('/').length > 2 ? '0.6' : '0.8'
    return `  <url>\n    <loc>${base}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')

writeFileSync(join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
writeFileSync(join(root, 'public/robots.txt'), `User-agent: *\nDisallow: /admin\nDisallow: /api/\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`)
console.log(`sitemap: ${routes.length} routes${base ? ` under ${base}` : ' (VITE_SITE_URL not set: relative locs)'}`)
