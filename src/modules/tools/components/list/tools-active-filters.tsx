import { X } from 'lucide-react'
import { statusLabels } from '@/shared/components/tools-list/status'
import type { ToolFilterKey, ToolFilters } from '../../types'
import { getFilterLabel } from '../../utils/filters.util'

type ToolsActiveFiltersProps = {
  filters: ToolFilters
  onRemove: (key: ToolFilterKey) => void
  onClearAll: () => void
}

const displayValue = (key: ToolFilterKey, value: string): string => {
  if (key === 'status') return statusLabels[value as keyof typeof statusLabels] ?? value
  return value
}

/**
 * Horizontal list of removable chips — one per active filter — followed by
 * a "Clear all" action. Renders nothing when no filters are set.
 */
export function ToolsActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ToolsActiveFiltersProps) {
  const entries = (Object.entries(filters) as [ToolFilterKey, string | undefined][])
    .filter(([, value]) => value !== undefined && value !== '')

  if (entries.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {entries.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 py-1 pl-3 pr-1 text-xs font-medium text-slate-700"
        >
          <span className="text-slate-500">{getFilterLabel(key)}:</span>
          <span className="text-slate-900">{displayValue(key, value as string)}</span>
          <button
            type="button"
            aria-label={`Remove ${getFilterLabel(key)} filter`}
            onClick={() => onRemove(key)}
            className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-900"
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </span>
      ))}
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
