export const ENDPOINTS = {
  analytics:'/analytics',
  departments : '/departments',
  tools : '/tools',
  toolsDetail : (id: number) => `${ENDPOINTS.tools}/${id}`,
  departmentsDetail : (id: number) => `${ENDPOINTS.departments}/${id}`,
} as const