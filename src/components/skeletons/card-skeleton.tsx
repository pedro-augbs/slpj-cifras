import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <Skeleton className="flex flex-1 items-center justify-between min-w-80 max-w-xl gap-1 rounded-lg bg-primary text-white px-4 py-2">
      <Skeleton className="h-5 w-2/5 bg-white/50" />
    </Skeleton>
  )
}
