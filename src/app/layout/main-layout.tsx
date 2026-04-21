import type { ReactNode } from 'react'
import { Navbar } from './navbar/navbar'



type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}
