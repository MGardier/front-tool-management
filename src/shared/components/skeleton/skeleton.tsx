import clsx from 'clsx'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'animate-shimmer rounded bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 bg-size-[200%_100%]',
        className
      )}
    />
  )
}
