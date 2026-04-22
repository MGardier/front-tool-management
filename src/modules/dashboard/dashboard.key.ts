export const dashboardKeys = {
  all: ['dashboard'] as const,
  analytics: () => [...dashboardKeys.all, 'analytics'] as const,
  activeToolsCount: () => [...dashboardKeys.all, 'active-tools-count'] as const,
  departmentsCount: () => [...dashboardKeys.all, 'departments-count'] as const,
}
