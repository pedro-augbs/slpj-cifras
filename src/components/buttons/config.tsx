"use client"

import { motion } from "framer-motion"
import { Settings, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

import { AddMusic } from "@/components/buttons/add-music"
import { Logout } from "@/components/buttons/logout"
import { ModeToggle } from "@/components/buttons/mode-toggle"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Config() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const isAdmin = session?.user.role === "admin"

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
      <CollapsibleContent forceMount asChild>
        <motion.div
          key={String(isOpen)}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="data-[state=closed]:hidden absolute bottom-16 flex flex-col gap-2"
        >
          <ModeToggle />
          <Logout />
          {isAdmin && <AddMusic />}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  )
}
