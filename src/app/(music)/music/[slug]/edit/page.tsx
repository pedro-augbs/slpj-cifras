"use client"

import { notFound, redirect, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(1, "Required!"),
  artist: z.string(),
  author: z.string(),
  letter: z.string().min(1, "Required!"),
  key: z.string().min(1, "Required!"),
  bpm: z.coerce.number(),
})

export default function Edit() {
  const params = useParams()
  const { data: session } = useSession()

  const isAdmin = session?.user.role === "admin"

  if (!params) {
    notFound()
  }

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const { data } = useSuspenseQuery({
    queryKey: ["music", slug],
    queryFn: async (): Promise<Music> => {
      return await api.get(`/api/music/get/${slug}`).then(res => res.data)
    },
  })

  const handleSubmit = async (data: FormData) => {
    const result = schema.safeParse(Object.fromEntries(data))

    if (!result.success) {
      toast.error(result.error.issues[0].message)
    }

    const response = await api
      .put(`/api/music/edit/${slug}`, result.data)
      .then(res => res.data)

    if (response) {
      toast.success("Música atualizada com sucesso!")
      redirect(`/music/${slug}`)
    }
  }

  return (
    <main className="py-8 px-4">
      <form action={handleSubmit} className="w-full space-y-4">
        <div className="w-full">
          <Label>Nome</Label>
          <Input type="text" defaultValue={data.name} name="name" />
        </div>
        <div className="w-full">
          <Label>Artista</Label>
          <Input type="text" defaultValue={data.artist} name="artist" />
        </div>
        <div className="w-full">
          <Label>Autor</Label>
          <Input type="text" defaultValue={data.author} name="author" />
        </div>
        <div className="w-full">
          <Label>Tom</Label>
          <Input type="text" defaultValue={data.key} name="key" />
        </div>
        <div className="w-full">
          <Label>BPM</Label>
          <Input type="number" defaultValue={data.bpm} name="bpm" />
        </div>
        <div className="w-full">
          <Label>Letter</Label>
          <Textarea
            defaultValue={data.letter}
            name="letter"
            className="resize-y"
            rows={Number(((data.letter.length * 3) / 100).toPrecision(2))}
          />
        </div>
        <Button type="submit" size={"lg"} className="w-full">
          Salvar
        </Button>
      </form>
    </main>
  )
}
