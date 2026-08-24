import { Link } from '@tanstack/react-router'
import { useIntl } from 'react-intl'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeSwitch } from '@/components/theme-switch'
import { NAME } from '@/data'
import { LocaleLink } from '@/i18n/use-locale'

/** Work is the GSAP horizontal pan; Blog is the writing index. */
const NAV = [
  { to: '/world', key: 'nav.work' },
  { to: '/blog', key: 'nav.blog' },
] as const

export function Header() {
  const intl = useIntl()

  // flex-wrap moves the control group to its own row on very narrow screens
  // rather than letting the role line break in half.
  return (
    <header className="rule-b mb-10 flex flex-wrap items-start justify-between gap-x-4 gap-y-2 pb-5 sm:mb-12 sm:gap-y-3">
      <div>
        <LocaleLink
          to="/"
          className="inline-block font-medium text-ink transition-transform duration-150 ease-snap active:scale-[0.98]"
        >
          {NAME}
        </LocaleLink>
        {/*
          Plain text with the shared CSS enter. A per-character JS fade here was
          decoration with no purpose, and it left the role label invisible until
          the animation frame loop ran.
        */}
        <p className="enter whitespace-nowrap text-muted">
          {intl.formatMessage({ id: 'role.title' })}
        </p>
      </div>
      {/*
        Hidden on phones: `MobileBar` carries the same navigation plus the theme
        control in the bottom thumb zone, so repeating it here would be two sets
        of the same links competing for a 375px row.
      */}
      <div className="hidden items-center gap-3 sm:flex">
        <nav className="flex items-center gap-3">
          {NAV.map((item) =>
            // `/world` has no localised twin: it is a wordless GSAP pan, so both
            // locales share the one route.
            item.to === '/world' ? (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
                activeProps={{ className: 'text-ink' }}
              >
                {intl.formatMessage({ id: item.key })}
              </Link>
            ) : (
              <LocaleLink
                key={item.to}
                to={item.to}
                className="text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
                activeProps={{ className: 'text-ink' }}
              >
                {intl.formatMessage({ id: item.key })}
              </LocaleLink>
            ),
          )}
        </nav>
        <LanguageSwitch />
        <ThemeSwitch />
      </div>
    </header>
  )
}
