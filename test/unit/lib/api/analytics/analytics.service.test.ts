import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { analyticsApi } from '@/lib/api/analytics/analytics.api'
import { analyticsService } from '@/lib/api/analytics/analytics.service'
import { mockAxiosResponse } from '@test/helpers/mocks.helper'

vi.mock('@/lib/api/analytics/analytics.api', () => ({
  analyticsApi: {
    fetchAnalytics: vi.fn(),
  },
}))

const mockFetch = vi.mocked(analyticsApi.fetchAnalytics)

const validPayload = {
  budget_overview: {
    monthly_limit: 50000,
    current_month_total: 12000,
    previous_month_total: 10000,
    budget_utilization: '24%',
    trend_percentage: '+20%',
  },
  kpi_trends: {
    budget_change: '+5%',
    tools_change: '+2',
    departments_change: '+1',
    cost_per_user_change: '-3%',
  },
  cost_analytics: {
    cost_per_user: 50,
    previous_cost_per_user: 52,
    active_users: 240,
    total_users: 300,
  },
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('analyticsService.fetchAnalytics', () => {
  it('returns the parsed analytics object on a valid payload', async () => {
    mockFetch.mockResolvedValue(mockAxiosResponse(validPayload))

    const result = await analyticsService.fetchAnalytics()

    expect(result).toEqual(validPayload)
  })

  it('throws when the payload is missing required sections', async () => {
    mockFetch.mockResolvedValue(mockAxiosResponse({ budget_overview: {} } as never))

    await expect(analyticsService.fetchAnalytics()).rejects.toThrow()
  })
})
