import React, { useState } from 'react'
import { NoteBox } from '../ui.jsx'

// „Napięcie jest MIĘDZY dwoma punktami" – wirtualny woltomierz.
// Punkty neutralne (N, PE, kaloryfer, ziemia) mają praktycznie ten sam potencjał,
// bo wszystkie schodzą się w uziemionym punkcie gwiazdowym stacji.

const POINTS = [
  { id: 'L1', label: 'L1', desc: 'faza 1', kind: 'phase', color: 'var(--c-a05a1f)' },
  { id: 'L2', label: 'L2', desc: 'faza 2', kind: 'phase', color: 'var(--c-a05a1f)' },
  { id: 'L3', label: 'L3', desc: 'faza 3', kind: 'phase', color: 'var(--c-a05a1f)' },
  { id: 'N', label: 'N', desc: 'neutralny', kind: 'neutral', color: 'var(--c-2b6cb0)' },
  { id: 'PE', label: 'PE', desc: 'ochronny', kind: 'neutral', color: 'var(--c-1f7a4d)' },
  { id: 'KAL', label: 'Kaloryfer', desc: 'metal uziemiony', kind: 'neutral', color: 'var(--c-66736c)' },
  { id: 'ZIEM', label: 'Ziemia', desc: 'mokra trawa', kind: 'neutral', color: 'var(--c-8a6d2f)' },
]

function measure(a, b) {
  if (!a || !b) return null
  const A = POINTS.find((p) => p.id === a)
  const B = POINTS.find((p) => p.id === b)
  if (a === b) {
    return {
      volts: 0,
      title: 'Ten sam punkt – 0 V',
      text: 'Napięcie to RÓŻNICA potencjałów. Między punktem a nim samym różnicy nie ma. Dlatego ptak siedzący na jednym przewodzie żyje – obie nóżki są w tym samym potencjale.',
      type: 'remember',
    }
  }
  if (A.kind === 'phase' && B.kind === 'phase') {
    return {
      volts: 400,
      title: `${A.label} – ${B.label}: napięcie międzyfazowe 400 V`,
      text: 'Dwie różne fazy. Nie 460 V (2 × 230), bo napięcia są przesunięte w czasie o 120° – dodają się „po skosie": 230 × √3 ≈ 400 V. Na tym napięciu pracuje kuchenka, przepływowy podgrzewacz i silniki 3-fazowe.',
      type: 'warning',
    }
  }
  if (A.kind === 'phase' || B.kind === 'phase') {
    const other = A.kind === 'phase' ? B : A
    const phase = A.kind === 'phase' ? A : B
    const why = {
      N: 'To podstawowy pomiar – napięcie fazowe względem punktu gwiazdowego stacji.',
      PE: 'PE schodzi się z N w rozdzielnicy, a dalej w punkcie gwiazdowym – więc ma ten sam potencjał co N. Stąd te same 230 V.',
      KAL: 'Kaloryfer jest połączony z ziemią (rury, połączenia wyrównawcze), a ziemia z uziemionym punktem gwiazdowym. Dlatego między fazą a kaloryferem jest PEŁNE 230 V – i dlatego dotknięcie fazy przy kaloryferze zabija.',
      ZIEM: 'Ziemia jest „podłączona" do punktu gwiazdowego przez uziom stacji. Stojąc na mokrej trawie i dotykając fazy, masz na sobie 230 V – bez dotykania jakiegokolwiek drugiego przewodu.',
    }[other.id]
    return {
      volts: 230,
      title: `${phase.label} – ${other.label}: napięcie fazowe 230 V`,
      text: why,
      type: other.id === 'N' ? 'remember' : 'trap',
    }
  }
  // dwa punkty „neutralne"
  return {
    volts: 0,
    title: `${A.label} – ${B.label}: około 0 V`,
    text: 'Oba punkty schodzą się ostatecznie w tym samym miejscu – uziemionym punkcie gwiazdowym stacji. W praktyce zobaczysz kilka woltów (spadki napięcia na przewodzie N pod obciążeniem), ale to nie jest napięcie robocze. UWAGA: to nie znaczy, że N jest bezpieczny – przy przerwie w N potrafi „ożyć".',
    type: A.id === 'N' || B.id === 'N' ? 'warning' : 'remember',
  }
}

