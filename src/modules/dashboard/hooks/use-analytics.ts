import { analyticsService } from '@/lib/api/analytics/analytics.service'
import type { Analytics } from '@/lib/api/analytics/analytics.schema'
import { analyticsKeys } from '@/lib/api/analytics/analytics.key'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'



export const useAnalytics = (module: string): UseQueryResult<Analytics> =>
  useQuery({
    queryKey: analyticsKeys.summary(module),
    queryFn: () => analyticsService.fetchAnalytics(),
  })
