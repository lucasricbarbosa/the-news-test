import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import type { HabitId, HabitsState } from '@/types'
import { deriveHabitsModel, initialHabits, TODAY_LABEL } from '@/data/habits'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { riseItem, revealOnScroll, staggerContainer } from '@/lib/motion'
import { StreakHero } from './StreakHero'
import { DayZeroHero } from './DayZeroHero'
import { CelebrateBanner } from './CelebrateBanner'
import { HabitList } from './HabitList'
import { WeekTrack } from './WeekTrack'
import { CalendarSummary } from './CalendarSummary'
import { HabitsSkeleton } from './states/HabitsSkeleton'

function HabitsContent({ state }: { state: HabitsState }) {
  const [habits, setHabits] = useState(() => initialHabits(state))
  const [celebrationTick, setCelebrationTick] = useState(0)
  const isDayZero = state === 'day-zero'
  const model = deriveHabitsModel(habits, isDayZero)

  const toggle = useCallback((id: HabitId) => {
    let becameDone = false
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        becameDone = !h.done
        return { ...h, done: !h.done }
      }),
    )
    if (becameDone) setCelebrationTick((t) => t + 1)
  }, [])

  const startFirst = useCallback(() => {
    setHabits((prev) => prev.map((h) => (h.id === 'exercicio' ? { ...h, done: true } : h)))
    setCelebrationTick((t) => t + 1)
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-3.5 pb-6">
      <motion.header variants={riseItem} className="flex items-start justify-between px-page pt-3">
        <div>
          <h1 className="text-h1 font-extrabold tracking-tight text-foreground">Seus hábitos</h1>
          <p className="mt-0.5 text-body-sm text-muted-foreground">{TODAY_LABEL}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-[38px] w-[38px] place-items-center rounded-pill border border-hairline bg-muted text-body-sm font-bold text-foreground"
          >
            VS
          </span>
          <Button size="icon" aria-label="Adicionar novo hábito">
            <Icon name="add" size={22} />
          </Button>
        </div>
      </motion.header>

      <motion.div variants={riseItem} className="px-page">
        {model.heroMode === 'day-zero' ? (
          <DayZeroHero onStart={startFirst} />
        ) : (
          <StreakHero model={model} celebrationTick={celebrationTick} />
        )}
      </motion.div>

      {model.celebrate && (
        <motion.div variants={riseItem} className="px-page">
          <CelebrateBanner text={model.celebrateText} />
        </motion.div>
      )}

      <motion.div variants={riseItem} className="px-page">
        <HabitList
          habits={habits}
          doneCount={model.doneCount}
          total={model.total}
          progressPct={model.progressPct}
          onToggle={toggle}
        />
      </motion.div>

      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="px-page"
      >
        <WeekTrack week={model.week} />
      </motion.div>

      <motion.div
        variants={revealOnScroll}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="px-page"
      >
        <CalendarSummary />
      </motion.div>
    </motion.div>
  )
}

export function HabitsScreen({ state }: { state: HabitsState }) {
  if (state === 'loading') return <HabitsSkeleton />
  return <HabitsContent key={state} state={state} />
}
