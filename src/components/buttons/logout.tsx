import { Power } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Logout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          className="rounded-full size-fit p-2"
        >
          <Power size={36} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Tem Certeza?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Dialog to confirm logout
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={"lg"} className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            size={"lg"}
            variant={"destructive"}
            onClick={() => signOut()}
            className="w-full"
          >
            Desconectar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
