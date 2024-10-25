import { Plus } from "lucide-react"

import { AddPartialMusicForm } from "@/components/forms/add-partial-music-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddMusic() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} className="rounded-full size-fit p-2">
          <Plus size={36} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Music</DialogTitle>
          <DialogDescription className="sr-only">
            Form to add music
          </DialogDescription>
          <AddPartialMusicForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
