import { AnimatePresence, motion } from 'motion/react'
import { BookmarkPlus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import type { RegisterState } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { springSoft } from '@/lib/motion'

export interface RegisterCTAProps {
  state: RegisterState
  streak: number
  onRegister: () => void
}

export function RegisterCTA({ state, streak, onRegister }: RegisterCTAProps) {
  const reduced = useReducedMotion()
  const fade = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }

  return (
    <div className="px-page py-6">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'done' ? (
          <motion.div key="done" {...fade} transition={springSoft}>
            <Card
              role="status"
              className="border-0 p-5 text-center"
              style={{ backgroundColor: 'var(--success-soft)', borderColor: 'var(--success-soft-border)' }}
            >
              <CheckCircle2 size={40} className="mx-auto text-success" aria-hidden />
              <p className="mt-1.5 text-[1.05rem] font-extrabold text-foreground">Leitura registrada</p>
              <p className="mt-1 text-body-sm text-muted-foreground">Sequência em {streak} dias. Volte amanhã 👋</p>
            </Card>
          </motion.div>
        ) : state === 'error' ? (
          <motion.div key="error" {...fade} transition={springSoft}>
            <Card
              role="alert"
              className="border p-5 text-center"
              style={{ backgroundColor: 'var(--danger-soft)', borderColor: 'var(--danger-soft-border)' }}
            >
              <AlertCircle size={34} className="mx-auto text-destructive" aria-hidden />
              <p className="mt-1.5 text-body font-extrabold text-foreground">Não foi possível registrar agora.</p>
              <p className="mt-1 text-body-sm text-muted-foreground">Verifique sua conexão e tente novamente.</p>
              <Button variant="outlineDanger" size="lg" className="mt-3.5" onClick={onRegister}>
                Tentar de novo
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div key="idle" {...fade} transition={springSoft}>
            <Card className="p-5 text-center">
              <p className="text-body font-extrabold text-foreground">Você chegou ao fim da edição de hoje 🎉</p>
              <p className="mt-1.5 text-body-sm text-muted-foreground">
                Registre sua leitura e mantenha a sequência viva.
              </p>
              <Button size="lg" className="mt-4" onClick={onRegister} disabled={state === 'loading'}>
                {state === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" aria-hidden />
                    Registrando…
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={20} aria-hidden />
                    Registrar minha leitura
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
