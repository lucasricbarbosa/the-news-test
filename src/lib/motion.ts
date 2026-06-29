import type { Variants, Transition } from 'motion/react'

export const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
}

export const springPop: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 18,
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
}

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
}

export const revealOnScroll: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
}

export const screenTransition: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE_OUT } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -24, transition: { duration: 0.2, ease: EASE_OUT } }),
}

export const checkFill: Variants = {
  unchecked: { scale: 1 },
  checked: { scale: [1, 1.18, 1], transition: { duration: 0.32, ease: EASE_OUT } },
}

export const crossfade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
}
