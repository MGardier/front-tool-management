import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRecentTools } from '@/modules/dashboard/hooks/use-recent-tools'
import { RecentToolsBlock } from '@/modules/dashboard/components/recent-tools-block'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { mockQueryResult } from '@test/helpers/mocks.helper'

vi.mock('@/modules/dashboard/hooks/use-recent-tools', () => ({
  useRecentTools: vi.fn(),
}))

const mockUseRecentTools = vi.mocked(useRecentTools)

const tool = (id: number, name: string): Tool =>
  ({
    id,
    name,
    status: 'active',
    owner_department: 'Engineering',
    monthly_cost: 100,
    active_users_count: 10,
    updated_at: '2024-01-01T00:00:00Z',
  } as Tool)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('RecentToolsBlock', () => {
  it('renders the skeleton when isLoading is true', () => {
    mockUseRecentTools.mockReturnValue(mockQueryResult({ isLoading: true }))

    render(<RecentToolsBlock />)

    expect(screen.getByTestId('recent-tools-skeleton')).toBeInTheDocument()
  })

  it('renders ErrorState when isError=true and there is no data', () => {
    mockUseRecentTools.mockReturnValue(
      mockQueryResult<Tool[]>({ isError: true, data: undefined })
    )

    render(<RecentToolsBlock />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/couldn't load recent tools/i)).toBeInTheDocument()
  })

  it('preserves stale data even when isError=true (critical UX contract)', () => {
    mockUseRecentTools.mockReturnValue(
      mockQueryResult({ isError: true, data: [tool(1, 'Slack')] })
    )

    render(<RecentToolsBlock />)

    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.getAllByText('Slack').length).toBeGreaterThan(0)
  })

  it('renders EmptyState when data is an empty array', () => {
    mockUseRecentTools.mockReturnValue(mockQueryResult({ data: [] }))

    render(<RecentToolsBlock />)

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/no recent tools to display/i)).toBeInTheDocument()
  })

  it('renders the card with tool names when data is populated', () => {
    mockUseRecentTools.mockReturnValue(
      mockQueryResult({ data: [tool(1, 'Slack'), tool(2, 'Figma')] })
    )

    render(<RecentToolsBlock />)

    expect(screen.getAllByText('Slack').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Figma').length).toBeGreaterThan(0)
  })

  it('calls refetch when the retry button is clicked', async () => {
    const refetch = vi.fn().mockResolvedValue({ data: undefined })
    mockUseRecentTools.mockReturnValue(
      mockQueryResult<Tool[]>({ isError: true, data: undefined, refetch: refetch as never })
    )

    render(<RecentToolsBlock />)
    await userEvent.click(screen.getByRole('button', { name: /try again/i }))

    expect(refetch).toHaveBeenCalledOnce()
  })
})
