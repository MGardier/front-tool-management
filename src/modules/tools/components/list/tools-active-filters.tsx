import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { sortColumnLabels } from '@/shared/components/tools-list/columns'
import { statusLabels } from '@/shared/components/tools-list/status'
import type { ToolSort } from '@/shared/components/tools-list/types'
import type { ToolFilterKey, ToolFilters } from '../../types'
import { getFilterLabel } from '../../utils/filters.util'

type ToolsActiveFiltersProps = {
  filters: ToolFilters
  onRemove: (key: ToolFilterKey) => void
  onClearAll: () => void
  sort?: ToolSort | null
  onResetSort?: () => void
}

const displayValue = (key: ToolFilterKey, value: string): string => {
  if (key === 'status') return statusLabels[value as keyof typeof statusLabels] ?? value
  return value
}

const chipClasses =
  'inline-flex items-center gap-1.5 rounded-full bg-slate-100 py-1 pl-3 pr-1 text-xs font-medium text-slate-700'

const removeButtonClasses =
  'ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-900'

/**
 * Horizontal list of removable chips — one per active filter and (when set)
 * one for the active sort — followed by a "Clear all" action. Renders
 * nothing when no filter and no sort is active.
 */
export function ToolsActiveFilters({
  filters,
  onRemove,
  onClearAll,
  sort,
  onResetSort,
}: ToolsActiveFiltersProps) {
  const entries = (Object.entries(filters) as [ToolFilterKey, string | undefined][])
    .filter(([, value]) => value !== undefined && value !== '')

  const showSort = Boolean(sort && onResetSort)

  if (entries.length === 0 && !showSort) return null

  const SortIcon = sort?.direction === 'asc' ? ArrowUp : ArrowDown

  return (
    <div className="flex flex-wrap items-center gap-2">
      {entries.map(([key, value]) => (
        <span key={key} className={chipClasses}>
          <span className="text-slate-500">{getFilterLabel(key)}:</span>
          <span className="text-slate-900">{displayValue(key, value as string)}</span>
          <button
            type="button"
            aria-label={`Remove ${getFilterLabel(key)} filter`}
            onClick={() => onRemove(key)}
            className={removeButtonClasses}
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </span>
      ))}
      {showSort && sort && (
        <span className={chipClasses}>
          <span className="text-slate-500">Sort:</span>
          <span className="inline-flex items-center gap-1 text-slate-900">
            {sortColumnLabels[sort.key]}
            <SortIcon className="h-3 w-3" strokeWidth={2.5} />
          </span>
          <button
            type="button"
            aria-label="Reset sort"
            onClick={onResetSort}
            className={removeButtonClasses}
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </span>
      )}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
