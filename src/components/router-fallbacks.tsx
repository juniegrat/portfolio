import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">Page not found</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        to="/"
        className="text-sm text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
      >
        ← Back home
      </Link>
    </main>
  )
}

export function AppError({ error, reset }: ErrorComponentProps) {
  return (
    <main className="mt-24 pb-20">
      <h1 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">
        Something went wrong
      </h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        An unexpected error occurred. Try again, or head back home.
      </p>
      {import.meta.env.DEV ? (
        <pre className="mb-6 overflow-auto rounded-lg bg-zinc-100 p-3 text-xs text-red-600 dark:bg-zinc-900 dark:text-red-400">
          {error.message}
        </pre>
      ) : null}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="text-sm text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
        >
          Try again
        </button>
        <Link
          to="/"
          className="text-sm text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
        >
          ← Back home
        </Link>
      </div>
    </main>
  )
}
