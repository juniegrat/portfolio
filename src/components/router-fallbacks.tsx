import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

const LINK =
  'text-sm text-ink underline decoration-accent decoration-1 underline-offset-4 transition-transform duration-150 ease-snap active:scale-[0.98]'

export function NotFound() {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-2 text-lg font-medium text-ink">Page not found</h1>
      <p className="mb-6 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/" className={LINK}>
        ← Back home
      </Link>
    </main>
  )
}

export function AppError({ error, reset }: ErrorComponentProps) {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-2 text-lg font-medium text-ink">Something went wrong</h1>
      <p className="mb-6 text-muted">An unexpected error occurred. Try again, or head back home.</p>
      {import.meta.env.DEV ? (
        <pre className="mb-6 overflow-auto rounded-lg bg-sunken p-3 font-mono text-xs text-red-500">
          {error.message}
        </pre>
      ) : null}
      <div className="flex items-center gap-4">
        <button type="button" onClick={reset} className={LINK}>
          Try again
        </button>
        <Link to="/" className={LINK}>
          ← Back home
        </Link>
      </div>
    </main>
  )
}
