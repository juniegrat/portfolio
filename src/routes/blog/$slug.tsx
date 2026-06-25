import { createFileRoute, notFound } from '@tanstack/react-router'
import type { MDXComponents } from 'mdx/types'
import { useEffect, useState } from 'react'
import { mdxComponents } from '@/components/mdx-components'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TextMorph } from '@/components/ui/text-morph'
import { WEBSITE_URL } from '@/lib/constants'

type PostModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
  metadata?: {
    title?: string
    description?: string
  }
}

// Eagerly load every post so we can resolve slug -> component + metadata on the
// server during SSR. (Vite inlines these at build time.)
const modules = import.meta.glob<PostModule>('../../content/blog/*.mdx', {
  eager: true,
})

const posts: Record<string, PostModule> = {}
for (const [path, mod] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? ''
  const slug = file.replace(/\.mdx$/, '')
  if (slug) posts[slug] = mod
}

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = posts[params.slug]
    if (!post) throw notFound()
    return {
      title: post.metadata?.title ?? params.slug,
      description: post.metadata?.description ?? '',
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const url = `${WEBSITE_URL}/blog/${params.slug}`
    return {
      meta: [
        { title: loaderData.title },
        { name: 'description', content: loaderData.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.description },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: loaderData.title },
        { name: 'twitter:description', content: loaderData.description },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="prose prose-gray mt-24 pb-20 dark:prose-invert">
      <h1>Post not found</h1>
      <p>This article doesn’t exist (yet).</p>
    </div>
  ),
})

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (text !== 'Copied') return
    const timeout = setTimeout(() => {
      setText('Copy')
    }, 2000)
    return () => clearTimeout(timeout)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

function BlogPost() {
  const { slug } = Route.useParams()
  const post = posts[slug]

  if (!post) return null

  const Content = post.default

  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="absolute top-24 right-4">
        <CopyButton />
      </div>
      <main className="prose prose-gray mt-24 pb-20 prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:text-base prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium dark:prose-invert">
        <Content components={mdxComponents} />
      </main>
    </>
  )
}
