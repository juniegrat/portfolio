import { Link } from '@tanstack/react-router'
import { ThemeSwitch } from '@/components/theme-switch'
import { NAME, ROLE } from '@/data'

export function Header() {
  // flex-wrap moves the control group to its own row on very narrow screens
  // rather than letting the role line break in half.
  return (
    <header className="rule-b mb-12 flex flex-wrap items-start justify-between gap-x-4 gap-y-3 pb-5">
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
        <Link
          to="/world"
          className="text-sm text-muted transition-colors duration-150 ease-snap hover:text-ink"
          activeProps={{ className: 'text-ink' }}
        >
          Work
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
