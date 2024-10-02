import { Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AddPartialMusicForm } from "./forms/add-partial-music-form"

export function AddMusicButton() {
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
          <DialogDescription asChild>
            <AddPartialMusicForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
