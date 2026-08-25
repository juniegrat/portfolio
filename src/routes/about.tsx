import { createFileRoute } from '@tanstack/react-router'
import { NAME } from '@/data'
import { alternateLinks, localePath, OG_LOCALE } from '@/i18n/locale'
import { WEBSITE_URL } from '@/lib/constants'
import { AboutPage, resolveAbout } from '@/pages/about'

const LOCALE = 'en' as const

export const Route = createFileRoute('/about')({
  head: () => {
    const page = resolveAbout(LOCALE)
    const title = `${page?.metadata?.title ?? 'About'} — ${NAME}`
    const description = page?.metadata?.description ?? ''
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:locale', content: OG_LOCALE[LOCALE] },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: `${WEBSITE_URL}${localePath('/about', LOCALE)}` },
        ...alternateLinks('/about', WEBSITE_URL),
      ],
    }
  },
  component: () => <AboutPage locale={LOCALE} />,
})
