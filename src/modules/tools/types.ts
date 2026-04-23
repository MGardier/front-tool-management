import type { Tool, ToolStatus } from '@/lib/api/tools/tools.schema'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { Paginated } from '@/shared/types/api.types'

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

export type ToolsFiltersState = {
  filters: ToolFilters
  sort: ToolSort
  page: number
  limit: number
}

// ────────────  Hook return contracts  ────────────

export type ToolsFiltersHook = ToolsFiltersState & {
  setFilters: (filters: ToolFilters) => void
  setFilter: <K extends ToolFilterKey>(key: K, value: ToolFilters[K]) => void
  removeFilter: (key: ToolFilterKey) => void
  clearFilters: () => void
  clearAll: () => void
  setSort: (sort: ToolSort) => void
  resetSort: () => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

export type ToolsPageState = ToolsFiltersState & {
  enabledFilters: ToolFilterKey[]
  activeFilterCount: number
  isSortActive: boolean
}

export type ToolsPageQuery = {
  paginated: Paginated<Tool> | undefined
  isLoading: boolean
  isError: boolean
  isRefreshing: boolean
  hasData: boolean
  refetch: () => void
}

export type ToolsPageActions = Omit<ToolsFiltersHook, keyof ToolsFiltersState>

export type ToolsPageData = {
  state: ToolsPageState
  query: ToolsPageQuery
  actions: ToolsPageActions
}
