import { Skeleton } from '@/shared/components/skeleton/skeleton'

const DEFAULT_SKELETON_ROWS = 5

type ToolsListSkeletonProps = {
  rows?: number
}

function ToolsListMobileSkeleton({ rows }: { rows: number }) {
  return (
    <ul className="mt-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="rounded-lg border border-slate-200/70 p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="space-y-2 text-right">
              <Skeleton className="ml-auto h-3 w-20" />
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function ToolsListDesktopSkeleton({ rows }: { rows: number }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            <th className="pb-4 font-normal">Tool</th>
            <th className="pb-4 font-normal">Department</th>
            <th className="pb-4 font-normal">Users</th>
            <th className="pb-4 font-normal">Monthly Cost</th>
            <th className="pb-4 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="text-sm">
              <td className="py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="py-3">
                <Skeleton className="h-6 w-16 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ToolsListSkeleton({ rows = DEFAULT_SKELETON_ROWS }: ToolsListSkeletonProps = {}) {
  return (
    <>
      <div className="md:hidden">
        <ToolsListMobileSkeleton rows={rows} />
      </div>
      <div className="hidden md:block">
        <ToolsListDesktopSkeleton rows={rows} />
      </div>
    </>
  )
}
