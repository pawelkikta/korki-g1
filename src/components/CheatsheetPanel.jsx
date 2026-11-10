import React, { useMemo, useState } from 'react'
import { cheatsheet, extraNumbers } from '../data/cheatsheet.js'
import { PageHeader, SearchField, SectionFrame, Switch, Tag, keepCase } from './ui.jsx'

function ValueCell({ value, drill, revealed, onReveal }) {
  if (!drill || revealed) {
    return <span className="font-mono text-[17px] font-bold text-red-ink">{value}</span>
  }
  return (
    <button onClick={onReveal} className="rounded-[3px] border-2 border-dashed border-rule-2 bg-paper-2 px-3 py-0.5 text-[13px] font-semibold text-ink-3 transition hover:border-accent hover:text-accent-ink">
      pokaż
    </button>
  )
}

function CheatTable({ rows, drill, revealed, setRevealed }) {
  return (
    <div className="divide-y divide-rule">
      {rows.map((r) => (
        <div key={r.id} className="grid grid-cols-1 gap-1 py-3 md:grid-cols-[170px_minmax(0,1fr)_150px] md:items-center md:gap-4">
          <div className="eyebrow">{keepCase(r.group)}</div>
          <div>
            <div className="text-[15.5px] font-semibold leading-[1.4] text-ink">{r.param}</div>
            <div className="mt-0.5 font-serif text-[14.5px] leading-[1.45] text-ink-2">{r.hint}</div>
          </div>
          <div className="md:text-right">
            <ValueCell value={r.value} drill={drill} revealed={!!revealed[r.id]} onReveal={() => setRevealed((s) => ({ ...s, [r.id]: true }))} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function CheatsheetPanel() {
  const [query, setQuery] = useState('')
  const [drill, setDrill] = useState(false)
  const [revealed, setRevealed] = useState({})

  const filter = (rows) => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => [r.group, r.param, r.value, r.hint].join(' ').toLowerCase().includes(q))
  }
  const main = useMemo(() => filter(cheatsheet), [query]) // eslint-disable-line react-hooks/exhaustive-deps
  const extra = useMemo(() => filter(extraNumbers), [query]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Utrwal · liczby"
        title="Ściąga – liczby, które musisz znać na pamięć"
        lead={'Przy pomiarach komisja pyta o konkretne wartości. Tryb drill zakrywa liczby – odpytuj się, aż wszystkie będziesz mieć w głowie.'}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SearchField value={query} onChange={setQuery} placeholder="Szukaj: RCD, izolacja, uziemienie..." />
          <Switch checked={drill} onChange={(v) => { setDrill(v); setRevealed({}) }} label="Tryb drill" hint="zakryj liczby" />
        </div>
      </PageHeader>

      <SectionFrame tag="Pomiary" title="Wartości graniczne i terminy" badge={`${main.length} pozycji`}>
        {main.length ? <CheatTable rows={main} drill={drill} revealed={revealed} setRevealed={setRevealed} /> : <Tag>Brak wyników dla „{query}"</Tag>}
      </SectionFrame>

      <SectionFrame tag="Bonus" title="Pozostałe liczby egzaminacyjne" badge={`${extra.length} pozycji`}>
        {extra.length ? <CheatTable rows={extra} drill={drill} revealed={revealed} setRevealed={setRevealed} /> : <Tag>Brak wyników dla „{query}"</Tag>}
      </SectionFrame>
    </div>
  )
}
