import React, { useState } from 'react'
import { RotateCcw, Check, X } from 'lucide-react'
import { Button, NoteBox } from '../ui.jsx'
import { ROLES, roleTasks, roleCombos } from '../../data/orgWork.js'

// „Kto jest kim" – przypisz zadanie do osoby funkcyjnej, potem oceń łączenie funkcji.

export function SimRole() {
  const [picks, setPicks] = useState({}) // taskId -> roleId
  const [combo, setCombo] = useState({}) // comboId -> true/false
  const [attempt, setAttempt] = useState(0)

  const correctTasks = roleTasks.filter((t) => picks[t.id] === t.role).length
  const correctCombos = roleCombos.filter((c) => combo[c.id] === c.ok).length
  const allDone = Object.keys(picks).length === roleTasks.length && Object.keys(combo).length === roleCombos.length
  const total = roleTasks.length + roleCombos.length
  const score = correctTasks + correctCombos

  const reset = () => { setPicks({}); setCombo({}); setAttempt((a) => a + 1) }

  return (
    <div key={attempt} className="space-y-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Kto to robi? Wybierz osobę funkcyjną dla każdego zadania</div>
      <div className="space-y-2">
        {roleTasks.map((t) => {
          const picked = picks[t.id]
          const answered = picked != null
          return (
            <div key={t.id} className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-3">
              <div className="text-sm font-semibold leading-5 text-gray-900">{t.text}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ROLES.map((r) => {
                  const isPicked = picked === r.id
                  const isRight = r.id === t.role
                  let cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-1a5c46)]'
                  if (answered) {
                    if (isRight) cls = 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]'
                    else if (isPicked) cls = 'border-[color:var(--c-c03538)] bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)]'
                    else cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-400'
                  }
                  return (
                    <button
                      key={r.id}
                      disabled={answered}
                      onClick={() => setPicks((p) => ({ ...p, [t.id]: r.id }))}
                      className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[12px] transition disabled:cursor-default ${cls}`}
                    >
                      {answered && isRight ? <Check className="h-3 w-3" /> : null}
                      {answered && isPicked && !isRight ? <X className="h-3 w-3" /> : null}
                      {r.label}
                    </button>
                  )
                })}
              </div>
              {answered ? <div className="mt-1.5 text-[12px] leading-5 text-gray-600">{t.why}</div> : null}
            </div>
          )
        })}
      </div>

      <div className="border-t border-[color:var(--c-d7ded9)] pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        Polecenie pisemne – czy jedna osoba może połączyć te funkcje?
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {roleCombos.map((c) => {
          const v = combo[c.id]
          const answered = v != null
          const right = answered && v === c.ok
          return (
            <div key={c.id} className={`border p-3 ${answered ? (right ? 'border-[color:var(--c-9fcab1)] bg-[color:var(--b-e9f4ed)]' : 'border-[color:var(--c-e5b8b4)] bg-[color:var(--b-fdf0ee)]') : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)]'}`}>
              <div className="text-sm font-semibold text-gray-900">{c.text}</div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {[{ v: true, l: 'Wolno' }, { v: false, l: 'Nie wolno' }].map((o) => (
                  <button
                    key={o.l}
                    disabled={answered}
                    onClick={() => setCombo((p) => ({ ...p, [c.id]: o.v }))}
                    className={`border px-2 py-1 text-[12px] transition disabled:cursor-default ${
                      answered && o.v === c.ok ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-ffffff)] font-bold text-[color:var(--c-1f7a4d)]' : answered ? 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-400' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-1a5c46)]'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {answered ? <div className="mt-1.5 text-[12px] leading-5 text-gray-600">{c.why}</div> : null}
            </div>
          )
        })}
      </div>

      {allDone ? (
        <NoteBox type={score === total ? 'remember' : 'mistake'} title={`Wynik: ${score}/${total}`}>
          {score === total
            ? 'Role masz poukładane. Na egzaminie wymień je w kolejności przebiegu pracy: poleceniodawca → (koordynujący) → dopuszczający → kierujący zespołem → członkowie zespołu, plus nadzorujący, gdy pracują osoby bez kwalifikacji.'
            : 'Przeczytaj jeszcze raz tabelę osób funkcyjnych powyżej i spróbuj ponownie. Najczęstszy błąd: mylenie dopuszczającego (przygotowuje strefę) z kierującym zespołem (przyjmuje ją i kieruje pracą).'}
        </NoteBox>
      ) : null}
      <Button variant="secondary" onClick={reset}><RotateCcw className="mr-1 h-4 w-4" /> Od nowa</Button>
    </div>
  )
}
