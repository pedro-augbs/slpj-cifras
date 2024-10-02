import { z } from "zod"
import { addMusic } from "@/api/add-music"

const schema = z.object({
  name: z.string().min(1, "Campo não pode ser vazio!"),
  artist: z.string().optional(),
  author: z.string().optional(),
  bpm: z.coerce.number().optional(),
  key: z.string().min(1, "Campo não pode ser vazio!"),
  letter: z.string().min(1, "Campo não pode ser vazio!"),
})

export async function addMusicAction(
  _: unknown,
  data: { [key: string]: string | number },
) {
  const result = schema.safeParse(data)

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message }
  }

  await addMusic({ ...result.data })

  return { success: true, message: "Música Adicionada!" }
}
