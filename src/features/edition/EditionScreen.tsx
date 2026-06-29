import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { EditionState, RegisterState } from '@/types'
import { PILL_STREAK_BASE, registerStateFor } from '@/data/edition'
import { riseItem, staggerContainer } from '@/lib/motion'
import { EditionHeader } from './EditionHeader'
import { StreakPill } from './StreakPill'
import { Reader } from './Reader'
import { RegisterCTA } from './RegisterCTA'
import { EditionSkeleton } from './states/EditionSkeleton'

const SCROLL_TO_END: EditionState[] = ['end', 'success', 'error']

function EditionContent({ state }: { state: EditionState }) {
  const [regState, setRegState] = useState<RegisterState>(() => registerStateFor(state))
  const ctaRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number>(0)

  useEffect(() => {
    if (SCROLL_TO_END.includes(state)) {
      ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [state])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const register = useCallback(() => {
    setRegState('loading')
    timer.current = window.setTimeout(() => setRegState('done'), 900)
  }, [])

  const registered = regState === 'done'
  const streak = registered ? PILL_STREAK_BASE + 1 : PILL_STREAK_BASE

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show">
      <motion.div variants={riseItem}>
        <EditionHeader />
      </motion.div>

      <motion.div variants={riseItem} className="px-page pt-2.5">
        <StreakPill
          streak={streak}
          registered={registered}
          note={registered ? 'leitura registrada' : '+1 ao registrar'}
        />
      </motion.div>

      <motion.div variants={riseItem}>
        <Reader />
      </motion.div>

      <div ref={ctaRef}>
        <RegisterCTA state={regState} streak={streak} onRegister={register} />
      </div>
    </motion.div>
  )
}

export function EditionScreen({ state }: { state: EditionState }) {
  if (state === 'loading') return <EditionSkeleton />
  return <EditionContent key={state} state={state} />
}
