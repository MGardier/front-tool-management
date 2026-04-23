import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { ToolFilterKey, ToolFilters, ToolsFiltersHook, ToolsFiltersState } from '../types'
import { DEFAULT_PAGE, DEFAULT_SORT, parseState, serializeState } from '../utils/url.util'

export function useToolsFilters(): ToolsFiltersHook {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = useMemo(() => parseState(searchParams), [searchParams])

  const commit = useCallback(
    (next: ToolsFiltersState) =>
      setSearchParams(serializeState(next), { replace: true }),
    [setSearchParams]
  )

  const setFilters = useCallback(
    (filters: ToolFilters) => commit({ ...state, filters, page: DEFAULT_PAGE }),
    [commit, state]
  )

  const setFilter = useCallback(
    <K extends ToolFilterKey>(key: K, value: ToolFilters[K]) =>
      commit({
        ...state,
        filters: { ...state.filters, [key]: value },
        page: DEFAULT_PAGE,
      }),
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

  const clearAll = useCallback(
    () =>
      commit({
        ...state,
        filters: {},
        sort: DEFAULT_SORT,
        page: DEFAULT_PAGE,
      }),
    [commit, state]
  )

  const setSort = useCallback(
    (sort: ToolSort) => commit({ ...state, sort, page: DEFAULT_PAGE }),
    [commit, state]
  )

  const resetSort = useCallback(
    () => commit({ ...state, sort: DEFAULT_SORT, page: DEFAULT_PAGE }),
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
    setFilter,
    removeFilter,
    clearFilters,
    clearAll,
    setSort,
    resetSort,
    setPage,
    setLimit,
  }
}
