export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const formatBudgetSuffix = (limit: number): string =>
  `/€${Math.round(limit / 1000)}k`
