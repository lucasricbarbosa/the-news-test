import type { Habit } from '@/types'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ProgressBar'
import { HabitRow } from './HabitRow'

export interface HabitListProps {
  habits: Habit[]
  doneCount: number
  total: number
  progressPct: number
  onToggle: (id: Habit['id']) => void
}

export function HabitList({ habits, doneCount, total, progressPct, onToggle }: HabitListProps) {
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-body font-extrabold text-foreground">Hábitos de hoje</h2>
        <span className="text-body-sm font-bold text-muted-foreground">
          {doneCount} de {total} concluídos
        </span>
      </div>
      <ProgressBar value={progressPct} label={`${doneCount} de ${total} hábitos concluídos`} className="mb-3.5" />
      <div className="flex flex-col gap-2">
        {habits.map((habit) => (
          <HabitRow key={habit.id} habit={habit} onToggle={onToggle} />
        ))}
      </div>
    </Card>
  )
}
