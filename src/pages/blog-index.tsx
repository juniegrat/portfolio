import { useIntl } from 'react-intl'
import { POST_DATE_FORMAT, PostHero, parsePostDate } from '@/components/post-hero'
import { BLOG_POSTS } from '@/data'
import type { Locale } from '@/i18n/locale'
import { LocaleLink } from '@/i18n/use-locale'

// Matches the homepage stagger. Long delays read as a slow page.
const STAGGER_MS = 60

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const intl = useIntl()

  return (
    <main className="relative mt-24 pb-20">
      <header className="enter mb-10">
        <h1 className="mb-3 text-xl font-medium text-ink">
          {intl.formatMessage({ id: 'blog.title' })}
        </h1>
        <p className="max-w-prose text-balance text-muted">
          {intl.formatMessage({ id: 'blog.description' })}
        </p>
      </header>

      <div className="flex flex-col gap-10 sm:gap-12">
        {BLOG_POSTS.map((post, index) => (
          <article
            key={post.uid}
            className="enter reveal"
            style={{ animationDelay: `${(index + 1) * STAGGER_MS}ms` }}
          >
            <LocaleLink
              to={`/blog/${post.slug}`}
              className="group block"
              aria-label={post.title[locale]}
            >
              <PostHero title={post.title[locale]} src={post.hero} />

              <div className="mt-3 px-1">
                <div className="tabular flex items-center gap-2 font-mono text-xs text-faint">
                  <time dateTime={post.date}>
                    {intl.formatDate(parsePostDate(post.date), POST_DATE_FORMAT)}
                  </time>
                  <span aria-hidden="true">/</span>
                  <span>
                    {intl.formatMessage({ id: 'blog.readingTime' }, { minutes: post.minutes })}
                  </span>
                </div>

                <h2 className="mt-1 inline-block font-[450] text-ink">
                  <span className="relative">
                    {post.title[locale]}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-accent transition-[max-width] duration-200 ease-snap group-hover:max-w-full" />
                  </span>
                </h2>

                <p className="mt-0.5 max-w-prose text-base text-muted">
                  {post.description[locale]}
                </p>
              </div>
            </LocaleLink>
          </article>
        ))}
      </div>
    </main>
  )
}
