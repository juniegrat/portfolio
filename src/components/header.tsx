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
      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              // Visually the same small label; the hit box is padded out to the
              // 44px touch minimum on phones and collapses again on desktop so
              // the header row keeps its measured height.
              className="inline-flex min-h-11 items-center px-1 text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink sm:min-h-0 sm:px-0"
              activeProps={{ className: 'text-ink' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/*
          One control, two placements, no second instance to keep in sync: on a
          phone this wrapper is fixed to the bottom thumb zone, where a
          five-target row belongs; from `sm` up it goes static and drops back
          into the header row it was always in.
        */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:static sm:z-auto sm:block sm:pb-0">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
