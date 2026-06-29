import { AnimatePresence, motion } from 'motion/react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const reduced = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      aria-pressed={isDark}
      className={cn(
        'relative grid h-11 w-11 place-items-center overflow-hidden rounded-pill border border-hairline bg-card text-foreground transition-colors hover:bg-muted',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={theme}
          initial={reduced ? false : { y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={reduced ? { opacity: 0 } : { y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {isDark ? <Moon size={19} aria-hidden /> : <Sun size={19} aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
