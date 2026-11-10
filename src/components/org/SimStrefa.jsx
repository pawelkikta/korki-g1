import React, { useState } from 'react'
import { RotateCcw, Check } from 'lucide-react'
import { Button, NoteBox } from '../ui.jsx'
import { strefaPrep, strefaClose } from '../../data/orgWork.js'

// Przygotowanie i likwidacja strefy pracy – klikanie czynności w kolejności,
// schemat pokazuje na bieżąco stan łącznika, blokady, uziemiaczy i strefy.

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const C = { L: 'var(--c-a05a1f)', N: 'var(--c-2b6cb0)', PE: 'var(--c-1f7a4d)', dead: 'var(--c-b9c4bd)', hot: 'var(--c-d97706)', bad: 'var(--c-b3261e)', gray: 'var(--c-66736c)' }
const WIRES = [
  { y: 52, label: 'L1', color: C.L },
  { y: 72, label: 'L2', color: C.L },
  { y: 92, label: 'L3', color: C.L },
  { y: 112, label: 'N', color: C.N },
]

function Scene({ s }) {
  const live = !s.open
  return (
    <svg viewBox="0 0 640 210" className="w-full">
      {/* zasilanie po lewej – zawsze pod napięciem */}
      <text x="22" y="34" fill={C.gray} fontSize="9" fontFamily="monospace">ZASILANIE 400/230 V</text>
      {WIRES.map((w) => (
        <g key={w.y}>
          <text x="22" y={w.y + 4} fill={w.color} fontSize="9" fontFamily="monospace" fontWeight="bold">{w.label}</text>
          <line x1="42" y1={w.y} x2="132" y2={w.y} stroke={w.color} strokeWidth="2.5" />
          {/* nóż rozłącznika: zamknięty poziomo, otwarty pod kątem */}
          <circle cx="132" cy={w.y} r="2.5" fill="var(--c-2b3530)" />
          <line x1="132" y1={w.y} x2={s.open ? 150 : 158} y2={s.open ? w.y - 12 : w.y} stroke="var(--c-2b3530)" strokeWidth="2.5" style={{ transition: 'all 0.3s' }} />
          <circle cx="160" cy={w.y} r="2.5" fill="var(--c-2b3530)" />
          <line x1="160" y1={w.y} x2="620" y2={w.y} stroke={live ? w.color : C.dead} strokeWidth="2.5" style={{ transition: 'stroke 0.3s' }} />
        </g>
      ))}
      <text x="146" y="128" fill={C.gray} fontSize="8" fontFamily="monospace" textAnchor="middle">rozłącznik</text>

      {/* przepływ energii, gdy obwód jest załączony */}
      {live ? (
        <path d="M 42 52 L 620 52 M 42 72 L 620 72 M 42 92 L 620 92" fill="none" stroke={C.hot} strokeWidth="1.6" strokeDasharray="5 9" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>
      ) : null}

      {/* blokada + tablica w miejscu wyłączenia */}
      {s.locked ? (
        <g>
          <rect x="138" y="146" width="16" height="12" rx="2" fill="var(--c-2b3530)" />
          <path d="M 141 146 L 141 141 a 5 5 0 0 1 10 0 L 151 146" fill="none" stroke="var(--c-2b3530)" strokeWidth="2" />
          <rect x="70" y="166" width="156" height="32" fill="var(--c-fdf0ee)" stroke={C.bad} strokeWidth="1.5" />
          <text x="148" y="179" fill={C.bad} fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">NIE ZAŁĄCZAĆ</text>
          <text x="148" y="191" fill={C.bad} fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PRACUJĄ LUDZIE</text>
        </g>
      ) : null}

      {/* wskaźnik napięcia */}
      {s.tested || s.checked ? (
        <g>
          <rect x="236" y="128" width="40" height="22" rx="3" fill="var(--c-f3f6f4)" stroke={C.gray} strokeWidth="1.5" />
          <text x="256" y="143" fill={s.checked ? C.PE : C.gray} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{s.checked ? '0 V' : 'TEST'}</text>
          {s.checked ? <path d="M 256 128 L 256 116" stroke={C.gray} strokeWidth="1.5" /> : null}
          <text x="256" y="164" fill={C.gray} fontSize="8" fontFamily="monospace" textAnchor="middle">{s.checked ? 'L1 L2 L3 N' : 'wskaźnik OK'}</text>
        </g>
      ) : null}

      {/* uziemiacze/zwieracze po obu stronach strefy */}
      {s.earthed
        ? [330, 590].map((x) => (
            <g key={x}>
              <line x1={x} y1="52" x2={x} y2="150" stroke={C.PE} strokeWidth="2.5" />
              {WIRES.map((w) => <circle key={w.y} cx={x} cy={w.y} r="3" fill={C.PE} />)}
              <line x1={x - 12} y1="152" x2={x + 12} y2="152" stroke={C.PE} strokeWidth="2.5" />
              <line x1={x - 8} y1="157" x2={x + 8} y2="157" stroke={C.PE} strokeWidth="2" />
              <line x1={x - 4} y1="162" x2={x + 4} y2="162" stroke={C.PE} strokeWidth="1.5" />
            </g>
          ))
        : null}
      {s.earthed ? <text x="460" y="176" fill={C.PE} fontSize="8" fontFamily="monospace" textAnchor="middle">uziemiacze z obu stron strefy</text> : null}

      {/* strefa pracy */}
      {s.fenced ? (
        <g>
          <rect x="360" y="30" width="200" height="128" fill="none" stroke="var(--c-d9b310)" strokeWidth="2.5" strokeDasharray="8 5" />
          <text x="460" y="24" fill="var(--c-8a6d00)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">STREFA PRACY – TU PRACOWAĆ</text>
        </g>
      ) : null}

      {/* zespół w strefie */}
      {s.admitted
        ? [430, 490].map((x) => (
            <g key={x}>
              {/* pracownik w kasku: głowa, kask, tułów, ręce, nogi */}
              <circle cx={x} cy="122" r="6" fill="none" stroke={C.gray} strokeWidth="2" />
              <path d={`M ${x - 7} 120 a 7 6 0 0 1 14 0 Z`} fill="var(--c-d9b310)" />
              <line x1={x} y1="128" x2={x} y2="142" stroke={C.gray} strokeWidth="2" />
              <path d={`M ${x - 8} 139 L ${x} 131 L ${x + 8} 139`} fill="none" stroke={C.gray} strokeWidth="2" />
              <path d={`M ${x - 6} 154 L ${x} 142 L ${x + 6} 154`} fill="none" stroke={C.gray} strokeWidth="2" />
            </g>
          ))
        : null}

      {/* status */}
      <text x="620" y="204" fill={live ? C.bad : C.PE} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">
        {s.label}
      </text>
    </svg>
  )
}

