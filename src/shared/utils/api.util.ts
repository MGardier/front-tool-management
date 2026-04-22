import type { AxiosResponse } from "axios"

export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * Reads the `x-total-count` header as an integer.
 * Falls back to `defaultValue` when the header is missing, empty, or cannot
 * be parsed 
 */
export const extractTotalFromHeader = <T>(
  response: AxiosResponse<T>,
  defaultValue: number
): number => {
  const raw = response.headers['x-total-count']
  if (raw === undefined || raw === null) return defaultValue
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : defaultValue
}
