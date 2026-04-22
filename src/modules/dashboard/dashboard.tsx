import { RecentToolsCard } from './components/recent-tools-card'
import { StatCard } from './components/stat-card'
import { useDashboardKpis } from './hooks/use-dashboard-kpis'
import { useRecentTools } from './hooks/use-recent-tools'
import { buildStatCards } from './utils'


export function Dashboard() {
  const kpis = useDashboardKpis()
  const recentTools = useRecentTools()

  return (
    <>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Internal Tools Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">Monitor and manage your organization's software tools and expenses</p>
      </div>

      {kpis.isLoading && <p className="text-sm text-slate-500">Loading KPIs…</p>}
      {kpis.isError && <p className="text-sm text-red-500">Failed to load KPIs.</p>}
      {kpis.data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {buildStatCards(kpis.data).map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      )}

      <div className="mt-6 md:mt-8">
        {recentTools.isLoading && <p className="text-sm text-slate-500">Loading recent tools…</p>}
        {recentTools.isError && <p className="text-sm text-red-500">Failed to load recent tools.</p>}
        {recentTools.data && <RecentToolsCard tools={recentTools.data} />}
      </div>
    </>
  )
}
