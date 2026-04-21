import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';


const MAX_RETRIES = 1

const NON_RETRYABLE_STATUSES = [400, 401, 403, 404, 422]

const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= MAX_RETRIES) return false

  //If Http code is not retryable we do not try
  if (error instanceof AxiosError && error.response?.status) {
    if (NON_RETRYABLE_STATUSES.includes(error.response.status)) 
      return false
    
  }

  return true
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      //Determine if the query can retry and how many times
      retry: shouldRetry,

      //Determine delay between retry in milliseconds
      retryDelay: 1000,

      // time in milliseconds after data is considered stale
      staleTime: 1000 *60 , //1mn 

      //time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 1000 * 60 *5, // 5mn
      
      // Determine if the query will refetch on window focus if the data is stale.
      refetchOnWindowFocus: import.meta.env.PROD,

      // Determine if the query will refetch on reconnect focus if the data is stale.
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});