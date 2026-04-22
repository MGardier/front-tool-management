import { describe, it, expect } from 'vitest'
import {
  optionalUrl,
  optionalString,
  optionalCategoricalString,
  requiredCategoricalString,
} from '@/shared/utils/zod.util'

describe('optionalUrl', () => {
  it.each([
    [undefined, undefined],
    ['', undefined],
    ['not a url', undefined],
    ['relative/path', undefined],
    ['https://example.com', 'https://example.com'],
  ])('optionalUrl(%s) → %s', (input, expected) => {
    expect(optionalUrl.parse(input)).toBe(expected)
  })
})

describe('optionalString', () => {
  it('returns undefined for undefined, empty, or whitespace-only input', () => {
    expect(optionalString.parse(undefined)).toBeUndefined()
    expect(optionalString.parse('')).toBeUndefined()
    expect(optionalString.parse('   ')).toBeUndefined()
  })

  it('trims non-empty strings without altering case', () => {
    expect(optionalString.parse('  hello WORLD  ')).toBe('hello WORLD')
  })
})

describe('optionalCategoricalString', () => {
  it.each([
    ['ENGINEERING', 'Engineering'],
    ['engineering', 'Engineering'],
    ['  engineering  ', 'Engineering'],
    ['eNgInEeRiNg', 'Engineering'],
  ])('optionalCategoricalString(%s) → %s', (input, expected) => {
    expect(optionalCategoricalString.parse(input)).toBe(expected)
  })

  it('returns undefined for empty, whitespace, or undefined input', () => {
    expect(optionalCategoricalString.parse(undefined)).toBeUndefined()
    expect(optionalCategoricalString.parse('')).toBeUndefined()
    expect(optionalCategoricalString.parse('   ')).toBeUndefined()
  })
})

describe('requiredCategoricalString', () => {
  it.each([
    ['ENGINEERING', 'Engineering'],
    ['engineering', 'Engineering'],
    ['  engineering  ', 'Engineering'],
  ])('requiredCategoricalString(%s) → %s', (input, expected) => {
    expect(requiredCategoricalString.parse(input)).toBe(expected)
  })

  it('fails validation for empty strings', () => {
    expect(requiredCategoricalString.safeParse('').success).toBe(false)
  })

  it('fails validation for whitespace-only strings', () => {
    expect(requiredCategoricalString.safeParse('   ').success).toBe(false)
  })
})
