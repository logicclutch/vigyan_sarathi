# Content review checklist (विज्ञान सारथी)

This site was built from the organisation's supplied text plus drafted copy. Nothing here invents facts:
no founding year, founders, registration, awards, partners, statistics, events, testimonials or contact details
are stated anywhere. Everything that was drafted is listed below so the organisation can approve, edit or replace it.

In development builds (`npm run dev`) every drafted block shows a small amber **"प्रारूप, समीक्षा हेतु"** badge
(`<DevReviewBadge>`). Production builds never show it.

## 1. Supplied by the organisation (used verbatim in Hindi; English is a translation)

| Text | Where it is used | File |
| --- | --- | --- |
| Introduction paragraphs (what Vigyan Sarathi is, what it does, belief, effort, goal) | About page, Home intro | `src/content/about.ts`, `src/content/home.ts` |
| “विज्ञान केवल विषय नहीं, सोचने का तरीका है” + the learning-culture paragraph and the six-step chain | About (dark section), footer, Vision page | `src/content/about.ts` → `learningCulture` |
| हमारा संदेश: “जिस मन में प्रश्न जीवित हैं, उसी मन में विज्ञान जीवित है।” | Home intro quote, About | `src/content/about.ts` |
| Vision statement + the seven qualities; Mission statement + the six efforts | Vision & Mission page, Home duo panel, Objectives aside | `src/content/visionMission.ts` |
| प्रमुख उद्देश्य (ten objectives) | Objectives page | `src/content/objectives.ts` |
| Scientific temper heading, definition (“मैंने सुना है” → “क्या यह सत्य है?” → “इसका प्रमाण क्या है?”) and the three teachings | Scientific Temper page, Home teaser | `src/content/scientificTemper.ts` |
| The six process steps (प्रश्न पूछें → सोचें → परिकल्पना बनाएँ → प्रयोग करें → प्रमाण खोजें → निष्कर्ष निकालें) | Process explorer, About, Home | `src/content/scientificTemper.ts` → `temperSteps[].label` |
| Nine activity one-liners and “देखो नहीं, करके सीखो।” | Activities, activity detail heroes, Home mosaic | `src/content/activities.ts` → `short`, `motto` |
| Students Corner heading, list and motto “पढ़ो कम नहीं—समझो अधिक, पूछो अधिक और प्रयोग करो।” | Students hub | `src/content/students/index.ts` → `studentsIntro` |
| Teachers Corner intro and “विज्ञान सारथी शिक्षकों के लिए उपलब्ध कराएगा—” + nine categories | Teachers page | `src/content/teachers/index.ts`, `src/content/ui.ts` |
| Tagline, hero heading, English subtitle | Home hero, footer | `src/content/site.ts` |

## 2. Still drafted (`review: true`) — approve, edit or remove

| Item | Count | File |
| --- | --- | --- |
| Activity elaborations: intro paragraph, “what happens”, “who it is for”, “what students take away” | 9 activities | `src/content/activities.ts` |
| Scientific-temper step explanations, the plant-and-light running example and the “claim or evidence?” statements | 6 + 10 | `src/content/scientificTemper.ts` |
| Contact FAQ answers | 4 | `src/content/contact.ts` |
| Section headings on the About page (phrases drawn from the supplied text), audiences strip | 5 + 4 | `src/content/about.ts` |
| Home section headlines, journey-strip hints, CTA copy | — | `src/content/home.ts` |
| Page meta descriptions, interface strings | — | `src/content/pages.ts`, `src/content/ui.ts` |

## 3. Educational content (general science, verifiable, not organisational claims)

Written for classes 6–12 in Hindi and English. Worth a subject-teacher read-through before launch.

| Section | Count | File |
| --- | --- | --- |
| Science facts | 18 | `src/content/students/facts.ts` |
| Simple experiments (materials, steps, predict-first, science, safety) | 10 | `src/content/students/experiments.ts` |
| Quiz sets × questions | 3 × 8 | `src/content/students/quiz.ts` |
| Projects (3 featured) | 9 | `src/content/students/projects.ts` |
| Model ideas | 8 | `src/content/students/models.ts` |
| Scientist stories (real, well-documented figures; links to English Wikipedia) | 10 | `src/content/students/scientists.ts` |
| Important questions | 14 | `src/content/students/questions.ts` |
| News sources (verified URLs) + critical-reading tips | 10 + 6 | `src/content/students/news.ts` |
| Careers | 10 | `src/content/students/careers.ts` |
| Myths vs facts | 12 | `src/content/students/myths.ts` |
| Scientific-temper steps, habits, claim-sorter statements | 6 + 5 + 10 | `src/content/scientificTemper.ts` |
| Teacher resources: written guides/activities/demos/quizzes + verified external links | 32 available | `src/content/teachers/resources.ts` |

## 3b. Logo

The supplied logo image was vectorised automatically (`npm run logo`). The trace is faithful but machine-made; if the
organisation has the original vector artwork, it can replace `public/logo-mark.svg` and `public/logo.svg` (see README → Logo).

## 4. Placeholders waiting for real material

| Placeholder | What to do | Where |
| --- | --- | --- |
| Contact email, phone, address, hours, map embed | Fill `site.contact`; the Contact page, footer and the form's mail fallback switch on automatically | `src/content/site.ts` |
| Social media links | Fill `site.social` (only configured networks are rendered) | `src/content/site.ts` |
| Founding year, registration, statistics, dated events, organisation news | Fill the optional fields; sections appear only when data exists | `src/content/site.ts` |
| Gallery photographs (18 SVG placeholders, clearly labelled) | Put photos in `public/gallery/`, edit `galleryItems` (`src`, `w`, `h`, `alt`, `caption`, `placeholder: false`) | `src/content/gallery.ts` |
| Science PPT resources (3 items marked "coming soon") | Add files/links and set `status: 'available'` | `src/content/teachers/resources.ts` |
| Contact form backend | Set `VITE_CONTACT_ENDPOINT` (e.g. a Formspree endpoint); until then the form opens a prefilled mail or offers copyable text | `.env` |
| Public site URL (canonical links, OG image, sitemap) | Set `VITE_SITE_URL` before `npm run build` | `.env` |

## 5. Quick commands

- `npm run dev` – see the review badges while editing content.
- `npm run typecheck` – every bilingual object must have both `hi` and `en`.
- `npm run test:e2e` – routes, interactions, accessibility and link checks.
