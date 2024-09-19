export type Tonality = "major" | "minor"

interface HarmonicChord {
  [degree: string]: string
}

interface Harmonic {
  scale: string
  chords: HarmonicChord[]
}

const harmonicField: Record<Tonality, Harmonic[]> = {
  major: [
    {
      scale: "A",
      chords: [
        { "1": "A" },
        { "2": "Bm" },
        { "3": "C#m" },
        { "4": "D" },
        { "5": "E" },
        { "6": "F#m" },
        { "7": "G#dim" },
      ],
    },
    {
      scale: "A#",
      chords: [
        { "1": "A#" },
        { "2": "Cm" },
        { "3": "Dm" },
        { "4": "D#" },
        { "5": "F" },
        { "6": "Gm" },
        { "7": "Adim" },
      ],
    },
    {
      scale: "B",
      chords: [
        { "1": "B" },
        { "2": "C#m" },
        { "3": "D#m" },
        { "4": "E" },
        { "5": "F#" },
        { "6": "G#m" },
        { "7": "A#dim" },
      ],
    },
    {
      scale: "C",
      chords: [
        { "1": "C" },
        { "2": "Dm" },
        { "3": "Em" },
        { "4": "F" },
        { "5": "G" },
        { "6": "Am" },
        { "7": "Bdim" },
      ],
    },
    {
      scale: "C#",
      chords: [
        { "1": "C#" },
        { "2": "D#m" },
        { "3": "E#m" },
        { "4": "F#" },
        { "5": "G#" },
        { "6": "A#m" },
        { "7": "B#dim" },
      ],
    },
    {
      scale: "D",
      chords: [
        { "1": "D" },
        { "2": "Em" },
        { "3": "F#m" },
        { "4": "G" },
        { "5": "A" },
        { "6": "Bm" },
        { "7": "C#dim" },
      ],
    },
    {
      scale: "D#",
      chords: [
        { "1": "D#" },
        { "2": "Fm" },
        { "3": "Gm" },
        { "4": "G#" },
        { "5": "A#" },
        { "6": "Cm" },
        { "7": "Ddim" },
      ],
    },
    {
      scale: "E",
      chords: [
        { "1": "E" },
        { "2": "F#m" },
        { "3": "G#m" },
        { "4": "A" },
        { "5": "B" },
        { "6": "C#m" },
        { "7": "D#dim" },
      ],
    },
    {
      scale: "F",
      chords: [
        { "1": "F" },
        { "2": "Gm" },
        { "3": "Am" },
        { "4": "Bb" },
        { "5": "C" },
        { "6": "Dm" },
        { "7": "Edim" },
      ],
    },
    {
      scale: "F#",
      chords: [
        { "1": "F#" },
        { "2": "G#m" },
        { "3": "A#m" },
        { "4": "B" },
        { "5": "C#" },
        { "6": "D#m" },
        { "7": "E#dim" },
      ],
    },
    {
      scale: "G",
      chords: [
        { "1": "G" },
        { "2": "Am" },
        { "3": "Bm" },
        { "4": "C" },
        { "5": "D" },
        { "6": "Em" },
        { "7": "F#dim" },
      ],
    },
    {
      scale: "G#",
      chords: [
        { "1": "G#" },
        { "2": "A#m" },
        { "3": "Cm" },
        { "4": "C#" },
        { "5": "D#" },
        { "6": "Fm" },
        { "7": "Gdim" },
      ],
    },
  ],
  minor: [
    {
      scale: "A",
      chords: [
        { "1": "Am" },
        { "2": "Bdim" },
        { "3": "C" },
        { "4": "Dm" },
        { "5": "Em" },
        { "6": "F" },
        { "7": "G" },
      ],
    },
    {
      scale: "A#",
      chords: [
        { "1": "A#m" },
        { "2": "Cdim" },
        { "3": "C#" },
        { "4": "D#m" },
        { "5": "Fm" },
        { "6": "F#" },
        { "7": "G#" },
      ],
    },
    {
      scale: "B",
      chords: [
        { "1": "Bm" },
        { "2": "C#dim" },
        { "3": "D" },
        { "4": "Em" },
        { "5": "F#m" },
        { "6": "G" },
        { "7": "A" },
      ],
    },
    {
      scale: "C",
      chords: [
        { "1": "Cm" },
        { "2": "Ddim" },
        { "3": "Eb" },
        { "4": "Fm" },
        { "5": "Gm" },
        { "6": "Ab" },
        { "7": "Bb" },
      ],
    },
    {
      scale: "C#",
      chords: [
        { "1": "C#m" },
        { "2": "D#dim" },
        { "3": "E" },
        { "4": "F#m" },
        { "5": "G#m" },
        { "6": "A" },
        { "7": "B" },
      ],
    },
    {
      scale: "D",
      chords: [
        { "1": "Dm" },
        { "2": "Edim" },
        { "3": "F" },
        { "4": "Gm" },
        { "5": "Am" },
        { "6": "Bb" },
        { "7": "C" },
      ],
    },
    {
      scale: "D#",
      chords: [
        { "1": "D#m" },
        { "2": "Fdim" },
        { "3": "F#" },
        { "4": "G#m" },
        { "5": "A#m" },
        { "6": "B" },
        { "7": "C#" },
      ],
    },
    {
      scale: "E",
      chords: [
        { "1": "Em" },
        { "2": "F#dim" },
        { "3": "G" },
        { "4": "Am" },
        { "5": "Bm" },
        { "6": "C" },
        { "7": "D" },
      ],
    },
    {
      scale: "F",
      chords: [
        { "1": "Fm" },
        { "2": "Gdim" },
        { "3": "Ab" },
        { "4": "Bbm" },
        { "5": "Cm" },
        { "6": "Db" },
        { "7": "Eb" },
      ],
    },
    {
      scale: "F#",
      chords: [
        { "1": "F#m" },
        { "2": "G#dim" },
        { "3": "A" },
        { "4": "Bm" },
        { "5": "C#m" },
        { "6": "D" },
        { "7": "E" },
      ],
    },
    {
      scale: "G",
      chords: [
        { "1": "Gm" },
        { "2": "Adim" },
        { "3": "Bb" },
        { "4": "Cm" },
        { "5": "Dm" },
        { "6": "Eb" },
        { "7": "F" },
      ],
    },
    {
      scale: "G#",
      chords: [
        { "1": "G#m" },
        { "2": "A#dim" },
        { "3": "B" },
        { "4": "C#m" },
        { "5": "D#m" },
        { "6": "E" },
        { "7": "F#" },
      ],
    },
  ],
}

export function getHarmonicField(
  tonality: Tonality,
  scale: string,
): Harmonic | undefined {
  return harmonicField[tonality].find(field => field.scale === scale)
}
