import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PROJECTS } from '@/data'
import { alternateLinks, localePath, OG_LOCALE } from '@/i18n/locale'
import { MESSAGES } from '@/i18n/messages'
import { WEBSITE_URL } from '@/lib/constants'
import { CaseStudyPage, resolveStudy } from '@/pages/case-study'

const LOCALE = 'fr' as const

export const Route = createFileRoute('/fr/projects/$slug')({
  loader: ({ params }) => {
    const found = resolveStudy(params.slug, LOCALE)
    if (!found) throw notFound()
    const project = PROJECTS.find((item) => item.slug === params.slug)
    return {
      title: found.study.metadata?.title ?? params.slug,
      description: project?.description[LOCALE] ?? found.study.metadata?.description ?? '',
      image: project?.image,
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const path = `/projects/${params.slug}`
    return {
      meta: [
        { title: loaderData.title },
        { name: 'description', content: loaderData.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.description },
        { property: 'og:url', content: `${WEBSITE_URL}${localePath(path, LOCALE)}` },
        { property: 'og:locale', content: OG_LOCALE[LOCALE] },
        ...(loaderData.image
          ? [{ property: 'og:image', content: `${WEBSITE_URL}${loaderData.image}` }]
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
  component: CaseStudyRoute,
  notFoundComponent: () => (
    <div className="prose mt-24 pb-20">
      <h1>{MESSAGES[LOCALE]['project.notFound']}</h1>
      <p>
        {MESSAGES[LOCALE]['project.notFoundBody']}{' '}
        <Link to={localePath('/', LOCALE) as never}>
          {MESSAGES[LOCALE]['project.notFoundLink']}
        </Link>
      </p>
    </div>
  ),
})

function CaseStudyRoute() {
  const { slug } = Route.useParams()
  return <CaseStudyPage slug={slug} locale={LOCALE} />
}
