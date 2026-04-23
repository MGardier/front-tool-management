import type { Tool } from '@/lib/api/tools/tools.schema'

/**
 * Keys of `Tool` that can be used for sorting in the UI.
 * Intentionally narrow — we don't expose every field (id, icon_url, etc.).
 */
export type ToolSortKey = Extract<
  keyof Tool,
  'name' | 'status' | 'owner_department' | 'monthly_cost' | 'active_users_count' | 'updated_at'
>

/**
 * Runtime-accessible list of sort keys. `satisfies` guarantees every entry
 * is a real `ToolSortKey` at compile-time — no drift possible between type
 * and list.
 */
export const SORT_KEYS = [
  'name',
  'status',
  'owner_department',
  'monthly_cost',
  'active_users_count',
  'updated_at',
] as const satisfies readonly ToolSortKey[]

export const SORT_DIRECTIONS = ['asc', 'desc'] as const
export type SortDirection = (typeof SORT_DIRECTIONS)[number]

export type ToolSort = {
  key: ToolSortKey
  direction: SortDirection
}

export type Column<T> = {
  key: T
  label: string
}
