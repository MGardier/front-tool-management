import { KpisBlock } from './components/kpis-block'
import { RecentToolsBlock } from './components/recent-tools-block'


export function Dashboard() {
  return (
    <>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Internal Tools Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">Monitor and manage your organization's software tools and expenses</p>
      </div>

      <KpisBlock />

      <div className="mt-6 md:mt-8">
        <RecentToolsBlock />
      </div>
    </>
  )
}
