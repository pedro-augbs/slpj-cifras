import { getHarmonicField, type Tonality } from "@/utils/data/harmonic-field"

export function replaceNumbersWithChords(
  text: string,
  tonality: string,
  scale: string,
) {
  const harmonic = getHarmonicField(tonality as Tonality, scale)
  if (!harmonic) {
    console.error("Harmonic field not found!")
    return text
  }

  let replacedText = text

  for (let i = 0; i < harmonic.chords.length; i++) {
    const chord = harmonic.chords[i]
    const [degree, chordName] = Object.entries(chord)[0]
    const regex = new RegExp(`\\[${degree}\\]`, "g")
    replacedText = replacedText.replace(regex, chordName)
  }

  console.log(replacedText)

  return replacedText
}
