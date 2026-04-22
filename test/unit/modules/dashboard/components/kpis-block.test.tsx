import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDashboardKpis } from '@/modules/dashboard/hooks/use-dashboard-kpis'
import { KpisBlock } from '@/modules/dashboard/components/kpis-block'
import type { DashboardKpis, UseDashboardKpisResult } from '@/modules/dashboard/types'

vi.mock('@/modules/dashboard/hooks/use-dashboard-kpis', () => ({
  useDashboardKpis: vi.fn(),
}))

const mockUseDashboardKpis = vi.mocked(useDashboardKpis)

function kpisResult(
  overrides: Partial<UseDashboardKpisResult> = {}
): UseDashboardKpisResult {
  return {
    isLoading: false,
    isError: false,
    isFetching: false,
    refetch: vi.fn().mockResolvedValue([]),
    data: undefined,
    ...overrides,
  }
}

const validData: DashboardKpis = {
  budget: { current: 1000, limit: 50000, change: '+5%' },
  activeTools: { count: 12, change: '+2' },
  departments: { count: 5, change: '+1' },
  costPerUser: { current: 50, change: '-2%' },
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('KpisBlock', () => {
  it('renders the skeleton when isLoading is true', () => {
    mockUseDashboardKpis.mockReturnValue(kpisResult({ isLoading: true }))

    render(<KpisBlock />)

    expect(screen.getByTestId('kpis-skeleton')).toBeInTheDocument()
  })

  it('renders ErrorState when isError=true and there is no data', () => {
    mockUseDashboardKpis.mockReturnValue(
      kpisResult({ isError: true, data: undefined })
    )

    render(<KpisBlock />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/couldn't load kpis/i)).toBeInTheDocument()
  })

  it('preserves stale data even when isError=true (critical UX contract)', () => {
    mockUseDashboardKpis.mockReturnValue(
      kpisResult({ isError: true, data: validData })
    )

    render(<KpisBlock />)

    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.getByText('Monthly Budget')).toBeInTheDocument()
  })

  it('renders the 4 stat cards when data is populated', () => {
    mockUseDashboardKpis.mockReturnValue(kpisResult({ data: validData }))

    render(<KpisBlock />)

    expect(screen.getByText('Monthly Budget')).toBeInTheDocument()
    expect(screen.getByText('Active Tools')).toBeInTheDocument()
    expect(screen.getByText('Departments')).toBeInTheDocument()
    expect(screen.getByText('Cost/User')).toBeInTheDocument()
  })

  it('calls refetch when the retry button is clicked', async () => {
    const refetch = vi.fn().mockResolvedValue([])
    mockUseDashboardKpis.mockReturnValue(
      kpisResult({ isError: true, refetch })
    )

    render(<KpisBlock />)
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))

    expect(refetch).toHaveBeenCalledOnce()
  })
})
