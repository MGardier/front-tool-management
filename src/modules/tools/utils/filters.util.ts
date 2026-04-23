import { FILTER_DEFS } from '../filters/filter-defs'
import type { ToolFilterKey, ToolFilters } from '../types'

/** Human-readable label per filter key, derived from the config. */
export const getFilterLabel = (key: ToolFilterKey): string => FILTER_DEFS[key].label

export const countActiveFilters = (filters: ToolFilters): number =>
  Object.values(filters).filter((v) => v !== undefined && v !== '').length
