import type { ToolSort, ToolSortKey } from './types'

/**
 * Three-state cycle on the active column:
 *   new column      → { key, asc }
 *   active + asc    → { key, desc }
 *   active + desc   → null   (reset; caller falls back to its default)
 */
export const nextSortDirection = (
  currentSort: ToolSort | undefined,
  key: ToolSortKey
): ToolSort | null => {
  if (currentSort?.key !== key) return { key, direction: 'asc' }
  if (currentSort.direction === 'asc') return { key, direction: 'desc' }
  return null
}

export const isSameSort = (a: ToolSort, b: ToolSort): boolean =>
  a.key === b.key && a.direction === b.direction
