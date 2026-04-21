import { z } from 'zod'

export const departmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Department = z.infer<typeof departmentSchema>