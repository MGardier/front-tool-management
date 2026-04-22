import clsx from 'clsx'
import { AlertCircle, RotateCw } from 'lucide-react'
import { Button } from '@/shared/components/button/button'

type ErrorStateProps = {
  title?: string
  description?: string
  onRetry?: () => void
  isRetrying?: boolean
}

export function ErrorState({
  title = "Couldn't load this data",
  description = 'Something went wrong while loading. Please try again.',
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-xl border border-slate-200/70 bg-white px-6 py-10 text-center shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-6 w-6 text-red-500" strokeWidth={2} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-5"
        >
          <RotateCw
            className={clsx('h-4 w-4', isRetrying && 'animate-spin')}
            strokeWidth={2}
          />
          {isRetrying ? 'Retrying…' : 'Try again'}
        </Button>
      )}
    </div>
  )
}
