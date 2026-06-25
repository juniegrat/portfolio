declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types'
  import type { ComponentType } from 'react'

  /**
   * Metadata exported from a blog post `.mdx` file via `export const metadata`.
   */
  export const metadata: {
    title?: string
    description?: string
    alternates?: { canonical?: string }
    [key: string]: unknown
  }

  const MDXComponent: ComponentType<{ components?: MDXComponents }>
  export default MDXComponent
}
