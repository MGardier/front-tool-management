import { Wrench } from 'lucide-react'
import clsx from 'clsx'
import { ErrorState } from '@/shared/components/error/error-state'
import { EmptyState } from '@/shared/components/empty-state'
import { ToolsList } from '@/shared/components/tools-list/tools-list'
import { ToolsListSkeleton } from '@/shared/components/tools-list/tools-list-skeleton'
import { Pagination } from '@/shared/components/pagination'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { ToolsPageQuery, ToolsPageState } from './types'

type ToolsContentProps = {
  state: ToolsPageState
  query: ToolsPageQuery
  onSortChange: (sort: ToolSort | null) => void
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export function ToolsContent({
  state,
  query,
  onSortChange,
  onPageChange,
  onLimitChange,
}: ToolsContentProps) {
  const { sort, page, limit, activeFilterCount } = state
  const { paginated, isLoading, isError, isRefreshing, hasData, refetch } = query

  if (isLoading) {
    return <ToolsListSkeleton rows={Math.min(limit, 10)} />
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load tools"
        description="We couldn't fetch the tools list. Please try again."
        onRetry={refetch}
        isRetrying={isRefreshing}
      />
    )
  }

  if (!hasData || !paginated) {
    return (
      <EmptyState
        icon={Wrench}
        title="No tools match your filters"
        description={
          activeFilterCount > 0
            ? 'Try removing some filters or adjusting your search.'
            : 'No tools to display.'
        }
      />
    )
  }

  return (
    <div
      className={clsx(
        'transition-opacity',
        isRefreshing && 'pointer-events-none opacity-60',
      )}
      aria-busy={isRefreshing}
    >
      <ToolsList tools={paginated.data} sort={sort} onSortChange={onSortChange} />
      <Pagination
        page={page}
        limit={limit}
        total={paginated.total}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  )
}
