import { useEffect } from "react";
import { useToolsFilters } from "./use-tools-filters";
import { useTools } from "./use-tools";
import { countActiveFilters } from "../utils/filters.util";
import type { ToolFilterKey } from "../types";

const ENABLED_FILTERS: ToolFilterKey[] = ["status", "owner_department", "category"];

export const useToolsPage = () => {
  const {
    filters,
    sort,
    page,
    limit,
    setFilters,
    removeFilter,
    clearFilters,
    setSort,
    setPage,
    setLimit,
  } = useToolsFilters();

  const query = useTools("tools-page", {
    ...filters,
    _sort: sort.key,
    _order: sort.direction,
    _page: page,
    _limit: limit,
  });

  const paginated = query.data;
  const total = paginated?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Clamp page if beyond last page
  useEffect(() => {
    if (paginated && page > totalPages) setPage(totalPages);
  }, [paginated, page, totalPages, setPage]);

  return {
    // Data
    paginated,
    totalPages,
    activeFilterCount: countActiveFilters(filters),
    enabledFilters: ENABLED_FILTERS,

    // Query state
    isFetching : query.isFetching,
    isLoading: query.isLoading,
    isError: query.isError && !paginated,
    isRefreshing: query.isFetching && !query.isLoading,
    hasData: Boolean(paginated && paginated.data.length > 0),
    refetch: query.refetch,

    // Handlers
    filters,
    sort,
    page,
    limit,
    setFilters,
    removeFilter,
    clearFilters,
    setSort,
    setPage,
    setLimit,
  };
};