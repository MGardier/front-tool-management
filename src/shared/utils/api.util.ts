import type { AxiosResponse } from "axios"

export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export const extractTotalFromHeader = <T>(response : AxiosResponse<T>, defaultValue : number) => Number(response.headers['x-total-count'] ?? defaultValue)

