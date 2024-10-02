"use server"

import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Campo não pode ser vazio!"),
  artist: z.string(),
  author: z.string(),
  bpm: z.coerce.number(),
})

export async function validatePartialMusicAction(_: unknown, data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message }
  }

  return { success: true, message: "Música validada!" }
}
