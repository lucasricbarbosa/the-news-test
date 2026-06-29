import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Signal, Wifi, BatteryFull } from 'lucide-react'
import type { DeviceId, ScreenId } from '@/types'
import { BottomNav } from '@/components/BottomNav'
import { useScrollCondense } from '@/hooks/useScrollCondense'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export interface DeviceFrameProps {
  device: DeviceId
  title: string
  active: ScreenId
  onNavigate: (screen: ScreenId) => void
  children: ReactNode
}

export function DeviceFrame({ device, title, active, onNavigate, children }: DeviceFrameProps) {
  const reduced = useReducedMotion()
  const { ref, condensed } = useScrollCondense<HTMLDivElement>(28)
  const isPhone = device !== 'desktop'

  return (
    <div
      className={cn(
        'flex h-[82dvh] max-h-[920px] min-h-[560px] w-full flex-col overflow-hidden border border-hairline bg-background shadow-hero',
        isPhone ? 'rounded-[2.25rem]' : 'rounded-card',
      )}
    >
      {isPhone && (
        <div className="flex h-10 flex-none items-center justify-between px-6 text-foreground">
          <span className="text-body-sm font-bold">9:41</span>
          <span className="flex items-center gap-1.5">
            <Signal size={15} aria-hidden />
            <Wifi size={15} aria-hidden />
            <BatteryFull size={17} aria-hidden />
          </span>
        </div>
      )}

      <div className="relative flex-1 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ opacity: condensed ? 1 : 0, y: condensed ? 0 : -8 }}
          transition={reduced ? { duration: 0 } : { duration: 0.2 }}
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-hairline bg-background/90 px-page py-2.5 backdrop-blur',
            condensed ? 'pointer-events-auto' : '',
          )}
        >
          <span className="text-body-sm font-extrabold text-foreground">{title}</span>
        </motion.div>

        <div ref={ref} className="no-scrollbar h-full overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>

      <BottomNav active={active} onNavigate={onNavigate} />
    </div>
  )
}
