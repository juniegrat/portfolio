// ---------------------------------------------------------------------------
// Scene config for the /flight scroll-world (architecture B: 6 dives + 5
// aerial connectors, Instrument diorama art direction).
//
// Clips land in public/flight/ as the renders complete. Until a scene has a
// `clip`, the route serves its still and the engine's reduced-motion path, so
// this file is safe to ship half-filled.
// ---------------------------------------------------------------------------

/** One accent for the whole flight. Per-scene hues would break the colour lock. */
export const FLIGHT_ACCENT = '#cea600'

export type FlightScene = {
  id: string
  label: string
  still?: string
  clip?: string
  eyebrow: string
  title: string
  body: string
  tags?: string[]
  /** Viewport-heights of scroll for this scene. Higher = longer dwell. */
  scroll?: number
  /** 0..1, keep <= 0.6. Camera settles mid-scene, exactly where the copy peaks. */
  linger?: number
  cta?: {
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
}

export const FLIGHT_SCENES: FlightScene[] = [
  {
    id: 'hadesor',
    label: 'Operations',
    still: '/flight/still-1-hadesor.webp',
    clip: '/flight/dive-1-hadesor.mp4',
    eyebrow: 'Systems at scale',
    title: 'A company, modelled.',
    body: 'One 300-table schema runs the whole operation, from the warehouse floor to the customer portal.',
    tags: ['Turborepo', 'tRPC', 'PostgreSQL'],
    scroll: 1.6,
    linger: 0.45,
  },
  {
    id: 'asm',
    label: 'Perimeter',
    still: '/flight/still-2-asm.webp',
    clip: '/flight/dive-2-asm.mp4',
    eyebrow: 'Own your data',
    title: 'Watching the perimeter.',
    body: 'Continuous asset discovery and vulnerability scanning you host yourself instead of renting.',
    tags: ['FastAPI', 'nuclei', 'Self-hosted'],
  },
  {
    id: 'coin',
    label: 'Assay',
    still: '/flight/still-3-coin.webp',
    clip: '/flight/dive-3-coin.mp4',
    eyebrow: 'Vision models',
    title: 'Grading by eye, at scale.',
    body: 'Photograph a coin and get back an identification and a grade, with forensic passes behind it.',
    tags: ['Expo', 'OpenAI Vision'],
  },
  {
    id: 'aurum',
    label: 'Foundry',
    still: '/flight/still-4-aurum.webp',
    clip: '/flight/dive-4-aurum.mp4',
    eyebrow: 'Real-time 3D',
    title: 'Metal that remembers its shape.',
    body: 'Scroll melts one coin into the next, with a technical read-out running alongside it.',
    tags: ['Three.js', 'GLSL'],
    linger: 0.4,
  },
  {
    id: 'mcp',
    label: 'Bridges',
    still: '/flight/still-5-mcp.webp',
    clip: '/flight/dive-5-mcp.mp4',
    eyebrow: 'Agents with hands',
    title: 'Software that drives software.',
    body: 'MCP servers reach into After Effects and Illustrator and render the result end to end.',
    tags: ['MCP', 'ExtendScript'],
  },
  {
    id: 'library',
    label: 'Registry',
    still: '/flight/still-6-library.webp',
    clip: '/flight/dive-6-library.mp4',
    eyebrow: 'Interfaces as inventory',
    title: 'A registry of designs.',
    body: 'Every generated interface is stored as a file and installs into the next project with one command.',
    tags: ['shadcn registry'],
    scroll: 1.8,
    linger: 0.5,
    cta: {
      primary: { label: 'Get in touch', href: 'mailto:juniegrat@gmail.com' },
      secondary: { label: 'Back home', href: '/' },
    },
  },
]

/**
 * Poster for each connector, taken from that connector's OWN first frame.
 * Without these the engine falls back to the next scene's establishing still,
 * which is the wrong scene entirely until the clip finishes downloading.
 */
export const FLIGHT_CONNECTOR_STILLS: string[] = [
  '/flight/conn-1-poster.webp',
  '/flight/conn-2-poster.webp',
  '/flight/conn-3-poster.webp',
  '/flight/conn-4-poster.webp',
  '/flight/conn-5-poster.webp',
]

/** length = FLIGHT_SCENES.length - 1. `null` is allowed; the engine crossfades that seam. */
export const FLIGHT_CONNECTORS: (string | null)[] = [
  '/flight/conn-1.mp4',
  '/flight/conn-2.mp4',
  '/flight/conn-3.mp4',
  '/flight/conn-4.mp4',
  '/flight/conn-5.mp4',
]
