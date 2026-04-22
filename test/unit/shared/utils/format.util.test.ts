import { describe, it, expect } from 'vitest'
import { currencyFormatter, formatBudgetSuffix } from '@/shared/utils/format.util'

// Intl in fr-FR uses U+00A0 or U+202F to separate thousands and the currency
// symbol, depending on the ICU version. Match either, plus regular whitespace.
const NBSP = '[\\s\\u00a0\\u202f]'

describe('currencyFormatter', () => {
  it('formats integer euros in fr-FR without decimals', () => {
    expect(currencyFormatter.format(1000)).toMatch(new RegExp(`1${NBSP}000${NBSP}?€`))
  })

  it('rounds to zero decimal digits', () => {
    expect(currencyFormatter.format(1234.56)).toMatch(new RegExp(`1${NBSP}235${NBSP}?€`))
  })

  it('formats zero', () => {
    expect(currencyFormatter.format(0)).toMatch(new RegExp(`0${NBSP}?€`))
  })
})

describe('formatBudgetSuffix', () => {
  it.each([
    [50000, '/50 k €'],
    [49500, '/50 k €'],
    [49499, '/49 k €'],
    [999, '/1 k €'],
    [0, '/0 k €'],
  ])('formatBudgetSuffix(%i)', (input, expected) => {
    expect(formatBudgetSuffix(input)).toBe(expected)
  })
})
