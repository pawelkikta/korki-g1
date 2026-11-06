import React, { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button, NoteBox, ValueTile } from '../ui.jsx'

// RCBO = MCB + RCD w jednym module – trzy rodzaje awarii, trzy mechanizmy wykrywania

const SCENARIOS = [
  {
    id: 'overload', label: 'Przeciążenie', desc: 'czajnik + piekarnik + zmywarka naraz',
    section: 'bimetal',
    verdict: { title: 'Wykrył: wyzwalacz TERMICZNY (sekcja nadprądowa)', text: 'Prąd 32 A = 2×In (16 A). Bimetal nagrzewa się i po kilkudziesięciu sekundach wygina, zwalniając zapadkę (przy lekkim przeciążeniu trwa to minuty). Sekcja różnicowa nic nie widzi – prąd L i N są równe, po prostu za duże.' },
  },
  {
    id: 'short', label: 'Zwarcie L-N', desc: 'przebity przewód w uszkodzonym przedłużaczu',
    section: 'coil',
    verdict: { title: 'Wykrył: wyzwalacz ELEKTROMAGNETYCZNY (sekcja nadprądowa)', text: 'Prąd zwarciowy setki amperów – cewka odrzuca styk w < 0,01 s. Bimetal nie zdążyłby się nawet nagrzać, różnicówka nie reaguje (prąd wraca przewodem N, nie ucieka).' },
  },
  {
    id: 'leak', label: 'Upływ do PE', desc: 'pęknięta izolacja grzałki pralki',
    section: 'toroid',
    verdict: { title: 'Wykrył: PRZEKŁADNIK RÓŻNICOWY (sekcja różnicowa)', text: 'Część prądu ucieka przez PE – w przekładniku pojawia się różnica L−N i RCBO wyłącza w < 300 ms. Sekcja nadprądowa nie reaguje: 30 mA upływu to dla niej nic. To awaria, którą widzi TYLKO różnicówka.' },
  },
]

// L przechodzi przez obie sekcje; N – tylko przez przekładnik i styk (jak w typowym RCBO 1P+N).
// Przekładnik obejmuje OBA przewody – inaczej nie mógłby porównać prądu L i N.
function Schematic({ active, tripped }) {
  const hl = (id, color) => (active === id ? color : 'var(--c-66736c)')
  const L = 90
  const N = 150
  return (
    <svg viewBox="0 0 250 290" className="w-full max-w-[280px]">
      <text x="125" y="12" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">RCBO 1P+N – dwie sekcje w jednym module</text>
      {/* zaciski górne */}
      <rect x={L - 12} y="22" width="24" height="12" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      <rect x={N - 12} y="22" width="24" height="12" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      <text x={L - 18} y="32" fill="var(--c-a05a1f)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">L</text>
      <text x={N + 18} y="32" fill="var(--c-2b6cb0)" fontSize="10" fontFamily="monospace" fontWeight="bold">N</text>

      {/* sekcja nadprądowa – tylko na L */}
      <rect x="60" y="46" width="60" height="96" rx="6" fill="none" stroke="var(--c-b9c4bd)" strokeDasharray="4 4" />
      <text x="162" y="62" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">sekcja</text>
      <text x="162" y="72" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">nadprądowa</text>
      <text x="162" y="82" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">(tylko L)</text>
      <line x1={L} y1="34" x2={L} y2="52" stroke="var(--c-66736c)" strokeWidth="3" />
      <path d={`M ${L} 52 L ${L - 12} 62 L ${L + 12} 72 L ${L - 12} 82 L ${L} 90`} fill="none" stroke={hl('bimetal', 'var(--c-d97706)')} strokeWidth={active === 'bimetal' ? 4 : 3}
        style={{ transition: 'stroke 0.3s', filter: active === 'bimetal' ? 'drop-shadow(0 0 4px var(--c-d97706))' : 'none' }} />
      <text x="54" y="74" fill={hl('bimetal', 'var(--c-b3540f)')} fontSize="9" fontFamily="monospace" textAnchor="end">bimetal</text>
      <path d={`M ${L} 90 q 13 5 0 10 q -13 5 0 10 q 13 5 0 10 q -13 5 0 12`} fill="none" stroke={hl('coil', 'var(--c-b3261e)')} strokeWidth={active === 'coil' ? 4 : 3}
        style={{ transition: 'stroke 0.3s', filter: active === 'coil' ? 'drop-shadow(0 0 5px var(--c-b3261e))' : 'none' }} />
      <text x="54" y="116" fill={hl('coil', 'var(--c-b3261e)')} fontSize="9" fontFamily="monospace" textAnchor="end">cewka</text>
      <line x1={L} y1="132" x2={L} y2="216" stroke="var(--c-66736c)" strokeWidth="3" />
      {/* N – prosto, poza sekcją nadprądową */}
      <line x1={N} y1="34" x2={N} y2="216" stroke="var(--c-2b6cb0)" strokeWidth="3" />

      {/* sekcja różnicowa – przekładnik obejmuje L i N */}
      <rect x="54" y="152" width="132" height="54" rx="6" fill="none" stroke="var(--c-b9c4bd)" strokeDasharray="4 4" />
      <ellipse cx="120" cy="179" rx="50" ry="17" fill="none" stroke={hl('toroid', 'var(--c-b3261e)')} strokeWidth={active === 'toroid' ? 5 : 4}
        style={{ transition: 'stroke 0.3s', filter: active === 'toroid' ? 'drop-shadow(0 0 5px var(--c-b3261e))' : 'none' }} />
      <text x="120" y="182" fill={hl('toroid', 'var(--c-b3261e)')} fontSize="8" fontFamily="monospace" textAnchor="middle">Σ L−N</text>
      <text x="192" y="170" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">sekcja</text>
      <text x="192" y="180" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">różnicowa</text>
      <text x="192" y="190" fill={hl('toroid', 'var(--c-b3261e)')} fontSize="8" fontFamily="monospace">(L i N)</text>

      {/* styki L i N – wspólny napęd */}
      {[L, N].map((x) => (
        <g key={x}>
          <circle cx={x} cy="218" r="3" fill="var(--c-2b3530)" />
          <line x1={x} y1="218" x2={tripped ? x + 22 : x} y2={tripped ? 233 : 246} stroke="var(--c-2b3530)" strokeWidth="3" style={{ transition: 'all 0.25s' }} />
          <circle cx={x} cy="248" r="3" fill="var(--c-2b3530)" />
          <line x1={x} y1="250" x2={x} y2="260" stroke="var(--c-66736c)" strokeWidth="3" />
          <rect x={x - 12} y="260" width="24" height="12" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
        </g>
      ))}
      <line x1={tripped ? L + 11 : L} y1={tripped ? 226 : 232} x2={tripped ? N + 11 : N} y2={tripped ? 226 : 232} stroke="var(--c-8a958e)" strokeWidth="1.2" strokeDasharray="3 3" style={{ transition: 'all 0.25s' }} />
      <text x="54" y="232" fill="var(--c-66736c)" fontSize="8" fontFamily="monospace" textAnchor="end">styki</text>
      <text x="54" y="242" fill="var(--c-66736c)" fontSize="8" fontFamily="monospace" textAnchor="end">L + N</text>

      {!tripped ? (
        <>
          <path d={`M ${L} 34 L ${L} 52 L ${L - 12} 62 L ${L + 12} 72 L ${L - 12} 82 L ${L} 90 L ${L} 246 L ${L} 272`} fill="none" stroke="var(--c-d97706)" strokeWidth="1.8" strokeDasharray="5 9" opacity="0.85">
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d={`M ${N} 272 L ${N} 34`} fill="none" stroke="var(--c-d97706)" strokeWidth="1.8" strokeDasharray="5 9" opacity="0.85">
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
        </>
      ) : (
        <text x="120" y="286" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">WYŁĄCZONY – L i N rozłączone</text>
      )}
    </svg>
  )
}

