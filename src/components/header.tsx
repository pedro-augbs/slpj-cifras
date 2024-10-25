import { Search } from "lucide-react"
import { Input } from "./ui/input"

interface Props {
  search: string
  setSearch: (value: string) => void
}

export function Header({ search, setSearch }: Props) {
  return (
    <header className="flex items-center justify-center py-4 px-4">
      <div className="flex items-center relative gap-2 w-full max-w-md">
        <Search className="absolute left-2" />
        <Input
          type="search"
          placeholder="Search"
          className="pl-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </header>
  )
}
