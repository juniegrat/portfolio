import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@/components/mdx-components'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locale'

type PageModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
  metadata?: {
    title?: string
    description?: string
  }
}

// Same eager, locale-keyed glob the blog and the case studies use.
const modules = import.meta.glob<PageModule>('../content/pages/*/about.mdx', { eager: true })

const pages: Record<string, PageModule> = {}
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.split('/').at(-2) ?? ''
  if (locale) pages[locale] = mod
}

/** The page in the requested locale, falling back to the default. */
export function resolveAbout(locale: Locale) {
  return pages[locale] ?? pages[DEFAULT_LOCALE] ?? null
}

export function AboutPage({ locale }: { locale: Locale }) {
  const page = resolveAbout(locale)

  if (!page) return null

  const Content = page.default

  return (
    <main className="prose mt-24 pb-20 prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-strong:font-medium">
      <Content components={mdxComponents} />
    </main>
  )
}
