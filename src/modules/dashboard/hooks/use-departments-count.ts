import { departmentsService } from '@/lib/api/departments/departments.service'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { dashboardKeys } from '../dashboard.key'

export const useDepartmentsCount = (): UseQueryResult<number> =>
  useQuery({
    queryKey: dashboardKeys.departmentsCount(),
    queryFn: () => departmentsService.fetchDepartmentsCount(),
  })
