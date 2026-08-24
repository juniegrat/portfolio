import { Link, useRouterState } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { type Locale, localeFromPathname, localePath } from './locale'

/** The locale of the page currently rendered, read from the URL. */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return localeFromPathname(pathname)
}

/** The current path with its locale prefix removed, for language switching. */
export function useNeutralPath(): string {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return pathname === '/fr' ? '/' : pathname.startsWith('/fr/') ? pathname.slice(3) : pathname
}

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  /** Locale-independent path, e.g. `/blog`. The prefix is added here. */
  to: string
  /** Defaults to the locale of the page being rendered. */
  locale?: Locale
}

/**
 * A `Link` that routes within the current locale.
 *
 * Every locale-prefixed route exists in the generated tree, but the prefix is
 * computed at runtime, so the literal-union typing on `to` cannot see it. The
 * cast is contained here rather than repeated at every call site, and the route
 * tree still fails the build if a target path stops existing.
 */
export function LocaleLink({ to, locale, ...props }: LocaleLinkProps) {
  const current = useLocale()
  const path = localePath(to, locale ?? current)
  // biome-ignore lint/suspicious/noExplicitAny: runtime-built path, see above
  return <Link {...props} to={path as any} />
}
