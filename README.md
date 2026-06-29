# the news · Retention Loop (protótipo)

Protótipo de front-end do *retention loop* diário do **the news**: duas telas reais — **Hábitos** e **Edição** — costuradas pela mesma sequência (*streak*). A sequência tem uma única casa (Hábitos, com tratamento de herói e gradiente reservado a ela) e, na Edição, vira um micro-indicador + CTA de fim de edição.

> Caso técnico de design/engenharia. O foco é qualidade de código (arquitetura, componentes reutilizáveis, tipagem estrita) **e** detalhe visual/interação (tema claro/escuro, responsividade real, micro-animações com propósito, acessibilidade AA).

---

## Como rodar

Requer Node 20+.

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (Vite) em http://localhost:5173
npm run build    # type-check (tsc -b) + build de produção em dist/
npm run preview  # serve o build de produção
npm run lint     # oxlint
```

---

## Como navegar (para avaliação em 10 segundos)

Toda a navegação foi pensada para um avaliador encontrar **todos os estados** rapidamente:

1. **Bottom nav** — duas rotas reais e rotuladas em pt-BR: **hábitos** e **edição**. As demais abas (copa, livros, mais) reproduzem o mockup, mas são inertes.
2. **Estados (demo)** — controle segmentado acima do dispositivo. Troca os *templates de estado* da tela ativa **sem precisar de dados reais**:
   - Hábitos: `Padrão · Em risco · Dia zero · Sucesso · Carregando`
   - Edição: `Padrão · Fim da edição · Sucesso · Erro · Carregando`
3. **Pré-visualização de dispositivo** — cluster no topo (celular pequeno / celular / desktop). Ajusta a largura máxima do container para simular telas. **O app já é genuinamente responsivo** (breakpoints CSS reais, testado em 360→1280); esse toggle é conveniência de demo, não substituto da responsividade.
4. **Tema** — botão sol/lua no mesmo cluster. Alterna claro/escuro com transição suave e persiste a escolha em `localStorage` (padrão: escuro, como o app da marca).

Os estados também são interativos: marque hábitos, toque em *Registrar minha leitura*, ou use o *Dia zero* para ver a sequência nascer.

---

## Stack e por quê

| Escolha | Por quê |
| --- | --- |
| **Vite + React + TS** | SPA estática de 2 telas, sem SSR/SEO/dados de servidor. Vite dá HMR instantâneo e build enxuto — a ferramenta certa para o problema, não a da moda. |
| **Tailwind + shadcn/ui** | Tema base do shadcn (contrato de tokens `:root`/`.dark` em HSL) com os **valores** trocados pela paleta da marca. Light/dark trocam só alternando a classe `.dark` no `<html>`. Sem hex solto em componente: todo valor resolve para um token. |
| **motion** (`motion/react`) | Sucessora do framer-motion, com `AnimatePresence`, springs e `useReducedMotion`. Variants centralizadas em `lib/motion.ts` para animação consistente e reutilizável. |
| **lucide-react** | Ícones únicos e consistentes; os nomes do Material Symbols do design foram mapeados num registro (`lib/icons.ts`). |

### Arquitetura

```
src/
  app/            App shell, providers (tema), view-switch, DeviceFrame, DemoControls
  components/     compartilhados (Button, Card, Pill, ProgressBar, Skeleton,
                  ThemeToggle, DevicePreview, StateSwitcher, BottomNav, Confetti, Icon)
  components/ui/  primitivos shadcn (button, card)
  features/
    habits/       StreakHero, DayZeroHero, HabitList/HabitRow, WeekTrack,
                  FreezeButton, StreakTrack, CalendarSummary, states/
    edition/      EditionHeader, StreakPill, Reader, RegisterCTA, states/
  hooks/          useTheme, useDevicePreview, useScrollCondense, useReducedMotion
  lib/            cn util, motion variants, icons, constants
  data/           mock data + derivação de cada template de estado
  types/          uniões discriminadas para os estados de tela
  styles/         globals.css (tokens em CSS variables)
