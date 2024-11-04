import { z } from 'zod'

export const authZodSchema = z.object({
  email: z.string().email().max(50).email(),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().min(6).max(30).optional(),
})

export type AuthZodSchemaType = z.infer<typeof authZodSchema>
