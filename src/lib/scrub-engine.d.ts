// Types for the vendored scroll-world engine (scrub-engine.js).
// Covers the config surface this project actually passes; the engine accepts more.

export type ScrollWorldSection = {
  id: string
  label: string
  still?: string
  stillMobile?: string
  clip?: string
  clipMobile?: string
  accent?: string
  /** Viewport-heights of scroll for this section, overriding `diveScroll`. */
  scroll?: number
  /** 0..1. Remaps time so the camera settles mid-scene. Keep <= 0.6. */
  linger?: number
  eyebrow?: string
  title?: string
  body?: string
  tags?: string[]
  cta?: {
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
}

export type ScrollWorldConfig = {
  brand?: { name: string; href?: string }
  nav?: boolean
  atmosphere?: boolean
  hint?: string
  /** Viewport-heights of scroll per dive clip. */
  diveScroll?: number
  /** Viewport-heights of scroll per connector clip. */
  connScroll?: number
  sections: ScrollWorldSection[]
  /** Length must be sections.length - 1. `null` lets the engine crossfade that seam. */
  connectors?: (string | null)[]
  connectorsMobile?: (string | null)[]
  /** Locally added: poster per connector, from that connector's own first frame. */
  connectorStills?: string[]
}

/** Locally added teardown (see the ADAPTED notes in scrub-engine.js). */
export type ScrollWorldHandle = { destroy: () => void }

export function mountScrollWorld(
  container: HTMLElement,
  config: ScrollWorldConfig,
): ScrollWorldHandle