export function VoltmeterLab() {
  const [a, setA] = useState('L1')
  const [b, setB] = useState('N')
  const r = measure(a, b)

  const Row = ({ value, setValue, other, tag }) => (
    <div>
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Sonda {tag}</div>
      <div className="flex flex-wrap gap-1.5">
        {POINTS.map((p) => {
          const active = value === p.id
          return (
            <button
              key={p.id}
              onClick={() => setValue(p.id)}
              className={`cham-sm edge px-2.5 py-1.5 text-left transition ${active ? 'bg-[color:var(--b-e7f0eb)]' : 'bg-[color:var(--b-fafbfa)] hover:bg-[color:var(--b-ffffff)]'}`}
              style={{ '--e': active ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
            >
              <div className="font-mono text-[13px] font-bold" style={{ color: active ? 'var(--c-14543e)' : p.color }}>{p.label}</div>
              <div className="text-[10px] text-gray-500">{p.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px] md:items-start">
        <div className="space-y-3">
          <Row value={a} setValue={setA} tag="A (czerwona)" />
          <Row value={b} setValue={setB} tag="B (czarna)" />
        </div>

        {/* woltomierz */}
        <svg viewBox="0 0 240 200" className="mx-auto w-full max-w-[260px]">
          <rect x="10" y="10" width="220" height="150" rx="4" fill="var(--c-f3f6f4)" stroke="var(--c-8a958e)" strokeWidth="2" />
          <rect x="26" y="30" width="188" height="60" rx="3" fill="var(--c-0f1c17)" />
          <text x="120" y="74" fill={r?.volts === 0 ? 'var(--c-7ed99a)' : 'var(--c-ffd479)'} fontSize="34" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            {r ? (r.volts === 0 ? '~0' : r.volts) : '––'}
          </text>
          <text x="200" y="74" fill="var(--c-66736c)" fontSize="13" fontFamily="monospace" textAnchor="end">V</text>
          <text x="120" y="110" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace" textAnchor="middle">
            {a} ↔ {b}
          </text>
          <text x="120" y="130" fill="var(--c-8a958e)" fontSize="9" fontFamily="monospace" textAnchor="middle">AC · TRUE RMS</text>
          {/* przewody sond */}
          <path d="M 60 160 L 60 186" stroke="var(--c-b3261e)" strokeWidth="3" fill="none" />
          <circle cx="60" cy="190" r="5" fill="var(--c-b3261e)" />
          <text x="70" y="182" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="start">A</text>
          <path d="M 180 160 L 180 186" stroke="var(--c-2b3530)" strokeWidth="3" fill="none" />
          <circle cx="180" cy="190" r="5" fill="var(--c-2b3530)" />
          <text x="170" y="182" fill="var(--c-2b3530)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">B</text>
        </svg>
      </div>

      {r ? <NoteBox type={r.type} title={r.title}>{r.text}</NoteBox> : null}

      <NoteBox type="remember" title="Najważniejszy wniosek z tego ćwiczenia">
        Napięcie <strong className="font-semibold text-[color:var(--c-14543e)]">nie siedzi „w przewodzie"</strong> – jest zawsze <strong className="font-semibold text-[color:var(--c-14543e)]">między dwoma
        punktami</strong>. Faza sama w sobie nie jest groźna, dopóki nie ma drugiego punktu o innym potencjale. Problem w tym, że tym drugim
        punktem jest <strong className="font-semibold text-[color:var(--c-14543e)]">cała ziemia dookoła ciebie</strong> – podłoga, rury, kaloryfer, wilgotna ściana.
      </NoteBox>
    </div>
  )
}
