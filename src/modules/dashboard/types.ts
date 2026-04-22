export type DashboardKpis = {
  budget: {
    current: number
    limit: number
    change: string
  }
  activeTools: {
    count: number
    change: string
  }
  departments: {
    count: number
    change: string
  }
  costPerUser: {
    current: number
    change: string
  }
}

export type UseDashboardKpisResult = {
  isLoading: boolean
  isError: boolean
  data: DashboardKpis | undefined
}
