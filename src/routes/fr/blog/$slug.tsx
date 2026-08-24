import { createFileRoute, notFound } from '@tanstack/react-router'
import { BLOG_POSTS } from '@/data'
import { alternateLinks, localePath, OG_LOCALE } from '@/i18n/locale'
import { MESSAGES } from '@/i18n/messages'
import { WEBSITE_URL } from '@/lib/constants'
import { BlogPostPage, resolvePost } from '@/pages/blog-post'

const LOCALE = 'fr' as const

export const Route = createFileRoute('/fr/blog/$slug')({
  loader: ({ params }) => {
    if (!resolvePost(params.slug, LOCALE)) throw notFound()
    const entry = BLOG_POSTS.find((item) => item.slug === params.slug)
    return {
      title: entry?.title[LOCALE] ?? params.slug,
      description: entry?.description[LOCALE] ?? '',
      hero: entry?.hero,
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const path = `/blog/${params.slug}`
    return {
      meta: [
        { title: loaderData.title },
        { name: 'description', content: loaderData.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.description },
        { property: 'og:url', content: `${WEBSITE_URL}${localePath(path, LOCALE)}` },
        { property: 'og:locale', content: OG_LOCALE[LOCALE] },
        // Falls through to the site card on the root route when a post ships
        // without a hero.
        ...(loaderData.hero
          ? [{ property: 'og:image', content: `${WEBSITE_URL}${loaderData.hero}` }]
          : []),
        { name: 'twitter:title', content: loaderData.title },
        { name: 'twitter:description', content: loaderData.description },
      ],
      links: [
        { rel: 'canonical', href: `${WEBSITE_URL}${localePath(path, LOCALE)}` },
        ...alternateLinks(path, WEBSITE_URL),
      ],
    }
  },
  component: BlogPostRoute,
  notFoundComponent: () => (
    <div className="prose mt-24 pb-20">
      <h1>{MESSAGES[LOCALE]['blog.notFound']}</h1>
      <p>{MESSAGES[LOCALE]['blog.notFoundBody']}</p>
    </div>
  ),
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  return <BlogPostPage slug={slug} locale={LOCALE} />
}
