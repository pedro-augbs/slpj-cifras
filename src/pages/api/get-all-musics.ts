import type { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "@/lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const musics = await prisma.music.findMany({
      where: {
        artist: {
          not: "SLPJ Music",
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return res.status(200).json({ musics })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
