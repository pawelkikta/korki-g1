import React, { useRef, useState } from 'react'
import { Play, TrendingUp } from 'lucide-react'
import { Button, NoteBox, ValueTile, Tag, keepCase } from '../ui.jsx'

const TESTS = [
  { id: '05', label: '0,5×IΔn (15 mA)', current: 15, shouldTrip: false, limit: null },
  { id: '1', label: '1×IΔn (30 mA)', current: 30, shouldTrip: true, limit: 300 },
  { id: '5', label: '5×IΔn (150 mA)', current: 150, shouldTrip: true, limit: 40 },
]

const TYPES = [
  { id: 'AC', reactsToPulsedDC: false, desc: 'reaguje tylko na sinusoidalny prąd AC; najprostszy, ale DZIŚ WYPIERANY – w nowej instalacji minimum to typ A' },
  { id: 'A', reactsToPulsedDC: true, desc: 'AC + pulsujący DC – obwody z elektroniką (zasilacze, AGD, LED); przy falowniku 1-fazowym lepiej typ F' },
  { id: 'B', reactsToPulsedDC: true, desc: 'wszystkie rodzaje prądu, też gładki DC – falowniki 3-fazowe, PV, ładowanie EV (albo typ A + detekcja DC 6 mA)' },
]

export function SimRCD() {
  const [result, setResult] = useState(null) // {test, tripped, timeMs}
  const [running, setRunning] = useState(false)
  const [rcdType, setRcdType] = useState('AC')
  const [waveform, setWaveform] = useState('sine') // sine | pulsedDC
  const timer = useRef(null)

  const runTest = (test) => {
    if (running) return
    setRunning(true)
    setResult(null)
    clearTimeout(timer.current)
    // czasy jak u sprawnego RCD w praktyce: przy 1×IΔn zwykle 15–40 ms (limit normy 300 ms), przy 5×IΔn kilka–kilkanaście ms (limit 40 ms)
    const timeMs = test.id === '1' ? 16 + Math.round(Math.random() * 22) : test.id === '5' ? 7 + Math.round(Math.random() * 9) : null
    timer.current = setTimeout(() => {
      setResult({ test, tripped: test.shouldTrip, timeMs })
      setRunning(false)
    }, 700)
  }

  const runRamp = () => {
    if (running) return
    setRunning(true)
    setResult(null)
    clearTimeout(timer.current)
    // rampa: prąd narasta powoli, miernik łapie moment zadziałania – zwykle 0,7–0,95×IΔn
    const tripCurrent = 21 + Math.round(Math.random() * 7)
    timer.current = setTimeout(() => {
      setResult({ ramp: true, tripCurrent, tripped: true })
      setRunning(false)
    }, 900)
  }

  const type = TYPES.find((t) => t.id === rcdType)
  const blind = waveform === 'pulsedDC' && !type.reactsToPulsedDC

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">{keepCase('Pomiar miernikiem RCD (typ ogólny, IΔn = 30 mA)')}</div>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {TESTS.map((t) => (
            <Button key={t.id} variant="secondary" disabled={running} onClick={() => runTest(t)}>
              <Play className="mr-2 h-3.5 w-3.5" /> {t.label}
            </Button>
          ))}
          <Button variant="secondary" disabled={running} onClick={runRamp}>
            <TrendingUp className="mr-2 h-3.5 w-3.5" /> Test rampą ↗
          </Button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <ValueTile
            value={running ? '...' : result ? (result.ramp ? `↗ ${result.tripCurrent} mA` : `${result.test.current} mA`) : '–'}
            label={result?.ramp ? 'rzeczywisty prąd zadziałania (rampa)' : 'przyłożony prąd różnicowy'}
          />
          <ValueTile
            value={running ? '...' : result ? (result.tripped ? 'WYŁĄCZYŁ' : 'NIE WYŁĄCZA') : '–'}
            label="reakcja RCD"
            tone={result && !result.ramp && !result.tripped && result.test.shouldTrip ? 'red' : 'amber'}
          />
          <ValueTile
            value={running ? '...' : result?.ramp ? '–' : result?.timeMs ? `${result.timeMs} ms` : '–'}
            label={result?.ramp ? 'rampa nie mierzy czasu – od tego są testy 1× i 5×IΔn' : result?.test?.limit ? `czas zadziałania (limit ${result.test.limit} ms)` : 'czas zadziałania'}
          />
        </div>
        {result ? (
          result.ramp ? (
            <div className="mt-3">
              <NoteBox type="remember" title={`Prąd zadziałania: ${result.tripCurrent} mA – w normie (15–30 mA)`}>
                Rampa powoli zwiększa prąd różnicowy i łapie dokładny moment wyzwolenia. Sprawny RCD 30 mA działa między
                0,5×IΔn a 1×IΔn – typowo przy ~0,7–0,9×IΔn. Tę wartość wpisujesz do protokołu obok czasów z testów 1×IΔn i 5×IΔn.
              </NoteBox>
            </div>
          ) : result.test.shouldTrip ? (
            <div className="mt-3">
              <NoteBox type="remember" title={`Wynik prawidłowy – ${result.timeMs} ms ≤ ${result.test.limit} ms`}>
                Przy {result.test.label} sprawny RCD musi wyłączyć w czasie ≤ {result.test.limit} ms. W praktyce nowe wyłączniki mieszczą się
                z dużym zapasem – {result.test.id === '1' ? 'typowo 15–40 ms' : 'zwykle kilka–kilkanaście ms'}. Wynik bliski limitowi to sygnał,
                że mechanizm jest „zmęczony". Czas wpisujesz do protokołu odbiorczego – przycisk TEST go nie zmierzy.
              </NoteBox>
            </div>
          ) : (
            <div className="mt-3">
              <NoteBox type="remember" title="Brak zadziałania – i bardzo dobrze">
                Przy 0,5×IΔn (15 mA) RCD ma NIE zadziałać. Gdyby wyłączał przy połowie znamionowego prądu różnicowego, wyłączałby się od naturalnych upływów instalacji.
              </NoteBox>
            </div>
          )
        ) : null}
      </div>

      <div className="border-t border-[color:var(--c-d7ded9)] pt-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Pułapka typów: czy ten RCD „widzi" ten prąd?</div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="space-y-1.5">
            <div className="text-[11px] text-gray-500">Typ wyłącznika RCD:</div>
            <div className="flex gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setRcdType(t.id)}
                  className={`flex-1 border px-3 py-2 font-mono text-sm font-bold transition ${
                    rcdType === t.id ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
                  }`}
                >
                  {t.id}
                </button>
              ))}
            </div>
            <div className="text-[11px] leading-4 text-gray-500">Typ {type.id}: {type.desc}</div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[11px] text-gray-500">Prąd upływu (co jest podłączone):</div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setWaveform('sine')}
                className={`flex-1 border px-3 py-2 text-xs transition ${waveform === 'sine' ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'}`}
              >
                Sinusoidalny AC<br /><span className="text-[10px] text-gray-500">grzałka, żarówka</span>
              </button>
              <button
                onClick={() => setWaveform('pulsedDC')}
                className={`flex-1 border px-3 py-2 text-xs transition ${waveform === 'pulsedDC' ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'}`}
              >
                Pulsujący DC<br /><span className="text-[10px] text-gray-500">upływ z obwodu z prostownikiem (elektronika)</span>
              </button>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 600 90" className="mt-3 w-full max-w-[600px]">
          <rect x="0" y="0" width="600" height="90" fill="var(--c-f3f6f4)" stroke="var(--c-d7ded9)" />
          <line x1="20" y1="45" x2="580" y2="45" stroke="var(--c-d7ded9)" strokeWidth="1" />
          {waveform === 'sine' ? (
            <path d={Array.from({ length: 113 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${20 + i * 5} ${45 - Math.sin(i / 4.5) * 28}`).join(' ')} fill="none" stroke="var(--c-14543e)" strokeWidth="2" />
          ) : (
            <path d={Array.from({ length: 113 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${20 + i * 5} ${45 - Math.max(0, Math.sin(i / 4.5)) * 38}`).join(' ')} fill="none" stroke="var(--c-14543e)" strokeWidth="2" />
          )}
          <text x="30" y="20" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace">{waveform === 'sine' ? 'prąd sinusoidalny AC' : 'prąd pulsujący DC (jednopołówkowy)'}</text>
        </svg>

        <div className="mt-3">
          {blind ? (
            <NoteBox type="trap" title={`RCD typu ${rcdType} NIE ZADZIAŁA – człowiek bez ochrony`}>
              Typ AC jest „ślepy" na pulsujący prąd DC. Przy upływie przez ciało człowieka z obwodu z elektroniką ten wyłącznik może nie zareagować.
              To kluczowa pułapka egzaminacyjna – nowoczesny sprzęt wymaga typu A lub wyższego.
            </NoteBox>
          ) : (
            <NoteBox type="remember" title={`RCD typu ${rcdType} zadziała prawidłowo`}>
              Typ {rcdType} {waveform === 'sine' ? 'wykrywa sinusoidalny prąd różnicowy – klasyczny przypadek.' : 'wykrywa pulsujący prąd DC – właściwy dobór do urządzeń z elektroniką.'}
            </NoteBox>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Tag tone="red">AC = wypierany, dziś min. typ A</Tag>
          <Tag tone="amber">A = elektronika</Tag>
          <Tag tone="amber">F = falowniki 1-fazowe</Tag>
          <Tag tone="amber">B = gładki DC: PV, napędy, EV</Tag>
          <Tag tone="red">TEST ≠ pomiar miernikiem</Tag>
        </div>
      </div>
    </div>
  )
}
