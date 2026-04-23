import { toolsService } from '@/lib/api/tools/tools.service'
import type { Tool } from '@/lib/api/tools/tools.schema'
import type { ToolsQueryParams } from '@/lib/api/tools/types'
import { toolsKeys } from '@/lib/api/tools/tools.key'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'




// Mirrors the fixed query params used by `toolsService.fetchRecentTools()`
// — keeping them here makes the cache key accurate and stable.
const RECENT_TOOLS_PARAMS: ToolsQueryParams = {
  _sort: 'updated_at',
  _order: 'desc',
  _limit: 8,
}

export const useRecentTools = (module: string): UseQueryResult<Tool[]> =>
  useQuery({
    queryKey: toolsKeys.recentlist(module, RECENT_TOOLS_PARAMS),
    queryFn: () => toolsService.fetchRecentTools(),
  })
