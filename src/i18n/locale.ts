/**
 * Locale plumbing.
 *
 * English is served at the root (`/blog/x`) and French under a prefix
 * (`/fr/blog/x`). Keeping English unprefixed means existing URLs and the
 * canonicals already published do not move.
 */
export const LOCALES = ['en', 'fr'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** What `<html lang>` and `hreflang` should carry for each locale. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
}

/**
 * BCP 47 tags handed to `IntlProvider` for formatting.
 *
 * Distinct from the catalogue keys: bare `en` resolves to en-US in ICU, which
 * formats dates as "August 25, 2026". The prose here is British and `og:locale`
 * already claims en_GB, so the formatter should agree and produce
 * "25 August 2026". Messages stay keyed by the short locale.
 */
export const INTL_LOCALE: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
}

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_GB',
  fr: 'fr_FR',
}

/** Shown in the language switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
}

/**
 * The locale a pathname belongs to. Anything under `/fr` is French; everything
 * else is English, including unknown paths, so a 404 still renders in a locale.
 */
export function localeFromPathname(pathname: string): Locale {
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : DEFAULT_LOCALE
}

/** `/blog/x` + `fr` -> `/fr/blog/x`. The default locale gets no prefix. */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/** Strips the locale prefix, so `/fr/blog/x` -> `/blog/x`. */
export function stripLocale(pathname: string): string {
  if (pathname === '/fr') return '/'
  if (pathname.startsWith('/fr/')) return pathname.slice(3)
  return pathname
}

/**
 * `alternate` links for a page, given its locale-independent path. Search
 * engines want every locale to point at every other one, plus `x-default`.
 */
export function alternateLinks(path: string, origin: string) {
  return [
    ...LOCALES.map((locale) => ({
      rel: 'alternate' as const,
      hrefLang: HTML_LANG[locale],
      href: `${origin}${localePath(path, locale)}`,
    })),
    {
      rel: 'alternate' as const,
      hrefLang: 'x-default',
      href: `${origin}${localePath(path, DEFAULT_LOCALE)}`,
    },
  ]
}
