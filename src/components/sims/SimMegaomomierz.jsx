import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RotateCcw, Check, Play } from 'lucide-react'
import { Button, NoteBox } from '../ui.jsx'

const STEPS = [
  { id: 1, label: 'Wyłącz napięcie i sprawdź jego brak wskaźnikiem', whyNot: 'Najpierw zawsze odcinasz i sprawdzasz napięcie – pomiar pod napięciem grozi porażeniem i zniszczeniem miernika.' },
  { id: 2, label: 'Odłącz odbiorniki, wyjmij żarówki, odłącz ograniczniki przepięć (SPD)', whyNot: 'Najpierw musi zniknąć napięcie. Dopiero potem odłączasz odbiorniki i SPD – 500 V DC zniszczyłoby elektronikę, a warystor SPD zaczyna przewodzić i zaniża wynik.' },
  { id: 3, label: 'Podłącz miernik: L–PE, N–PE, L–N (albo zwarte L+N do PE)', whyNot: 'Miernik podłączasz dopiero do obwodu wyłączonego i opróżnionego z odbiorników.' },
  { id: 4, label: 'Zmierz i odczytaj wynik po ustabilizowaniu (ok. 60 s)', whyNot: 'Pomiar wykonujesz po podłączeniu miernika – izolacja ładuje się jak kondensator, wynik stabilizuje się z czasem.' },
  { id: 5, label: 'Rozładuj obwód – nie odpinaj przewodów, aż miernik pokaże 0 V', whyNot: 'Rozładowanie wykonuje się PO pomiarze – obwód trzyma ładunek po 500 V DC i może razić!' },
  { id: 6, label: 'Zapisz wynik w protokole (MΩ + ocena)', whyNot: 'Protokół wypełniasz na końcu, gdy masz ustabilizowany i rozładowany pomiar.' },
]

