import type { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "@/lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }
  const query = req.query

  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug

  if (!slug) {
    return res.status(404).json({ message: "Music not found!" })
  }

  try {
    await prisma.music.delete({
      where: {
        slug: slug,
      },
    })

    return res.status(200).json({ message: "Music deleted successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
