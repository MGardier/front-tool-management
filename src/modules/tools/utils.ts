

// ─────────────────────────────  PARSING  ───────────────────────────────────
// URL search params → typed state. Pure, module-level — testable in isolation.

import { SORT_DIRECTIONS, SORT_KEYS, STATUS_VALUES, type ToolFilters, type ToolSort } from "@/shared/components/tools-list/types"
import { readEnumParam, readIntParam, readStringParam } from "@/shared/utils/url-params.util"
import type { ToolsFiltersState } from "./types"

const DEFAULT_SORT: ToolSort = { key: 'updated_at', direction: 'desc' }
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

export const parseSort = (params: URLSearchParams): ToolSort => ({
  key: readEnumParam(params, '_sort', SORT_KEYS, DEFAULT_SORT.key),
  direction: readEnumParam(params, '_order', SORT_DIRECTIONS, DEFAULT_SORT.direction),
})

export const parseFilters = (params: URLSearchParams): ToolFilters => ({
  q: readStringParam(params, 'q'),
  status: readEnumParam(params, 'status', STATUS_VALUES, undefined),
  category: readStringParam(params, 'category'),
  owner_department: readStringParam(params, 'owner_department'),
  name_like: readStringParam(params, 'name_like'),
  vendor_like: readStringParam(params, 'vendor_like'),
})

export const parseState = (params: URLSearchParams): ToolsFiltersState => ({
  filters: parseFilters(params),
  sort: parseSort(params),
  page: readIntParam(params, '_page', DEFAULT_PAGE),
  limit: readIntParam(params, '_limit', DEFAULT_LIMIT),
})

// ──────────────────────────  SERIALIZATION  ────────────────────────────────
// Typed state → URL search params. Defaults are omitted so the URL stays
// clean: `/tools` instead of `/tools?_page=1&_limit=20&_sort=updated_at&_order=desc`.

export const serializeState = (state: ToolsFiltersState): URLSearchParams => {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(state.filters)) {
    if (value) params.set(key, String(value))
  }

  if (state.sort.key !== DEFAULT_SORT.key) params.set('_sort', state.sort.key)
  if (state.sort.direction !== DEFAULT_SORT.direction) {
    params.set('_order', state.sort.direction)
  }
  if (state.page !== DEFAULT_PAGE) params.set('_page', String(state.page))
  if (state.limit !== DEFAULT_LIMIT) params.set('_limit', String(state.limit))

  return params
}
