import type { EditionState, RegisterState } from '@/types'

export const EDITION = {
  brand: 'the news',
  kicker: "SUNDAY'S · EDIÇÃO DE DOMINGO",
  intro:
    'Há exatamente uma semana o Brasil reencontrou aquele frio na barriga de toda Copa. Hoje a gente desacelera — café na mão — para entender por que tanta marca que não é de roupa, de repente, quer vestir você.',
  bigStoryLabel: 'BIG STORY',
  title: 'Você compraria um boné do seu restaurante favorito?',
  paragraphs: [
    'De primeira, talvez você diga que não. Até questione por que um restaurante fugiria do seu produto principal — a comida — para vender peça de roupa.',
    'Mas o fenômeno das *merchans* de restaurantes, bares e mercados está cada vez mais comum. E tem uma explicação que vai muito além de um logo bonito na vitrine.',
  ],
  pullQuote:
    'Para a Geração Z, vestir uma marca virou forma de dizer quem se é — e os negócios entenderam o recado.',
  closing:
    'Estima-se que essa geração movimente US$ 12 trilhões em poder de compra até 2030. Transformar consumo em identidade deixou de ser luxo de grife: virou estratégia de padaria.',
} as const

export const PILL_STREAK_BASE = 6

export function registerStateFor(state: EditionState): RegisterState {
  switch (state) {
    case 'success':
      return 'done'
    case 'error':
      return 'error'
    default:
      return 'idle'
  }
}
