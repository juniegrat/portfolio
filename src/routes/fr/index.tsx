import { createFileRoute } from '@tanstack/react-router'
import { NAME, SITE_DESCRIPTION } from '@/data'
import { alternateLinks, localePath, OG_LOCALE } from '@/i18n/locale'
import { MESSAGES } from '@/i18n/messages'
import { WEBSITE_URL } from '@/lib/constants'
import { HomePage } from '@/pages/home'

const LOCALE = 'fr' as const

export const Route = createFileRoute('/fr/')({
  head: () => {
    const title = `${NAME}, ${MESSAGES[LOCALE]['role.title']}`
    return {
      meta: [
        { title },
        { name: 'description', content: SITE_DESCRIPTION[LOCALE] },
        { property: 'og:title', content: title },
        { property: 'og:description', content: SITE_DESCRIPTION[LOCALE] },
        { property: 'og:locale', content: OG_LOCALE[LOCALE] },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: SITE_DESCRIPTION[LOCALE] },
      ],
      links: [
        { rel: 'canonical', href: `${WEBSITE_URL}${localePath('/', LOCALE)}` },
        ...alternateLinks('/', WEBSITE_URL),
      ],
    }
  },
  component: () => <HomePage locale={LOCALE} />,
})
