import { Skeleton } from '@/shared/components/skeleton/skeleton'

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-32" />
      <Skeleton className="mt-3 h-6 w-20 rounded-full" />
    </div>
  )
}

export function StatCardSkeletonGrid() {
  return (
    <div
      data-testid="kpis-skeleton"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  )
}
