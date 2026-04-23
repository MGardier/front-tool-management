import type { Tool } from '@/lib/api/tools/tools.schema'
import { ToolsListDesktop } from './tools-list-desktop'
import { ToolsListMobile } from './tools-list-mobile'

type ToolsListProps = {
  tools: Tool[]
}

/**
 * Responsive tool viewer: mobile list under md, desktop table from md up.
 * Both variants are rendered in the DOM and toggled via CSS so that the
 * switch is instant without a re-render.
 */
export function ToolsList({ tools }: ToolsListProps) {
  return (
    <>
      <div className="md:hidden">
        <ToolsListMobile tools={tools} />
      </div>
      <div className="hidden md:block">
        <ToolsListDesktop tools={tools} />
      </div>
    </>
  )
}
