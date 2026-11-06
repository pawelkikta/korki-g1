import React, { useRef, useState } from 'react'
import { Zap, RotateCcw, Hand } from 'lucide-react'
import { Button, NoteBox, ValueTile } from '../ui.jsx'

// RCD 30 mA – przekładnik sumujący porównuje prąd w L i N; różnica = upływ → wyzwolenie

function ModuleFront({ tripped, onTest }) {
  return (
    <svg viewBox="0 0 160 200" className="mx-auto w-full max-w-[190px]">
      <rect x="20" y="10" width="120" height="180" rx="6" fill="var(--c-f3f6f4)" stroke="var(--c-8a958e)" strokeWidth="2" />
      {/* zaciski 2P */}
      {[50, 110].map((x) => (
        <g key={x}>
          <rect x={x - 14} y="10" width="28" height="16" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
          <rect x={x - 14} y="174" width="28" height="16" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
          <circle cx={x} cy="18" r="4" fill="none" stroke="var(--c-66736c)" strokeWidth="1.5" />
          <circle cx={x} cy="182" r="4" fill="none" stroke="var(--c-66736c)" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="35" y="70" width="40" height="60" rx="4" fill="var(--c-e7ebec)" stroke="var(--c-8a958e)" />
      <g style={{ transition: 'transform 0.25s ease-in', transform: tripped ? 'translateY(26px)' : 'translateY(0)' }}>
        <rect x="42" y="76" width="26" height="22" rx="3" fill={tripped ? 'var(--c-b3261e)' : 'var(--c-1a5c46)'} />
        <text x="55" y="91" fill="var(--c-ffffff)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{tripped ? 'OFF' : 'ON'}</text>
      </g>
      {/* przycisk TEST – klikalny */}
      <g onClick={onTest} style={{ cursor: 'pointer' }}>
        <rect x="92" y="86" width="34" height="26" rx="4" fill="var(--c-d97706)" stroke="var(--c-b3540f)" strokeWidth="1.5" />
        <text x="109" y="103" fill="var(--c-ffffff)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TEST</text>
      </g>
      <text x="80" y="46" fill="var(--c-2b3530)" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RCD 25A</text>
      <text x="80" y="59" fill="var(--c-14543e)" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">IΔn = 30 mA</text>
      <text x="80" y="152" fill="var(--c-66736c)" fontSize="7" fontFamily="monospace" textAnchor="middle">typ A · test co miesiąc</text>
      <text x="109" y="126" fill="var(--c-8a6d2f)" fontSize="7" fontFamily="monospace" textAnchor="middle">← kliknij</text>
    </svg>
  )
}

function Schematic({ leak, tripped, testing }) {
  const flowing = !tripped
  const imbalance = leak > 0 || testing
  return (
    <svg viewBox="0 0 300 270" className="w-full max-w-[330px]">
      <text x="150" y="14" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">zasada działania (schemat)</text>
      {/* L i N z góry przez przekładnik do odbiornika */}
      <text x="92" y="34" fill="var(--c-b3540f)" fontSize="10" fontFamily="monospace">L</text>
      <text x="196" y="34" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace">N</text>
      {/* styki */}
      <circle cx="100" cy="44" r="3" fill="var(--c-2b3530)" />
      <line x1="100" y1="44" x2={tripped ? 122 : 100} y2={tripped ? 56 : 68} stroke="var(--c-2b3530)" strokeWidth="3" style={{ transition: 'all 0.25s' }} />
      <circle cx="100" cy="70" r="3" fill="var(--c-2b3530)" />
      <circle cx="200" cy="44" r="3" fill="var(--c-2b3530)" />
      <line x1="200" y1="44" x2={tripped ? 222 : 200} y2={tripped ? 56 : 68} stroke="var(--c-2b3530)" strokeWidth="3" style={{ transition: 'all 0.25s' }} />
      <circle cx="200" cy="70" r="3" fill="var(--c-2b3530)" />
      {/* przewody przez toroid */}
      <line x1="100" y1="70" x2="100" y2="190" stroke="var(--c-d68a0a)" strokeWidth="3" />
      <line x1="200" y1="70" x2="200" y2="190" stroke="var(--c-8a958e)" strokeWidth="3" />
      {/* toroid (przekładnik Ferrantiego) */}
      <ellipse cx="150" cy="125" rx="78" ry="34" fill="none" stroke={imbalance ? 'var(--c-b3261e)' : 'var(--c-1a5c46)'} strokeWidth="5" opacity="0.85" style={{ transition: 'stroke 0.3s' }} />
      <text x="150" y="122" fill={imbalance ? 'var(--c-b3261e)' : 'var(--c-14543e)'} fontSize="9" fontFamily="monospace" textAnchor="middle">przekładnik</text>
      <text x="150" y="134" fill={imbalance ? 'var(--c-b3261e)' : 'var(--c-14543e)'} fontSize="9" fontFamily="monospace" textAnchor="middle">sumujący</text>
      {/* uzwojenie wtórne do przekaźnika */}
      <line x1="228" y1="125" x2="262" y2="125" stroke={imbalance ? 'var(--c-b3261e)' : 'var(--c-8a958e)'} strokeWidth="2" />
      <rect x="262" y="110" width="34" height="30" rx="4" fill={imbalance ? 'var(--c-fdf0ee)' : 'var(--c-f3f6f4)'} stroke={imbalance ? 'var(--c-b3261e)' : 'var(--c-8a958e)'} strokeWidth="1.5" />
      <text x="279" y="128" fill={imbalance ? 'var(--c-b3261e)' : 'var(--c-66736c)'} fontSize="8" fontFamily="monospace" textAnchor="middle">cewka</text>
      {/* odbiornik – pralka */}
      <rect x="85" y="190" width="130" height="48" rx="5" fill="var(--c-fafbfa)" stroke="var(--c-8a958e)" strokeWidth="2" />
      <circle cx="150" cy="214" r="14" fill="none" stroke="var(--c-8a958e)" strokeWidth="2" />
      <circle cx="150" cy="214" r="7" fill="none" stroke="var(--c-8a958e)" strokeWidth="1.5" />
      <text x="150" y="252" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">pralka</text>
      {/* upływ do ziemi */}
      {leak > 0 ? (
        <g>
          <path d="M 215 214 L 258 214 L 258 244" fill="none" stroke="var(--c-b3261e)" strokeWidth={Math.min(4, 1 + leak / 15)} strokeDasharray="5 8">
            <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.7s" repeatCount="indefinite" />
          </path>
          <line x1="248" y1="246" x2="268" y2="246" stroke="var(--c-b3261e)" strokeWidth="2.5" />
          <line x1="252" y1="251" x2="264" y2="251" stroke="var(--c-b3261e)" strokeWidth="2" />
          <line x1="256" y1="256" x2="260" y2="256" stroke="var(--c-b3261e)" strokeWidth="2" />
          <text x="262" y="206" fill="var(--c-b3261e)" fontSize="9" fontFamily="monospace" textAnchor="middle">upływ do PE</text>
        </g>
      ) : null}
      {/* prądy animowane */}
      {flowing ? (
        <>
          <line x1="100" y1="70" x2="100" y2="190" stroke="var(--c-d97706)" strokeWidth="1.6" strokeDasharray="5 9" opacity="0.9">
            <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.8s" repeatCount="indefinite" />
          </line>
          <line x1="200" y1="190" x2="200" y2="70" stroke="var(--c-d97706)" strokeWidth="1.6" strokeDasharray="5 9" opacity={leak > 0 ? 0.45 : 0.9}>
            <animate attributeName="stroke-dashoffset" from="0" to="28" dur="0.8s" repeatCount="indefinite" />
          </line>
        </>
      ) : (
        <text x="150" y="62" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">STYKI OTWARTE</text>
      )}
    </svg>
  )
}

export function DeviceRCD() {
  const [leak, setLeak] = useState(0)
  const [tripped, setTripped] = useState(false)
  const [testing, setTesting] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const timer = useRef(null)

  const simulate = () => {
    if (tripped) return
    clearTimeout(timer.current)
    if (leak < 15) {
      setVerdict({ type: 'remember', title: `IΔ = ${leak} mA – RCD nie zadziała (i słusznie)`, text: 'Poniżej 0,5×IΔn (15 mA) wyłącznik MA nie działać – inaczej wyłączałby się od naturalnych upływów instalacji (filtry przeciwzakłóceniowe, wilgoć).' })
    } else if (leak < 21) {
      setVerdict({ type: 'warning', title: `IΔ = ${leak} mA – strefa „może zadziałać"`, text: 'Norma: RCD musi zadziałać między 0,5×IΔn a 1×IΔn (15–30 mA). Ten egzemplarz jeszcze trzyma – ale inny mógłby już wyłączyć. Przy pomiarze miernikiem zapisujesz rzeczywisty prąd zadziałania.' })
    } else {
      // czasy jak u sprawnego wyłącznika w praktyce (limity normy: 300 ms przy 1×IΔn, 40 ms przy 5×IΔn)
      const timeMs = leak >= 150 ? 8 + Math.round(Math.random() * 8) : 18 + Math.round(Math.random() * 20)
      setVerdict(null)
      timer.current = setTimeout(() => {
        setTripped(true)
        setVerdict({
          type: 'mistake',
          title: `RCD ZADZIAŁAŁ – czas ${timeMs} ms`,
          text: `Różnica prądów L−N = ${leak} mA. Przekładnik wykrył brak równowagi, przekaźnik zwolnił zamek i styki się otworzyły. ${leak >= 30 ? `Norma dopuszcza przy 1×IΔn do 300 ms – sprawny wyłącznik robi to zwykle w 15–40 ms.` : 'Zadziałał w strefie 15–30 mA – zgodnie z normą.'} Zapamiętaj: RCD NIE ogranicza prądu rażenia do 30 mA – przez ciało płynie tyle, ile wynika z napięcia i rezystancji ciała (często setki mA). RCD skraca CZAS przepływu do kilkudziesięciu milisekund i to on ratuje życie.`,
        })
      }, 350)
    }
  }

  const doTest = () => {
    if (tripped) return
    setTesting(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setTesting(false)
      setTripped(true)
      setVerdict({ type: 'remember', title: 'Przycisk TEST – zadziałał', text: 'TEST łączy przez rezystor przewód L za przekładnikiem z przewodem N przed nim – mały prąd przechodzi przez przekładnik tylko jednym przewodem, więc powstaje sztuczna różnica. Sprawdza mechanizm, ale nie mierzy czasu ani prądu zadziałania i nie sprawdza przewodu PE – do protokołu potrzebny miernik RCD.' })
    }, 350)
  }

  const reset = () => {
    clearTimeout(timer.current)
    setTripped(false)
    setTesting(false)
    setVerdict(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-start">
        <div>
          <ModuleFront tripped={tripped} onTest={doTest} />
          <div className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">widok symboliczny</div>
        </div>
        <Schematic leak={tripped ? 0 : leak} tripped={tripped} testing={testing} />
      </div>

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
          <span>Prąd upływu (np. przez ciało człowieka)</span>
          <span className="text-base font-black text-[color:var(--c-14543e)]">{leak} <span className="normal-case">mA</span></span>
        </div>
        <input type="range" min={0} max={60} step={1} value={leak} onChange={(e) => setLeak(Number(e.target.value))} className="mt-3 w-full" />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>0</span><span>15 (0,5×IΔn)</span><span>30 (1×IΔn)</span><span>60 mA</span></div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <ValueTile value="10000 mA" label="prąd w przewodzie L (pralka grzeje, ~10 A)" />
          <ValueTile value={`${10000 - (tripped ? 0 : leak)} mA`} label="prąd wraca przewodem N" />
          <ValueTile value={`${tripped ? 0 : leak} mA`} label="różnica = ucieka poza obwód" tone={leak >= 15 ? 'red' : 'amber'} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={simulate} disabled={tripped}><Zap className="mr-2 h-4 w-4" /> Symuluj upływ</Button>
          <Button variant="secondary" onClick={doTest} disabled={tripped}><Hand className="mr-2 h-4 w-4" /> Przycisk TEST</Button>
          <Button variant="secondary" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" /> Załącz ponownie</Button>
        </div>
      </div>

      {verdict ? <NoteBox type={verdict.type} title={verdict.title}>{verdict.text}</NoteBox> : null}

      <NoteBox type="remember" title="Sedno działania">
        W zdrowym obwodzie prąd L = prąd N, pola magnetyczne w przekładniku się znoszą i nic się nie dzieje. Gdy część prądu ucieka
        (przez ciało, uszkodzoną izolację) – równowaga znika, w uzwojeniu wtórnym indukuje się napięcie i przekaźnik otwiera styki.
        RCD nie „przycina" prądu do 30 mA – 30 mA to tylko próg czułości. Chroni, bo wyłącza w ułamku sekundy.
      </NoteBox>
    </div>
  )
}
