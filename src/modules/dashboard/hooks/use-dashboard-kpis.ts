import type { Analytics } from '@/lib/api/analytics/analytics.schema'
import type { DashboardKpis, UseDashboardKpisResult } from '../types'
import { useActiveToolsCount } from './use-active-tools-count'
import { useAnalytics } from './use-analytics'
import { useDepartmentsCount } from './use-departments-count'

const mapToDashboardKpis = (
  analytics: Analytics,
  activeToolsCount: number,
  departmentsCount: number
): DashboardKpis => {
  const { budget_overview, kpi_trends, cost_analytics } = analytics

  return {
    budget: {
      current: budget_overview.current_month_total,
      limit: budget_overview.monthly_limit,
      change: kpi_trends.budget_change,
    },
    activeTools: {
      count: activeToolsCount,
      change: kpi_trends.tools_change,
    },
    departments: {
      count: departmentsCount,
      change: kpi_trends.departments_change,
    },
    costPerUser: {
      current: cost_analytics.cost_per_user,
      change: kpi_trends.cost_per_user_change,
    },
  }
}

export const useDashboardKpis = (): UseDashboardKpisResult => {
  const analyticsQuery = useAnalytics()
  const activeToolsCountQuery = useActiveToolsCount()
  const departmentsCountQuery = useDepartmentsCount()

  const queries = [analyticsQuery, activeToolsCountQuery, departmentsCountQuery]
  const isLoading = queries.some((q) => q.isLoading)
  const isError = queries.some((q) => q.isError)

  const isReady =
    analyticsQuery.data !== undefined &&
    activeToolsCountQuery.data !== undefined &&
    departmentsCountQuery.data !== undefined

  return {
    isLoading,
    isError,
    data: isReady
      ? mapToDashboardKpis(
          analyticsQuery.data,
          activeToolsCountQuery.data,
          departmentsCountQuery.data
        )
      : undefined,
  }
}
