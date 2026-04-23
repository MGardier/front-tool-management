import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query'
import { toolsService } from '@/lib/api/tools/tools.service'
import type { Tool } from '@/lib/api/tools/tools.schema'
import type { ToolsQueryParams } from '@/lib/api/tools/types'
import { toolsKeys } from '@/lib/api/tools/tools.key'
import type { Paginated } from '@/shared/types/api.types'

export const RECENT_TOOLS_LIMIT = 8

const BASE_PARAMS: ToolsQueryParams = {
  _sort: 'updated_at',
  _order: 'desc',
  _limit: RECENT_TOOLS_LIMIT,
}

export const useRecentTools = (
  module: string,
  page: number = 1
): UseQueryResult<Paginated<Tool>> => {
  const params: ToolsQueryParams = { ...BASE_PARAMS, _page: page }
  return useQuery({
    queryKey: toolsKeys.recentlist(module, params),
    queryFn: () => toolsService.fetchTools(params),
    placeholderData: keepPreviousData,
  })
}
