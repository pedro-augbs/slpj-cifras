"use client"

import { notFound } from "next/navigation"

import { useMusicStore } from "@/store/music-store"
import { AddMusicForm } from "@/components/forms/add-music-form"

export default function AddMusicPage() {
  const { music } = useMusicStore()

  if (!music.name) {
    notFound()
  }

  return (
    <main className="space-y-8 p-4">
      <h1 className="text-4xl font-bold text-center">{music.name}</h1>
      <AddMusicForm />
    </main>
  )
}
