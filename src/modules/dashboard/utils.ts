import { currencyFormatter, formatBudgetSuffix } from "@/shared/utils/format.util";
import type { DashboardKpis, StatCardData } from "./types";
import { Building2, TrendingUp, Users, Wrench } from "lucide-react";
import type { ToolStatus } from "@/lib/api/tools/tools.schema";

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
