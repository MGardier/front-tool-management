
import type { ListQueryParams } from '@/shared/types/api.types'
import type { Department } from './departments.schema'


export interface  DepartmentsQueryParams extends ListQueryParams  {
  name_like?: string
  _sort?: keyof Department

  /*⚠️ Comparison operators below are NOT supported by JSON Server v1.
   *   they are silently ignored and return the full resource unfiltered.
   */
  // id_gt?: number
  // id_gte?: number
  // id_lt?: number
  // id_lte?: number
  // id_ne?: number
  // created_at_gte?: string
  // created_at_lte?: string
}