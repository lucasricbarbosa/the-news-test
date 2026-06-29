import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT } from '@/lib/motion'

export interface ProgressBarProps {
  value: number
  label?: string
  className?: string
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const reduced = useReducedMotion()
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-pill bg-muted', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <motion.div
        className="h-full rounded-pill bg-primary"
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT }}
      />
    </div>
  )
}
