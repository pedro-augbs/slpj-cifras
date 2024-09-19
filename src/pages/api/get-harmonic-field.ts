import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { getHarmonicField, type Tonality } from "@/utils/data/harmonic-field"

const bodySchema = z.object({
  tonality: z.string().min(1, "Required!"),
  scale: z.string().min(1, "Required!"),
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const { tonality, scale } = bodySchema.parse(req.body)

    const harmonicField = getHarmonicField(tonality as Tonality, scale)

    if (!harmonicField) {
      return res.status(404).json({ message: "Harmonic field not found!" })
    }

    return res.status(200).json({ ...harmonicField })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to load data", error: err })
  }
}
