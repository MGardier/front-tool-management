import { Skeleton } from '@/shared/components/skeleton/skeleton'
import { ToolsListSkeleton } from '@/shared/components/tools-list/tools-list-skeleton'

export function RecentToolsCardSkeleton() {
  return (
    <div
      data-testid="recent-tools-skeleton"
      className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm md:p-6"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>

      <ToolsListSkeleton />
    </div>
  )
}
