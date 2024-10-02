import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const query = req.query

    const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug

    if (!slug) {
      return res.status(404).json({ message: "Music not found!" })
    }

    const music = await prisma.music.findFirst({
      where: {
        slug: slug,
      },
    })

    return res.status(200).json({ ...music })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}