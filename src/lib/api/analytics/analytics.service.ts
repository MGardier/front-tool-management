import { analyticsApi } from './analytics.api'
import { analyticsSchema, type Analytics } from './analytics.schema'

export const analyticsService = {
  
  async fetchAnalytics(): Promise<Analytics> {
    const response = await analyticsApi.fetchAnalytics()
    return analyticsSchema.parse(response.data)
  },
}