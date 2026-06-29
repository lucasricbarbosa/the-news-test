import { motion } from "motion/react";
import { Flame } from "lucide-react";
import type { HabitsModel } from "@/data/habits";
import { HERO_STATUS } from "@/data/habits";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { Confetti } from "@/components/Confetti";
import { FreezeButton } from "./FreezeButton";
import { StreakTrack } from "./StreakTrack";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { springPop } from "@/lib/motion";

export interface StreakHeroProps {
  model: HabitsModel;
  celebrationTick: number;
}

export function StreakHero({ model, celebrationTick }: StreakHeroProps) {
  const reduced = useReducedMotion();
  const status = HERO_STATUS[model.heroMode];
  const atRisk = model.heroMode === "at-risk";

  return (
    <Card
      className={cn(
        "relative overflow-hidden p-5 transition-shadow",
        atRisk && "border-destructive/45 border-2 shadow-risk-glow",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-end gap-1">
          <div className="relative">
            <motion.span
              key={celebrationTick}
              initial={reduced || celebrationTick === 0 ? false : { scale: 1 }}
              animate={
                reduced || celebrationTick === 0 ? {} : { scale: [1, 1.22, 1] }
              }
              transition={springPop}
              className="block"
            >
              <Flame
                size={48}
                fill="url(#brand-grad)"
                stroke="url(#brand-grad)"
                strokeWidth={1.5}
                aria-hidden
              />
            </motion.span>
            <Confetti fireKey={celebrationTick} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-overline uppercase text-muted-foreground">
              Sequência
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="bg-brand-gradient bg-clip-text text-[3.25rem] font-extrabold leading-[0.9] tracking-tighter text-transparent">
                {model.streak}
              </span>
              <span className="text-body font-bold text-foreground">
                dias seguidos
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-overline uppercase text-muted-foreground">
            RECORDE
          </p>
          <p className="text-h2 font-extrabold text-foreground">
            {model.record}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <StreakTrack track={model.track} />
      </div>

      {status && (
        <div className="mt-4 flex flex-col items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon
              name={status.icon}
              size={18}
              className={cn(
                "flex-none",
                status.tone === "danger" ? "text-destructive" : "text-success",
              )}
            />
            <span
              className={cn(
                "text-body-sm font-semibold leading-tight text-center",
                status.tone === "danger" ? "text-destructive" : "text-success",
              )}
            >
              {status.text}
            </span>
          </div>
          <FreezeButton />
        </div>
      )}
    </Card>
  );
}
