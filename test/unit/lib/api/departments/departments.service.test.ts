import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { departmentsApi } from '@/lib/api/departments/departments.api'
import { departmentsService } from '@/lib/api/departments/departments.service'
import { mockAxiosResponse } from '@test/helpers/mocks.helper'

vi.mock('@/lib/api/departments/departments.api', () => ({
  departmentsApi: {
    fetchDepartments: vi.fn(),
    fetchDepartmentById: vi.fn(),
  },
}))

const mockFetchDepartments = vi.mocked(departmentsApi.fetchDepartments)
const mockFetchDepartmentById = vi.mocked(departmentsApi.fetchDepartmentById)

const validDepartment = (overrides: Partial<{ id: number; name: string }> = {}) => ({
  id: 1,
  name: 'Engineering',
  description: 'Builds the product',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-02-01T00:00:00Z',
  ...overrides,
})

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('departmentsService.fetchDepartments', () => {
  it('returns data and total from the x-total-count header', async () => {
    const payload = [validDepartment({ id: 1 }), validDepartment({ id: 2 })]
    mockFetchDepartments.mockResolvedValue(
      mockAxiosResponse(payload, { 'x-total-count': '42' })
    )

    const result = await departmentsService.fetchDepartments()

    expect(result.data).toHaveLength(2)
    expect(result.total).toBe(42)
  })

 
  it('throws when the payload contains invalid records', async () => {
    mockFetchDepartments.mockResolvedValue(
      mockAxiosResponse([{ id: 1, name: 'Incomplete' }] as never)
    )

    await expect(departmentsService.fetchDepartments()).rejects.toThrow()
  })
})

describe('departmentsService.fetchDepartmentsCount', () => {
  it('requests a minimal payload and returns only the total', async () => {
    mockFetchDepartments.mockResolvedValue(
      mockAxiosResponse([validDepartment()], { 'x-total-count': '17' })
    )

    const total = await departmentsService.fetchDepartmentsCount()

    expect(total).toBe(17)
    expect(mockFetchDepartments).toHaveBeenCalledWith({ _page: 1, _limit: 1 })
  })
})

describe('departmentsService.fetchDepartmentById', () => {
  it('returns the parsed department when data matches the schema', async () => {
    mockFetchDepartmentById.mockResolvedValue(
      mockAxiosResponse(validDepartment({ id: 3, name: 'Design' }))
    )

    const dept = await departmentsService.fetchDepartmentById(3)

    expect(dept.id).toBe(3)
    expect(dept.name).toBe('Design')
  })

  it('throws when data is invalid', async () => {
    mockFetchDepartmentById.mockResolvedValue(
      mockAxiosResponse({ id: 3, name: 'Incomplete' } as never)
    )

    await expect(departmentsService.fetchDepartmentById(3)).rejects.toThrow()
  })
})
