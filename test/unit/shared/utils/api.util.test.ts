import { describe, it, expect } from 'vitest'
import type { AxiosResponse } from 'axios'
import { extractTotalFromHeader, isValidUrl } from '@/shared/utils/api.util'

const buildResponse = (
  headers: Record<string, string> = {}
): AxiosResponse<unknown> =>
  ({
    data: null,
    headers,
    status: 200,
    statusText: 'OK',
    config: {},
  } as unknown as AxiosResponse<unknown>)

describe('isValidUrl', () => {
  it('returns true for absolute HTTPS URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })

  it('returns false for empty strings', () => {
    expect(isValidUrl('')).toBe(false)
  })

  it('returns false for garbage strings', () => {
    expect(isValidUrl('not a url')).toBe(false)
  })

  it('returns false for relative paths', () => {
    expect(isValidUrl('relative/path')).toBe(false)
  })
})

describe('extractTotalFromHeader', () => {
  it('returns the numeric value when x-total-count is present', () => {
    const response = buildResponse({ 'x-total-count': '42' })
    expect(extractTotalFromHeader(response, 0)).toBe(42)
  })

  it('falls back to the default value when the header is missing', () => {
    expect(extractTotalFromHeader(buildResponse(), 7)).toBe(7)
  })

  it('returns 0 (not the default) when the header value is "0"', () => {
    const response = buildResponse({ 'x-total-count': '0' })
    expect(extractTotalFromHeader(response, 99)).toBe(0)
  })

  it('falls back to the default value when the header cannot be parsed as a number', () => {
    const response = buildResponse({ 'x-total-count': 'not-a-number' })
    expect(extractTotalFromHeader(response, 42)).toBe(42)
  })

  it('falls back to the default value for non-finite values like "Infinity"', () => {
    const response = buildResponse({ 'x-total-count': 'Infinity' })
    expect(extractTotalFromHeader(response, 42)).toBe(42)
  })
})
