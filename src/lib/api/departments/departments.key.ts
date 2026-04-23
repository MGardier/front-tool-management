import type { DepartmentsQueryParams } from './types'

export const departmentsKeys = {
  all: ['departments'] as const,
  list: (params: DepartmentsQueryParams) => [...departmentsKeys.all, 'list', params] as const,
}
