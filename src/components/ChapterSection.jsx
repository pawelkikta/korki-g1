import React from 'react'
import { NoteBox, ValueTile, DataTable } from './ui.jsx'

// **tekst** → kluczowa fraza. W treści: pogrubienie z „zakreśleniem markerem”, w notatkach (plain) – samo pogrubienie.
export function Rich({ text, plain = false }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className={plain ? 'font-bold' : 'font-semibold text-ink [background:linear-gradient(transparent_58%,var(--highlight)_58%)] [box-decoration-break:clone]'}
      >
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  )
}

// Sekcja rozdziału: paragraphs (tekst lub {quote}/{formula}/{list}), values, steps, table, box, box2
export function ChapterSection({ section }) {
  return (
    <div className="space-y-4">
      <h3 className="font-slab text-[19px] font-semibold leading-snug text-ink md:text-[20px]">{section.heading}</h3>
      {section.paragraphs?.map((p, i) => {
        if (p && typeof p === 'object') {
          if (p.quote) {
            return (
              <blockquote key={i} className="border-l-[3px] border-rule-2 pl-4 font-serif text-[16.5px] italic leading-[1.65] text-ink-2">
                „{p.quote}"
              </blockquote>
            )
          }
          if (p.formula) {
            return (
              <div key={i} className="rounded-[3px] bg-paper-2 px-4 py-3 text-center font-mono text-[16px] font-bold tracking-wide text-ink shadow-[inset_0_0_0_1px_var(--rule)]">
                {p.formula}
              </div>
            )
          }
          if (p.list) {
            return (
              <ul key={i} className="space-y-2">
                {p.list.map((item, j) => (
                  <li key={j} className="flex gap-3 font-serif text-[17px] leading-[1.65] text-ink">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-3" />
                    <span><Rich text={item} /></span>
                  </li>
                ))}
              </ul>
            )
          }
          return null
        }
        return <p key={i} className="font-serif text-[17px] leading-[1.7] text-ink"><Rich text={p} /></p>
      })}
      {section.values ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {section.values.map((v) => <ValueTile key={v.label} value={v.value} label={v.label} tone="red" />)}
        </div>
      ) : null}
      {section.steps ? (
        <ol className="space-y-2.5">
          {section.steps.map((s, i) => (
            <li key={i} className="flex gap-3 font-serif text-[16.5px] leading-[1.6] text-ink">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[11.5px] font-bold text-paper">{i + 1}</span>
              <span><Rich text={s} /></span>
            </li>
          ))}
        </ol>
      ) : null}
      {section.table ? <DataTable head={section.table.head} rows={section.table.rows} caption={section.table.caption} /> : null}
      {section.box ? <NoteBox type={section.box.type} title={section.box.title}><Rich text={section.box.text} plain /></NoteBox> : null}
      {section.box2 ? <NoteBox type={section.box2.type} title={section.box2.title}><Rich text={section.box2.text} plain /></NoteBox> : null}
    </div>
  )
}
