import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PASSWORD_KEY: z.string(),
  PASSWORD_IV: z.string(),
  JWT_PASS: z.string(),
})

export const env = envSchema.parse(process.env)