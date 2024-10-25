import { createCipheriv, createDecipheriv } from "node:crypto"

import { env } from "@/utils/env"

function encryptPassword(password: string) {
  const cipher = createCipheriv(
    "aes-256-cbc",
    Buffer.from(env.PASSWORD_KEY),
    Buffer.from(env.PASSWORD_IV),
  )
  let hashed = cipher.update(password, "utf8", "hex")
  hashed += cipher.final("hex")
  return hashed
}

function decryptPassword(password: string) {
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(env.PASSWORD_KEY),
    Buffer.from(env.PASSWORD_IV),
  )
  let dec = decipher.update(password, "hex", "utf8")
  dec += decipher.final("utf8")
  return dec
}

function comparePassword(password: string, encryptedPassword: string) {
  return encryptPassword(password) === encryptedPassword
}

export { encryptPassword, decryptPassword, comparePassword }
