import React, { useMemo, useState } from 'react'
import { Search, EyeOff, Eye } from 'lucide-react'
import { cheatsheet, extraNumbers } from '../data/cheatsheet.js'
import { SectionFrame, Button, Tag } from './ui.jsx'

function ValueCell({ value, drill, revealed, onReveal }) {
  if (!drill || revealed) {
    return <span className="font-mono text-base font-black text-[color:var(--c-14543e)]">{value}</span>
  }
  return (
    <button onClick={onReveal} className="border border-dashed border-[color:var(--c-b9c4bd)] bg-[color:var(--b-f6f8f7)] px-3 py-0.5 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 transition hover:border-[color:var(--c-1a5c46)] hover:text-[color:var(--c-14543e)]">
      pokaż
    </button>
  )
}

function CheatTable({ rows, drill, revealed, setRevealed }) {
  return (
    <div className="grid gap-2">
      {rows.map((r) => (
        <div key={r.id} className="grid grid-cols-1 gap-2 border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-2.5 md:grid-cols-[180px_minmax(0,1fr)_130px] md:items-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-500">{r.group}</div>
          <div>
            <div className="text-sm text-gray-800">{r.param}</div>
            <div className="mt-0.5 text-[11px] leading-4 text-gray-500">{r.hint}</div>
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
    <div className="space-y-6">
      <SectionFrame
        tag="Tryb 06"
        title="Ściąga – liczby, które musisz znać na pamięć"
        subtitle={'Przy pomiarach komisja pyta o konkretne wartości. Tryb „drill" zakrywa liczby – odpytuj się aż wszystkie będziesz mieć w głowie.'}
        badge={drill ? 'tryb drill' : 'podgląd'}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2 border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)] px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj: RCD, izolacja, uziemienie..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
          <Button variant={drill ? 'primary' : 'secondary'} onClick={() => { setDrill((d) => !d); setRevealed({}) }}>
            {drill ? <><Eye className="mr-2 h-4 w-4" /> Odkryj wszystko</> : <><EyeOff className="mr-2 h-4 w-4" /> Tryb drill</>}
          </Button>
        </div>
      </SectionFrame>

      <SectionFrame tag="Pomiary" title="Wartości graniczne i terminy" badge={`${main.length} pozycji`}>
        {main.length ? <CheatTable rows={main} drill={drill} revealed={revealed} setRevealed={setRevealed} /> : <Tag>Brak wyników dla „{query}"</Tag>}
      </SectionFrame>

      <SectionFrame tag="Bonus" title="Pozostałe liczby egzaminacyjne" badge={`${extra.length} pozycji`}>
        {extra.length ? <CheatTable rows={extra} drill={drill} revealed={revealed} setRevealed={setRevealed} /> : <Tag>Brak wyników dla „{query}"</Tag>}
      </SectionFrame>
    </div>
  )
}
