import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

export const mdxComponents: MDXComponents = {
  Cover: ({ src, alt, caption }: { src: string; alt: string; caption: string }) => {
    return (
      <figure>
        <img src={src} alt={alt} className="rounded-xl" />
        <figcaption className="text-center">{caption}</figcaption>
      </figure>
    )
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    // biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high highlights trusted local MDX post content, not user input
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
  },
}
