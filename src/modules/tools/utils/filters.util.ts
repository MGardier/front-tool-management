import type { ToolFilterKey, ToolFilters } from '../types'

/** Human-readable label for each filter (used by active-filter chips). */
export const filterLabels: Record<ToolFilterKey, string> = {
  q: 'Search',
  status: 'Status',
  category: 'Category',
  owner_department: 'Department',
  name_like: 'Name',
  vendor_like: 'Vendor',
}

export const countActiveFilters = (filters: ToolFilters): number =>
  Object.values(filters).filter((v) => v !== undefined && v !== '').length
