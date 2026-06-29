export type Theme = 'light' | 'dark'

export type ScreenId = 'habitos' | 'edicao'

export type DeviceId = 'phone-sm' | 'phone' | 'desktop'

export type HabitsState = 'default' | 'at-risk' | 'day-zero' | 'success' | 'loading'

export type EditionState = 'default' | 'end' | 'success' | 'loading' | 'error'

export type HeroMode = 'safe' | 'at-risk' | 'day-zero' | 'perfect'

export type HabitId = 'exercicio' | 'alimentacao' | 'livro' | 'edicao' | 'sono'

export interface Habit {
  id: HabitId
  label: string
  icon: string
  streak: number
  done: boolean
}

export interface TrackDay {
  label: string
  filled: boolean
  isToday: boolean
}

export interface WeekBar {
  label: string
  level: number
  isToday: boolean
}

export type RegisterState = 'idle' | 'loading' | 'done' | 'error'
