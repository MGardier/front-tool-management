import type { ToolSort, ToolSortKey } from './types'

/**
 * Toggle direction if clicking the active column, otherwise start ascending
 * on the new column.
 */
export const nextSortDirection = (
  currentSort: ToolSort | undefined,
  key: ToolSortKey
): ToolSort => {
  if (currentSort?.key !== key) return { key, direction: 'asc' }
  return { key, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' }
}
