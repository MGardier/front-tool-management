import type { ToolStatus } from '@/lib/api/tools/tools.schema'
import { readEnumParam, readStringParam } from '@/shared/utils/url-params.util'
import type { ToolFilterKey, ToolFilters } from '../types'

/** Runtime list mirroring `ToolStatus`. Kept aligned via `satisfies`. */
export const STATUS_VALUES = ['active', 'expiring', 'unused'] as const satisfies readonly ToolStatus[]

/**
 * Per-filter definition: label (for chips, panel) + URL reader (for
 * hydration). Mapped over `ToolFilterKey` so adding a filter key to the
 * `ToolFilters` type forces a config entry — no silent omissions.
 */
type FilterDef<K extends ToolFilterKey> = {
  label: string
  read: (params: URLSearchParams) => ToolFilters[K]
}

type FilterDefs = { [K in ToolFilterKey]: FilterDef<K> }

export const FILTER_DEFS: FilterDefs = {
  q: {
    label: 'Search',
    read: (p) => readStringParam(p, 'q'),
  },
  status: {
    label: 'Status',
    read: (p) => readEnumParam(p, 'status', STATUS_VALUES, undefined),
  },
  category: {
    label: 'Category',
    read: (p) => readStringParam(p, 'category'),
  },
  owner_department: {
    label: 'Department',
    read: (p) => readStringParam(p, 'owner_department'),
  },
  name_like: {
    label: 'Name',
    read: (p) => readStringParam(p, 'name_like'),
  },
  vendor_like: {
    label: 'Vendor',
    read: (p) => readStringParam(p, 'vendor_like'),
  },
}

export const FILTER_KEYS = Object.keys(FILTER_DEFS) as ToolFilterKey[]
