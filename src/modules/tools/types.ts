import type { ToolStatus } from '@/lib/api/tools/tools.schema'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { useToolsPage } from './tools'

/**
 * User-facing filter state. Mirrors a subset of `ToolsQueryParams` that is
 * exposed through the UI controls. Consumers can opt into any combination.
 */
export type ToolFilters = {
  q?: string
  status?: ToolStatus
  category?: string
  owner_department?: string
  name_like?: string
  vendor_like?: string
}

export type ToolFilterKey = keyof ToolFilters

/** Runtime list mirroring `ToolStatus` (kept aligned via `satisfies`). */
export const STATUS_VALUES = ['active', 'expiring', 'unused'] as const satisfies readonly ToolStatus[]

export type ToolsFiltersState = {
  filters: ToolFilters
  sort: ToolSort
  page: number
  limit: number
}


export type TToolsPageData = ReturnType<typeof useToolsPage>;