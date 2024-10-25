import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Return() {
  return (
    <Button
      className="absolute top-4 left-4 z-50"
      variant={"ghost"}
      size={"icon"}
      asChild
    >
      <Link href={"/"}>
        <ChevronLeft size={36} />
      </Link>
    </Button>
  )
}
