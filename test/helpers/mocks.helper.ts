import { vi } from 'vitest'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export function mockQueryResult<T>(
  overrides: Partial<UseQueryResult<T>> = {}
): UseQueryResult<T> {
  return {
    isLoading: false,
    isError: false,
    isFetching: false,
    isPending: false,
    isSuccess: true,
    status: 'success',
    fetchStatus: 'idle',
    data: undefined,
    error: null,
    refetch: vi.fn().mockResolvedValue({ data: undefined }),
    ...overrides,
  } as unknown as UseQueryResult<T>
}

export function mockAxiosResponse<T>(
  data: T,
  headers: Record<string, string> = {}
): AxiosResponse<T> {
  return {
    data,
    headers,
    status: 200,
    statusText: 'OK',
    config: {},
  } as unknown as AxiosResponse<T>
}
