import { createCipheriv, createDecipheriv } from "node:crypto"

function encryptPassword(password: string) {
  const cipher = createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.PASSWORD_KEY || "a"),
    Buffer.from(process.env.PASSWORD_IV || "a"),
  )
  let hashed = cipher.update(password, "utf8", "hex")
  hashed += cipher.final("hex")
  return hashed
}

function decryptPassword(password: string) {
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.PASSWORD_KEY || "a"),
    Buffer.from(process.env.PASSWORD_IV || "a"),
  )
  let dec = decipher.update(password, "hex", "utf8")
  dec += decipher.final("utf8")
  return dec
}

function comparePassword(password: string, encryptedPassword: string) {
  return encryptPassword(password) === encryptedPassword
}

export { encryptPassword, decryptPassword, comparePassword }
