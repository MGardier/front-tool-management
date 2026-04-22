import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toolsApi } from '@/lib/api/tools/tools.api'
import { toolsService } from '@/lib/api/tools/tools.service'
import type { Tool } from '@/lib/api/tools/tools.schema'
import { mockAxiosResponse } from '@test/helpers/mocks.helper'

vi.mock('@/lib/api/tools/tools.api', () => ({
  toolsApi: {
    fetchTools: vi.fn(),
    fetchToolById: vi.fn(),
  },
}))

const mockFetchTools = vi.mocked(toolsApi.fetchTools)
const mockFetchToolById = vi.mocked(toolsApi.fetchToolById)

const validTool = (overrides: Partial<Tool> = {}): Tool =>
  ({
    id: 1,
    name: 'Slack',
    status: 'active',
    owner_department: 'Engineering',
    monthly_cost: 100,
    active_users_count: 50,
    description: undefined,
    vendor: undefined,
    category: undefined,
    website_url: undefined,
    icon_url: undefined,
    previous_month_cost: undefined,
    created_at: undefined,
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
  } as Tool)

const invalidTool = { id: 99, name: 'Incomplete' } as unknown as Tool

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('toolsService.fetchTools', () => {
  it('returns data and total when all records are valid and header is present', async () => {
    const payload = [validTool({ id: 1 }), validTool({ id: 2 }), validTool({ id: 3 })]
    mockFetchTools.mockResolvedValue(
      mockAxiosResponse(payload, { 'x-total-count': '100' })
    )

    const result = await toolsService.fetchTools()

    expect(result.data).toHaveLength(3)
    expect(result.total).toBe(100)
  })



  it('returns an empty data array and adjusts total when all records are invalid', async () => {
    mockFetchTools.mockResolvedValue(
      mockAxiosResponse(
        [invalidTool, invalidTool, invalidTool],
        { 'x-total-count': '5' }
      )
    )

    const result = await toolsService.fetchTools()

    expect(result.data).toEqual([])
    expect(result.total).toBe(2)
  })
})

describe('toolsService.fetchActiveToolsCount', () => {
  it('queries with active status, limit 1, and returns only the total', async () => {
    mockFetchTools.mockResolvedValue(
      mockAxiosResponse([validTool()], { 'x-total-count': '42' })
    )

    const total = await toolsService.fetchActiveToolsCount()

    expect(total).toBe(42)
    expect(mockFetchTools).toHaveBeenCalledWith({
      status: 'active',
      _page: 1,
      _limit: 1,
    })
  })
})

describe('toolsService.fetchRecentTools', () => {
  it('queries sorted by updated_at desc with default limit 8 and returns only data', async () => {
    const payload = [validTool({ id: 1 }), validTool({ id: 2 }), validTool({ id: 3 })]
    mockFetchTools.mockResolvedValue(
      mockAxiosResponse(payload, { 'x-total-count': '50' })
    )

    const data = await toolsService.fetchRecentTools()

    expect(data).toHaveLength(3)
    expect(mockFetchTools).toHaveBeenCalledWith({
      _sort: 'updated_at',
      _order: 'desc',
      _limit: 8,
    })
  })

})

describe('toolsService.fetchToolById', () => {
  it('returns the parsed tool when data matches the schema', async () => {
    mockFetchToolById.mockResolvedValue(
      mockAxiosResponse(validTool({ id: 7, name: 'Figma' }))
    )

    const tool = await toolsService.fetchToolById(7)

    expect(tool.id).toBe(7)
    expect(tool.name).toBe('Figma')
  })

  it('throws when data is invalid (contrast: fetchTools filters, fetchToolById throws)', async () => {
    mockFetchToolById.mockResolvedValue(mockAxiosResponse(invalidTool))

    await expect(toolsService.fetchToolById(99)).rejects.toThrow()
  })
})
