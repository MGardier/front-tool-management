import type { DepartmentsQueryParams } from './types'

export const departmentsKeys = {
  all: ['departments'] as const,
  list: (module: string,params: DepartmentsQueryParams) => [...departmentsKeys.all, 'list',module, params] as const,
  count: (module: string) => [...departmentsKeys.all, 'count', module] as const,
}
