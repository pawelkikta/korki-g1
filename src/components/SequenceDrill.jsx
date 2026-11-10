import React, { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button, NoteBox } from './ui.jsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Ćwiczenie „ułóż kolejność”: klikasz kroki po kolei. Krok kliknięty za wcześnie pokazuje, dlaczego jeszcze nie.
// steps: [{ id, label, why }] w poprawnej kolejności.
export function SequenceDrill({ steps, doneText }) {
  const [attempt, setAttempt] = useState(0)
  const [done, setDone] = useState([]) // id kroków w kolejności kliknięcia
  const [miss, setMiss] = useState(null) // krok kliknięty za wcześnie
  const shuffled = useMemo(() => shuffle(steps), [steps, attempt])
  const next = steps[done.length]
  const finished = done.length === steps.length

  const pick = (s) => {
    if (done.includes(s.id) || finished) return
    if (s.id === next.id) {
      setDone((d) => [...d, s.id])
      setMiss(null)
    } else {
      setMiss(s)
    }
  }

  const reset = () => {
    setDone([])
    setMiss(null)
    setAttempt((a) => a + 1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="eyebrow">Kliknij kroki we właściwej kolejności</div>
        <div className="font-mono text-[13px] font-bold tabular-nums text-ink-3">{done.length}/{steps.length}</div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {shuffled.map((s) => {
          const pos = done.indexOf(s.id)
          const isDone = pos >= 0
          const isMiss = miss?.id === s.id
          return (
            <button
              key={s.id}
              onClick={() => pick(s)}
              disabled={isDone}
              className={`flex items-start gap-3 rounded-[4px] px-3.5 py-3 text-left text-[15px] leading-[1.45] transition disabled:cursor-default ${
                isDone
                  ? 'bg-ok-soft text-ink shadow-[inset_0_0_0_1.5px_var(--ok)]'
                  : isMiss
                  ? 'bg-red-soft text-ink shadow-[inset_0_0_0_1.5px_var(--red)]'
                  : 'bg-paper text-ink shadow-[inset_0_0_0_1px_var(--rule-2)] hover:bg-paper-2 hover:shadow-[inset_0_0_0_1.5px_var(--accent)]'
              }`}
            >
              <span className={`mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold ${isDone ? 'bg-ok text-white' : 'bg-paper-3 text-ink-3'}`}>
                {isDone ? pos + 1 : '?'}
              </span>
              <span className="flex-1">{s.label}</span>
            </button>
          )
        })}
      </div>
      {miss ? (
        <NoteBox type="mistake" title="Jeszcze nie">
          {miss.why}
        </NoteBox>
      ) : null}
      {finished ? <NoteBox type="ok" title="Dobra kolejność">{doneText}</NoteBox> : null}
      {done.length || miss ? (
        <Button variant="secondary" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" /> Od nowa</Button>
      ) : null}
    </div>
  )
}
