import { Calendar } from 'lucide-react'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { RecentToolsListMobile } from './recent-tools-list-mobile'
import { RecentToolsTableDesktop } from './recent-tools-table-desktop'


type RecentToolsCardProps = {
  tools: Tool[]
}

export function RecentToolsCard({ tools }: RecentToolsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Tools</h2>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
          <span>Last 30 days</span>
        </div>
      </div>

      <div className="md:hidden">
        <RecentToolsListMobile tools={tools} />
      </div>
      <div className="hidden md:block">
        <RecentToolsTableDesktop tools={tools} />
      </div>
    </div>
  )
}
