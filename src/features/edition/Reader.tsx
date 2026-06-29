import { Fragment, type ReactNode } from 'react'
import { EDITION } from '@/data/edition'

function withEmphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className="italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export function Reader() {
  return (
    <article className="px-page">
      <p className="pt-3.5 text-overline text-primary">{EDITION.kicker}</p>

      <p className="pt-2.5 text-body leading-relaxed text-foreground">
        <span className="font-bold">Bom dia!</span> {EDITION.intro}
      </p>

      <div className="pt-6">
        <p className="text-overline text-primary">{EDITION.bigStoryLabel}</p>
        <h1 className="mt-2 text-[1.8rem] font-extrabold leading-[1.1] tracking-tight text-foreground">
          {EDITION.title}
        </h1>
      </div>

      <div className="space-y-3.5 pt-4 text-body leading-relaxed text-foreground">
        {EDITION.paragraphs.map((p, i) => (
          <p key={i}>{withEmphasis(p)}</p>
        ))}
      </div>

      <blockquote className="my-4 rounded-r-card border-l-[3px] border-primary bg-card px-4 py-3.5 text-[1.05rem] italic leading-snug text-foreground">
        “{EDITION.pullQuote}”
      </blockquote>

      <p className="text-body leading-relaxed text-foreground">{EDITION.closing}</p>
    </article>
  )
}
