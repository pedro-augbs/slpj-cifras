import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(1, "Required!"),
  artist: z.string(),
  author: z.string(),
  bpm: z.coerce.number(),
  key: z.string().min(1, "Required!"),
  letter: z.string().min(1, "Required!"),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const { name, artist, author, bpm, key, letter } = bodySchema.parse(
      req.body,
    )

    const music = await prisma.music.create({
      data: {
        name,
        slug: name
          .toLowerCase() // Converte todas as letras para minúsculas
          .normalize("NFD") // Normaliza a string decompondo os caracteres acentuados
          .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
          .replace(/ç/g, "c") // Substitui "ç" por "c"
          .replace(/\s+/g, "-") // Substitui espaços em branco por hífens
          .replace(/[^\w\-]+/g, "") // Remove caracteres que não são letras, números ou hífens
          .replace(/\-\-+/g, "-") // Substitui múltiplos hífens consecutivos por um único hífen
          .replace(/^-+/, "") // Remove hífens no início da string
          .replace(/-+$/, ""), // Remove hífens no final da string
        artist,
        author,
        bpm,
        key,
        letter,
      },
    })

    return res.status(200).json({ ...music })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
