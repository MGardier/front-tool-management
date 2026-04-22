import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDashboardKpis } from '@/modules/dashboard/hooks/use-dashboard-kpis'
import { useAnalytics } from '@/modules/dashboard/hooks/use-analytics'
import { useActiveToolsCount } from '@/modules/dashboard/hooks/use-active-tools-count'
import { useDepartmentsCount } from '@/modules/dashboard/hooks/use-departments-count'
import type { Analytics } from '@/lib/api/analytics/analytics.schema'
import { mockQueryResult } from '@test/helpers/mocks.helper'

vi.mock('@/modules/dashboard/hooks/use-analytics', () => ({
  useAnalytics: vi.fn(),
}))
vi.mock('@/modules/dashboard/hooks/use-active-tools-count', () => ({
  useActiveToolsCount: vi.fn(),
}))
vi.mock('@/modules/dashboard/hooks/use-departments-count', () => ({
  useDepartmentsCount: vi.fn(),
}))

const mockAnalytics = vi.mocked(useAnalytics)
const mockActiveCount = vi.mocked(useActiveToolsCount)
const mockDeptCount = vi.mocked(useDepartmentsCount)

const validAnalytics: Analytics = {
  budget_overview: {
    monthly_limit: 50000,
    current_month_total: 1000,
    previous_month_total: 900,
    budget_utilization: '2%',
    trend_percentage: '+10%',
  },
  kpi_trends: {
    budget_change: '+5%',
    tools_change: '+2',
    departments_change: '+1',
    cost_per_user_change: '-2%',
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

describe('useDashboardKpis', () => {
  it('returns mapped data when all three queries succeed', () => {
    mockAnalytics.mockReturnValue(mockQueryResult({ data: validAnalytics }))
    mockActiveCount.mockReturnValue(mockQueryResult({ data: 12 }))
    mockDeptCount.mockReturnValue(mockQueryResult({ data: 5 }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.data).toEqual({
      budget: { current: 1000, limit: 50000, change: '+5%' },
      activeTools: { count: 12, change: '+2' },
      departments: { count: 5, change: '+1' },
      costPerUser: { current: 50, change: '-2%' },
    })
  })

  it('aggregates isLoading=true when any query is loading', () => {
    mockAnalytics.mockReturnValue(mockQueryResult({ isLoading: true }))
    mockActiveCount.mockReturnValue(mockQueryResult({ data: 12 }))
    mockDeptCount.mockReturnValue(mockQueryResult({ data: 5 }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current.isLoading).toBe(true)
  })

  it('aggregates isError=true when any query has errored', () => {
    mockAnalytics.mockReturnValue(mockQueryResult({ isError: true }))
    mockActiveCount.mockReturnValue(mockQueryResult({ data: 12 }))
    mockDeptCount.mockReturnValue(mockQueryResult({ data: 5 }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current.isError).toBe(true)
  })

  it('returns data=undefined when any query is missing data (all-or-nothing contract)', () => {
    mockAnalytics.mockReturnValue(mockQueryResult({ data: validAnalytics }))
    mockActiveCount.mockReturnValue(mockQueryResult<number>({ isError: true, data: undefined }))
    mockDeptCount.mockReturnValue(mockQueryResult({ data: 5 }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current.data).toBeUndefined()
  })

  it('aggregates isFetching=true when any query is fetching', () => {
    mockAnalytics.mockReturnValue(
      mockQueryResult({ isFetching: true, data: validAnalytics })
    )
    mockActiveCount.mockReturnValue(mockQueryResult({ data: 12 }))
    mockDeptCount.mockReturnValue(mockQueryResult({ data: 5 }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current.isFetching).toBe(true)
  })

  it('returns the full contract shape even when all queries error', () => {
    mockAnalytics.mockReturnValue(mockQueryResult({ isError: true }))
    mockActiveCount.mockReturnValue(mockQueryResult({ isError: true }))
    mockDeptCount.mockReturnValue(mockQueryResult({ isError: true }))

    const { result } = renderHook(() => useDashboardKpis())

    expect(result.current).toHaveProperty('isLoading')
    expect(result.current).toHaveProperty('isError', true)
    expect(result.current).toHaveProperty('isFetching')
    expect(result.current).toHaveProperty('data', undefined)
    expect(typeof result.current.refetch).toBe('function')
  })

  it('refetch calls refetch on all three underlying queries and resolves when all resolve', async () => {
    const analyticsRefetch = vi.fn().mockResolvedValue({ data: validAnalytics })
    const activeRefetch = vi.fn().mockResolvedValue({ data: 12 })
    const deptRefetch = vi.fn().mockResolvedValue({ data: 5 })

    mockAnalytics.mockReturnValue(
      mockQueryResult({ data: validAnalytics, refetch: analyticsRefetch as never })
    )
    mockActiveCount.mockReturnValue(
      mockQueryResult({ data: 12, refetch: activeRefetch as never })
    )
    mockDeptCount.mockReturnValue(
      mockQueryResult({ data: 5, refetch: deptRefetch as never })
    )

    const { result } = renderHook(() => useDashboardKpis())

    await act(async () => {
      await result.current.refetch()
    })

    expect(analyticsRefetch).toHaveBeenCalledOnce()
    expect(activeRefetch).toHaveBeenCalledOnce()
    expect(deptRefetch).toHaveBeenCalledOnce()
  })
})
