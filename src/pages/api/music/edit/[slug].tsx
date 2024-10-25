import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

const schema = z.object({
  name: z.string().min(1, "Required!"),
  artist: z.string(),
  author: z.string(),
  letter: z.string().min(1, "Required!"),
  key: z.string().min(1, "Required!"),
  bpm: z.coerce.number(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }
  const query = req.query

  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug

  if (!slug) {
    return res.status(404).json({ message: "Music not found!" })
  }

  try {
    const { name, artist, author, letter, key, bpm } = schema.parse(req.body)

    await prisma.music.update({
      data: {
        name,
        artist,
        author,
        letter,
        key,
        bpm,
      },
      where: {
        slug: slug,
      },
    })

    return res.status(200).json({ message: "Updated successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
