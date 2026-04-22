export const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const formatBudgetSuffix = (limit: number): string =>
  `/${Math.round(limit / 1000)} k €`
