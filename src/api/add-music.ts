export async function addMusic({
  name,
  artist,
  author,
  bpm,
  key,
  letter,
}: Music): Promise<void> {
  const response = await fetch("/api/add-music", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      artist,
      author,
      bpm,
      key,
      letter,
    }),
  })

  if (!response.ok) {
    throw new Error("Error while adding a music!")
  }
}
