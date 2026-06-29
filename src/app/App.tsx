import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { EditionState, HabitsState, ScreenId } from '@/types'
import { EDITION_STATES, HABITS_STATES } from '@/lib/constants'
import { StateSwitcher } from '@/components/StateSwitcher'
import { DevicePreview } from '@/components/DevicePreview'
import { SvgDefs } from '@/components/SvgDefs'
import { HabitsScreen } from '@/features/habits/HabitsScreen'
import { EditionScreen } from '@/features/edition/EditionScreen'
import { useDevicePreview } from '@/hooks/useDevicePreview'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { screenTransition } from '@/lib/motion'
import { DemoControls } from './DemoControls'
import { DeviceFrame } from './DeviceFrame'

const SCREEN_ORDER: ScreenId[] = ['habitos', 'edicao']

export function App() {
  const reduced = useReducedMotion()
  const { device, setDevice, preset } = useDevicePreview()
  const [screen, setScreen] = useState<ScreenId>('habitos')
  const [direction, setDirection] = useState(1)
  const [habitsState, setHabitsState] = useState<HabitsState>('default')
  const [editionState, setEditionState] = useState<EditionState>('default')

  const navigate = (next: ScreenId) => {
    if (next === screen) return
    setDirection(SCREEN_ORDER.indexOf(next) > SCREEN_ORDER.indexOf(screen) ? 1 : -1)
    setScreen(next)
  }

  const condensedTitle = screen === 'habitos' ? 'Seus hábitos' : 'the news'

  return (
    <div className="min-h-dvh overflow-x-clip bg-background text-foreground">
      <SvgDefs />
      <DemoControls device={device} onDeviceChange={setDevice} />

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-page py-5 sm:py-7">
        <div className="flex w-full min-w-0 flex-col gap-3" style={{ maxWidth: preset.maxWidth }}>
          <DevicePreview device={device} onChange={setDevice} className="self-start sm:hidden" />
          {screen === 'habitos' ? (
            <StateSwitcher options={HABITS_STATES} value={habitsState} onChange={setHabitsState} />
          ) : (
            <StateSwitcher options={EDITION_STATES} value={editionState} onChange={setEditionState} />
          )}
        </div>

        <div
          className="w-full min-w-0 transition-[max-width] duration-300 ease-spring"
          style={{ maxWidth: preset.maxWidth }}
        >
          <DeviceFrame device={device} title={condensedTitle} active={screen} onNavigate={navigate}>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={screen}
                custom={direction}
                variants={reduced ? undefined : screenTransition}
                initial="enter"
                animate="center"
                exit="exit"
                className="mx-auto w-full min-w-0 max-w-[460px]"
              >
                {screen === 'habitos' ? (
                  <HabitsScreen state={habitsState} />
                ) : (
                  <EditionScreen state={editionState} />
                )}
              </motion.div>
            </AnimatePresence>
          </DeviceFrame>
        </div>
      </main>
    </div>
  )
}
