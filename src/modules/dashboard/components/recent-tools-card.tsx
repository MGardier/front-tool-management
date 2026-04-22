import clsx from 'clsx'
import { Calendar } from 'lucide-react'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { currencyFormatter } from '@/shared/utils/format.util'
import { statusLabels, statusStyles } from '../utils'

type RecentToolsCardProps = {
  tools: Tool[]
}


export function RecentToolsCard({ tools }: RecentToolsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Tools</h2>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
          <span>Last 30 days</span>
        </div>
      </div>

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
                    className={clsx(
                      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                      statusStyles[tool.status]
                    )}
                  >
                    {statusLabels[tool.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
