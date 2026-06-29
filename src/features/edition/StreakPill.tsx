import { AnimatePresence, motion } from 'motion/react'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { springPop } from '@/lib/motion'

export interface StreakPillProps {
  streak: number
  note: string
  registered: boolean
}

export function StreakPill({ streak, note, registered }: StreakPillProps) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      initial={false}
      animate={reduced ? {} : { scale: registered ? [1, 1.06, 1] : 1 }}
      transition={springPop}
      className="inline-flex items-center gap-2.5 rounded-pill border border-hairline bg-card py-1.5 pl-3 pr-3.5"
    >
      <Flame size={17} fill="url(#brand-grad)" stroke="url(#brand-grad)" strokeWidth={1.5} aria-hidden />
      <span className="relative inline-flex min-w-[0.8ch] justify-center text-body-sm font-extrabold text-foreground">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={streak}
            initial={reduced ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -10, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {streak}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="h-3 w-px bg-border" aria-hidden />
      <span className={cn('text-caption font-semibold', registered ? 'text-success' : 'text-muted-foreground')}>
        {note}
      </span>
    </motion.span>
  )
}
