import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PillProps {
  children: ReactNode
  className?: string
}

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-hairline bg-card px-3 py-1.5',
        className,
      )}
    >
      {children}
    </span>
  )
}
