import { toolsService } from '@/lib/api/tools/tools.service'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { dashboardKeys } from '../dashboard.key'

export const useActiveToolsCount = (): UseQueryResult<number> =>
  useQuery({
    queryKey: dashboardKeys.activeToolsCount(),
    queryFn: () => toolsService.fetchActiveToolsCount(),
  })
