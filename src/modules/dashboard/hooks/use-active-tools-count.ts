import { toolsKeys } from '@/lib/api/tools/tools.key'
import { toolsService } from '@/lib/api/tools/tools.service'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'


export const useActiveToolsCount = (module: string): UseQueryResult<number> =>
  useQuery({
    queryKey: toolsKeys.activeCount(module),
    queryFn: () => toolsService.fetchActiveToolsCount(),
  })
