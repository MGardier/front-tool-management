import { Calendar } from 'lucide-react'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { Card } from '@/shared/components/card'
import { Pagination } from '@/shared/components/pagination'
import { ToolsList } from '@/shared/components/tools-list/tools-list'

type RecentToolsCardProps = {
  tools: Tool[]
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
}

export function RecentToolsCard({
  tools,
  page,
  limit,
  total,
  onPageChange,
}: RecentToolsCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Tools</h2>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
          <span>Last 30 days</span>
        </div>
      </div>

      <ToolsList tools={tools} />
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
      />
    </Card>
  )
}
