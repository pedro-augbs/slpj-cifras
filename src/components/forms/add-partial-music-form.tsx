"use client"

import { useActionState } from "react"

import { validatePartialMusicAction } from "@/actions/validate-partial-music-action"

import { useMusicStore } from "@/store/music-store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export function AddPartialMusicForm() {
  const { music, saveInput } = useMusicStore()

  const [result, action, isPending] = useActionState(
    validatePartialMusicAction,
    null,
  )

  function handleChange(input: HTMLInputElement) {
    const data = { [input.name]: input.value }
    saveInput(data)
  }

  if (result?.success) {
    toast.success(result?.message)
    redirect("/add-music")
  }

  return (
    <form action={action} className="flex flex-col gap-2 text-left">
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
      {!result?.success && <span>{result?.message}</span>}
      <Button type="submit" disabled={isPending}>
        Continue
      </Button>
    </form>
  )
}
