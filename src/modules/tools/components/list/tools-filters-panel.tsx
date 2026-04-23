import type { ToolStatus } from '@/lib/api/tools/tools.schema'
import { statusLabels } from '@/shared/components/tools-list/status'
import { DebouncedTextInput } from '@/shared/components/tools-list/filters/debounced-text-input'
import { STATUS_VALUES, type ToolFilterKey, type ToolFilters } from '../../types'
import { DepartmentAutocomplete } from './department-autocomplete'


type ToolsFiltersPanelProps = {
  filters: ToolFilters
  onChange: (next: ToolFilters) => void
  enabled: ToolFilterKey[]
}

const labelClasses = 'block text-xs font-medium text-slate-600'
const fieldClasses =
  'w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none'

export function ToolsFiltersPanel({
  filters,
  onChange,
  enabled,
}: ToolsFiltersPanelProps) {
  const set = <K extends ToolFilterKey>(key: K, value: ToolFilters[K]) => {
    onChange({ ...filters, [key]: value || undefined })
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {enabled.includes('status') && (
        <label className="block">
          <span className={labelClasses}>Status</span>
          <select
            value={filters.status ?? ''}
            onChange={(e) => set('status', (e.target.value || undefined) as ToolStatus | undefined)}
            className={`${fieldClasses} mt-1`}
          >
            <option value="">Any status</option>
            {STATUS_VALUES.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>
      )}

      {enabled.includes('owner_department') && (
        <label className="block">
          <span className={labelClasses}>Department</span>
          <div className="mt-1">
            <DepartmentAutocomplete
              value={filters.owner_department}
              onChange={(next) => set('owner_department', next)}
            />
          </div>
        </label>
      )}

      {enabled.includes('category') && (
        <label className="block">
          <span className={labelClasses}>Category</span>
          <DebouncedTextInput
            type="text"
            value={filters.category ?? ''}
            onChange={(next) => set('category', next)}
            placeholder="Any category"
            className={`${fieldClasses} mt-1`}
          />
        </label>
      )}

      {enabled.includes('name_like') && (
        <label className="block">
          <span className={labelClasses}>Name contains</span>
          <DebouncedTextInput
            type="text"
            value={filters.name_like ?? ''}
            onChange={(next) => set('name_like', next)}
            placeholder="e.g. Slack"
            className={`${fieldClasses} mt-1`}
          />
        </label>
      )}

      {enabled.includes('vendor_like') && (
        <label className="block">
          <span className={labelClasses}>Vendor contains</span>
          <DebouncedTextInput
            type="text"
            value={filters.vendor_like ?? ''}
            onChange={(next) => set('vendor_like', next)}
            placeholder="e.g. Atlassian"
            className={`${fieldClasses} mt-1`}
          />
        </label>
      )}
    </div>
  )
}
