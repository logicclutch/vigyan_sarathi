import type { L, NewsItem, SiteEvent, SocialKey, Stat } from './types'
import { withOverride } from './overrides'

export interface SiteContact {
  email?: string
  phone?: string
  address?: L
  mapEmbedUrl?: string
  hours?: L
}

/**
 * Organisation configuration.
 *
 * Everything that is a FACT about the organisation (contact details, social
 * handles, founding year, statistics, dated events) is intentionally left
 * empty. The UI hides or adapts any section that depends on a missing value.
 * Fill these in when the information is confirmed.
 */
const siteDefaults = {
  name: { hi: 'विज्ञान सारथी', en: 'Vigyan Sarathi' } satisfies L,
  shortName: 'Vigyan Sarathi',
  nameDevanagari: 'विज्ञान सारथी',
  nameLatin: 'Vigyan Sarathi',

  heroHeading: {
    hi: 'जिज्ञासा से खोज तक, विज्ञान के साथ।',
    en: 'From curiosity to discovery, with science.',
  } satisfies L,
  heroSubtitle: 'Igniting Curiosity. Inspiring Scientific Thinking.',
  tagline: {
    hi: 'जिज्ञासा से प्रश्न तक, प्रश्न से प्रयोग तक और प्रयोग से वैज्ञानिक दृष्टिकोण तक।',
    en: 'From curiosity to questions, from questions to experiments, and from experiments to a scientific outlook.',
  } satisfies L,
  message: {
    hi: 'विज्ञान केवल विषय नहीं, सोचने का तरीका है।',
    en: 'Science is not just a subject. It is a way of thinking.',
  } satisfies L,
  description: {
    hi: 'विज्ञान सारथी विद्यार्थियों और समाज में वैज्ञानिक दृष्टिकोण, जिज्ञासा, तार्किक सोच, प्रयोगधर्मिता, नवाचार और वैज्ञानिक जागरूकता को बढ़ावा देने के लिए समर्पित एक सामाजिक एवं शैक्षिक पहल है।',
    en: 'Vigyan Sarathi is a social and educational initiative dedicated to promoting scientific temper, curiosity, logical thinking, experimentation, innovation and scientific awareness among students and society.',
  } satisfies L,

  /* ---- Configurable facts (empty until confirmed) ---- */
  contact: {
    email: '',
    phone: '',
    address: { hi: '', en: '' },
    mapEmbedUrl: '',
    hours: { hi: '', en: '' },
  } as SiteContact,
  social: { facebook: '', instagram: '', youtube: '', x: '', whatsapp: '' } as Partial<Record<SocialKey, string>>,
  foundedYear: '' as string,
  registration: { hi: '', en: '' } as L,
  stats: [] as Stat[],
  events: [] as SiteEvent[],
  newsItems: [] as NewsItem[],
}
export { siteDefaults }
export const site = withOverride('site', siteDefaults)

/** Public URL of the deployment (build-time, not editable). */
export const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X',
  whatsapp: 'WhatsApp',
}
