import type { DeviceId } from '@/types'
import { DEVICES } from '@/lib/constants'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

export interface DevicePreviewProps {
  device: DeviceId
  onChange: (device: DeviceId) => void
  className?: string
}

export function DevicePreview({ device, onChange, className }: DevicePreviewProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Pré-visualizar dispositivo (demo)"
      className={cn('flex items-center gap-1 rounded-pill border border-hairline bg-card p-1', className)}
    >
      {DEVICES.map((d) => {
        const active = d.id === device
        return (
          <button
            key={d.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={d.label}
            title={d.label}
            onClick={() => onChange(d.id)}
            className={cn(
              'grid h-9 w-9 place-items-center rounded-pill transition-colors',
              active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            <Icon name={d.icon} size={d.id === 'phone-sm' ? 15 : 18} />
          </button>
        )
      })}
    </div>
  )
}
