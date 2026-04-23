import { useEffect } from 'react'
import { useTools } from './use-tools'
import { useToolsFilters } from './use-tools-filters'
import { countActiveFilters } from '../utils/filters.util'
import type { ToolFilterKey, ToolsPageData } from '../types'

const ENABLED_FILTERS: ToolFilterKey[] = ['status', 'owner_department', 'category']

export const useToolsPage = (): ToolsPageData => {
  const {
    filters,
    sort,
    page,
    limit,
    setFilters,
    setFilter,
    removeFilter,
    clearFilters,
    setSort,
    setPage,
    setLimit,
  } = useToolsFilters()

  const query = useTools('tools-page', {
    ...filters,
    _sort: sort.key,
    _order: sort.direction,
    _page: page,
    _limit: limit,
  })

  const paginated = query.data
  const total = paginated?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  // A reload or shared URL can land the user beyond the last page; clamp.
  useEffect(() => {
    if (paginated && page > totalPages) setPage(totalPages)
  }, [paginated, page, totalPages, setPage])

  return {
    state: {
      filters,
      sort,
      page,
      limit,
      enabledFilters: ENABLED_FILTERS,
      activeFilterCount: countActiveFilters(filters),
    },
    query: {
      paginated,
      isLoading: query.isLoading,
      isError: query.isError && !paginated,
      isRefreshing: query.isFetching && !query.isLoading,
      hasData: Boolean(paginated && paginated.data.length > 0),
      refetch: () => void query.refetch(),
    },
    actions: {
      setFilters,
      setFilter,
      removeFilter,
      clearFilters,
      setSort,
      setPage,
      setLimit,
    },
  }
}
