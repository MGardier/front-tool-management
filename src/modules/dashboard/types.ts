import type { ComponentType } from 'react'

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
  isFetching: boolean
  refetch: () => Promise<unknown>
  data: DashboardKpis | undefined
}

export type StatCardData = {
  label: string
  value: string
  valueSuffix?: string
  badge: string
  badgeClass: string
  Icon: ComponentType<IconProps>
  iconBgClass: string
}


type IconProps = { className?: string; strokeWidth?: number }