
export type Paginated<T> = {
  data: T[]
  total: number
}


export type ListQueryParams = {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  q?: string
}

