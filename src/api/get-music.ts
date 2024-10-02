export async function getMusic(slug: string): Promise<Music> {
  const response = await fetch(`http://localhost:3000/api/get-music/${slug}`, {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error("Error while get all musics!")
  }

  return response.json()
}
