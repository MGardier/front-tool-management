import { Wrench } from 'lucide-react'
import { EmptyState } from '@/shared/components/empty-state'
import { ErrorState } from '@/shared/components/error/error-state'
import { useRecentTools } from '../hooks/use-recent-tools'
import { RecentToolsCard } from './recent-tools/recent-tools-card'
import { RecentToolsCardSkeleton } from './recent-tools/recent-tools-card-skeleton'
import { MODULES } from '@/app/constants/modules'

export function RecentToolsBlock() {
  const recentTools = useRecentTools(MODULES.dashboard)

  if (recentTools.isLoading) 
    return <RecentToolsCardSkeleton />
  

  if (recentTools.isError && !recentTools.data) 
    return (
      <ErrorState
        title="Couldn't load recent tools"
        description="We couldn't fetch the recent tools list. Please try again."
        onRetry={() => recentTools.refetch()}
        isRetrying={recentTools.isFetching}
      />
    )
  

  if (!recentTools.data) return null

  if (recentTools.data.length === 0) 
    return (
      <EmptyState
        icon={Wrench}
        title="No recent tools to display"
        description="Tools added in the last 30 days will appear here."
      />
    )
  

  return <RecentToolsCard tools={recentTools.data} />
}
