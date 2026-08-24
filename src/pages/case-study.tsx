import { ArrowLeftIcon } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { useIntl } from 'react-intl'
import { mdxComponents } from '@/components/mdx-components'
import { PostHero } from '@/components/post-hero'
import { PROJECTS } from '@/data'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locale'
import { LocaleLink } from '@/i18n/use-locale'

type StudyModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
  metadata?: {
    title?: string
    description?: string
  }
}

const modules = import.meta.glob<StudyModule>('../content/projects/*/*.mdx', { eager: true })

const studies: Record<string, StudyModule> = {}
for (const [path, mod] of Object.entries(modules)) {
  const parts = path.split('/')
  const file = parts.pop() ?? ''
  const locale = parts.pop() ?? ''
  const slug = file.replace(/\.mdx$/, '')
  if (locale && slug) studies[`${locale}/${slug}`] = mod
}

/** Same locale-then-default resolution the blog uses. */
export function resolveStudy(slug: string, locale: Locale) {
  const exact = studies[`${locale}/${slug}`]
  if (exact) return { study: exact, resolved: locale }
  const fallback = studies[`${DEFAULT_LOCALE}/${slug}`]
  if (fallback) return { study: fallback, resolved: DEFAULT_LOCALE }
  return null
}

export function CaseStudyPage({ slug, locale }: { slug: string; locale: Locale }) {
  const intl = useIntl()
  const found = resolveStudy(slug, locale)

  if (!found) return null

  const Content = found.study.default
  const project = PROJECTS.find((item) => item.slug === slug)

  return (
    <>
      <div className="mt-24 flex items-center justify-between gap-4">
        <LocaleLink
          to="/"
          hash="projects"
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink sm:min-h-0"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-snap group-hover:-translate-x-0.5" />
          <span>{intl.formatMessage({ id: 'project.back' })}</span>
        </LocaleLink>
        {project?.link ? (
          <a
            className="group relative text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({ id: 'project.source' })}
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
