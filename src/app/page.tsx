"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { getAllMusics } from "@/api/get-all-musics"

import { CardSkeleton } from "@/components/skeletons/card-skeleton"

import { Card } from "@/components/card"
import { ConfigButton } from "@/components/config-button"

import { Input } from "@/components/ui/input"

export default function Home() {
  const [data, setData] = useState<Music[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMusics()
      setData(data.musics)
    }
    fetchData()
  }, [])

  const filteredData = data.filter(music => {
    return (
      music.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim(),
        ) ||
      music.letter
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim(),
        )
    )
  })

  return (
    <>
      <header className="flex items-center justify-center py-4 px-4">
        <div className="flex items-center relative gap-2 w-full max-w-md">
          <Search className="absolute left-2" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </header>
      <div className="flex flex-wrap justify-center gap-4 px-4 py-2">
        {filteredData.map(music => {
          return (
            <Card
              key={music.id}
              name={music.name}
              bpm={music.bpm}
              slug={music.slug}
            />
          )
        })}
      </div>
      <ConfigButton />
    </>
  )
}
