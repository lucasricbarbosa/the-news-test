import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DayZeroHeroProps {
  onStart: () => void;
}

export function DayZeroHero({ onStart }: DayZeroHeroProps) {
  return (
    <Card className="p-6 text-center">
      <Flame
        size={48}
        fill="url(#brand-grad)"
        stroke="url(#brand-grad)"
        strokeWidth={1.5}
        className="mx-auto"
        aria-hidden
      />
      <h2 className="mt-2 text-h2 font-extrabold tracking-tight text-foreground">
        Comece sua sequência hoje
      </h2>
      <p className="mx-auto mt-2 max-w-[30ch] text-body-sm text-muted-foreground">
        Marque seu primeiro hábito e acenda o fogo. Pequeno hoje, imparável em 7
        dias.
      </p>
      <Button size="lg" className="mt-5" onClick={onStart}>
        Registrar meu primeiro hábito
      </Button>
    </Card>
  );
}
