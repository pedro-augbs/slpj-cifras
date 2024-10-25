import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"

export const Metronome = () => {
  const [bpm, setBpm] = useState(120)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeSignature, setTimeSignature] = useState(4) // Estado para o compasso
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const beatCounter = useRef(0)

  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    audioContextRef.current = new (
      window.AudioContext || (window as Window & typeof globalThis).AudioContext
    )()
  }, [])

  const playClick = async () => {
    const audioContext = audioContextRef.current
    if (audioContext) {
      if (audioContext.state === "suspended") {
        await audioContext.resume()
      }

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Diferencia o som da primeira batida do compasso
      if (beatCounter.current === 0) {
        oscillator.frequency.value = 1500 // Frequência mais alta para a primeira batida
      } else {
        oscillator.frequency.value = 1000 // Frequência padrão para as outras batidas
      }

      oscillator.type = "sine"

      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.1,
      )
      oscillator.stop(audioContext.currentTime + 0.1)

      // Incrementa o contador de batidas e reinicia ao alcançar o número de batidas por compasso
      beatCounter.current = (beatCounter.current + 1) % timeSignature
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      beatCounter.current = 0 // Reinicia o contador de batidas quando o metrônomo começa
    }
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000
      intervalRef.current = setInterval(playClick, interval)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, bpm])

  return (
    <div>
      <h1>Metrônomo</h1>
      <div>
        <label htmlFor="bpm">BPM: </label>
        <input
          id="bpm"
          type="number"
          value={bpm}
          onChange={e => setBpm(Number.parseInt(e.target.value))}
          min="30"
          max="240"
        />
      </div>
      <div>
        <label htmlFor="timeSignature">Compasso (batidas por compasso): </label>
        <select
          id="timeSignature"
          value={timeSignature}
          onChange={e => setTimeSignature(Number.parseInt(e.target.value))}
        >
          <option value="2">2/4</option>
          <option value="3">3/4</option>
          <option value="4">4/4</option>
          <option value="6">6/8</option>
        </select>
      </div>
      <Button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</Button>
    </div>
  )
}
