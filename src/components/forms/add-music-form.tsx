"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { toast } from "sonner"

import { useMusicStore } from "@/store/music-store"

import { notas } from "@/utils/functions/music-functions"

import { addMusicAction } from "@/actions/add-music-action"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function AddMusicForm() {
  const { music, saveInput, reset } = useMusicStore()
  const [tone, setTone] = useState<"major" | "minor">(
    music.key.includes("m") ? "minor" : "major",
  )

  const [result, action, isPending] = useActionState(addMusicAction, null)

  function handleSubmit(data: FormData) {
    const fullData = {
      ...music,
      ...Object.fromEntries(data.entries()),
    }

    console.log(fullData)

    action(fullData)
  }

  if (result?.success) {
    reset()
    toast.success(result.message)
    redirect("")
  }

  function handleSelect(field: string, selectedValue: string) {
    saveInput({ [field]: selectedValue })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Select
          required
          defaultValue="major"
          onValueChange={value => setTone(value as "major" | "minor")}
        >
          <SelectTrigger className="min-w-80 flex-1">
            <SelectValue placeholder="Selecione a Tonalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="major">Maior (M)</SelectItem>
            <SelectItem value="minor">Menor (m)</SelectItem>
          </SelectContent>
        </Select>
        <Select
          name="key"
          onValueChange={value => handleSelect("key", value)}
          disabled={!tone}
          required
        >
          <SelectTrigger className="min-w-80 flex-1">
            <SelectValue placeholder="Selecione o Tom" />
          </SelectTrigger>
          <SelectContent defaultValue={music.key}>
            {notas.map(nota => (
              <SelectItem key={nota} value={nota}>
                {tone === "major" ? nota : `${nota}m`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="letter">Letra</Label>
        <Textarea
          className="min-h-screen resize-y"
          id="letter"
          name="letter"
          placeholder="Letra"
          required
        />
      </div>
      <span className="text-center">
        Tenha certeza de colocar os acordes corretos!
      </span>
      {!result?.success && (
        <span className="text-center">{result?.message}</span>
      )}
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <Button
          variant={"destructive"}
          size={"lg"}
          className="w-full sm:w-3/14"
          asChild
        >
          <Link href={"/"}>
            <ChevronLeft size={36} />
          </Link>
        </Button>
        <Button
          type="submit"
          size={"lg"}
          className="w-full"
          disabled={isPending}
        >
          Adicionar Música
        </Button>
      </div>
    </form>
  )
}
