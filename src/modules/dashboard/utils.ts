import { currencyFormatter, formatBudgetSuffix } from "@/shared/utils/format.util";
import type { DashboardKpis, StatCardData } from "./types";
import { Building2, TrendingUp, Users, Wrench } from "lucide-react";
import type { ToolStatus } from "@/lib/api/tools/tools.schema";
import type { Analytics } from "@/lib/api/analytics/analytics.schema";

export const buildStatCards = (kpis: DashboardKpis): StatCardData[] => [
  {
    label: 'Monthly Budget',
    value: currencyFormatter.format(kpis.budget.current),
    valueSuffix: formatBudgetSuffix(kpis.budget.limit),
    badge: kpis.budget.change,
    badgeClass: 'bg-emerald-500 text-white',
    Icon: TrendingUp,
    iconBgClass: 'bg-emerald-500',
  },
  {
    label: 'Active Tools',
    value: String(kpis.activeTools.count),
    badge: kpis.activeTools.change,
    badgeClass: 'bg-indigo-500 text-white',
    Icon: Wrench,
    iconBgClass: 'bg-indigo-500',
  },
  {
    label: 'Departments',
    value: String(kpis.departments.count),
    badge: kpis.departments.change,
    badgeClass: 'bg-red-500 text-white',
    Icon: Building2,
    iconBgClass: 'bg-red-500',
  },
  {
    label: 'Cost/User',
    value: currencyFormatter.format(kpis.costPerUser.current),
    badge: kpis.costPerUser.change,
    badgeClass: 'bg-pink-500 text-white',
    Icon: Users,
    iconBgClass: 'bg-pink-500',
  },
]


export const mapToDashboardKpis = (
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

export const statusStyles: Record<ToolStatus, string> = {
  active: 'bg-emerald-500 text-white',
  expiring: 'bg-orange-400 text-white',
  unused: 'bg-red-500 text-white',
}

export const statusLabels: Record<ToolStatus, string> = {
  active: 'Active',
  expiring: 'Expiring',
  unused: 'Unused',
}
