import clsx from 'clsx'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { currencyFormatter } from '@/shared/utils/format.util'
import { statusLabels, statusStyles } from '../utils'

type RecentToolsListMobileProps = {
  tools: Tool[]
}

const statusBadgeClasses =
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold'

export function RecentToolsListMobile({ tools }: RecentToolsListMobileProps) {
  return (
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
  )
}
