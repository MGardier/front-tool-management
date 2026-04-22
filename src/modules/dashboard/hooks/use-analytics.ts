import { analyticsService } from '@/lib/api/analytics/analytics.service'
import type { Analytics } from '@/lib/api/analytics/analytics.schema'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { dashboardKeys } from '../dashboard.key'

export const useAnalytics = (): UseQueryResult<Analytics> =>
  useQuery({
    queryKey: dashboardKeys.analytics(),
    queryFn: () => analyticsService.fetchAnalytics(),
  })
