import { keepPreviousData, useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { Paginated } from "../types/api.types"
import type { Department } from "@/lib/api/departments/departments.schema"
import { departmentsKeys } from "@/lib/api/departments/departments.key"
import { departmentsService } from "@/lib/api/departments/departments.service"


type UseDepartmentsSearchOptions = {
  module: string
  query: string
  limit?: number
  enabled?: boolean
}

/**
 * Department autocomplete: fetches departments matching `query` via the
 * JSON Server `q` param. Caller is responsible for debouncing `query`
 * (via `useDebouncedValue`) so we don't fire a request per keystroke.
 * `module` scopes the cache per consumer — see `departmentsKeys.list`.
 */
export const useDepartmentsSearch = ({
  module,
  query,
  limit = 10,
  enabled = true,
}: UseDepartmentsSearchOptions): UseQueryResult<Paginated<Department>> => {
  const params = { q: query, _limit: limit }
  return useQuery({
    queryKey: departmentsKeys.list(module, params),
    queryFn: () => departmentsService.fetchDepartments(params),
    enabled,
    placeholderData: keepPreviousData,
  })
}
