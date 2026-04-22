import clsx from 'clsx'
import type { StatCardData } from '../../types'

type StatCardProps = {
  stat: StatCardData
}

export function StatCard({ stat }: StatCardProps) {
  const { Icon } = stat
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{stat.label}</p>
        <div
          className={clsx(
            'flex h-8 w-8 items-center justify-center rounded-lg',
            stat.iconBgClass
          )}
        >
          <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</span>
        {stat.valueSuffix && (
          <span className="text-3xl font-bold tracking-tight text-slate-300">{stat.valueSuffix}</span>
        )}
      </div>
      <div className="mt-3">
        <span
          className={clsx(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
            stat.badgeClass
          )}
        >
          {stat.badge}
        </span>
      </div>
    </div>
  )
}
