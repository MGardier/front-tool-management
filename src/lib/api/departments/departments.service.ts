import { z } from 'zod'
import type { Paginated } from '@/shared/types/api.types'
import { departmentsApi } from './departments.api'
import { departmentSchema, type Department } from './departments.schema'
import type { DepartmentsQueryParams } from './types'

export const departmentsService = {
  async fetchDepartments(
    params: DepartmentsQueryParams = {}
  ): Promise<Paginated<Department>> {
    const response = await departmentsApi.fetchDepartments(params)

    const data = z.array(departmentSchema).parse(response.data)
    const total = Number(response.headers['x-total-count'] ?? data.length)

    return { data, total }
  },

  async fetchDepartmentById(id: number): Promise<Department> {
    const response = await departmentsApi.fetchDepartmentById(id)

    return departmentSchema.parse(response.data)
  },

  async fetchDepartmentsCount(): Promise<number> {
    const { total } = await this.fetchDepartments({ _page: 1, _limit: 1 })
    return total
  },
}