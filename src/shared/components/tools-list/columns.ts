import type { Column, ToolSortKey } from './types'

/** Columns rendered in the desktop table, in order. */
export const COLUMNS: Column<ToolSortKey>[] = [
  { key: 'name', label: 'Tool' },
  { key: 'owner_department', label: 'Department' },
  { key: 'active_users_count', label: 'Users' },
  { key: 'monthly_cost', label: 'Monthly Cost' },
  { key: 'status', label: 'Status' },
]

/**
 * Keys offered in the mobile sort picker. Superset of `COLUMNS` because
 * `updated_at` has no dedicated column but is still a useful sort.
 */
export const SORTABLE_KEYS: ToolSortKey[] = [
  'name',
  'owner_department',
  'active_users_count',
  'monthly_cost',
  'status',
  'updated_at',
]

/** Friendly label for each sortable key (shared by desktop header + mobile picker). */
export const sortColumnLabels: Record<ToolSortKey, string> = {
  name: 'Tool',
  owner_department: 'Department',
  active_users_count: 'Users',
  monthly_cost: 'Monthly Cost',
  status: 'Status',
  updated_at: 'Last updated',
}
