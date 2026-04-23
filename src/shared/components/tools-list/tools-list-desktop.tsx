import clsx from 'clsx'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { currencyFormatter } from '@/shared/utils/format.util'
import { statusLabels, statusStyles } from './util'

type ToolsListDesktopProps = {
  tools: Tool[]
}

const statusBadgeClasses =
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold'

export function ToolsListDesktop({ tools }: ToolsListDesktopProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            <th className="pb-4 font-normal">Tool</th>
            <th className="pb-4 font-normal">Department</th>
            <th className="pb-4 font-normal">Users</th>
            <th className="pb-4 font-normal">Monthly Cost</th>
            <th className="pb-4 font-normal">Status</th>
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
