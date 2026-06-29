import type { DeviceId } from "@/types";
import { DevicePreview } from "@/components/DevicePreview";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface DemoControlsProps {
  device: DeviceId;
  onDeviceChange: (device: DeviceId) => void;
}

export function DemoControls({ device, onDeviceChange }: DemoControlsProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-hairline bg-background/85 px-page py-3 backdrop-blur">
      <Logo className="h-12" />
      <div className="flex items-center gap-2">
        <DevicePreview
          device={device}
          onChange={onDeviceChange}
          className="hidden sm:flex"
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
