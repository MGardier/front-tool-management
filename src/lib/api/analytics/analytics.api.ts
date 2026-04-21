import type { AxiosResponse } from 'axios'
import { httpClient } from '@/lib/http/http-client'
import type { Analytics } from './analytics.schema'
import { ENDPOINTS } from '../../../app/constants/endpoints';

export const analyticsApi = {
  async fetchAnalytics(): Promise<AxiosResponse<Analytics>> {
    return httpClient.get<Analytics>(ENDPOINTS.analytics)
  },
}