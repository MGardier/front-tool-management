import { useState } from 'react'
import clsx from 'clsx'
import { ToolsContent } from './tools-content'
import { ToolsToolbar } from './components/list/tools-toolbar'
import { ToolsFiltersPanel } from './components/list/tools-filters-panel'
import { ToolsActiveFilters } from './components/list/tools-active-filters'
import type { ToolsPageData } from './types'

export function ToolsUi({ data }: { data: ToolsPageData }) {
  const { state, query, actions } = data
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="space-y-4">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Tools</h1>
        <p className="text-sm text-slate-500">
          Browse, search, and filter the tools catalog.
        </p>
      </header>

      <ToolsToolbar
        searchValue={state.filters.q ?? ''}
        onSearchChange={(q) => actions.setFilter('q', q || undefined)}
        activeFilterCount={state.activeFilterCount}
        mobileFiltersOpen={mobileFiltersOpen}
        onToggleMobileFilters={() => setMobileFiltersOpen((o) => !o)}
      />

      <div className={clsx(mobileFiltersOpen ? 'block' : 'hidden', 'md:block')}>
        <ToolsFiltersPanel
          filters={state.filters}
          onChange={actions.setFilter}
          enabled={state.enabledFilters}
        />
      </div>

      <ToolsActiveFilters
        filters={state.filters}
        onRemove={actions.removeFilter}
        onClearAll={actions.clearAll}
        sort={state.isSortActive ? state.sort : null}
        onResetSort={actions.resetSort}
      />

      <ToolsContent
        state={state}
        query={query}
        onSortChange={(sort) => (sort ? actions.setSort(sort) : actions.resetSort())}
        onPageChange={actions.setPage}
        onLimitChange={actions.setLimit}
      />
    </div>
  )
}
