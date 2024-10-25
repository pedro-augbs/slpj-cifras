export async function addMusic({
  name,
  artist,
  author,
  bpm,
  key,
  letter,
}: Music): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/music/add", {
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
    if (response.status === 405) {
      return { success: false, message: "Método não permitido!" }
    }
    if (response.status === 401) {
      return { success: false, message: "Não Autorizado!" }
    }

    return { success: false, message: "Erro Interno do Servidor!" }
  }

  return { success: true, message: "Música adicionada com sucesso!" }
}