export function DeviceRCBO() {
  const [active, setActive] = useState(null)
  const [tripped, setTripped] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const timer = useRef(null)

  const run = (sc) => {
    clearTimeout(timer.current)
    setTripped(false)
    setVerdict(null)
    setActive(sc.section)
    timer.current = setTimeout(() => {
      setTripped(true)
      setVerdict(sc.verdict)
      setActive(null)
    }, sc.id === 'overload' ? 1600 : 500)
  }

  const reset = () => {
    clearTimeout(timer.current)
    setActive(null)
    setTripped(false)
    setVerdict(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)] md:items-start">
        <Schematic active={active} tripped={tripped} />
        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Wybierz awarię i zobacz, która sekcja ją wykryje:</div>
          <div className="grid gap-2">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => run(sc)}
                disabled={!!active}
                className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-2.5 text-left transition hover:border-[color:var(--c-1a5c46)] disabled:opacity-50"
              >
                <div className="text-sm font-bold text-gray-900">{sc.label}</div>
                <div className="text-xs text-gray-500">{sc.desc}</div>
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" /> Załącz ponownie</Button>
        </div>
      </div>

      {verdict ? <NoteBox type="mistake" title={verdict.title}>{verdict.text}</NoteBox> : null}

      <div className="grid grid-cols-2 gap-2">
        <ValueTile value="MCB + RCD" label="dwa aparaty w jednym module – chroni kable I ludzi" />
        <ValueTile value="1 obwód" label="awaria pralki nie gasi lodówki – selektywność" />
      </div>
      <NoteBox type="remember" title="Po co RCBO, skoro są osobne aparaty?">
        Miejsce w rozdzielnicy i selektywność. Jedna wspólna różnicówka na pół mieszkania = upływ w pralce gasi też lodówkę i zamrażarkę.
        RCBO na każdy obwód = wyłącza się tylko chory obwód. W praktyce: nowoczesne rozdzielnice mieszkaniowe.
      </NoteBox>
    </div>
  )
}
