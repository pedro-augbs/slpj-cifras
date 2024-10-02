export async function getMusic(slug: string): Promise<Music> {
  const response = await fetch(`/api/get-music/${slug}`, {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error("Error while get a music!")
  }

  return response.json()
}
