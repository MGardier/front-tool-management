import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { Paginated } from '@/shared/types/api.types'
import { toolsService } from './tools.service'
import type { Tool } from './tools.schema'
import type { ToolsQueryParams } from './types'
import { toolsKeys } from './tools.key'

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
