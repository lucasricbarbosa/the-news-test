import { Snowflake } from 'lucide-react'

export interface FreezeButtonProps {
  protections?: number
  onClick?: () => void
}

export function FreezeButton({ protections = 1, onClick }: FreezeButtonProps) {
  const label = `${protections} proteção`
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Usar proteção de sequência — ${label} disponível`}
      className="flex flex-none items-center gap-1.5 rounded-pill border border-hairline bg-muted px-3 py-2 text-caption font-bold text-muted-foreground transition-colors hover:bg-secondary"
    >
      <Snowflake size={14} className="text-[#7fd0ff]" aria-hidden />
      {label}
    </button>
  )
}
