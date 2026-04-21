import { z } from 'zod'

export const envSchema = z.object({
  VITE_API_BASE_URL: z.url({
    error: (issue: z.core.$ZodRawIssue) =>
      issue.input === undefined
        ? 'You must provide VITE_API_BASE_URL.'
        : 'VITE_API_BASE_URL must be a valid URL.',
  }),
})

export type EnvConfig = z.infer<typeof envSchema>