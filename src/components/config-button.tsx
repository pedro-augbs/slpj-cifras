"use client"

import { Settings, X } from "lucide-react"

import { AddMusicButton } from "@/components/add-music-button"
import { ModeToggle } from "@/components/mode-toggle"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ConfigButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="fixed bottom-6 right-6"
    >
      <CollapsibleTrigger asChild>
        <Button size={"icon"} className="rounded-full size-fit p-2">
          <Settings
            size={36}
            data-open={isOpen}
            className="rotate-0 scale-100 transition-all data-[open=true]:-rotate-90 data-[open=true]:scale-0 "
          />
          <X
            size={36}
            data-open={isOpen}
            className="absolute rotate-90 scale-0 transition-all data-[open=true]:scale-100 data-[open=true]:rotate-0"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute bottom-16 flex flex-col gap-2">
        <ModeToggle />
        <AddMusicButton />
      </CollapsibleContent>
    </Collapsible>
  )
}
