import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

/** Full "the news" wordmark. Swaps art by theme: dark-ink logo on light bg, white-ink on dark bg. */
export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? '/newLogoWhite1.png' : '/newLogoDark.png'
  return <img src={src} alt="the news" className={cn('w-auto select-none', className)} draggable={false} />
}
