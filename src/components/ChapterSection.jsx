import React from 'react'
import { NoteBox, ValueTile, DataTable, keepCase } from './ui.jsx'

// **tekst** → pogrubienie; w treści w kolorze akcentu, w boxach (plain) dziedziczy kolor
export function Rich({ text, plain = false }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={plain ? 'font-bold' : 'font-semibold text-[color:var(--c-14543e)]'}>{part}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  )
}

// Sekcja rozdziału: paragraphs (tekst lub {quote}/{formula}/{list}), values, steps, table, box, box2
export function ChapterSection({ section }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold uppercase tracking-[0.06em] text-gray-900">{keepCase(section.heading)}</h3>
      {section.paragraphs?.map((p, i) => {
        if (p && typeof p === 'object') {
          if (p.quote) {
            return (
              <blockquote key={i} className="border-l-4 border-[color:var(--c-1a5c46)] bg-[color:var(--b-f3f6f4)] px-4 py-3 text-sm italic leading-7 text-gray-800">
                „{p.quote}"
              </blockquote>
            )
          }
          if (p.formula) {
            return (
              <div key={i} className="border border-[color:var(--c-bcd4c8)] bg-[color:var(--b-e7f0eb)] px-4 py-3 text-center font-mono text-base font-bold tracking-wide text-[color:var(--c-14543e)]">
                {p.formula}
              </div>
            )
          }
          if (p.list) {
            return (
              <ul key={i} className="space-y-1.5">
                {p.list.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-sm leading-7 text-gray-700">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--b-1a5c46)]" />
                    <span><Rich text={item} /></span>
                  </li>
                ))}
              </ul>
            )
          }
          return null
        }
        return <p key={i} className="text-sm leading-7 text-gray-700"><Rich text={p} /></p>
      })}
      {section.values ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {section.values.map((v) => <ValueTile key={v.label} value={v.value} label={v.label} />)}
        </div>
      ) : null}
      {section.steps ? (
        <ol className="space-y-1.5">
          {section.steps.map((s, i) => (
            <li key={i} className="flex gap-3 border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-2 text-sm leading-6 text-gray-700">
              <span style={{ '--e': 'var(--c-bcd4c8)' }} className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center cham-sm edge bg-[color:var(--b-e7f0eb)] font-mono text-[10px] font-bold text-[color:var(--c-14543e)]">{i + 1}</span>
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