```

Cada estado (carregando/risco/erro/sucesso/dia-zero) é uma **variante tipada** renderizada por um único componente + `state` prop — nunca telas duplicadas. A lógica de derivação (sequência, herói, progresso) vive pura em `data/`.

---

## Design system

- **Tokens** definidos uma vez em `styles/globals.css` (CSS variables) e expostos via `tailwind.config.js`. Nenhum componente usa hex cru.
- **Marca**: amarelo `#f9d029`, gradiente `135° #f9d029→#fdce70→#FF8A3D`. O amarelo é **idêntico** nos dois temas; só os neutros mudam.
- **Escuro** (padrão): `bg #0E0E10`, `surface #1A1A1E`, `surface-2 #242429`, texto `#FFFFFF`, secundário `#A1A1AA`.
- **Claro**: contrapartida quente — `bg #F1EFE8`, `surface #FFFFFF`, texto `#161618`, secundário `#5C5C64`.
- **Semânticos**: sucesso `#22C55E`, risco `#EF4444`.
- **Tipografia**: Helvetica Now Display (fallback Helvetica/Arial). Escala Display/H1/H2/Body/Body-sm/Caption/Overline.
- **Espaçamento** 4pt, page padding 20, raios: cards 20 / pills 999 / inputs 12. Hairline 1px translúcido.

---

## Acessibilidade (diferencial listado)

- HTML semântico (`nav`, `header`, `article`, `blockquote`, `progressbar`, `radiogroup`).
- Controles só-ícone têm `aria-label`; hábitos são `role="checkbox"` operáveis por teclado; *Estados* e dispositivos são `role="radio"`.
- Foco visível (`:focus-visible` com anel de 2px e offset) em todos os controles.
- Alvos de toque ≥ 44px.
- **Estado nunca só por cor**: risco/sucesso sempre pareiam ícone + texto.
- Contraste AA nos dois temas (corpo ≥ 4.5:1, UI ≥ 3:1).
- `prefers-reduced-motion` respeitado globalmente (CSS) e por componente (`useReducedMotion`).

---

## Animações — uma linha de propósito cada

1. **Entrada escalonada** (fade + 8px) — dá ordem de leitura à tela ao carregar.
2. **Skeleton → conteúdo** — comunica carregamento sem salto brusco.
3. **Marcar hábito** — check com spring + flame que pulsa + confete sutil (≤8 partículas): recompensa o micro-hábito.
4. **Herói risco ↔ seguro** — a linha de risco entra/sai animada, sinalizando mudança em vez de corte seco.
5. **Reveal on scroll** (cards secundários, uma vez) — hierarquiza o que é primário vs. secundário.
6. **Header que condensa** no scroll — mantém contexto sem ocupar espaço.
7. **Troca de tema** — transição de cor 200ms + swap sol/lua: mudança percebida como contínua.
8. **Troca de tela** — crossfade/slide direcional reforça o sentido da navegação.
9. **Registrar leitura** — botão vira *Leitura registrada ✓* e a pill de sequência conta 6→7: fecha o loop de retenção.

Durações 150–400ms, ease-out/spring, apenas `transform`/`opacity` (60fps).

---

## Com mais um dia

- Calendário mensal completo (hoje é um resumo) e histórico semanal navegável.
- Layout de duas colunas em desktop de verdade (container queries) em vez de coluna centralizada.
- Testes: unitários da derivação de estado em `data/` e de interação (Testing Library) nos fluxos de check/registro.
- Persistir hábitos marcados e sequência em `localStorage`; áudio/“ouvir edição”.
- Tokens de tipografia com a fonte Helvetica Now Display licenciada (hoje há fallback).

---

## English summary

A front-end prototype of **the news**' daily retention loop: two real screens — **Hábitos** (habits) and **Edição** (edition) — tied together by a single streak. The streak lives as a hero on Hábitos and as a micro-pill + end-of-edition CTA on Edição.

- **Stack**: Vite + React + TypeScript (static 2-screen SPA — no SSR/SEO/server data, so Vite is the right tool), Tailwind + shadcn/ui theme (token values retuned to the brand), `motion` for purposeful animation, lucide for icons.
- **Navigation**: bottom nav (2 real screens) + an **Estados** segmented control to preview every state template + a device/theme cluster. Dark theme is default and persisted.
- **Quality bar**: strict TypeScript with discriminated-union state variants, one component per screen rendering all states via a `state` prop, centralized motion variants, fully tokenized styling (no raw hex in JSX), WCAG AA contrast in both themes, keyboard-operable controls, visible focus, ≥44px targets, and `prefers-reduced-motion` honored.
- **Run**: `npm install` → `npm run dev` (or `npm run build`).
