import { ArrowLeftIcon } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { mdxComponents } from '@/components/mdx-components'
import { POST_DATE_FORMAT, PostHero, parsePostDate } from '@/components/post-hero'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TextMorph } from '@/components/ui/text-morph'
import { BLOG_POSTS } from '@/data'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/locale'
import { LocaleLink } from '@/i18n/use-locale'

type PostModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
  metadata?: {
    title?: string
    description?: string
  }
}

// Eagerly load every post in every locale so `<locale>/<slug>` resolves during
// SSR. Vite inlines these at build time.
const modules = import.meta.glob<PostModule>('../content/blog/*/*.mdx', { eager: true })

const posts: Record<string, PostModule> = {}
for (const [path, mod] of Object.entries(modules)) {
  const parts = path.split('/')
  const file = parts.pop() ?? ''
  const locale = parts.pop() ?? ''
  const slug = file.replace(/\.mdx$/, '')
  if (locale && slug) posts[`${locale}/${slug}`] = mod
}

/**
 * A post in the requested locale, falling back to the default locale when a
 * translation does not exist yet. Returns the locale actually resolved so the
 * caller can tell the reader they are looking at the English text.
 */
export function resolvePost(slug: string, locale: Locale) {
  const exact = posts[`${locale}/${slug}`]
  if (exact) return { post: exact, resolved: locale }
  const fallback = posts[`${DEFAULT_LOCALE}/${slug}`]
  if (fallback) return { post: fallback, resolved: DEFAULT_LOCALE }
  return null
}

export function BlogPostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const intl = useIntl()
  const found = resolvePost(slug, locale)

  if (!found) return null

  const Content = found.post.default
  const entry = BLOG_POSTS.find((item) => item.slug === slug)

  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-surface backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <ScrollProgress className="fixed top-0 z-20 h-0.5 bg-accent" springOptions={{ bounce: 0 }} />

      <div className="mt-24 flex items-center justify-between gap-4">
        <LocaleLink
          to="/blog"
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink sm:min-h-0"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-snap group-hover:-translate-x-0.5" />
          <span>{intl.formatMessage({ id: 'blog.back' })}</span>
        </LocaleLink>
        <CopyButton />
      </div>

      {entry ? (
        <div className="mt-4">
          <PostHero title={entry.title[locale]} src={entry.hero} eager />
          <div className="tabular mt-3 flex items-center gap-2 px-1 font-mono text-xs text-faint">
            <time dateTime={entry.date}>
              {intl.formatDate(parsePostDate(entry.date), POST_DATE_FORMAT)}
            </time>
            <span aria-hidden="true">/</span>
            <span>
              {intl.formatMessage({ id: 'blog.readingTime' }, { minutes: entry.minutes })}
            </span>
          </div>
        </div>
      ) : null}

      <main className="prose mt-6 pb-20 prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:text-base prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
        <Content components={mdxComponents} />
      </main>
    </>
  )
}

function CopyButton() {
  const intl = useIntl()
  const copyLabel = intl.formatMessage({ id: 'blog.copy' })
  const [text, setText] = useState(copyLabel)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (text === copyLabel) return
    const timeout = setTimeout(() => setText(copyLabel), 2000)
    return () => clearTimeout(timeout)
  }, [text, copyLabel])

  return (
    <button
      onClick={() => {
        setText(intl.formatMessage({ id: 'blog.copied' }))
        navigator.clipboard.writeText(currentUrl)
      }}
      className="flex items-center gap-1 text-center text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink active:scale-[0.97]"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>{intl.formatMessage({ id: 'blog.copyUrl' })}</span>
    </button>
  )
}
