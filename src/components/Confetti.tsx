import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PARTICLES = [
  { x: -34, y: -42, r: -40, c: 'var(--brand-soft-border)' },
  { x: -18, y: -54, r: 20, c: '#f9d029' },
  { x: 0, y: -60, r: -10, c: '#fdce70' },
  { x: 18, y: -52, r: 35, c: '#ff8a3d' },
  { x: 34, y: -40, r: -25, c: '#f9d029' },
  { x: -26, y: -30, r: 15, c: '#fdce70' },
  { x: 26, y: -28, r: -30, c: '#f9d029' },
  { x: 8, y: -48, r: 45, c: '#ff8a3d' },
]

export interface ConfettiProps {
  fireKey: number
}

export function Confetti({ fireKey }: ConfettiProps) {
  const reduced = useReducedMotion()
  if (reduced || fireKey === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden>
      <AnimatePresence>
        <motion.div key={fireKey} className="relative h-0 w-0">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-[2px]"
              style={{ backgroundColor: p.c }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.6, rotate: p.r }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
