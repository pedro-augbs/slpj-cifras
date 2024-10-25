import { z } from "zod"

const schema = z.object({
  DATABASE_URL: z.string(),
  PASSWORD_KEY: z.string(),
  PASSWORD_IV: z.string(),
  JWT_PASS: z.string(),
  API_URL: z.string().url(),
})
