import { useState } from "react";
import clsx from "clsx";
import { ToolsContent } from "./tools-content";
import { ToolsToolbar } from "./components/list/tools-toolbar";
import { ToolsFiltersPanel } from "./components/list/tools-filters-panel";
import { ToolsActiveFilters } from "./components/list/tools-active-filters";
import type { useToolsPage } from "./hooks/use-tools-page";


type ToolsPageData = ReturnType<typeof useToolsPage>;

interface ToolsUiProps {
  data: ToolsPageData;
}

export function ToolsUi  ({ data }: ToolsUiProps)  {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="space-y-4">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Tools</h1>
        <p className="text-sm text-slate-500">
          Browse, search, and filter the tools catalog.
        </p>
      </header>

      <ToolsToolbar
        searchValue={data.filters.q ?? ""}
        onSearchChange={(q) => data.setFilters({ ...data.filters, q: q || undefined })}
        activeFilterCount={data.activeFilterCount}
        mobileFiltersOpen={mobileFiltersOpen}
        onToggleMobileFilters={() => setMobileFiltersOpen((o) => !o)}
      />

      <div className={clsx(mobileFiltersOpen ? "block" : "hidden", "md:block")}>
        <ToolsFiltersPanel
          filters={data.filters}
          onChange={data.setFilters}
          enabled={data.enabledFilters}
        />
      </div>

      <ToolsActiveFilters
        filters={data.filters}
        onRemove={data.removeFilter}
        onClearAll={data.clearFilters}
      />

      <ToolsContent
        isLoading={data.isLoading}
        isError={data.isError}
        isRefreshing={data.isRefreshing}
        hasData={data.hasData}
        activeFilterCount={data.activeFilterCount}
        paginated={data.paginated}
        sort={data.sort}
        page={data.page}
        limit={data.limit}
        onSortChange={data.setSort}
        onPageChange={data.setPage}
        onLimitChange={data.setLimit}
        onRetry={data.refetch}
        isFetching={data.isFetching}
      />
    </div>
  );
};