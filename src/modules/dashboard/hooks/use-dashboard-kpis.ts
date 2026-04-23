
import type {  UseDashboardKpisResult } from '../types'
import { useActiveToolsCount } from './use-active-tools-count'
import { useAnalytics } from './use-analytics'
import { useDepartmentsCount } from './use-departments-count'
import { mapToDashboardKpis } from '../utils'




export const useDashboardKpis = (module:string): UseDashboardKpisResult => {
  const analyticsQuery = useAnalytics(module)
  const activeToolsCountQuery = useActiveToolsCount(module)
  const departmentsCountQuery = useDepartmentsCount(module)

  const queries = [analyticsQuery, activeToolsCountQuery, departmentsCountQuery]
  const isLoading = queries.some((q) => q.isLoading)
  const isError = queries.some((q) => q.isError)
  const isFetching = queries.some((q) => q.isFetching)

  const refetch = () => Promise.all(queries.map((q) => q.refetch())) 

  const isReady =
    analyticsQuery.data !== undefined &&
    activeToolsCountQuery.data !== undefined &&
    departmentsCountQuery.data !== undefined

  return {
    isLoading,
    isError,
    isFetching,
    refetch,
    data: isReady
      ? mapToDashboardKpis(
          analyticsQuery.data,
          activeToolsCountQuery.data,
          departmentsCountQuery.data
        )
      : undefined,
  }
}
