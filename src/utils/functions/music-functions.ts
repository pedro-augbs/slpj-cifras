export const notes = [
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

export function transposeCipher(
  cipher: string,
  semitons: number,
  originalIndex: number,
): string {
  const regex = /\[([^\]]+)\]/g

  // /\b([A-G][#b]?((m|M)?(7|maj7|sus4|dim|9\(\d+(\/\d+)?\)|\d+\(\d+(\/\d+)?\))?)\/?[A-G]?[#b]?)(?=\s|$)/g

  return (cipher || "").replace(regex, (_, chord) => {
    const transposed = transposeChord(chord, semitons, originalIndex)
    return transposed
  })
}

function transposeChord(
  chord: string,
  semitons: number,
  originalIndex: number,
): string {
  const chordRegex =
    /^\s*([A-G][#b]?)(m|min)?(7|maj7|sus4|dim|9\(\d+(\/\d+)?\)|\d+\(\d+(\/\d+)?\))?\/?([A-G][#b]?)?\s*$/

  const parts = chord.split("/")

  if (!chordRegex.test(parts[0])) {
    if (chord.length > 1) {
      return `[${chord}]`
    }
    return chord
  }
  const notePrincipal = parts[0].match(/[A-G][#b]?/g)?.[0] // Captura a note principal
  const resto = parts[0].replace(notePrincipal || "", "") // Captura o resto do acorde

  // Manter o símbolo de menor (m)
  const isMenor = resto.includes("m") || resto.includes("min") ? "m" : ""

  const newChord =
    transposeNote(notePrincipal || "", semitons, originalIndex) +
    isMenor +
    resto.replace(/m|min/, "") // Remove 'm' ou 'min' da parte do acorde, se existir

  if (parts.length > 1) {
    const baixo = parts[1]
    return `<span class="text-primary">${newChord}/${transposeNote(baixo, semitons, originalIndex)}</span>`
  }

  return `<span class="text-primary">${newChord}</span>`
}

function transposeNote(
  note: string,
  semitons: number,
  originalIndex: number,
): string {
  const index = notes.indexOf(note)
  if (index === -1) return note // Retorna a note original se não encontrada

  const newIndex =
    (index - originalIndex + semitons + notes.length) % notes.length
  return notes[newIndex]
}
