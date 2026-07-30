import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/** Single source of truth. Adding a theme means editing this file only. */
const THEMES = ['light', 'dark', 'instrument', 'kinetic'] as const

export type ResolvedTheme = (typeof THEMES)[number]
export type Theme = ResolvedTheme | 'system'

const STORAGE_KEY = 'theme'

/** Themes that sit on a dark ground, so `dark:` variants still apply to them. */
const DARK_GROUND: ResolvedTheme[] = ['dark', 'instrument']

/** Mobile browser chrome color. Must match each theme's --surface. */
const SURFACE: Record<ResolvedTheme, string> = {
  light: '#ffffff',
  dark: '#09090b',
  instrument: '#0c0c0e',
  kinetic: '#eef1f7',
}

function isTheme(value: unknown): value is Theme {
  return value === 'system' || THEMES.includes(value as ResolvedTheme)
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme | undefined
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  const onDarkGround = DARK_GROUND.includes(resolved)
  // Tokens key off data-theme; the class keeps `dark:` variants (prose-invert)
  // working for every dark-ground theme.
  root.dataset.theme = resolved
  root.classList.toggle('dark', onDarkGround)
  root.style.colorScheme = onDarkGround ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', SURFACE[resolved])
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme | undefined>(undefined)

  // Hydrate the stored preference once mounted (server can't read localStorage).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) {
      setThemeState(stored)
    }
  }, [])

  // Resolve + apply on change, and follow the OS when set to "system".
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const resolve = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme
      setResolvedTheme(resolved)
      applyTheme(resolved)
    }

    resolve()

    if (theme === 'system') {
      media.addEventListener('change', resolve)
      return () => media.removeEventListener('change', resolve)
    }
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore (e.g. private mode)
    }
    setThemeState(next)
  }, [])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

// Render-blocking inline script for <head>. Sets the theme before first paint so
// there's no flash of the wrong theme on load (replaces next-themes). The theme
// tables are serialized from the constants above so this can't drift from them.
export const themeInitScript = `(function(){try{
var S=${JSON.stringify(SURFACE)},D=${JSON.stringify(DARK_GROUND)};
var t=localStorage.getItem('${STORAGE_KEY}');
if(!t||!S[t])t='system';
if(t==='system')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
var d=D.indexOf(t)>-1,r=document.documentElement;
r.dataset.theme=t;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';
var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',S[t]);
}catch(e){}})();`
