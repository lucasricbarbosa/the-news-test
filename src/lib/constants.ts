import type { IconName } from './icons'
import type { DeviceId, HabitsState, EditionState, ScreenId } from '@/types'

export interface NavItem {
  id: ScreenId | 'copa' | 'livros' | 'mais'
  label: string
  icon: IconName
  linked: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'edicao', label: 'edição', icon: 'newspaper', linked: true },
  { id: 'habitos', label: 'hábitos', icon: 'flame', linked: true },
  { id: 'copa', label: 'copa', icon: 'trophy', linked: false },
  { id: 'livros', label: 'livros', icon: 'menu_book', linked: false },
  { id: 'mais', label: 'mais', icon: 'menu', linked: false },
]

export const DEVICES: { id: DeviceId; label: string; icon: IconName; maxWidth: number }[] = [
  { id: 'phone-sm', label: 'Celular pequeno (360px)', icon: 'phone', maxWidth: 360 },
  { id: 'phone', label: 'Celular (414px)', icon: 'phone', maxWidth: 414 },
  { id: 'desktop', label: 'Desktop (largura total)', icon: 'monitor', maxWidth: 1280 },
]

export const HABITS_STATES: { id: HabitsState; label: string }[] = [
  { id: 'default', label: 'Padrão' },
  { id: 'at-risk', label: 'Em risco' },
  { id: 'day-zero', label: 'Dia zero' },
  { id: 'success', label: 'Sucesso' },
  { id: 'loading', label: 'Carregando' },
]

export const EDITION_STATES: { id: EditionState; label: string }[] = [
  { id: 'default', label: 'Padrão' },
  { id: 'end', label: 'Fim da edição' },
  { id: 'success', label: 'Sucesso' },
  { id: 'error', label: 'Erro' },
  { id: 'loading', label: 'Carregando' },
]

export const THEME_STORAGE_KEY = 'the-news:theme'
