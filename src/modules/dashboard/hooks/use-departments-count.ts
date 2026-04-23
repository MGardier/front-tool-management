import { departmentsService } from '@/lib/api/departments/departments.service'
import { departmentsKeys } from '@/lib/api/departments/departments.key'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'




export const useDepartmentsCount = (module: string): UseQueryResult<number> =>
  useQuery({
    queryKey: departmentsKeys.count(module),
    queryFn: () => departmentsService.fetchDepartmentsCount(),
  })
