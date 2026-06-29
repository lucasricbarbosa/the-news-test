import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import type { IconName } from "@/lib/icons";

const ACTIONS: { icon: IconName; label: string }[] = [
  { icon: "headphones", label: "Ouvir edição" },
  { icon: "bookmark", label: "Salvar edição" },
  { icon: "menu", label: "Abrir menu" },
];

export function EditionHeader() {
  return (
    <div className="flex items-center justify-between px-page pt-3">
      <Logo className="h-12" />
      <div className="flex items-center gap-4 text-muted-foreground">
        {ACTIONS.map((a) => (
          <button
            key={a.icon}
            type="button"
            aria-label={a.label}
            className="transition-colors hover:text-foreground"
          >
            <Icon name={a.icon} size={21} />
          </button>
        ))}
      </div>
    </div>
  );
}
