import clsx from 'clsx'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { currencyFormatter } from '@/shared/utils/format.util'
import { SORTABLE_KEYS, sortColumnLabels } from './columns'
import { statusBadgeClasses, statusLabels, statusStyles } from './status'
import type { ToolSort, ToolSortKey } from './types'

type ToolsListMobileProps = {
  tools: Tool[]
  sort?: ToolSort
  onSortChange?: (sort: ToolSort | null) => void
}

function MobileSortControl({
  sort,
  onSortChange,
}: {
  sort: ToolSort
  onSortChange: (sort: ToolSort | null) => void
}) {
  const DirectionIcon = sort.direction === 'asc' ? ArrowUp : ArrowDown
  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <label className="flex flex-1 items-center gap-2 text-sm text-slate-600">
        <span className="shrink-0">Sort by</span>
        <select
          value={sort.key}
          onChange={(e) =>
            onSortChange({ ...sort, key: e.target.value as ToolSortKey })
          }
          className="flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900"
        >
          {SORTABLE_KEYS.map((key) => (
            <option key={key} value={key}>
              {sortColumnLabels[key]}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        aria-label={`Toggle sort direction (currently ${sort.direction})`}
        onClick={() =>
          onSortChange({
            ...sort,
            direction: sort.direction === 'asc' ? 'desc' : 'asc',
          })
        }
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      >
        <DirectionIcon className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  )
}

export function ToolsListMobile({ tools, sort, onSortChange }: ToolsListMobileProps) {
  return (
    <>
      {sort && onSortChange && (
        <MobileSortControl sort={sort} onSortChange={onSortChange} />
      )}
      <ul className="mt-4 space-y-3">
        {tools.map((tool) => (
          <li
            key={tool.id}
            className="rounded-lg border border-slate-200/70 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">
                  {tool.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {tool.owner_department}
                </p>
              </div>
              <span
                className={clsx(statusBadgeClasses, statusStyles[tool.status])}
              >
                {statusLabels[tool.status]}
              </span>
            </div>
            <dl className="mt-3 flex items-end justify-between text-sm">
              <div>
                <dt className="text-xs text-slate-500">Users</dt>
                <dd className="text-slate-700">{tool.active_users_count}</dd>
              </div>
              <div className="text-right">
                <dt className="text-xs text-slate-500">Monthly Cost</dt>
                <dd className="text-slate-700">
                  {currencyFormatter.format(tool.monthly_cost)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
