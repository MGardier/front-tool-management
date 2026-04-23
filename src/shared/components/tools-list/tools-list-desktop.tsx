import clsx from 'clsx'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { currencyFormatter } from '@/shared/utils/format.util'
import { COLUMNS } from './columns'
import { statusBadgeClasses, statusLabels, statusStyles } from './status'
import { nextSortDirection } from './sort.util'
import type { ToolSort } from './types'

type ToolsListDesktopProps = {
  tools: Tool[]
  sort?: ToolSort
  onSortChange?: (sort: ToolSort) => void
}

export function ToolsListDesktop({ tools, sort, onSortChange }: ToolsListDesktopProps) {
  const sortable = Boolean(onSortChange)

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            {COLUMNS.map((col) => {
              const isActive = sort?.key === col.key
              const Icon = !isActive
                ? ArrowUpDown
                : sort?.direction === 'asc'
                  ? ArrowUp
                  : ArrowDown

              return (
                <th key={col.key} className="pb-4 font-normal">
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => onSortChange!(nextSortDirection(sort, col.key))}
                      className={clsx(
                        'inline-flex items-center gap-1 transition-colors hover:text-slate-900',
                        isActive && 'font-semibold text-slate-900'
                      )}
                    >
                      {col.label}
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id} className="text-sm">
              <td className="py-3">
                <span className="font-medium text-slate-900">{tool.name}</span>
              </td>
              <td className="py-3 text-slate-600">{tool.owner_department}</td>
              <td className="py-3 text-slate-600">{tool.active_users_count}</td>
              <td className="py-3 text-slate-600">
                {currencyFormatter.format(tool.monthly_cost)}
              </td>
              <td className="py-3">
                <span
                  className={clsx(statusBadgeClasses, statusStyles[tool.status])}
                >
                  {statusLabels[tool.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
