import type { WeekBar } from "@/types";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

const CHART_HEIGHT = 54;

export function WeekTrack({ week }: { week: WeekBar[] }) {
  return (
    <Card className="p-4 px-[18px]">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-body-sm font-extrabold text-foreground">
          Esta semana
        </h2>
        <button
          type="button"
          className="flex items-center gap-0.5 text-caption font-bold text-faint hover:text-foreground"
        >
          Histórico
          <Icon name="chevron_right" size={14} />
        </button>
      </div>
      <ul
        className="flex items-end justify-between"
        style={{ height: CHART_HEIGHT }}
      >
        {week.map((day, i) => (
          <li key={i} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "w-5 rounded-md",
                day.isToday
                  ? "bg-primary"
                  : day.level >= 0.55
                    ? "bg-primary"
                    : day.level >= 0.4
                      ? "bg-primary/40"
                      : "bg-muted",
              )}
              style={{
                height: Math.max(8, Math.round(day.level * CHART_HEIGHT)),
              }}
            />
            <span
              className={cn(
                "text-[11px] font-bold",
                day.isToday ? "text-primary" : "text-faint",
              )}
            >
              {day.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
