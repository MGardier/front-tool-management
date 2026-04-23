export const analyticsFixture = {
  budget_overview: {
    monthly_limit: 50000,
    current_month_total: 12500,
    previous_month_total: 11000,
    budget_utilization: '25%',
    trend_percentage: '+13%',
  },
  kpi_trends: {
    budget_change: '+13%',
    tools_change: '+3',
    departments_change: '+1',
    cost_per_user_change: '-2%',
  },
  cost_analytics: {
    cost_per_user: 52,
    previous_cost_per_user: 53,
    active_users: 240,
    total_users: 300,
  },
}

export const toolsFixture = [
  {
    id: 1,
    name: 'Slack',
    status: 'active',
    owner_department: 'Engineering',
    monthly_cost: 120,
    active_users_count: 42,
    updated_at: '2026-04-20T10:00:00Z',
  },
  {
    id: 2,
    name: 'Figma',
    status: 'active',
    owner_department: 'Design',
    monthly_cost: 80,
    active_users_count: 15,
    updated_at: '2026-04-19T10:00:00Z',
  },
  {
    id: 3,
    name: 'Notion',
    status: 'expiring',
    owner_department: 'Product',
    monthly_cost: 60,
    active_users_count: 28,
    updated_at: '2026-04-18T10:00:00Z',
  },
]

export const departmentsFixture = [
  {
    id: 1,
    name: 'Engineering',
    description: 'Builds the product',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
  },
]
