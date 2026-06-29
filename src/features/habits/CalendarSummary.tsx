import { Icon } from '@/components/Icon'

export function CalendarSummary() {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3.5 rounded-card border border-hairline bg-card p-4 text-left transition-colors hover:bg-muted"
    >
      <span className="grid h-10 w-10 flex-none place-items-center rounded-md bg-muted text-muted-foreground">
        <Icon name="calendar" size={21} />
      </span>
      <span className="flex-1">
        <span className="block text-[11px] font-extrabold tracking-wide text-faint">CALENDÁRIO</span>
        <span className="block text-body-sm font-extrabold text-foreground">Junho · 1 dia perfeito</span>
      </span>
      <span className="flex items-center gap-0.5 text-caption font-bold text-primary">
        Ver
        <Icon name="chevron_right" size={14} />
      </span>
    </button>
  )
}
