import React, { useState } from 'react'
import { NoteBox, ValueTile, Tag, keepCase } from '../ui.jsx'

// Kalkulator doboru wyłącznika nadprądowego do mocy odbiornika.
// 1-faz: I = P / (U · cosφ)   ·   3-faz: I = P / (√3 · U · cosφ)

const SERIES = [6, 10, 16, 20, 25, 32, 40, 50, 63] // szereg In wg PN-EN 60898

export function DeviceDobor() {
  const [kw, setKw] = useState(5.5)
  const [phase, setPhase] = useState('3') // '1' | '3'
  const [cosphi, setCosphi] = useState(0.85)
  const [motor, setMotor] = useState(true)

  const U = phase === '3' ? 400 : 230
  const P = kw * 1000
  // silnik: moc z tabliczki to moc na wale – prąd z sieci liczymy ze sprawnością η
  const ETA = 0.87
  const START = 7 // prąd rozruchu bezpośredniego ≈ 6–8 × IN silnika
  const eta = motor ? ETA : 1
  const denom = (phase === '3' ? Math.sqrt(3) : 1) * U * cosphi * eta
  const I = P / denom

  // In ≥ IB; dla silnika dodatkowo dolna granica wyzwalacza C (5×In) powyżej prądu rozruchu, żeby nie wybijało przy starcie
  const inValue = SERIES.find((s) => s >= I && (!motor || 5 * s > START * I)) ?? null
  const inByCurrentOnly = SERIES.find((s) => s >= I) ?? null
  const overRange = inValue === null
  const charLetter = motor ? 'C' : 'B'
  const poles = phase === '3' ? '3P' : '1P'

  const fmt = (n, d = 2) => n.toFixed(d).replace('.', ',')

  return (
    <div className="space-y-4">
      {/* wzór z podstawionymi wartościami */}
      <div className="border border-[color:var(--c-bcd4c8)] bg-[color:var(--b-e7f0eb)] px-4 py-3 text-center font-mono text-[15px] font-bold tracking-wide text-[color:var(--c-14543e)]">
        I = P / ({phase === '3' ? '√3 · ' : ''}U · cosφ{motor ? ' · η' : ''}) ={' '}
        {Math.round(P)} W / ({phase === '3' ? '√3 · ' : ''}{U} V · {fmt(cosphi)}{motor ? ` · ${fmt(ETA)}` : ''}) ≈ <span className="text-[color:var(--c-1a5c46)]">{fmt(I)} A</span>
      </div>

      {/* legenda wzoru – co oznacza każda litera */}
      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">Skąd ten wzór</div>
        <p className="mt-1.5 text-[13px] leading-6 text-gray-700">
          Moc to napięcie razy prąd: <b className="font-mono">P = U · I</b>. Odwracasz i masz prąd: <b className="font-mono">I = P / U</b>.
          Przykład: czajnik 2300 W w gniazdku 230 V pobiera 2300 / 230 = 10 A. Pozostałe litery to poprawki na rodzaj odbiornika i sieci.
        </p>
        <dl className="mt-2 grid grid-cols-[3.25rem_1fr] gap-x-3 gap-y-1.5 text-[13px] leading-6">
          {[
            ['I', 'prąd pobierany z sieci [A] – tego szukamy, bo do niego dobiera się wyłącznik.'],
            ['P', 'moc odbiornika w watach [W], z tabliczki znamionowej (1 kW = 1000 W).'],
            ['U', 'napięcie: 230 V (faza–N) przy odbiorniku 1-fazowym, 400 V (między fazami) przy 3-fazowym.'],
            ['cosφ', 'współczynnik mocy. Grzałka, czajnik, żarówka: ≈ 1, więc nic nie zmienia. Silnik: ≈ 0,8–0,85 – część prądu tylko magnesuje silnik i nie wykonuje pracy, więc prąd jest większy.'],
            ['√3', '≈ 1,73, tylko przy 3 fazach. Moc rozkłada się na trzy fazy po 230 V: 3 × 230 V ≈ √3 × 400 V ≈ 690 V. Wynik I to prąd w jednej fazie, np. podgrzewacz 6,9 kW: 6900 / 690 ≈ 10 A w każdej fazie.'],
            ['η', 'sprawność silnika (tu 0,87). Na tabliczce silnika jest moc oddawana na wale, a z sieci silnik pobiera więcej, bo część energii traci na ciepło.'],
          ].map(([sym, text]) => (
            <React.Fragment key={sym}>
              <dt className="font-mono font-bold text-[color:var(--c-14543e)]">{sym}</dt>
              <dd className="text-gray-700">{text}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>

      {/* sterowanie */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
            <span>Moc odbiornika P</span>
            <span className="text-base font-black text-[color:var(--c-14543e)]">{fmt(kw, 1)} <span className="normal-case">kW</span></span>
          </div>
          <input type="range" min={0.1} max={30} step={0.1} value={kw} onChange={(e) => setKw(Number(e.target.value))} className="mt-3 w-full" />
        </div>
        <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
            <span>Współczynnik mocy <span className="normal-case">cosφ</span></span>
            <span className="text-base font-black text-[color:var(--c-14543e)]">{fmt(cosphi)}</span>
          </div>
          <input type="range" min={0.5} max={1} step={0.01} value={cosphi} onChange={(e) => setCosphi(Number(e.target.value))} className="mt-3 w-full" />
          <div className="mt-1 font-mono text-[10px] text-gray-400">grzałka/żarówka ≈ 1,0 · silnik ≈ 0,8–0,85</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <div className="mb-1.5 text-[11px] text-gray-500">Rodzaj zasilania:</div>
          <div className="flex gap-1.5">
            {[
              { id: '1', label: '1-fazowe', sub: '230 V' },
              { id: '3', label: '3-fazowe', sub: '400 V' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPhase(p.id)}
                className={`flex-1 border px-3 py-2 text-center text-sm transition ${
                  phase === p.id ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
                }`}
              >
                <div className="font-bold">{p.label}</div>
                <div className="font-mono text-[10px] text-gray-500">{p.sub}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[11px] text-gray-500">Charakter odbioru (prąd rozruchowy):</div>
          <div className="flex gap-1.5">
            {[
              { id: false, label: 'Bez rozruchu', sub: 'oświetlenie, gniazda → B' },
              { id: true, label: 'Silnik / rozruch', sub: 'pompa, sprężarka → C' },
            ].map((m) => (
              <button
                key={String(m.id)}
                onClick={() => setMotor(m.id)}
                className={`flex-1 border px-3 py-2 text-center text-sm transition ${
                  motor === m.id ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
                }`}
              >
                <div className="font-bold">{m.label}</div>
                <div className="font-mono text-[10px] text-gray-500">{m.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* szereg wartości znamionowych z zaznaczonym doborem */}
      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">{keepCase(`Szereg wartości znamionowych In (A) – najbliższa ≥ obliczonego prądu${motor ? ', a przy silniku także 5×In > prąd rozruchu' : ''}`)}</div>
        <div className="flex flex-wrap gap-1.5">
          {SERIES.map((s) => {
            const tooSmall = s < I
            const chosen = s === inValue
            return (
              <div
                key={s}
                style={{ '--e': chosen ? 'var(--c-1a5c46)' : tooSmall ? 'var(--c-e5b8b4)' : 'var(--c-d7ded9)' }}
                className={`rounded-xs edge flex h-11 w-12 flex-col items-center justify-center text-center font-mono transition ${
                  chosen
                    ? 'bg-[color:var(--b-1a5c46)] text-white'
                    : tooSmall
                    ? 'bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)] opacity-70'
                    : 'bg-[color:var(--b-ffffff)] text-gray-500'
                }`}
              >
                <span className="text-sm font-bold">{s}</span>
                {chosen ? <span className="text-[8px] uppercase">dobór</span> : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* wynik */}
      <div className="grid grid-cols-3 gap-2">
        <ValueTile value={`${fmt(I)} A`} label="obliczony prąd roboczy odbiornika" />
        <ValueTile value={overRange ? '–' : `${charLetter}${inValue}`} label={overRange ? 'poza szeregiem – dobierz aparat mocy / wyższy szereg' : `dobrany wyłącznik (charakterystyka ${charLetter}, ${inValue} A)`} tone={overRange ? 'red' : 'amber'} />
        <ValueTile value={poles} label={phase === '3' ? 'trójbiegunowy (3 fazy)' : 'jednobiegunowy (faza + N osobno)'} />
      </div>

      {overRange ? (
        <NoteBox type="warning" title="Prąd przekracza szereg MCB (63 A)">
          Przy tej mocy dobiera się wyłącznik kompaktowy (MCCB) lub bezpieczniki mocy NH, a nie domową „eskę". Zmniejsz moc lub zmień zasilanie na 3-fazowe, żeby zobaczyć dobór.
        </NoteBox>
      ) : (
        <NoteBox type="remember" title={`Dobór: wyłącznik ${charLetter}${inValue} (${poles})`}>
          Obliczony prąd to {fmt(I)} A.
          {motor
            ? ` Silnik przy rozruchu bezpośrednim pobiera ok. ${START}× więcej, czyli ~${Math.round(START * I)} A. Wyzwalacz C może zadziałać natychmiast już od 5×In, więc 5×In musi być większe od prądu rozruchu: 5 × ${inValue} A = ${5 * inValue} A > ${Math.round(START * I)} A.${inByCurrentOnly !== inValue ? ` Sam prąd roboczy wskazywałby ${charLetter}${inByCurrentOnly} – ten wybijałby przy każdym starcie.` : ''}`
            : ` Najbliższa wyższa wartość z szeregu to ${inValue} A. Odbiornik bez rozruchu (oświetlenie, gniazda), więc charakterystyka B – zadziała natychmiast najpóźniej przy 5×In.`}
        </NoteBox>
      )}

      {motor && !overRange ? (
        <NoteBox type="warning" title="Silnik ≠ sam wyłącznik nadprądowy">
          Dobrany {charLetter}{inValue} chroni przede wszystkim przed ZWARCIEM. Przed przeciążeniem silnik chroni wyłącznik silnikowy
          lub przekaźnik termiczny nastawiony na prąd z tabliczki (tu ok. {fmt(I, 1)} A) – {charLetter}{inValue} jest na to za „gruby".
          Kalkulator przyjmuje sprawność η = {fmt(ETA)} i rozruch ok. {START}×IN; przy dużych silnikach stosuje się rozruch gwiazda-trójkąt
          albo softstart i charakterystykę D lub wyłącznik silnikowy.
        </NoteBox>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        <Tag tone="amber">1 faza: I = P / (230 V · cosφ)</Tag>
        <Tag tone="amber">3 fazy: I = P / (√3 · 400 V · cosφ)</Tag>
        <Tag tone="slate">B = dom · C = silniki · D = przemysł</Tag>
      </div>

      <NoteBox type="warning" title="To uproszczenie do nauki">
        Pełny dobór uwzględnia jeszcze obciążalność i przekrój kabla, spadek napięcia, warunki układania, jednoczesność i selektywność.
        Tu pokazujemy samą zależność prąd ↔ wartość znamionowa i charakterystyka – tak, jak pyta o to komisja.
      </NoteBox>
    </div>
  )
}
