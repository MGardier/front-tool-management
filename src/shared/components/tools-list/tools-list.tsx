import type { Tool } from '@/lib/api/tools/tools.schema'
import { ToolsListDesktop } from './tools-list-desktop'
import { ToolsListMobile } from './tools-list-mobile'
import type { ToolSort } from './types'

type ToolsListProps = {
  tools: Tool[]
  sort?: ToolSort
  onSortChange?: (sort: ToolSort) => void
}

/**
 * Responsive tool viewer. Both variants are mounted and toggled via CSS.
 * Sort is opt-in: pass `sort` +
 * `onSortChange` to enable sortable headers (desktop) and the sort
 * control (mobile).
 */
export function ToolsList({ tools, sort, onSortChange }: ToolsListProps) {
  return (
    <>
      <div className="md:hidden">
        <ToolsListMobile tools={tools} sort={sort} onSortChange={onSortChange} />
      </div>
      <div className="hidden md:block">
        <ToolsListDesktop tools={tools} sort={sort} onSortChange={onSortChange} />
      </div>
    </>
  )
}
