"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"

import { getMusic } from "@/api/get-music"

import { notas, transporCifra } from "@/utils/functions/music-functions"

import { ReturnButton } from "@/components/return-button"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function MusicPage() {
  const params = useParams()
  const [data, setData] = useState<Music>()
  const [selectedNota, setSelectedNota] = useState("")

  if (!params) {
    notFound()
  }

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMusic(slug)

      setData(data)
      setSelectedNota(notas.indexOf(data.key).toString())
    }

    fetchData()
  }, [slug])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex flex-col items-center gap-4 py-8 px-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <h2 className="text-xl text-primary font-semibold">{data.artist}</h2>
      </div>
      <RadioGroup
        defaultValue={notas.indexOf(data.key).toString()}
        onValueChange={setSelectedNota}
        className="flex flex-wrap gap-2 max-w-sm items-center justify-center"
      >
        {notas.map((nota, index) => (
          <div key={nota}>
            <RadioGroupItem
              value={index.toString()}
              id={index.toString()}
              className="hidden"
            />
            <Button
              size={"icon"}
              variant={data.key === nota ? "secondary" : "outline"}
              data-checked={
                selectedNota === index.toString() ? "true" : "false"
              }
              className="data-[checked=true]:bg-primary/100"
              asChild
            >
              <Label htmlFor={index.toString()} className="cursor-pointer p-4">
                {nota}
              </Label>
            </Button>
          </div>
        ))}
      </RadioGroup>
      <pre
        className="tracking-tight leading-snug w-full max-w-xl"
        dangerouslySetInnerHTML={{
          __html: transporCifra(data.letter, Number(selectedNota)),
        }}
      />
      <ReturnButton />
    </main>
  )
}