function shuffled() {
  const a = [...STEPS]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function ProcedureGame() {
  const [order] = useState(shuffled)
  const [doneCount, setDoneCount] = useState(0)
  const [error, setError] = useState(null)
  const [resetKey, setResetKey] = useState(0)

  const items = useMemo(() => order, [order]) // stała kolejność wyświetlania w rundzie

  const click = (step) => {
    if (step.id === doneCount + 1) {
      setDoneCount((c) => c + 1)
      setError(null)
    } else if (step.id > doneCount + 1) {
      setError(step)
    }
  }

  const complete = doneCount === STEPS.length

  return (
    <div key={resetKey} className="space-y-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        Ćwiczenie: klikaj czynności we właściwej kolejności ({doneCount}/{STEPS.length})
      </div>
      <div className="grid gap-1.5 md:grid-cols-2">
        {items.map((s) => {
          const done = s.id <= doneCount
          return (
            <button
              key={s.id}
              disabled={done}
              onClick={() => click(s)}
              className={`flex items-start gap-2 border px-3 py-2 text-left text-sm leading-5 transition ${
                done
                  ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]'
                  : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-700 hover:border-[color:var(--c-1a5c46)] hover:text-gray-900'
              }`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-[10px] font-bold ${done ? 'border-[color:var(--c-1f7a4d)]' : 'border-[color:var(--c-d7ded9)]'}`}>
                {done ? <Check className="h-3 w-3" /> : '?'}
              </span>
              {s.label}
            </button>
          )
        })}
      </div>
      {error ? <NoteBox type="mistake" title="Za wcześnie na ten krok">{error.whyNot}</NoteBox> : null}
      {complete ? (
        <NoteBox type="remember" title="Procedura kompletna">
          Zapamiętaj zwłaszcza krok 5 – pominięcie rozładowania to najczęstszy błąd. Przewód trzyma ładunek po 500 V DC.
        </NoteBox>
      ) : null}
      <Button variant="secondary" onClick={() => { setDoneCount(0); setError(null); setResetKey((k) => k + 1) }}>
        <RotateCcw className="mr-1 h-4 w-4" /> Od nowa
      </Button>
    </div>
  )
}

function Gauge({ megohms, seconds }) {
  // skala logarytmiczna 0,01..1000 MΩ na łuku 180°
  const logMin = Math.log10(0.01)
  const logMax = Math.log10(1000)
  const toT = (v) => (Math.log10(v) - logMin) / (logMax - logMin)
  const t = toT(megohms)
  const angle = -90 + t * 180
  const ok = megohms >= 1

  // punkt na łuku (r = 110) dla wartości v – granica stref liczona z tej samej skali co podziałka
  const arcPoint = (v, r = 110) => {
    const a = (-90 + toT(v) * 180) * (Math.PI / 180)
    return [150 + Math.sin(a) * r, 140 - Math.cos(a) * r]
  }
  const [bx, by] = arcPoint(1)

  const ticks = [0.01, 0.1, 1, 10, 100, 1000]
  return (
    <svg viewBox="0 0 300 196" className="w-full max-w-[420px]">
      <rect x="10" y="10" width="280" height="176" fill="var(--c-f3f6f4)" stroke="var(--c-d7ded9)" />
      {/* strefa NIEZGODNE: 0,01–1 MΩ, strefa OK: od 1 MΩ – granica dokładnie na kresce „1" */}
      <path d={`M 40 140 A 110 110 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}`} fill="none" stroke="var(--c-e5b8b4)" strokeWidth="14" />
      <path d={`M ${bx.toFixed(1)} ${by.toFixed(1)} A 110 110 0 0 1 260 140`} fill="none" stroke="var(--c-9fcab1)" strokeWidth="14" />
      {ticks.map((v) => {
        const [x1, y1] = arcPoint(v, 95)
        const [x2, y2] = arcPoint(v, 118)
        const [tx, ty] = arcPoint(v, 130)
        return (
          <g key={v}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={v === 1 ? 'var(--c-b3261e)' : 'var(--c-8a958e)'} strokeWidth={v === 1 ? 2.5 : 1.5} />
            <text x={tx} y={ty} fill={v === 1 ? 'var(--c-b3261e)' : 'var(--c-66736c)'} fontSize="9" fontFamily="monospace" fontWeight={v === 1 ? 'bold' : 'normal'} textAnchor="middle">
              {v === 1 ? 'min. 1' : String(v).replace('.', ',')}
            </text>
          </g>
        )
      })}
      <line
        x1="150" y1="140"
        x2={150 + Math.sin(angle * (Math.PI / 180)) * 100}
        y2={140 - Math.cos(angle * (Math.PI / 180)) * 100}
        stroke="var(--c-14543e)" strokeWidth="3" style={{ transition: 'all 0.6s cubic-bezier(.3,1.4,.4,1)' }}
      />
      <circle cx="150" cy="140" r="6" fill="var(--c-14543e)" />
      <text x="150" y="163" fill={ok ? 'var(--c-1f7a4d)' : 'var(--c-b3261e)'} fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        {megohms >= 1000 ? '>1000' : megohms.toFixed(2).replace('.', ',')} MΩ{seconds >= 60 ? ` – ${ok ? 'OK' : 'NIEZGODNE'}` : ''}
      </text>
      {/* opisy pod wskazówką – poza zasięgiem jej ruchu */}
      <text x="150" y="179" fill={seconds > 0 && seconds < 60 ? 'var(--c-b3540f)' : 'var(--c-8a958e)'} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        500 V DC · {seconds > 0 ? `t = ${Math.min(60, Math.round(seconds))} s / 60 s` : 'gotowy do pomiaru'}
      </text>
    </svg>
  )
}

export function SimMegaomomierz() {
  const [slider, setSlider] = useState(80) // 0-100 → log 0,01..1000 MΩ (rzeczywisty stan izolacji)
  const [progress, setProgress] = useState(0) // 0..1 postępu pomiaru (60 s przyspieszone do ~6 s)
  const [phase, setPhase] = useState('idle') // idle | running | done
  const intervalRef = useRef(null)

  const target = Math.pow(10, -2 + (slider / 100) * 5)
  // odczyt rośnie asymptotycznie jak przy ładowaniu pojemności izolacji (efekt absorpcji)
  const curve = 1 - Math.exp(-4 * progress)
  const shown = phase === 'idle' ? 0.01 : phase === 'done' ? target : Math.max(0.01, target * (0.25 + 0.75 * curve))
  const seconds = phase === 'done' ? 60 : progress * 60

  const startedAtRef = useRef(0)
  const stopTimer = () => { clearInterval(intervalRef.current); intervalRef.current = null }

  // postęp liczony z zegara (nie z liczby tików) – odporny na dławienie timerów w tle
  const tick = () => {
    if (!intervalRef.current) return
    const next = Math.min(1, (Date.now() - startedAtRef.current) / 6000) // 6 s realnych = 60 s pomiaru
    setProgress(next)
    if (next >= 1) {
      stopTimer()
      setPhase('done')
    }
  }

  useEffect(() => {
    // po powrocie na kartę dociągnij pomiar do właściwego punktu (timery w tle bywają wstrzymane);
    // tick korzysta wyłącznie z refów i stabilnych setterów, więc pusta lista zależności jest bezpieczna
    document.addEventListener('visibilitychange', tick)
    window.addEventListener('focus', tick)
    return () => {
      document.removeEventListener('visibilitychange', tick)
      window.removeEventListener('focus', tick)
      stopTimer() // sprzątanie interwału TYLKO przy odmontowaniu
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startMeasure = () => {
    stopTimer()
    setPhase('running')
    setProgress(0)
    startedAtRef.current = Date.now()
    intervalRef.current = setInterval(tick, 100)
  }

  const onSlider = (v) => {
    stopTimer()
    setSlider(v)
    setPhase('idle')
    setProgress(0)
  }

  return (
    <div className="space-y-6">
      <ProcedureGame />
      <div className="border-t border-[color:var(--c-d7ded9)] pt-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Pomiar: stan izolacji badanego obwodu</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2 md:items-center">
          <Gauge megohms={shown} seconds={seconds} />
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] text-gray-500">Rzeczywisty stan izolacji (od przebitej po fabrycznie nową):</div>
              <input type="range" min={0} max={100} value={slider} onChange={(e) => onSlider(Number(e.target.value))} className="w-full" />
            </div>
            <Button onClick={startMeasure} disabled={phase === 'running'}>
              <Play className="mr-2 h-4 w-4" /> {phase === 'running' ? 'Pomiar trwa...' : phase === 'done' ? 'Zmierz ponownie (60 s)' : 'Start pomiaru (60 s)'}
            </Button>
            <div className="text-xs leading-5 text-gray-600">
              Odczyt rośnie i stabilizuje się z czasem – izolacja ładuje się jak kondensator. Dlatego wynik odczytuje się
              dopiero po ustabilizowaniu wskazania, w praktyce po 60 s (tu przyspieszone do ~6 s). Odczyt po 5 sekundach byłby zaniżony!
            </div>
            {phase === 'done' ? (
              target >= 1 ? (
                <NoteBox type="remember" title={`Wynik ustabilizowany: ${target >= 1000 ? '>1000' : target.toFixed(2).replace('.', ',')} MΩ ≥ 1 MΩ`}>
                  Instalacja 230/400 V spełnia minimum normy. Zapisz wynik z jednostką i oceną „OK" – i pamiętaj o rozładowaniu obwodu.
                </NoteBox>
              ) : (
                <NoteBox type="mistake" title={`Wynik ustabilizowany: ${target.toFixed(2).replace('.', ',')} MΩ < 1 MΩ`}>
                  Instalacja nie może być oddana do użytku – nawet 0,8 MΩ to za mało. Zlokalizuj uszkodzenie, napraw, zmierz ponownie.
                </NoteBox>
              )
            ) : phase === 'running' ? (
              <NoteBox type="warning" title="Nie odczytuj jeszcze!">
                Wskazówka wciąż się wspina – odczyt przed ustabilizowaniem byłby zaniżony i mógłbyś niesłusznie „oblać" zdrową instalację.
              </NoteBox>
            ) : (
              <NoteBox type="remember" title="Ustaw stan izolacji i zmierz">
                Suwak to rzeczywisty (nieznany elektrykowi!) stan izolacji. Miernik pozna go dopiero po pełnym pomiarze.
              </NoteBox>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
