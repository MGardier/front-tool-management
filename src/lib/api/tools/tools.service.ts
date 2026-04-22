import type { Paginated } from '@/shared/types/api.types'
import { toolsApi } from './tools.api'
import { toolSchema, type Tool } from './tools.schema'
import type { ToolsQueryParams } from './types'
import { extractTotalFromHeader } from '@/shared/utils/api.util'

/**
 * Safely parses a list of tools, filtering out records that don't match
 * the schema. Returns the valid tools and the count of rejected records.
 */
const parseToolList = (rawData: unknown[]) => {
  const results = rawData.map((raw) => toolSchema.safeParse(raw))
  const validTools = results
    .filter((r) => r.success)
    .map((r) => r.data) as Tool[]
  const invalidCount = results.length - validTools.length
  return { validTools, invalidCount }
}

export const toolsService = {
  /**
   * Fetch a paginated list of tools.
   * Invalid/incomplete records are silently filtered out (logged in dev).
   */
  async fetchTools(params: ToolsQueryParams = {}): Promise<Paginated<Tool>> {
    const response = await toolsApi.fetchTools(params)

    const { validTools, invalidCount } = parseToolList(
      response.data as unknown[]
    )

    if (invalidCount > 0 && import.meta.env.DEV) 
      console.warn(
        `[toolsService] ${invalidCount} invalid tool(s) filtered out`
      )
    

    const totalFromHeader = extractTotalFromHeader(response,validTools.length) 
    const total = totalFromHeader - invalidCount

    return { data: validTools, total }
  },



  /**
   * Fetch only the total count of active tools.
   * Optimizes payload via _limit=1, reads count from X-Total-Count header.
   */
  async fetchActiveToolsCount(): Promise<number> {
    const { total } = await this.fetchTools({
      status: 'active',
      _page: 1,
      _limit: 1,
    })
    return total
  },

  /**
   * Fetch the most recently updated tools for the Dashboard table.
   */
  async fetchRecentTools(limit: number = 8): Promise<Tool[]> {
    const { data } = await this.fetchTools({
      _sort: 'updated_at',
      _order: 'desc',
      _limit: limit,
    })
    return data
  },


  /**
   * Fetch a single tool by its ID.
   */
  async fetchToolById(id: number): Promise<Tool> {
    const response = await toolsApi.fetchToolById(id)
    return toolSchema.parse(response.data)
  },
}