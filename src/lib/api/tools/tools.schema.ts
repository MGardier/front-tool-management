import { optionalCategoricalString, optionalString, optionalUrl, requiredCategoricalString } from '@/shared/utils/zod.util'
import { z } from 'zod'


export const toolStatusSchema = z.preprocess(
  (val) => (typeof val === 'string' ? val.toLowerCase() : val),
  z.enum(['active', 'expiring', 'unused'])
)

export type ToolStatus = z.infer<typeof toolStatusSchema>


/**
 * Tool entity schema.
 *
 * Acts as an adaptation layer over imperfect seed data:
 * - numeric coercion for fields mixing string/number types
 * - case-insensitive enum for status
 * - capitalization normalization for categorical strings
 * - empty / malformed URLs normalized to undefined
 * - optional fields for commonly missing descriptive data
 *
 * Incomplete records (missing required fields) fail parsing and are
 * filtered out by the service layer.
 *
 * See README > Data Integration Strategy.
 */
export const toolSchema = z.object({
  id: z.number(),
  name: z.string().min(1),

  // Required business fields
  status: toolStatusSchema,
  owner_department: requiredCategoricalString,
  monthly_cost: z.coerce.number().default(0),
  active_users_count: z.coerce.number().default(0),

  // Optional descriptive fields (free-text)
  description: optionalString,
  vendor: optionalString,

  // Optional categorical fields (capitalization normalized)
  category: optionalCategoricalString,

  // Optional URLs
  website_url: optionalUrl,
  icon_url: optionalUrl,

  // Optional numeric comparison
  previous_month_cost: z.coerce.number().optional(),

  // Timestamps
  created_at: z.string().optional(),
  updated_at: z.string(),
})

export type Tool = z.infer<typeof toolSchema>