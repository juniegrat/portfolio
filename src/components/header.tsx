import { Link } from '@tanstack/react-router'
import { useIntl } from 'react-intl'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeSwitch } from '@/components/theme-switch'
import { NAME } from '@/data'
import { LocaleLink } from '@/i18n/use-locale'
import { DESIGN_URL, LAB_URL } from '@/lib/constants'

/**
 * Work is the GSAP horizontal pan; Blog is the writing index. Both are routes
 * here, and Blog has a localised twin, while `/world` is a wordless pan that
 * both locales share.
 *
 * Lab and Design are separate deployments, so they leave the site. They repeat
 * in the home page's Connect section, which is how a phone reaches them: the
 * bottom bar has room for primary navigation and not for five destinations.
 */
const ROUTES = [
  { to: '/about', key: 'nav.about', localised: true },
  { to: '/world', key: 'nav.work', localised: false },
  { to: '/blog', key: 'nav.blog', localised: true },
] as const

const EXTERNAL = [
  { href: LAB_URL, key: 'nav.lab' },
  { href: DESIGN_URL, key: 'nav.design' },
] as const

const LINK = 'text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink'

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
          {ROUTES.map((item) =>
            item.localised ? (
              <LocaleLink
                key={item.to}
                to={item.to}
                className={LINK}
                activeProps={{ className: 'text-ink' }}
              >
                {intl.formatMessage({ id: item.key })}
              </LocaleLink>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={LINK}
                activeProps={{ className: 'text-ink' }}
              >
                {intl.formatMessage({ id: item.key })}
              </Link>
            ),
          )}
          {EXTERNAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              {intl.formatMessage({ id: item.key })}
            </a>
          ))}
        </nav>
        <LanguageSwitch />
        <ThemeSwitch />
      </div>
    </header>
  )
}
