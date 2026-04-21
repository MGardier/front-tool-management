import { z } from 'zod'

const budgetOverviewSchema = z.object({
  monthly_limit: z.number(),
  current_month_total: z.number(),
  previous_month_total: z.number(),
  budget_utilization: z.string(),
  trend_percentage: z.string(),
})

const kpiTrendsSchema = z.object({
  budget_change: z.string(),
  tools_change: z.string(),
  departments_change: z.string(),
  cost_per_user_change: z.string(),
})

const costAnalyticsSchema = z.object({
  cost_per_user: z.number(),
  previous_cost_per_user: z.number(),
  active_users: z.number(),
  total_users: z.number(),
})

export const analyticsSchema = z.object({
  budget_overview: budgetOverviewSchema,
  kpi_trends: kpiTrendsSchema,
  cost_analytics: costAnalyticsSchema,
})

export type Analytics = z.infer<typeof analyticsSchema>