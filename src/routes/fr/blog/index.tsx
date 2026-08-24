import { createFileRoute } from '@tanstack/react-router'
import { NAME } from '@/data'
import { alternateLinks, localePath, OG_LOCALE } from '@/i18n/locale'
import { MESSAGES } from '@/i18n/messages'
import { WEBSITE_URL } from '@/lib/constants'
import { BlogIndexPage } from '@/pages/blog-index'

const LOCALE = 'fr' as const

export const Route = createFileRoute('/fr/blog/')({
  head: () => {
    const title = `${MESSAGES[LOCALE]['blog.title']} — ${NAME}`
    const description = MESSAGES[LOCALE]['blog.description']
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:locale', content: OG_LOCALE[LOCALE] },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: `${WEBSITE_URL}${localePath('/blog', LOCALE)}` },
        ...alternateLinks('/blog', WEBSITE_URL),
      ],
    }
  },
  component: () => <BlogIndexPage locale={LOCALE} />,
})
