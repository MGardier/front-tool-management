import { AlertTriangle, Home, RotateCw } from 'lucide-react'
import { Button } from '@/shared/components/button/button'
import type { FallbackProps } from './types'

export function GlobalErrorFallback({ error, reset }: FallbackProps) {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div
        role="alert"
        className="w-full max-w-md rounded-xl border border-slate-200/70 bg-white p-8 text-center shadow-sm"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-7 w-7 text-red-500" strokeWidth={2} />
        </div>

        <h1 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          An unexpected error occurred. You can try again or return to the dashboard.
        </p>

        {import.meta.env.DEV && (
          <p className="mt-4 overflow-auto rounded-lg bg-slate-50 p-3 text-left font-mono text-xs text-slate-600">
            {error.message}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={goHome}>
            <Home className="h-4 w-4" strokeWidth={2} />
            Go home
          </Button>
          <Button onClick={reset}>
            <RotateCw className="h-4 w-4" strokeWidth={2} />
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
