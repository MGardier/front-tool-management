import type { ToolStatus } from '@/lib/api/tools/tools.schema'

/** Shared pill shape for all status badges (rendered by both list variants). */
export const statusBadgeClasses =
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold'

export const statusStyles: Record<ToolStatus, string> = {
  active: 'bg-emerald-500 text-white',
  expiring: 'bg-orange-400 text-white',
  unused: 'bg-red-500 text-white',
}

export const statusLabels: Record<ToolStatus, string> = {
  active: 'Active',
  expiring: 'Expiring',
  unused: 'Unused',
}
