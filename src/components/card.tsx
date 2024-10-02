import Link from "next/link"

interface Props {
  name: string
  bpm?: number
  slug?: string
}

export function Card({ name, bpm, slug }: Props) {
  return (
    <Link
      href={`music/${slug}`}
      className="flex flex-1 items-center justify-between min-w-80 max-w-xl gap-1 rounded-lg bg-primary text-white px-4 py-2 cursor-pointer"
    >
      <span className="text-xl font-bold leading-none">{name}</span>
      <span className="text-xs">{bpm && bpm > 0 ? `${bpm} BPM` : null}</span>
    </Link>
  )
}
