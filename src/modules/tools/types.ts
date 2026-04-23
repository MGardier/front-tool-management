import type { ToolFilters, ToolSort } from "@/shared/components/tools-list/types"

export type ToolsFiltersState = {
  filters: ToolFilters
  sort: ToolSort
  page: number
  limit: number
}