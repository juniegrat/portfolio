import { useGSAP } from '@gsap/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { EMAIL, NAME, PROJECTS } from '@/data'
import { useLocale } from '@/i18n/use-locale'
import { WEBSITE_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const TITLE = `Work, ${NAME}`

export const Route = createFileRoute('/world')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: 'A scroll-driven pass through selected work.' },
      { property: 'og:title', content: TITLE },
    ],
    links: [{ rel: 'canonical', href: `${WEBSITE_URL}/world` }],
  }),
  component: World,
})

/** 0..1 scroll progress to a 1-based, zero-padded panel number. */
function panelLabel(progress: number) {
  return String(Math.min(PROJECTS.length, Math.floor(progress * PROJECTS.length) + 1)).padStart(
    2,
    '0',
  )
}

function World() {
  const locale = useLocale()

  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // The pin and scrub are built only here, so under reduced motion or below
      // 768px they never exist at all. Keep this query and the `.pan-*` fallback
      // in styles.css exact complements: wherever the pin is not built, the track
      // must scroll natively, or the later panels become unreachable.
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        const wrapEl = wrap.current
        const trackEl = track.current
        if (!wrapEl || !trackEl) return

        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth)

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          // `ease: none` is mandatory on a scrubbed tween; anything else
          // decouples travel from scroll position.
          ease: 'none',
          scrollTrigger: {
            trigger: wrapEl,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Fires every scroll frame. Written straight to the DOM; setState
              // here would re-render the tree ~60x/second.
              const node = counter.current
              if (!node) return
              node.textContent = panelLabel(self.progress)
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: wrap },
  )

  return (
    <main className="space-y-16">
      <section className="enter">
        <h1 className="text-2xl font-medium text-ink">Selected work, end to end</h1>
        <p className="mt-2 text-muted">Six projects, one horizontal pass. Scroll to travel.</p>
      </section>

      <section
        ref={wrap}
        className="pan-wrap full-bleed relative h-[100dvh] overflow-hidden"
        aria-label="Selected work"
      >
        <div className="pointer-events-none absolute top-6 left-[6vw] z-10 font-mono text-xs text-faint">
          <span ref={counter} className="tabular text-accent">
            01
          </span>
          <span> / {String(PROJECTS.length).padStart(2, '0')}</span>
        </div>

        <div
          ref={track}
          className="pan-track flex h-full items-center gap-6 px-[6vw]"
          // Below 768px the pin is never built and the track is a native
          // scroller, so nothing drives the counter. This does. On desktop the
          // track is transformed rather than scrolled, so it never fires.
          onScroll={(event) => {
            const el = event.currentTarget
            const max = el.scrollWidth - el.clientWidth
            const node = counter.current
            if (node) node.textContent = panelLabel(max > 0 ? el.scrollLeft / max : 0)
          }}
        >
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="flex w-[min(78vw,460px)] shrink-0 snap-center flex-col justify-between rounded-frame border border-line bg-raised p-6"
            >
              <div>
                <span className="tabular font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 text-xl font-medium text-ink">{project.name}</h2>
                <p className="mt-2 text-muted">{project.description[locale]}</p>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-ink underline decoration-accent decoration-1 underline-offset-4 transition-transform duration-150 ease-snap active:scale-[0.98]"
                  >
                    Open project
                  </a>
                ) : (
                  <p className="mt-4 text-sm text-faint">Private repository</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="enter">
        <h2 className="text-lg font-medium text-ink">Get in touch</h2>
        <p className="mt-2 text-muted">
          Reach me at{' '}
          <a
            className="text-ink underline decoration-accent decoration-1 underline-offset-2"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm text-ink underline decoration-accent decoration-1 underline-offset-4 transition-transform duration-150 ease-snap active:scale-[0.98]"
        >
          ← Back home
        </Link>
      </section>
    </main>
  )
}