function sceneState(mode, n) {
  if (mode === 'prep') {
    const s = { open: n >= 2, locked: n >= 3, tested: n >= 4, checked: n >= 5, earthed: n >= 6, fenced: n >= 7, admitted: n >= 8 }
    s.label = n === 0 ? 'OBWÓD POD NAPIĘCIEM' : n >= 8 ? 'ZESPÓŁ DOPUSZCZONY DO PRACY' : n >= 6 ? 'OBWÓD WYŁĄCZONY I UZIEMIONY' : n >= 2 ? 'OBWÓD WYŁĄCZONY – JESZCZE NIEZABEZPIECZONY' : 'OBWÓD POD NAPIĘCIEM'
    return s
  }
  const s = { admitted: n < 1, checked: n < 4, tested: false, earthed: n < 4, fenced: n < 5, locked: n < 5, open: n < 7 }
  s.label = n >= 7 ? 'URZĄDZENIE ZAŁĄCZONE' : n >= 6 ? 'GOTOWE DO RUCHU – CZEKA NA ZGODĘ' : n >= 4 ? 'UZIEMIACZE ZDJĘTE' : n >= 1 ? 'ZESPÓŁ POZA STREFĄ' : 'ZESPÓŁ PRACUJE'
  return s
}

export function SimStrefa() {
  const [mode, setMode] = useState('prep')
  const steps = mode === 'prep' ? strefaPrep : strefaClose
  const [order, setOrder] = useState(() => shuffled(strefaPrep))
  const [done, setDone] = useState(0)
  const [error, setError] = useState(null)
  const [mistakes, setMistakes] = useState(0)

  const reset = (m = mode) => {
    setMode(m)
    setOrder(shuffled(m === 'prep' ? strefaPrep : strefaClose))
    setDone(0)
    setError(null)
    setMistakes(0)
  }

  const click = (step) => {
    if (step.id <= done) return
    if (step.id === done + 1) {
      setDone(done + 1)
      setError(null)
    } else {
      setError(step)
      setMistakes((m) => m + 1)
    }
  }

  const complete = done === steps.length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'prep', label: 'Przygotowanie strefy' },
          { id: 'close', label: 'Zakończenie i likwidacja' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => reset(m.id)}
            className={`rounded-xs edge px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition ${mode === m.id ? 'bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'bg-[color:var(--b-fafbfa)] text-gray-500 hover:text-gray-800'}`}
            style={{ '--e': mode === m.id ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-2">
        <Scene s={sceneState(mode, done)} />
      </div>

      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        {mode === 'prep' ? 'Jesteś dopuszczającym. ' : 'Praca skończona. '}Klikaj czynności we właściwej kolejności ({done}/{steps.length}) · błędy: {mistakes}
      </div>
      <div className="grid gap-1.5 md:grid-cols-2">
        {order.map((s) => {
          const ok = s.id <= done
          return (
            <button
              key={s.id}
              disabled={ok}
              onClick={() => click(s)}
              className={`flex items-start gap-2 border px-3 py-2 text-left text-sm leading-5 transition ${
                ok ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-1a5c46)] hover:text-gray-900'
              }`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-[10px] font-bold ${ok ? 'border-[color:var(--c-1f7a4d)]' : 'border-[color:var(--c-d7ded9)]'}`}>
                {ok ? <Check className="h-3 w-3" /> : '?'}
              </span>
              {s.label}
            </button>
          )
        })}
      </div>

      {error ? <NoteBox type="mistake" title="Jeszcze nie teraz">{error.whyNot}</NoteBox> : null}

      {complete ? (
        <NoteBox type="remember" title={mistakes === 0 ? 'Bezbłędnie ✓' : `Komplet – z ${mistakes} ${mistakes === 1 ? 'błędem' : 'błędami'} po drodze`}>
          {mode === 'prep'
            ? 'Strefa przygotowana: wyłączone, zablokowane, sprawdzone, uziemione, oznaczone – i dopiero wtedy zespół. Teraz przećwicz likwidację strefy – tam kolejność jest odwrotna.'
            : 'Likwidacja w odwrotnej kolejności niż przygotowanie: najpierw ludzie, potem uziemiacze, na końcu blokady i załączenie – zawsze za zgodą.'}
        </NoteBox>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => reset()}><RotateCcw className="mr-1 h-4 w-4" /> Od nowa</Button>
        {complete && mode === 'prep' ? <Button onClick={() => reset('close')}>Przejdź do likwidacji strefy</Button> : null}
      </div>
    </div>
  )
}
