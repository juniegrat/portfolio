import { ApertureIcon, MonitorIcon, MoonIcon, SunIcon, WavesIcon } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { type Theme, useTheme } from '@/components/theme-provider'
import { AnimatedBackground } from '@/components/ui/animated-background'

const THEME_OPTIONS: { label: string; id: Theme; icon: React.ReactNode }[] = [
  { label: 'Light', id: 'light', icon: <SunIcon className="h-4 w-4" /> },
  { label: 'Dark', id: 'dark', icon: <MoonIcon className="h-4 w-4" /> },
  { label: 'Instrument', id: 'instrument', icon: <ApertureIcon className="h-4 w-4" /> },
  { label: 'Kinetic', id: 'kinetic', icon: <WavesIcon className="h-4 w-4" /> },
  { label: 'System', id: 'system', icon: <MonitorIcon className="h-4 w-4" /> },
]

/**
 * Same footprint as the control, so hydration doesn't shift the header.
 *
 * Sizing note: 44px is the touch minimum, but five of them plus the nav link
 * overflow a 320px-wide screen, so the last step down is 40px rather than a
 * wrapped second row.
 */
const TRACK =
  // The shadow only matters in the mobile floating placement, where the bar
  // has page content scrolling underneath it rather than a header rule above.
  'inline-flex items-center gap-0.5 rounded-frame border border-line bg-raised p-1 shadow-lg shadow-black/20 sm:shadow-none'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={TRACK} aria-hidden="true">
        {THEME_OPTIONS.map((option) => (
          <span
            key={option.id}
            className="h-10 w-10 min-[360px]:h-11 min-[360px]:w-11 sm:h-7 sm:w-7"
          />
        ))}
      </div>
    )
  }

  return (
    <div className={TRACK} role="group" aria-label="Color theme">
      <AnimatedBackground
        className="pointer-events-none rounded-plate bg-accent-soft ring-1 ring-accent/25 ring-inset"
        defaultValue={theme}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.22 }}
        enableHover={false}
        onValueChange={(id) => {
          if (id) setTheme(id as Theme)
        }}
      >
        {THEME_OPTIONS.map((option) => (
          <button
            key={option.id}
            // Only transform + color transition; `all` would animate layout too.
            className="inline-flex h-10 w-10 items-center justify-center min-[360px]:h-11 min-[360px]:w-11 sm:h-7 sm:w-7 rounded-plate text-faint transition-[color,transform] duration-150 ease-snap hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.94] data-[checked=true]:text-accent"
            type="button"
            aria-label={`${option.label} theme`}
            aria-pressed={theme === option.id}
            data-id={option.id}
          >
            {option.icon}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  )
}
