export const analyticsKeys = {
  all: ['analytics'] as const,
  summary: (module: string) => [...analyticsKeys.all, 'summary', module] as const,
}
