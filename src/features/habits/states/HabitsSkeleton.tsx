import { Skeleton } from '@/components/Skeleton'

export function HabitsSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-page py-4" aria-busy="true" aria-label="Carregando hábitos">
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-[150px] rounded-card" />
      <Skeleton className="h-[18px] w-2/5" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-[62px] rounded-md" />
        <Skeleton className="h-[62px] rounded-md" />
        <Skeleton className="h-[62px] rounded-md" />
        <Skeleton className="h-[62px] rounded-md" />
      </div>
    </div>
  )
}
