import { z } from 'zod'
import { envSchema, type EnvConfig } from './env.schema'

export function validateEnv(): EnvConfig {
  const result = envSchema.safeParse(import.meta.env)

  if (!result.success) {
    const errorMessages: string[] = result.error.issues.map(
      (issue: z.core.$ZodIssue) => `${issue.path.join('.')}: ${issue.message}`
    )

    console.error('❌ Environment validation failed:')
    errorMessages.forEach((message: string) => console.error(`  - ${message}`))

    throw new Error('Invalid environment configuration. Check your .env file.')
  }

  if (import.meta.env.DEV) {
    console.info('✅ Environment validation successful')
  }

  return result.data
}


export const env: EnvConfig = validateEnv()