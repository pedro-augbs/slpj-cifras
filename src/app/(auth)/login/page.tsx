"use client"

import { signIn } from "next-auth/react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const schema = z.object({
  email: z.string().email("Email Inválido!"),
  password: z.string(),
})

export default function Login() {
  const router = useRouter()

  async function handleSubmit(data: FormData) {
    const result = schema.safeParse(Object.fromEntries(data))

    if (!result.success) {
      return
    }

    const response = await signIn("credentials", {
      ...result.data,
      redirect: false,
    })

    if (response?.ok) {
      return router.push("/")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        action={handleSubmit}
        className="bg-primary rounded-xl p-4 w-full max-w-md space-y-3"
      >
        <h1 className="text-xl font-bold">Login</h1>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Senha" />
        <Button
          variant={"outline"}
          size={"lg"}
          type="submit"
          className="w-full"
        >
          Enviar
        </Button>
      </form>
    </main>
  )
}
