test("get-harmonic-field", async () => {
  const response = await fetch("http://localhost:3000/api/get-harmonic-field", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tonality: "major",
      scale: "A",
    }),
  })
  const data = await response.json()

  expect(data).toEqual({
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
  })
})
