import React, { useMemo, useState } from 'react'
import { RotateCcw, Check, X } from 'lucide-react'
import { Button, NoteBox } from '../ui.jsx'
import { ORDER_KINDS, orderCases } from '../../data/orgWork.js'

// „Polecenie czy nie?" – klasyfikacja typowych sytuacji z pracy elektryka.

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SimPolecenie() {
  const [attempt, setAttempt] = useState(0)
  const [picks, setPicks] = useState({})
  const cases = useMemo(() => shuffled(orderCases), [attempt])

  const answered = Object.keys(picks).length
  const score = orderCases.filter((c) => picks[c.id] === c.kind).length
  const done = answered === orderCases.length

  return (
    <div className="space-y-4">
      <NoteBox type="warning" title="Typowe przypadki">
        Ostateczny wykaz prac na polecenie pisemne i bez polecenia ustala pracodawca w IOBP. Poniżej sytuacje, w których odpowiedź jest jednoznaczna.
      </NoteBox>
      <div className="space-y-2">
        {cases.map((c) => {
          const picked = picks[c.id]
          const isAnswered = picked != null
          return (
            <div key={c.id} className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-3">
              <div className="text-sm font-semibold leading-5 text-gray-900">{c.text}</div>
              <div className="mt-2 grid gap-1.5 md:grid-cols-3">
                {ORDER_KINDS.map((k) => {
                  const isPicked = picked === k.id
                  const isRight = k.id === c.kind
                  let cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-1a5c46)]'
                  if (isAnswered) {
                    if (isRight) cls = 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]'
                    else if (isPicked) cls = 'border-[color:var(--c-c03538)] bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)]'
                    else cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-400'
                  }
                  return (
                    <button
                      key={k.id}
                      disabled={isAnswered}
                      onClick={() => setPicks((p) => ({ ...p, [c.id]: k.id }))}
                      className={`flex items-center gap-1.5 border px-2.5 py-1.5 text-left text-[12px] leading-4 transition disabled:cursor-default ${cls}`}
                    >
                      {isAnswered && isRight ? <Check className="h-3 w-3 shrink-0" /> : null}
                      {isAnswered && isPicked && !isRight ? <X className="h-3 w-3 shrink-0" /> : null}
                      {k.label}
                    </button>
                  )
                })}
              </div>
              {isAnswered ? <div className="mt-1.5 text-[12px] leading-5 text-gray-600">{c.why}</div> : null}
            </div>
          )
        })}
      </div>
      {done ? (
        <NoteBox type={score === orderCases.length ? 'remember' : 'mistake'} title={`Wynik: ${score}/${orderCases.length}`}>
          Reguła do zapamiętania: szczególne zagrożenie, firma zewnętrzna albo decyzja poleceniodawcy → polecenie pisemne.
          Bez polecenia – tylko czynności z instrukcji eksploatacji oraz ratowanie życia, zdrowia lub mienia.
        </NoteBox>
      ) : null}
      <Button variant="secondary" onClick={() => { setPicks({}); setAttempt((a) => a + 1) }}><RotateCcw className="mr-1 h-4 w-4" /> Wymieszaj od nowa</Button>
    </div>
  )
}
