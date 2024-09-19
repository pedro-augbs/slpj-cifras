import { ModeToggle } from "@/components/mode-toggle"
import { getHarmonicField } from "@/utils/data/harmonic-field"
import { replaceNumbersWithChords } from "@/utils/functions/replaceNumbersWithChords"
// import { useEffect, useState } from "react"

export default function Home() {
  // const [response, setResponse] = useState("")

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/get-harmonic-field")
  //     const data = await response.json()
  //     setResponse(data.message)
  //   }
  //   fetchData()
  // }, [])

  const text = `
[Santo]

[1]
Do barro me criou
[5]
Soprastes tua vida em mim
[1]
Da água viva tu me deu
[5]
E no fogo refinou o meu ser

[6]
Para adorar tu me criou
[1]                            [5]          [4]
Esse é o meu amor, prazer, Senhor
[6]
Ergo minha voz a ti
[1]                        [5]
E com os anjos dizer
[4]
Quem tu és

[1]
Santo! Todo céu adora a ti
[5]                [4]
Santo! Que era, é e há de vir
[1]
Santo! Grandioso Deus, igual não há
[5]          [4]
Santo! Yeshua, Yeshua

[1]
Reunidos já estamos
A tua igreja te espera
[5]
Sopra teu vento impetuoso
[4]
Queremos ver o céu na terra
`

  const replacedText = replaceNumbersWithChords(text, "major", "C")

  return (
    <>
      <ModeToggle />
      <div className="flex flex-col justify-centers p-4">{text}</div>
      <div>{replacedText}</div>
    </>
  )
}
