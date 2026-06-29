import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface StateOption<T extends string> {
  id: T
  label: string
}

export interface StateSwitcherProps<T extends string> {
  options: StateOption<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
  className?: string
}

export function StateSwitcher<T extends string>({
  options,
  value,
  onChange,
  label = 'Estados (demo)',
  className,
}: StateSwitcherProps<T>) {
  const reduced = useReducedMotion()
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((opt) => opt.id === value)),
  )

  const selected = options.find((opt) => opt.id === value) ?? options[0]

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // When opening, focus the active option for screen readers / keyboard.
  useEffect(() => {
    if (open) {
      setActiveIndex(Math.max(0, options.findIndex((opt) => opt.id === value)))
    }
  }, [open, options, value])

  const commit = (index: number) => {
    const opt = options[index]
    if (!opt) return
    onChange(opt.id)
    setOpen(false)
  }

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        event.preventDefault()
        setOpen(true)
        break
    }
  }

  const onListKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => (i + 1) % options.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => (i - 1 + options.length) % options.length)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        commit(activeIndex)
        break
      case 'Escape':
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="text-overline uppercase text-faint">{label}</span>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            'flex min-h-[44px] w-full min-w-[180px] items-center justify-between gap-3',
            'rounded-input border border-hairline bg-card px-3.5 text-body-sm font-bold',
            'transition-colors hover:bg-muted',
            open && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
          )}
        >
          <span className="truncate">{selected?.label}</span>
          <ChevronDown
            size={18}
            className={cn(
              'shrink-0 text-muted-foreground transition-transform duration-200 ease-spring',
              open && 'rotate-180',
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listboxId}
              role="listbox"
              aria-label={label}
              tabIndex={-1}
              ref={(node) => node?.focus()}
              onKeyDown={onListKeyDown}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(
                'absolute z-50 mt-1.5 max-h-72 w-full overflow-auto outline-none',
                'rounded-input border border-hairline bg-popover p-1.5 text-popover-foreground shadow-hero',
              )}
            >
              {options.map((opt, index) => {
                const active = opt.id === value
                const highlighted = index === activeIndex
                return (
                  <li
                    key={opt.id}
                    role="option"
                    aria-selected={active}
                    onClick={() => commit(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      'flex min-h-[40px] cursor-pointer items-center justify-between gap-3 rounded-md px-3 text-body-sm transition-colors',
                      highlighted ? 'bg-muted' : 'hover:bg-muted',
                      active ? 'font-bold text-foreground' : 'font-medium text-muted-foreground',
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {active && <Check size={16} className="shrink-0 text-primary" />}
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
