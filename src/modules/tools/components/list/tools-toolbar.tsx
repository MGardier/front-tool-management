import { SlidersHorizontal } from 'lucide-react'
import clsx from 'clsx'
import { ToolsSearchInput } from './tools-search-input'

type ToolsToolbarProps = {
  searchValue: string
  onSearchChange: (next: string) => void
  activeFilterCount: number
  mobileFiltersOpen: boolean
  onToggleMobileFilters: () => void
}

/**
 * Search field + mobile-only filter toggle. The filter toggle shows a count
 * badge when any filters are active and only appears below md.
 */
export function ToolsToolbar({
  searchValue,
  onSearchChange,
  activeFilterCount,
  mobileFiltersOpen,
  onToggleMobileFilters,
}: ToolsToolbarProps) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="flex-1">
        <ToolsSearchInput value={searchValue} onChange={onSearchChange} />
      </div>
      <button
        type="button"
        onClick={onToggleMobileFilters}
        aria-expanded={mobileFiltersOpen}
        className={clsx(
          'inline-flex items-center gap-2 rounded-lg border px-3 text-sm font-medium md:hidden',
          mobileFiltersOpen
            ? 'border-slate-900 bg-slate-900 text-white'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        )}
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
        Filters
        {activeFilterCount > 0 && (
          <span
            className={clsx(
              'ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
              mobileFiltersOpen ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
            )}
          >
            {activeFilterCount}
          </span>
        )}
      </button>
    </div>
  )
}
