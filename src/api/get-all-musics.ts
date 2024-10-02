export async function getAllMusics(): Promise<{ musics: Music[] }> {
  const response = await fetch(
    "https://cifrassemlimites.vercel.app/api/get-all-musics",
    {
      method: "GET",
    },
  )

  if (!response.ok) {
    throw new Error("Error while get all musics!")
  }

  return response.json()
}
