import { toolsService } from '@/lib/api/tools/tools.service'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { dashboardKeys } from '../dashboard.key'

export const useRecentTools = (): UseQueryResult<Tool[]> =>
  useQuery({
    queryKey: dashboardKeys.recentTools(),
    queryFn: () => toolsService.fetchRecentTools(),
  })
