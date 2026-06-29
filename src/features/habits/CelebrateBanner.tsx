import { motion } from 'motion/react'
import { PartyPopper } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { springSoft } from '@/lib/motion'

export function CelebrateBanner({ text }: { text: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      role="status"
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springSoft}
      className="flex items-center gap-2.5 rounded-input border px-3.5 py-2.5"
      style={{ backgroundColor: 'var(--success-soft)', borderColor: 'var(--success-soft-border)' }}
    >
      <PartyPopper size={19} className="text-success" aria-hidden />
      <span className="text-body-sm font-extrabold text-success">{text}</span>
    </motion.div>
  )
}
