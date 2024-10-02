import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Props {
  music: {
    name: string
    artist: string
    author: string
    bpm: number
    key: string
    letter: string
  }
  saveInput: (data: { [key: string]: string }) => void
  reset: () => void
}

export const useMusicStore = create<Props>()(
  persist<Props>(
    set => ({
      music: {
        name: "",
        artist: "",
        author: "",
        bpm: 0,
        key: "",
        letter: "",
      },
      saveInput: data =>
        set(state => ({
          music: { ...state.music, ...data },
        })),
      reset: () =>
        set(() => ({
          music: {
            name: "",
            artist: "",
            author: "",
            bpm: 0,
            key: "",
            letter: "",
          },
        })),
    }),
    {
      name: "slpj-cifras:store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
