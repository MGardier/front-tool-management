import { useEffect, useState } from 'react'
import { Wrench } from 'lucide-react'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error/error-state'
import { MODULES } from '@/app/constants/modules'
import { RECENT_TOOLS_LIMIT, useRecentTools } from '../hooks/use-recent-tools'
import { RecentToolsCard } from './recent-tools/recent-tools-card'
import { RecentToolsCardSkeleton } from './recent-tools/recent-tools-card-skeleton'

export function RecentToolsBlock() {
  const [page, setPage] = useState(1)
  const recentTools = useRecentTools(MODULES.dashboard, page)

  const paginated = recentTools.data
  const total = paginated?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / RECENT_TOOLS_LIMIT))

  // Guard against a page that no longer exists (data shrank).
  useEffect(() => {
    if (paginated && page > totalPages) setPage(totalPages)
  }, [paginated, page, totalPages])

  if (recentTools.isLoading)
    return <RecentToolsCardSkeleton />

  if (recentTools.isError && !paginated)
    return (
      <ErrorState
        title="Couldn't load recent tools"
        description="We couldn't fetch the recent tools list. Please try again."
        onRetry={() => recentTools.refetch()}
        isRetrying={recentTools.isFetching}
      />
    )

  if (!paginated) return null

  if (paginated.data.length === 0)
    return (
      <EmptyState
        icon={Wrench}
        title="No recent tools to display"
        description="Tools added in the last 30 days will appear here."
      />
    )

  return (
    <RecentToolsCard
      tools={paginated.data}
      page={page}
      limit={RECENT_TOOLS_LIMIT}
      total={paginated.total}
      onPageChange={setPage}
    />
  )
}
