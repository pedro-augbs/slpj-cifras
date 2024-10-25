import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

import { formatStringToSlug } from "@/utils/functions/format-string"

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
    const token = await getToken({ req, secret: process.env.JWT_PASS })

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (token.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { name, artist, author, bpm, key, letter } = bodySchema.parse(
      req.body,
    )

    await prisma.music.create({
      data: {
        name,
        slug: formatStringToSlug(name),
        artist,
        author,
        bpm,
        key,
        letter,
      },
    })

    return res.status(200).json({ message: "Music added successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
