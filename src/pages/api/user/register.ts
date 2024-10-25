import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

import { encryptPassword } from "@/utils/functions/password-functions"

const bodySchema = z.object({
  name: z.string().min(2, "Name is too short!"),
  email: z.string().email("Email is Invalid!"),
  password: z.string().min(8, "Password is too short!"),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const { name, email, password } = bodySchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      return res.status(401).json({ message: "User already exists" })
    }

    const hashedPassword = encryptPassword(password)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    res.status(200).json({ message: "User created successfully" })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ message: "Failed to register user", error: err })
  }
}
