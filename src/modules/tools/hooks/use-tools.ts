import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { Paginated } from '@/shared/types/api.types'
import type { ToolsQueryParams } from '@/lib/api/tools/types'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { toolsKeys } from '@/lib/api/tools/tools.key'
import { toolsService } from '@/lib/api/tools/tools.service'

/**
 * Generic paginated tools query. `module` scopes the cache key so that
 * different features (dashboard widget, tools page, etc.) can invalidate
 * independently — see `toolsKeys.list`. Keeps previous data during
 * pagination / filter changes to avoid layout jumps.
 */
export const useTools = (
  module: string,
  params: ToolsQueryParams = {}
): UseQueryResult<Paginated<Tool>> =>
  useQuery({
    queryKey: toolsKeys.list(module, params),
    queryFn: () => toolsService.fetchTools(params),
    placeholderData: keepPreviousData,
  })
