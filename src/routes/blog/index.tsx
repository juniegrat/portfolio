import { createFileRoute, Link } from '@tanstack/react-router'
import { formatPostDate, PostHero } from '@/components/post-hero'
import { BLOG_POSTS } from '@/data'
import { WEBSITE_URL } from '@/lib/constants'

const TITLE = 'Writing'
const DESCRIPTION =
  'Post-mortems and technical writeups from building production systems, mostly about what the artifacts recorded rather than what anyone remembers.'

export const Route = createFileRoute('/blog/')({
  head: () => {
    const url = `${WEBSITE_URL}/blog`
    return {
      meta: [
        { title: `${TITLE} — Junie Grat` },
        { name: 'description', content: DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: `${TITLE} — Junie Grat` },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: `${TITLE} — Junie Grat` },
        { name: 'twitter:description', content: DESCRIPTION },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: BlogIndex,
})

// Matches the homepage stagger. Long delays read as a slow page.
const STAGGER_MS = 60

function BlogIndex() {
  return (
    <main className="relative mt-24 pb-20">
      <header className="enter mb-10">
        <h1 className="mb-3 text-xl font-medium text-ink">{TITLE}</h1>
        <p className="max-w-prose text-balance text-muted">{DESCRIPTION}</p>
      </header>

      <div className="flex flex-col gap-10 sm:gap-12">
        {BLOG_POSTS.map((post, index) => (
          <article
            key={post.uid}
            className="enter reveal"
            style={{ animationDelay: `${(index + 1) * STAGGER_MS}ms` }}
          >
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group block"
              aria-label={post.title}
            >
              <PostHero title={post.title} src={post.hero} />

              <div className="mt-3 px-1">
                <div className="tabular flex items-center gap-2 font-mono text-xs text-faint">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{post.minutes} min</span>
                </div>

                <h2 className="mt-1 inline-block font-[450] text-ink">
                  <span className="relative">
                    {post.title}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-accent transition-[max-width] duration-200 ease-snap group-hover:max-w-full" />
                  </span>
                </h2>

                <p className="mt-0.5 max-w-prose text-base text-muted">{post.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
