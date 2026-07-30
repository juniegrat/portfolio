import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { NAME } from '@/data'
import {
  FLIGHT_ACCENT,
  FLIGHT_CONNECTOR_STILLS,
  FLIGHT_CONNECTORS,
  FLIGHT_SCENES,
} from '@/flight-scenes'
import { WEBSITE_URL } from '@/lib/constants'

const TITLE = `Scroll World, ${NAME}`

export const Route = createFileRoute('/scroll-world')({
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: 'description',
        content: 'A scroll-driven camera flight through six built systems.',
      },
      { property: 'og:title', content: TITLE },
    ],
    links: [{ rel: 'canonical', href: `${WEBSITE_URL}/scroll-world` }],
  }),
  component: Flight,
})

function Flight() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = host.current
    if (!node) return

    let cancelled = false
    let world: { destroy: () => void } | undefined

    // Dynamic import: the engine touches document/window at module scope, so it
    // must never be pulled into the SSR bundle.
    import('@/lib/scrub-engine')
      .then(({ mountScrollWorld }) => {
        if (cancelled || !host.current) return
        world = mountScrollWorld(host.current, {
          brand: { name: NAME, href: '/' },
          // The site header already provides navigation; a second nav bar competes.
          nav: false,
          atmosphere: true,
          hint: 'scroll to fly in',
          diveScroll: 1.3,
          connScroll: 0.9,
          sections: FLIGHT_SCENES.map((scene) => ({ ...scene, accent: FLIGHT_ACCENT })),
          connectors: FLIGHT_CONNECTORS,
          connectorStills: FLIGHT_CONNECTOR_STILLS,
        })
      })
      .catch((err) => {
        // The <noscript> markup below is the fallback, so there is nothing to
        // recover — but never swallow this. Silently ignoring it once turned a
        // syntax error in the engine into a blank surface with a clean console.
        console.error('[scroll-world] engine failed to load', err)
      })

    return () => {
      cancelled = true
      world?.destroy()
    }
  }, [])

  return (
    // bg matches --sw-bg so the surface is uniform before the engine paints.
    <main className="full-bleed bg-[#0c0c0e]">
      <div ref={host} />
      {/* Server-rendered fallback. The engine replaces this container's contents
          on mount, so this is what crawlers and no-JS visitors read. */}
      <noscript>
        <ul className="mx-auto max-w-[640px] space-y-8 px-4">
          {FLIGHT_SCENES.map((scene) => (
            <li key={scene.id}>
              <h2 className="text-lg font-medium text-ink">{scene.title}</h2>
              <p className="mt-1 text-muted">{scene.body}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </main>
  )
}
