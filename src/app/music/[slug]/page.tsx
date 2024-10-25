"use client"

import { Suspense, useState } from "react"
import { notFound, redirect, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import { notes, transposeCipher } from "@/utils/functions/music-functions"

import { Return } from "@/components/buttons/return"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Pen, Trash } from "lucide-react"

export default function Music() {
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

  const normalizeNote = (note: string) => note.replace("m", "")

  const includesMinor = (note: string | undefined) =>
    data.key.includes("m") ? `${note}m` : note

  const [selectedNote, setSelectedNote] = useState(
    notes.indexOf(normalizeNote(data.key)).toString(),
  )

  return (
    <main className="flex flex-col items-center gap-4 py-8 px-4">
      <Suspense fallback={<div className="text-black">carregando...</div>}>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">{data.name}</h1>
          <h2 className="text-xl text-primary font-semibold text-center">
            {data.artist}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"}>
              {includesMinor(
                notes.find((_, index) => index === Number(selectedNote)),
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <RadioGroup
              defaultValue={notes.indexOf(normalizeNote(data.key)).toString()}
              onValueChange={setSelectedNote}
              className="grid grid-flow-row grid-cols-6 gap-3 p-1"
            >
              {notes.map((note, index) => (
                <div key={note}>
                  <RadioGroupItem
                    value={index.toString()}
                    id={index.toString()}
                    className="hidden"
                  />
                  <Button
                    size={"icon"}
                    variant={
                      normalizeNote(data.key) === normalizeNote(note)
                        ? "secondary"
                        : "outline"
                    }
                    data-checked={
                      selectedNote === index.toString() ? "true" : "false"
                    }
                    className="data-[checked=true]:bg-primary/100"
                    asChild
                  >
                    <Label
                      htmlFor={index.toString()}
                      className="cursor-pointer m-0"
                    >
                      {includesMinor(note)}
                    </Label>
                  </Button>
                </div>
              ))}
            </RadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <pre
          className="tracking-tight leading-snug w-full max-w-xl"
          dangerouslySetInnerHTML={{
            __html: transposeCipher(
              data.letter,
              Number(selectedNote),
              notes.indexOf(normalizeNote(data.key)),
            ),
          }}
        />
        {isAdmin && (
          <div className="absolute top-4 right-4 space-x-2">
            <Button size={"icon"} className="p-2 size-fit" onClick={() => {}}>
              <Pen size={28} />
            </Button>
            <Button
              size={"icon"}
              variant={"destructive"}
              className="p-2 size-fit"
              onClick={async () => {
                await api
                  .delete(`/api/music/delete/${slug}`)
                  .then(res => res.data)
                redirect("/")
              }}
            >
              <Trash size={28} />
            </Button>
          </div>
        )}
      </Suspense>
      <Return />
    </main>
  )
}
