import type { AxiosResponse } from 'axios'
import { httpClient } from '@/lib/http/http-client'
import type { Tool } from './tools.schema'
import type { ToolsQueryParams } from './types'
import { ENDPOINTS } from '@/app/constants/endpoints'

export const toolsApi = {
  async fetchTools(
    params: ToolsQueryParams = {}
  ): Promise<AxiosResponse<Tool[]>> {
    return httpClient.get<Tool[]>(ENDPOINTS.tools, { params })
  },

  async fetchToolById(id: number): Promise<AxiosResponse<Tool>> {
    return httpClient.get<Tool>(ENDPOINTS.toolsDetail(id))
  },
}