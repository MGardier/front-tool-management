import type { ReactNode } from 'react'
import type { ToolStatus } from '@/lib/api/tools/tools.schema'
import { statusLabels } from '@/shared/components/tools-list/status'
import { DebouncedTextInput } from '@/shared/components/tools-list/filters/debounced-text-input'
import { FILTER_DEFS, STATUS_VALUES } from '../../filters/filter-defs'
import type { ToolFilterKey, ToolFilters } from '../../types'
import { DepartmentAutocomplete } from './department-autocomplete'

type ToolsFiltersPanelProps = {
  filters: ToolFilters
  onChange: <K extends ToolFilterKey>(key: K, value: ToolFilters[K]) => void
  enabled: ToolFilterKey[]
}

/** Filter keys eligible for the panel (search `q` is handled by the toolbar). */
type PanelFilterKey = Exclude<ToolFilterKey, 'q'>

type RenderProps<K extends PanelFilterKey> = {
  value: ToolFilters[K]
  onChange: (next: ToolFilters[K]) => void
}

const fieldClasses =
  'w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none'

/**
 * Narrow an unknown string to a valid `ToolStatus` using the `STATUS_VALUES`
 * whitelist. Returns `undefined` for "Any status" (empty option) or drift.
 */
const parseStatus = (value: string): ToolStatus | undefined =>
  STATUS_VALUES.find((s) => s === value)

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-600">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

/** One renderer per panel filter — the single place to edit a filter's control. */
const PANEL_RENDERERS: {
  [K in PanelFilterKey]: (props: RenderProps<K>) => ReactNode
} = {
  status: ({ value, onChange }) => (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(parseStatus(e.target.value))}
      className={fieldClasses}
    >
      <option value="">Any status</option>
      {STATUS_VALUES.map((status) => (
        <option key={status} value={status}>
          {statusLabels[status]}
        </option>
      ))}
    </select>
  ),
  owner_department: ({ value, onChange }) => (
    <DepartmentAutocomplete value={value} onChange={onChange} />
  ),
  category: ({ value, onChange }) => (
    <DebouncedTextInput
      type="text"
      value={value ?? ''}
      onChange={(next) => onChange(next || undefined)}
      placeholder="Any category"
      className={fieldClasses}
    />
  ),
  name_like: ({ value, onChange }) => (
    <DebouncedTextInput
      type="text"
      value={value ?? ''}
      onChange={(next) => onChange(next || undefined)}
      placeholder="e.g. Slack"
      className={fieldClasses}
    />
  ),
  vendor_like: ({ value, onChange }) => (
    <DebouncedTextInput
      type="text"
      value={value ?? ''}
      onChange={(next) => onChange(next || undefined)}
      placeholder="e.g. Atlassian"
      className={fieldClasses}
    />
  ),
}

const isPanelFilter = (key: ToolFilterKey): key is PanelFilterKey => key !== 'q'

export function ToolsFiltersPanel({
  filters,
  onChange,
  enabled,
}: ToolsFiltersPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {enabled.filter(isPanelFilter).map((key) => (
        <FilterField key={key} label={FILTER_DEFS[key].label}>
          {renderFilter(key, filters[key], (next) => onChange(key, next))}
        </FilterField>
      ))}
    </div>
  )
}

// Discriminated dispatch — preserves the `K` binding between `value` and `onChange`.
function renderFilter<K extends PanelFilterKey>(
  key: K,
  value: ToolFilters[K],
  onChange: (next: ToolFilters[K]) => void
): ReactNode {
  const render = PANEL_RENDERERS[key] as (p: RenderProps<K>) => ReactNode
  return render({ value, onChange })
}
