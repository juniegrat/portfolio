import { Link } from '@tanstack/react-router'
import { ThemeSwitch } from '@/components/theme-switch'
import { NAME, ROLE } from '@/data'

/** The GSAP horizontal pan. */
const NAV = [{ to: '/world', label: 'Work' }] as const

export function Header() {
  // flex-wrap moves the control group to its own row on very narrow screens
  // rather than letting the role line break in half.
  return (
    <header className="rule-b mb-10 flex flex-wrap items-start justify-between gap-x-4 gap-y-2 pb-5 sm:mb-12 sm:gap-y-3">
      <div>
        <Link
          to="/"
          className="inline-block font-medium text-ink transition-transform duration-150 ease-snap active:scale-[0.98]"
        >
          {NAME}
        </Link>
        {/*
          Plain text with the shared CSS enter. A per-character JS fade here was
          decoration with no purpose, and it left the role label invisible until
          the animation frame loop ran.
        */}
        <p className="enter whitespace-nowrap text-muted">{ROLE}</p>
      </div>
      {/*
        Hidden on phones: `MobileBar` carries the same navigation plus the theme
        control in the bottom thumb zone, so repeating it here would be two sets
        of the same links competing for a 375px row.
      */}
      <div className="hidden items-center gap-3 sm:flex">
        <nav className="flex items-center gap-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
              activeProps={{ className: 'text-ink' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  )
}
