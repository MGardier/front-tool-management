import type { ToolStatus } from '@/lib/api/tools/tools.schema'

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
