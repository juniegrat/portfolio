import { Link } from '@tanstack/react-router'
import { PaletteIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeSwitch } from '@/components/theme-switch'
import useClickOutside from '@/hooks/useClickOutside'
import { LocaleLink } from '@/i18n/use-locale'

/**
 * Bottom navigation, phones only.
 *
 * All three destinations are real routes. About replaced the Connect hash,
 * which reached a home page section by scrolling and which the About page now
 * covers better, so the hash-scroll handling this component used to carry is
 * gone with it.
 *
 * Theme lives behind a disclosure rather than inline: five swatches plus three
 * labels do not fit one 375px row, and navigation earns the space.
 */
const NAV = [
  { key: 'nav.work', to: '/world', localised: false },
  { key: 'nav.blog', to: '/blog', localised: true },
  { key: 'nav.about', to: '/about', localised: true },
] as const

const ITEM =
  'inline-flex min-h-11 items-center rounded-plate px-3 text-sm text-muted transition-colors duration-150 ease-snap active:text-ink'

export function MobileBar() {
  const [open, setOpen] = useState(false)
  const shell = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const intl = useIntl()

  useClickOutside(shell, () => setOpen(false))

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    // The shell spans the full width to centre its children, so it must not
    // take the taps meant for the page behind it — only the controls do.
    <div
      ref={shell}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:hidden"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }
            }
          >
            {/* The header is hidden on phones, so the language toggle rides
                along with the theme disclosure rather than costing a slot in
                the 375px navigation row. */}
            <div className="flex items-center gap-3 rounded-frame border border-line bg-raised px-3 py-2">
              <LanguageSwitch />
              <span aria-hidden="true" className="h-4 w-px shrink-0 bg-line" />
              <ThemeSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className="pointer-events-auto flex items-center gap-1 rounded-frame border border-line bg-raised p-1 shadow-lg shadow-black/20"
        aria-label="Primary"
      >
        {NAV.map((item) => {
          // `/world` is a wordless GSAP pan with no localised twin, so it links
          // plainly; the other two route within the current locale.
          const Component = item.localised ? LocaleLink : Link
          return (
            <Component
              key={item.key}
              to={item.to}
              className={ITEM}
              activeProps={{ className: 'text-ink' }}
              onClick={() => setOpen(false)}
            >
              {intl.formatMessage({ id: item.key })}
            </Component>
          )
        })}

        <span aria-hidden="true" className="mx-0.5 h-6 w-px shrink-0 bg-line" />

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Color theme"
          className="inline-flex h-11 w-11 items-center justify-center rounded-plate text-faint transition-[color,transform] duration-150 ease-snap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.94] aria-expanded:text-accent"
        >
          <PaletteIcon className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}
