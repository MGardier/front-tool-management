import '@/app/config/env.validation'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/shared/components/error/error-boundary.tsx'
import { GlobalErrorFallback } from '@/shared/components/error/global-error-fallback.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={(props) => <GlobalErrorFallback {...props} />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
