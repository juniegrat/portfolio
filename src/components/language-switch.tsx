import { Link } from '@tanstack/react-router'
import { useIntl } from 'react-intl'
import { LOCALE_LABEL, LOCALES, localePath } from '@/i18n/locale'
import { useLocale, useNeutralPath } from '@/i18n/use-locale'

/**
 * EN / FR toggle.
 *
 * Switching keeps you on the same page rather than dropping you at the home
 * page: the neutral path is the current URL minus its locale prefix, so
 * `/fr/blog/x` and `/blog/x` are two views of one document. That is also what
 * the `hreflang` pairs on each page claim, and the two should not disagree.
 */
export function LanguageSwitch() {
  const current = useLocale()
  const neutral = useNeutralPath()
  const intl = useIntl()

  return (
    <div
      className="flex items-center gap-1 font-mono text-xs"
      role="group"
      aria-label={intl.formatMessage({ id: 'nav.language' })}
    >
      {LOCALES.map((locale, index) => {
        const active = locale === current
        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 ? (
              <span aria-hidden="true" className="text-faint">
                /
              </span>
            ) : null}
            <Link
              // Same runtime-built path caveat as `LocaleLink`.
              // biome-ignore lint/suspicious/noExplicitAny: locale prefix is computed
              to={localePath(neutral, locale) as any}
              hrefLang={locale}
              aria-current={active ? 'true' : undefined}
              className={
                active
                  ? 'text-ink'
                  : 'text-faint transition-colors duration-150 ease-snap hover:text-ink'
              }
            >
              {LOCALE_LABEL[locale]}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
