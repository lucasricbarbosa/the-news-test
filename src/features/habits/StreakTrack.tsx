import type { TrackDay } from '@/types'
import { cn } from '@/lib/utils'

export function StreakTrack({ track }: { track: TrackDay[] }) {
  return (
    <ul className="flex gap-1.5" aria-label="Últimos 7 dias da sequência">
      {track.map((day, i) => (
        <li key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <span
            className={cn(
              'h-6 w-full rounded-md border',
              day.filled
                ? 'border-transparent bg-brand-gradient'
                : day.isToday
                  ? 'border-dashed border-primary bg-transparent'
                  : 'border-border bg-transparent',
            )}
          />
          <span className={cn('text-[10px] font-bold', day.isToday ? 'text-primary' : 'text-faint')}>
            {day.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
