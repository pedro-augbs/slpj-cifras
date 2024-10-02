export const notas = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
]

function transporNota(nota: string, semitons: number): string {
  const index = notas.indexOf(nota)
  if (index === -1) return nota // Retorna a nota original se não encontrada

  const novoIndex = (index + semitons + notas.length) % notas.length
  return notas[novoIndex]
}

function transporAcorde(acorde: string, semitons: number): string {
  const parts = acorde.split("/")
  const notaPrincipal = parts[0].match(/[A-G][#b]?/g)?.[0] // Captura a nota principal
  const resto = parts[0].replace(notaPrincipal || "", "") // Captura o resto do acorde

  // Manter o símbolo de menor (m)
  const isMenor = resto.includes("m") || resto.includes("min") ? "m" : ""

  const novoAcorde =
    transporNota(notaPrincipal || "", semitons) +
    isMenor +
    resto.replace(/m|min/, "") // Remove 'm' ou 'min' da parte do acorde, se existir

  if (parts.length > 1) {
    const baixo = parts[1]
    return `${novoAcorde}/${transporNota(baixo, semitons)}`
  }

  return novoAcorde
}

export function transporCifra(cifra: string, semitons: number): string {
  const regex =
    /\b([A-G][#b]?((m|M)?(7|maj7|sus4|dim|9\(\d+(\/\d+)?\)|\d+\(\d+(\/\d+)?\))?)\/?[A-G]?[#b]?)(?=\s|$)/g

  return cifra.replace(regex, match => {
    const transposto = transporAcorde(match, semitons)
    return `<span class="text-primary">${transposto}</span>`
  })
}
