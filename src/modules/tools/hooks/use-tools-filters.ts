import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { ToolFilterKey, ToolFilters, ToolsFiltersState } from '../types'
import { parseState, serializeState } from '../utils/url.util'

const DEFAULT_PAGE = 1

export function useToolsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = useMemo(() => parseState(searchParams), [searchParams])

  const commit = useCallback(
    (next: ToolsFiltersState) =>
      setSearchParams(serializeState(next), { replace: true }),
    [setSearchParams]
  )

  // ─────────  Handlers  ─────────

  const setFilters = useCallback(
    (filters: ToolFilters) => commit({ ...state, filters, page: DEFAULT_PAGE }),
    [commit, state]
  )

  const removeFilter = useCallback(
    (key: ToolFilterKey) =>
      commit({
        ...state,
        filters: { ...state.filters, [key]: undefined },
        page: DEFAULT_PAGE,
      }),
    [commit, state]
  )

  const clearFilters = useCallback(
    () => commit({ ...state, filters: {}, page: DEFAULT_PAGE }),
    [commit, state]
  )

  const setSort = useCallback(
    (sort: ToolSort) => commit({ ...state, sort, page: DEFAULT_PAGE}),
    [commit, state]
  )

  const setPage = useCallback(
    (page: number) => commit({ ...state, page }),
    [commit, state]
  )

  const setLimit = useCallback(
    (limit: number) => commit({ ...state, limit, page: DEFAULT_PAGE }),
    [commit, state]
  )

  return {
    ...state,
    setFilters,
    removeFilter,
    clearFilters,
    setSort,
    setPage,
    setLimit,
  }
}
