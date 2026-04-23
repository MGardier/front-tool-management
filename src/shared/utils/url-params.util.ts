/**
 * URL search param helpers for pages whose state is synced to the URL.
 * Kept generic so any filter/sort/pagination screen can reuse them.
 */

/** Reads a non-empty string; returns `undefined` for missing or empty values. */
export const readStringParam = (
  params: URLSearchParams,
  key: string
): string | undefined => {
  const value = params.get(key)
  return value === null || value === '' ? undefined : value
}

/**
 * Reads a positive integer. Falls back when missing, non-numeric, or ≤ 0 —
 * the ≤ 0 rule protects against `?_page=0` or `?_limit=-1` in shared URLs.
 */
export const readIntParam = (
  params: URLSearchParams,
  key: string,
  fallback: number
): number => {
  const raw = params.get(key)
  if (raw === null) return fallback
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/**
 * Reads a param whose value must belong to an allow-list (enum-style).
 * Returns the fallback when the value is missing or unknown. Narrows to
 * `T[number]` so the caller never needs an `as` cast.
 *
 * @example
 * readEnumParam(params, '_order', ['asc', 'desc'] as const, 'desc')
 */
export const readEnumParam = <T extends readonly string[], F>(
  params: URLSearchParams,
  key: string,
  allowed: T,
  fallback: F
): T[number] | F => {
  const value = params.get(key)
  return value !== null && (allowed as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback
}
