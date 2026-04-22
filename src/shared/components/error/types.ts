import type { ReactNode } from 'react'

export type FallbackProps = {
  error: Error
  reset: () => void
}

export type ErrorBoundaryProps = {
  fallback: (props: FallbackProps) => ReactNode
  children: ReactNode
}
