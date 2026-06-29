import { motion } from 'motion/react'
import type { ScreenId } from '@/types'
import { NAV_ITEMS } from '@/lib/constants'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface BottomNavProps {
  active: ScreenId
  onNavigate: (screen: ScreenId) => void
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const reduced = useReducedMotion()

  return (
    <nav
      aria-label="Navegação principal"
      className="flex flex-none border-t border-hairline bg-background px-1.5 pb-3 pt-2"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.linked && item.id === active
        const interactive = item.linked
        return (
          <button
            key={item.id}
            type="button"
            disabled={!interactive}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            onClick={interactive ? () => onNavigate(item.id as ScreenId) : undefined}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-1 rounded-md py-1.5 text-[10px] font-bold transition-colors',
              isActive ? 'text-primary' : 'text-faint',
              interactive ? 'cursor-pointer hover:text-foreground' : 'cursor-default opacity-70',
            )}
          >
            <Icon name={item.icon} size={23} fill={isActive ? 'currentColor' : 'none'} strokeWidth={isActive ? 2 : 1.75} />
            <span className="lowercase">{item.label}</span>
            {isActive && (
              <motion.span
                layoutId={reduced ? undefined : 'nav-active'}
                className="absolute -top-0.5 h-1 w-1 rounded-pill bg-primary"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
