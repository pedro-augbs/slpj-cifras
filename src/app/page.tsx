"use client"

import { useQuery } from "@tanstack/react-query"
import { Suspense, useState } from "react"
import { useDebounce } from "use-debounce"

import { api } from "@/lib/axios"

import { Card } from "@/components/card"
import { Header } from "@/components/header"

import { Config } from "@/components/buttons/config"

import { CardSkeleton } from "@/components/skeletons/card-skeleton"

export default function Home() {
  const [search, setSearch] = useState("")
  const [value] = useDebounce(search, 500)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["music", value],
    queryFn: async (): Promise<Music[]> => {
      return await api
        .get("/api/music/get-all", { params: { search: value } })
        .then(res => res.data)
    },
  })

  if (!data) {
    return <div>not found</div>
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar as músicas.</div>
  }

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <div className="flex flex-wrap justify-center gap-4 px-4 py-2">
        {isLoading && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
        {data.length > 0 ? (
          data.map(music => (
            <Card
              key={music.id}
              name={music.name}
              artist={music.artist}
              bpm={music.bpm}
              slug={music.slug}
            />
          ))
        ) : (
          <p>Nenhuma música encontrada!</p>
        )}
      </div>
      <Config />
    </>
  )
}
