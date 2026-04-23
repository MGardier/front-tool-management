
import z from "zod"
import { isValidUrl } from "./api.util"

/** Capitalize first letter, lowercase the rest. "ENGINEERING" → "Engineering". */
const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

/** Optional URL — empty strings and malformed URLs are normalized to undefined. */
export const optionalUrl = z
  .string()
  .optional()
  .transform((v) => (v && isValidUrl(v) ? v : undefined))

/** Optional free-text string — empty / whitespace → undefined. No case normalization. */
export const optionalString = z
  .string()
  .optional()
  .transform((v) => {
    const trimmed = v?.trim()
    return trimmed && trimmed !== '' ? trimmed : undefined
  })

/** Optional categorical string — empty → undefined, capitalization normalized. */
export const optionalCategoricalString = z
  .string()
  .optional()
  .transform((v) => {
    const trimmed = v?.trim()
    return trimmed && trimmed !== '' ? capitalizeFirstLetter(trimmed) : undefined
  })

/** Required categorical string — empty or whitespace triggers validation failure. */
export const requiredCategoricalString = z
  .string()
  .transform((v) => v.trim())
  .refine((v) => v !== '', { message: 'Required categorical string cannot be empty' })
  .transform(capitalizeFirstLetter)


  /** Required string — trims, rejects empty. */
export const requiredString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)