"use client"

import { redirect } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

import { useMusicStore } from "@/store/music-store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const schema = z.object({
  name: z.string().min(1, "Campo nome não pode ser vazio!"),
  artist: z.string(),
  author: z.string(),
  bpm: z.coerce.number(),
})

export function AddPartialMusicForm() {
  const [loading, setLoading] = useState(false)
  const { music, saveInput } = useMusicStore()

  function handleChange(input: HTMLInputElement) {
    const data = { [input.name]: input.value }
    saveInput(data)
  }

  function handleSubmit(data: FormData) {
    setLoading(true)

    const result = schema.safeParse(Object.fromEntries(data))

    if (result.success) {
      toast.success("Informações adicionadas!")
      redirect("/add-music")
    } else {
      toast.error(result.error.issues[0].message)
    }

    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 py-2">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={e => handleChange(e.target)}
          defaultValue={music.name}
          required
        />
      </div>
      <div>
        <Label htmlFor="artist">Artista</Label>
        <Input
          type="text"
          id="artist"
          name="artist"
          onChange={e => handleChange(e.target)}
          defaultValue={music.artist}
          placeholder="Artist"
        />
      </div>
      <div>
        <Label htmlFor="author">Autor</Label>
        <Input
          type="text"
          id="author"
          name="author"
          onChange={e => handleChange(e.target)}
          defaultValue={music.author}
          placeholder="Author"
        />
      </div>
      <div>
        <Label htmlFor="bpm">BPM</Label>
        <Input
          type="number"
          id="bpm"
          name="bpm"
          onChange={e => handleChange(e.target)}
          defaultValue={music.bpm}
          placeholder="BPM"
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        Continue
      </Button>
    </form>
  )
}
