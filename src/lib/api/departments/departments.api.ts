import { httpClient } from '@/lib/http/http-client'
import type { AxiosResponse } from 'axios'
import type { Department } from './departments.schema'
import type { DepartmentsQueryParams } from './types'

export const departmentsApi = {
  async fetchDepartments(
    params: DepartmentsQueryParams = {}
  ): Promise<AxiosResponse<Department[]>> {
    return httpClient.get<Department[]>('/departments', { params })
  },

  async fetchDepartmentById(id: number): Promise<AxiosResponse<Department>> {
    return httpClient.get<Department>(`/departments/${id}`)
  },
}