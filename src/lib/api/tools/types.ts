import type { ListQueryParams } from '@/shared/types/api.types'
import type { Tool, ToolStatus } from './tools.schema'

/**
 * Query parameters for GET /tools.
 * Extends the base JSON Server list params with tool-specific filters.
 */
export interface ToolsQueryParams extends ListQueryParams {
  status?: ToolStatus
  name_like?: string
  vendor_like?: string
  category?: string
  owner_department?: string
  
  /**
   * `created_at` is excluded from sortable fields: it's missing on many
   * records in the API seed, which would produce inconsistent sort results.
   * Temporarily we use `updated_at` as a reliable chronological sort field instead .
   */
  _sort?: keyof Omit<Tool, 'created_at'>

  /*⚠️ Comparison operators below are NOT supported by JSON Server v1.
   *   They are silently ignored and return the full resource unfiltered.
   *   Range filters (cost, date) must be implemented client-side.
   */
  // monthly_cost_gte?: number
  // monthly_cost_lte?: number
  // updated_at_gte?: string
  // updated_at_lte?: string
}