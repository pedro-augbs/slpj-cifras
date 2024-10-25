import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { notes } from "@/utils/functions/music-functions"
import { useState } from "react"

interface Props {
  defaultNote: string
  onNoteChange: (selectedNote: string) => void
}

export const NotesDropdown = ({ defaultNote, onNoteChange }: Props) => {
  const [selectedNote, setSelectedNote] = useState(
    notes.indexOf(defaultNote).toString(),
  )

  const handleNoteChange = (value: string) => {
    setSelectedNote(value)
    onNoteChange(notes[Number(value)])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"}>
          {notes.find((_, index) => index === Number(selectedNote))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RadioGroup
          defaultValue={selectedNote}
          onValueChange={handleNoteChange}
          className="grid grid-rows-2 grid-flow-col gap-3 p-1"
        >
          {notes.map((note, index) => (
            <div key={note}>
              <RadioGroupItem
                value={index.toString()}
                id={index.toString()}
                className="hidden"
              />
              <Button
                size={"icon"}
                variant={defaultNote === note ? "secondary" : "outline"}
                data-checked={
                  selectedNote === index.toString() ? "true" : "false"
                }
                className="data-[checked=true]:bg-primary/100"
                asChild
              >
                <Label
                  htmlFor={index.toString()}
                  className="cursor-pointer m-0"
                >
                  {note}
                </Label>
              </Button>
            </div>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
