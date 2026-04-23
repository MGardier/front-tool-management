import { ErrorState } from '@/shared/components/error/error-state'
import { useDashboardKpis } from '../hooks/use-dashboard-kpis'
import { buildStatCards } from '../utils'
import { StatCardSkeletonGrid } from './stat-card/stat-card-skeleton'
import { StatCard } from './stat-card/stat-card'
import { MODULES } from '@/app/constants/modules'

export function KpisBlock() {
  const kpis = useDashboardKpis(MODULES.dashboard)

  if (kpis.isLoading) {
    return <StatCardSkeletonGrid />
  }

  if (kpis.isError && !kpis.data) {
    return (
      <ErrorState
        title="Couldn't load KPIs"
        description="We couldn't fetch your metrics. Please try again."
        onRetry={() => kpis.refetch()}
        isRetrying={kpis.isFetching}
      />
    )
  }

  if (!kpis.data) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
      {buildStatCards(kpis.data).map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
