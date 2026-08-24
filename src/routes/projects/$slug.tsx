import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@/components/mdx-components'
import { PostHero } from '@/components/post-hero'
import { PROJECTS } from '@/data'
import { WEBSITE_URL } from '@/lib/constants'

type StudyModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
  metadata?: {
    title?: string
    description?: string
  }
}

// Same eager glob as the blog: slugs resolve during SSR, and Vite inlines the
// modules at build time.
const modules = import.meta.glob<StudyModule>('../../content/projects/*.mdx', {
  eager: true,
})

const studies: Record<string, StudyModule> = {}
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? ''
  const slug = file.replace(/\.mdx$/, '')
  if (slug) studies[slug] = mod
}

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const study = studies[params.slug]
    if (!study) throw notFound()
    const project = PROJECTS.find((item) => item.slug === params.slug)
    return {
      title: study.metadata?.title ?? params.slug,
      description: study.metadata?.description ?? '',
      image: project?.image,
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const url = `${WEBSITE_URL}/projects/${params.slug}`
    return {
      meta: [
        { title: loaderData.title },
        { name: 'description', content: loaderData.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.description },
        { property: 'og:url', content: url },
        ...(loaderData.image
          ? [{ property: 'og:image', content: `${WEBSITE_URL}${loaderData.image}` }]
          : []),
        { name: 'twitter:title', content: loaderData.title },
        { name: 'twitter:description', content: loaderData.description },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <div className="prose mt-24 pb-20">
      <h1>Case study not found</h1>
      <p>
        This project does not have a writeup yet. <Link to="/">Back to the work</Link>.
      </p>
    </div>
  ),
})

function CaseStudy() {
  const { slug } = Route.useParams()
  const study = studies[slug]

  if (!study) return null

  const Content = study.default
  const project = PROJECTS.find((item) => item.slug === slug)

  return (
    <>
      <div className="mt-24 flex items-center justify-between gap-4">
        <Link
          to="/"
          hash="projects"
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink sm:min-h-0"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-snap group-hover:-translate-x-0.5" />
          <span>Work</span>
        </Link>
        {project?.link ? (
          <a
            className="group relative text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
            <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-accent transition-[max-width] duration-200 ease-snap group-hover:max-w-full" />
          </a>
        ) : null}
      </div>

      {project ? (
        <div className="mt-4">
          <PostHero title={project.name} src={project.image} eager />
          <div className="mt-3 flex flex-wrap gap-1.5 px-1">
            <span className="tabular mr-1 font-mono text-xs text-faint">{project.year}</span>
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-faint"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <main className="prose mt-6 pb-20 prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-strong:font-medium">
        <Content components={mdxComponents} />
      </main>
    </>
  )
}
