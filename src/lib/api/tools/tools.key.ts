import type { ToolsQueryParams } from './types'

export const toolsKeys = {
  all: ['tools'] as const,
  list: (module: string, params: ToolsQueryParams) => [...toolsKeys.all, 'list',module, params] as const,
  recentlist: (module: string, params: ToolsQueryParams) => [...toolsKeys.all, 'recent-list',module, params] as const,
  activeCount: (module: string) => [...toolsKeys.all, 'active-count', module] as const,
}
