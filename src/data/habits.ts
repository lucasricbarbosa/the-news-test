import type { Habit, HabitId, HabitsState, HeroMode, TrackDay, WeekBar } from '@/types'

const BASE_HABITS: Omit<Habit, 'done'>[] = [
  { id: 'exercicio', label: 'Exercício', icon: 'exercise', streak: 6 },
  { id: 'alimentacao', label: 'Alimentação', icon: 'restaurant', streak: 3 },
  { id: 'livro', label: 'Livro', icon: 'menu_book', streak: 12 },
  { id: 'edicao', label: 'Edição', icon: 'newspaper', streak: 6 },
  { id: 'sono', label: 'Sono', icon: 'bedtime', streak: 2 },
]

export const RECORD_STREAK = 18

export const TODAY_LABEL = 'Domingo, 28 de junho'

const INITIAL_DONE: Record<HabitsState, HabitId[]> = {
  default: ['exercicio', 'livro', 'edicao'],
  'at-risk': [],
  'day-zero': [],
  success: ['exercicio', 'alimentacao', 'livro', 'edicao', 'sono'],
  loading: [],
}

export function initialHabits(state: HabitsState): Habit[] {
  const done = new Set(INITIAL_DONE[state])
  return BASE_HABITS.map((h) => ({ ...h, done: done.has(h.id) }))
}

const WEEK_BASE: Omit<WeekBar, 'isToday'>[] = [
  { label: 'seg', level: 0.63 },
  { label: 'ter', level: 0.81 },
  { label: 'qua', level: 0.33 },
  { label: 'qui', level: 0.7 },
  { label: 'sex', level: 0.85 },
  { label: 'sáb', level: 0.48 },
  { label: 'dom', level: 0 },
]

const TRACK_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export interface HabitsModel {
  heroMode: HeroMode
  streak: number
  record: number
  doneCount: number
  total: number
  progressPct: number
  track: TrackDay[]
  week: WeekBar[]
  isDayZero: boolean
  celebrate: boolean
  celebrateText: string
}

export function deriveHabitsModel(habits: Habit[], isDayZero: boolean): HabitsModel {
  const total = habits.length
  const doneCount = habits.filter((h) => h.done).length
  const anyDone = doneCount > 0
  const allDone = doneCount === total

  const heroMode: HeroMode = isDayZero && !anyDone ? 'day-zero' : allDone ? 'perfect' : anyDone ? 'safe' : 'at-risk'

  const streak = isDayZero ? (anyDone ? 1 : 0) : allDone ? 7 : 6

  const track: TrackDay[] = TRACK_LABELS.map((label, i) => {
    const isToday = i === TRACK_LABELS.length - 1
    const filled = isToday ? anyDone : !isDayZero
    return { label, filled, isToday }
  })

  const week: WeekBar[] = WEEK_BASE.map((d) =>
    d.label === 'dom'
      ? { ...d, level: 0.18 + (allDone ? 0.74 : (doneCount / total) * 0.74), isToday: true }
      : { ...d, isToday: false },
  )

  const celebrate = heroMode === 'perfect' || (isDayZero && anyDone)
  const celebrateText = isDayZero ? 'Sequência iniciada — +1 dia! 🔥' : 'Dia perfeito — +1 dia! 🔥'

  return {
    heroMode,
    streak,
    record: RECORD_STREAK,
    doneCount,
    total,
    progressPct: Math.round((doneCount / total) * 100),
    track,
    week,
    isDayZero,
    celebrate,
    celebrateText,
  }
}

export const HERO_STATUS: Record<
  HeroMode,
  { text: string; icon: 'warning' | 'check_circle'; tone: 'danger' | 'success' } | null
> = {
  'at-risk': {
    text: 'Você ainda não registrou hoje — não perca sua sequência.',
    icon: 'warning',
    tone: 'danger',
  },
  perfect: { text: 'Dia perfeito — sequência salva!', icon: 'check_circle', tone: 'success' },
  safe: { text: 'Sequência salva hoje', icon: 'check_circle', tone: 'success' },
  'day-zero': null,
}
