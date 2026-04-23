import clsx from 'clsx'
import type { ReactNode } from 'react'

type CardProps = {
  className?: string
  children: ReactNode
}

/**
 * Neutral panel chrome — white background, soft border, rounded corners,
 * subtle shadow. Use to group a contained block of content (list + pager,
 * widget, etc.). Does not own any layout or header — callers compose.
 */
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm md:p-6',
        className
      )}
    >
      {children}
    </div>
  )
}
