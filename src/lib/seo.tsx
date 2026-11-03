import { useEffect } from 'react'
import { site, siteUrl } from '@/content/site'
import { LANG_META, type Localized } from '@/i18n/types'
import { useLanguage } from '@/i18n/useLanguage'

interface SeoProps {
  title: Localized
  description: Localized
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page document metadata. Updates the static tags from index.html in place
 * so there is exactly one of each, whichever language is active.
 */
export function Seo({ title, description, path, image = '/og.png', type = 'website', noindex = false }: SeoProps) {
  const { lang, t } = useLanguage()
  const pageTitle = t(title)
  const pageDescription = t(description)
  const siteName = t(site.name)

  useEffect(() => {
    const base = (siteUrl || window.location.origin).replace(/\/$/, '')
    const fullTitle = path === '/' ? `${siteName} | ${site.shortName}` : `${pageTitle} | ${siteName}`
    const url = base ? `${base}${path}` : path
    const img = base ? `${base}${image}` : image

    document.title = fullTitle
    upsertMeta('name', 'description', pageDescription)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', pageDescription)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:locale', LANG_META[lang].ogLocale)
    upsertMeta('property', 'og:site_name', site.shortName)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', pageDescription)
    upsertMeta('name', 'twitter:image', img)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [lang, pageTitle, pageDescription, siteName, path, image, type, noindex])

  return null
}
