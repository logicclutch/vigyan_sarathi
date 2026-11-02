# विज्ञान सारथी · Vigyan Sarathi

Bilingual (Hindi-first, English toggle) website for Vigyan Sarathi, a social and educational initiative
promoting scientific temper, curiosity, logical thinking and experimentation among students and society.

- Home with an original animated atom, journey strip, editorial intro, vision/mission duo, activities mosaic,
  scientific-temper teaser, students bento, teachers ledger, featured projects, programme formats, gallery wall and CTA
- About, Vision & Mission, Objectives (manifesto list)
- Scientific Temper: interactive six-step explorer and a "claim or evidence?" game
- Activities: nine formats with detail pages
- Students Corner: searchable discovery portal with facts, experiments (step checklists), quizzes, projects, models,
  scientist stories, questions, news sources, careers and myth-vs-fact flip cards
- Teachers Corner: searchable, filterable resource library (written resources, verified external links, "coming soon" requests)
- Gallery with category filters and a native-dialog lightbox; Contact with validated form and FAQ

## Stack

React 19 · TypeScript 7 · Vite 8 · Tailwind CSS 4 · React Router 8 · Lucide icons · self-hosted Inter and Noto Sans Devanagari.
No animation, i18n, lightbox or form libraries: reveals use IntersectionObserver + CSS, overlays use `<dialog>`,
and language handling is a small typed context (`src/i18n`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with review badges on drafted content |
| `npm run build` | Generates `sitemap.xml`/`robots.txt`, typechecks, builds to `dist/` |
| `npm run preview` | Serves `dist/` on http://localhost:4173 |
| `npm run typecheck` / `npm run lint` | TypeScript project build check / oxlint |
| `npm run test:e2e` | Playwright: routes, metadata, interactions, axe accessibility, link checks (uses installed Google Chrome) |
| `npm run og:image` | Re-renders `public/og.png`, `apple-touch-icon.png`, `icon-512.png` |
| `npm run placeholders` | Regenerates the gallery placeholder SVGs |
| `npm run fonts` | Re-copies font subsets from the fontsource packages into `public/fonts` |
| `npm run logo` | Re-traces `brand/logo-source.jpeg` into the themeable SVG logo files (`public/logo*.svg`, `public/favicon.svg`) |
| `node scripts/screenshots.mjs` | Full-page screenshots of every route at 375/768/1440 with console/network issue report |

## Editing content

All copy lives in `src/content/**` as bilingual objects `{ hi: '…', en: '…' }`; components never contain literal text.

| What | File |
| --- | --- |
| Organisation name, tagline, message, hero, **contact details, social links, optional facts** | `src/content/site.ts` |
| Navigation | `src/content/nav.ts` |
| Page titles, leads, meta descriptions | `src/content/pages.ts` |
| Interface strings (buttons, labels, form, filters) | `src/content/ui.ts` |
| Home section copy | `src/content/home.ts` |
| About, vision/mission, objectives, activities, scientific temper, contact FAQ | `src/content/*.ts` |
| Students Corner data | `src/content/students/*.ts` |
| Teachers Corner data | `src/content/teachers/*.ts` |
| Gallery items | `src/content/gallery.ts` (photos go in `public/gallery/`) |

Items drafted for the organisation's approval carry `review: true`; see `CONTENT-REVIEW.md` for the full list.
Facts that were not supplied (contact details, founding year, statistics, events) are optional fields that are
simply left empty; the UI hides or adapts those sections until they are filled.

## Configuration

Copy `.env.example` to `.env`:

- `VITE_SITE_URL` – public URL (canonical links, Open Graph image URL, sitemap).
- `VITE_CONTACT_ENDPOINT` – optional HTTPS endpoint that accepts a JSON POST `{ name, email, phone, subject, message, language }`
  (for example a Formspree form). Without it the form opens a prefilled email to `site.contact.email`, and without an email it
  shows the composed message with a copy button, so the button is never a dead end.

## Deployment

### Docker + Traefik (VPS)

`Dockerfile` builds the site in a Node stage and serves `dist/` with nginx (`docker/nginx.conf`: route fallback,
compression, long caching for hashed assets). `docker-compose.yml` attaches the container to an existing Traefik network
with TLS via your certresolver. On the server:

```bash
git clone https://github.com/logicclutch/vigyan_sarathi.git vigyan-sarathi && cd vigyan-sarathi
cp .env.example .env   # set SITE_DOMAIN and the Traefik network / entrypoint / certresolver names
docker compose up -d --build
```

Update later with `git pull && docker compose up -d --build`.


### Hostinger (shared / cloud hosting)

`npm run deploy:hostinger` builds the site and force-pushes the contents of `dist/` to the `hostinger` branch of the
GitHub repository (set `VITE_SITE_URL=https://your-domain` so the sitemap and canonical links use the live domain).
In hPanel → Websites → Manage → Advanced → **Git**, connect the repository with branch `hostinger` and install path
`public_html`; enable auto-deployment with the webhook so every publish goes live. `public/.htaccess` provides the
single-page-app rewrite, compression and caching rules; `public/assets/.htaccess` caches the hashed assets for a year.


The build is a static single-page app in `dist/`. SPA fallbacks are included for Netlify (`public/_redirects`) and
Vercel (`vercel.json`). For Cloudflare Pages add a `_redirects` equivalent (already copied into `dist/`); for GitHub Pages
copy `dist/index.html` to `dist/404.html` after building.

## Logo

The organisation's logo artwork lives as a vector trace in `public/logo-mark.svg` (pictorial mark) and `public/logo.svg`
(mark + Devanagari wordmark), with a transparent background. Components reference them with `<use>` and recolour them
through CSS variables (`--logo-ink`, `--logo-teal`, `--logo-rust`, `--logo-gold`): original colours on light surfaces,
ivory line-art on dark ones (`src/components/brand/Logomark.tsx`). `*-dark.svg` copies with the dark palette baked in exist
for plain `<img>` use. If an official vector file becomes available, drop it in as `public/logo-mark.svg` /
`public/logo.svg` keeping the `id="mark"` / `id="full"` groups and the `var(--logo-*)` fills.

## Design system

Tokens are CSS variables in `src/styles/index.css` (`@theme`): navy/electric/cyan/cream/ink/amber palette, type scale with
Devanagari-specific line heights, shadows, easing and keyframes. Hindi is the default (`<html lang="hi">`);
`:lang(hi)` rules switch the font stack and leading, and every decorative animation is wrapped in `motion-safe:`.

## Quality

Playwright suites in `e2e/` run on desktop, tablet and Pixel-sized mobile profiles: every route renders without console
errors or failed requests, has an H1, title, description, canonical and Open Graph tags; the language switch persists;
the mobile menu, dropdown, stepper, quiz, experiments checklist, flip cards, search, filters, lightbox, contact form,
back-to-top and skip link are exercised; axe-core reports no serious or critical violations; internal links are crawled
and external links are checked.
