import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import type { Habit } from '@/types'
import type { IconName } from '@/lib/icons'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { springPop } from '@/lib/motion'

export interface HabitRowProps {
  habit: Habit
  onToggle: (id: Habit['id']) => void
}

export function HabitRow({ habit, onToggle }: HabitRowProps) {
  const reduced = useReducedMotion()
  const { done } = habit
  const sub = done ? `🔥 ${habit.streak} dias seguidos` : 'Tocar para registrar'

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={`${habit.label} — ${done ? 'concluído' : 'tocar para registrar'}`}
      onClick={() => onToggle(habit.id)}
      className={cn(
        'flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors',
        done ? 'border-primary/45 bg-primary/10' : 'border-hairline bg-muted hover:bg-secondary',
      )}
    >
      <span
        className={cn(
          'grid h-10 w-10 flex-none place-items-center rounded-md transition-colors',
          done ? 'bg-[color:var(--brand-icon-bg)] text-primary' : 'bg-card text-muted-foreground',
        )}
      >
        <Icon name={habit.icon as IconName} size={22} fill={done ? 'currentColor' : 'none'} strokeWidth={done ? 0 : 2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-body font-bold text-foreground">{habit.label}</span>
        <span className={cn('mt-0.5 block text-caption font-semibold', done ? 'text-primary' : 'text-faint')}>
          {sub}
        </span>
      </span>

      <motion.span
        key={done ? 'on' : 'off'}
        initial={reduced || !done ? false : { scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={springPop}
        className={cn(
          'grid h-[30px] w-[30px] flex-none place-items-center rounded-pill border-2',
          done ? 'border-primary bg-primary text-primary-foreground' : 'border-faint bg-transparent',
        )}
      >
        {done && <Check size={18} strokeWidth={3} aria-hidden />}
      </motion.span>
    </button>
  )
}
