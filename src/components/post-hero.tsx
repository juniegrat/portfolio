/**
 * Hero for a blog post, used by both the index cards and the article page.
 *
 * A post may ship without art. Rather than collapsing the layout, the fallback
 * renders a measured plate built from theme tokens, the same treatment the
 * project cards use, so an unillustrated post still reads as part of the set.
 */
export function PostHero({
  title,
  src,
  eager = false,
  className = '',
}: {
  title: string
  src?: string
  /** The article page shows its hero above the fold; the index does not. */
  eager?: boolean
  className?: string
}) {
  return (
    <div
      className={`drift-host relative rounded-frame bg-raised p-1 ring-1 ring-line ring-inset ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-video w-full rounded-plate object-cover"
        />
      ) : (
        <PostPlate title={title} />
      )}
    </div>
  )
}

function PostPlate({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-video w-full items-end overflow-hidden rounded-plate bg-sunken">
      <div
        aria-hidden="true"
        className="drift absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--line) 0 1px, transparent 1px 24px), repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 24px)',
          maskImage: 'radial-gradient(120% 120% at 0% 100%, black 10%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(90% 90% at 12% 115%, var(--accent-soft), transparent 68%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 h-2 w-2 border-t border-l border-accent/45"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-accent/45"
      />
      <span className="relative m-4 max-w-[80%] text-balance font-mono text-xs text-muted">
        {title}
      </span>
    </div>
  )
}

/**
 * `2026-08-24` -> `24 August 2026`. Written out rather than `toLocaleDateString`
 * so server and client agree regardless of the runtime's locale.
 */
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function formatPostDate(iso: string) {
  const [year, month, day] = iso.split('-')
  const name = MONTHS[Number(month) - 1]
  if (!name) return iso
  return `${Number(day)} ${name} ${year}`
}
