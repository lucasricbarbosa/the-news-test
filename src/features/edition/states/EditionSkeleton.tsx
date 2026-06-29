import { Skeleton } from '@/components/Skeleton'

export function EditionSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-page py-4" aria-busy="true" aria-label="Carregando edição">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="mt-3 h-10 w-3/5 rounded-pill" />
      <Skeleton className="mt-5 h-8 w-[90%]" />
      <Skeleton className="h-8 w-[70%]" />
      <div className="mt-5 flex flex-col gap-3">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/5" />
      </div>
    </div>
  )
}
