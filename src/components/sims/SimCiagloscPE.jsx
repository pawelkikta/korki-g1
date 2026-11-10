import React, { useState } from 'react'
import { NoteBox, ValueTile } from '../ui.jsx'

// Ciągłość PE: dlaczego miernik ≥ 200 mA (PN-EN 61557-4), a nie brzęczyk multimetru.
// Fizyka jak w realu:
//  - brzęczyk multimetru piszczy do kilkudziesięciu Ω – „ciągłość jest" także przy luźnym zacisku (fałszywie dobry),
//  - cienka warstwa tlenku przy prądzie ~1 mA potrafi ZAWYŻYĆ i rozchwiać odczyt (fałszywie zły),
//    a prąd 200 mA ją przebija – tak jak przebiłby ją prąd zwarciowy.

const LEAD_R = 0.35 // rezystancja przewodów pomiarowych doliczana bez kompensacji
const BUZZER_LIMIT = 30 // typowy próg brzęczyka multimetru [Ω]
const EXPECTED_MAX = 0.5 // orientacyjnie: kilkanaście m przewodu 2,5 mm² + zaciski

const STATES = {
  ok: { label: 'Połączenie sprawne', short: 'ZACISK OK', trueR: 0.18, color: 'var(--c-1f7a4d)', bg: 'var(--c-e9f4ed)', border: 'var(--c-9fcab1)' },
  loose: { label: 'Luźny, przegrzany zacisk w puszce', short: 'LUŹNY ZACISK', trueR: 2.4, color: 'var(--c-b3261e)', bg: 'var(--c-fdf0ee)', border: 'var(--c-e5b8b4)' },
  oxide: { label: 'Dobry zacisk, cienka warstwa tlenku', short: 'TLENEK', trueR: 0.21, color: 'var(--c-8a5a00)', bg: 'var(--c-fdf6e3)', border: 'var(--c-ecd9a8)' },
}
const ORDER = ['ok', 'loose', 'oxide']

export function SimCiagloscPE() {
  const [state, setState] = useState('loose')
  const [highCurrent, setHighCurrent] = useState(false)
  const [zeroed, setZeroed] = useState(true)
  const [tick, setTick] = useState(0) // „ponowny pomiar" – przy tlenku multimetr pokazuje za każdym razem co innego

  const st = STATES[state]
  const lead = zeroed ? 0 : LEAD_R

  // odczyt przyrządu
  let reading
  if (state === 'oxide' && !highCurrent) {
    const seq = [6.8, 23.5, 3.9, 41.2, 12.6]
    reading = seq[tick % seq.length] + lead
  } else {
    reading = st.trueR + lead
  }
  const buzzer = !highCurrent && reading < BUZZER_LIMIT
  const fmt = (n) => n.toFixed(2).replace('.', ',')

  // ocena tego, co widzi elektryk
  const trulyBad = st.trueR > EXPECTED_MAX
  const looksBad = reading > EXPECTED_MAX

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-3">
        <button
          onClick={() => { setState(ORDER[(ORDER.indexOf(state) + 1) % ORDER.length]); setTick(0) }}
          className="border px-3 py-2.5 text-left transition"
          style={{ borderColor: st.border, background: st.bg }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Rzeczywisty stan połączenia (kliknij)</div>
          <div className="text-sm font-bold" style={{ color: st.color }}>{st.label}</div>
        </button>
        <button
          onClick={() => { setHighCurrent((v) => !v); setTick(0) }}
          className={`border px-3 py-2.5 text-left transition ${highCurrent ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)]'}`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Przyrząd (kliknij, by zmienić)</div>
          <div className={`text-sm font-bold ${highCurrent ? 'text-[color:var(--c-14543e)]' : 'text-gray-700'}`}>
            {highCurrent ? 'Miernik ciągłości ≥ 200 mA, 4–24 V' : 'Multimetr z brzęczykiem (~1 mA)'}
          </div>
        </button>
        <button
          onClick={() => setZeroed((v) => !v)}
          className={`border px-3 py-2.5 text-left transition ${zeroed ? 'border-[color:var(--c-9fcab1)] bg-[color:var(--b-e9f4ed)]' : 'border-[color:var(--c-ecd9a8)] bg-[color:var(--b-fdf6e3)]'}`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Przewody pomiarowe (kliknij, by zmienić)</div>
          <div className={`text-sm font-bold ${zeroed ? 'text-[color:var(--c-1f7a4d)]' : 'text-[color:var(--c-8a5a00)]'}`}>{zeroed ? 'Wyzerowane (kompensacja) ✓' : 'NIE wyzerowane – doliczają się!'}</div>
        </button>
      </div>

      <svg viewBox="0 0 640 150" className="w-full">
        {/* miernik */}
        <rect x="250" y="2" width="140" height="30" fill={highCurrent ? 'var(--c-e7f0eb)' : 'var(--c-fafbfa)'} stroke={highCurrent ? 'var(--c-1a5c46)' : 'var(--c-8a958e)'} strokeWidth="1.5" />
        <text x="320" y="14" fill="var(--c-14543e)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{highCurrent ? 'MIERNIK CIĄGŁOŚCI' : 'MULTIMETR'}</text>
        <text x="320" y="26" fill={buzzer ? 'var(--c-b3540f)' : 'var(--c-66736c)'} fontSize="8" fontFamily="monospace" textAnchor="middle">
          {highCurrent ? '≥ 200 mA · 4–24 V' : buzzer ? '~1 mA · PIIIK!' : '~1 mA · cisza'}
        </text>
        <text x="150" y="12" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace" textAnchor="middle">przewód pomiarowy (na szpuli)</text>

        {/* gniazdo */}
        <rect x="20" y="45" width="70" height="60" fill="var(--c-fafbfa)" stroke="var(--c-d7ded9)" />
        <circle cx="45" cy="68" r="6" fill="none" stroke="var(--c-8a958e)" strokeWidth="2" />
        <circle cx="67" cy="68" r="6" fill="none" stroke="var(--c-8a958e)" strokeWidth="2" />
        <rect x="50" y="84" width="12" height="8" fill="none" stroke="var(--c-8a958e)" strokeWidth="2" />
        <text x="55" y="125" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace" textAnchor="middle">GNIAZDO</text>

        {/* przewód PE → zacisk → szyna PE */}
        <line x1="90" y1="75" x2="290" y2="75" stroke="var(--c-1f7a4d)" strokeWidth="4" />
        <rect x="290" y="60" width="40" height="30" fill={st.bg} stroke={st.color} strokeWidth="2" />
        <text x="310" y="125" fill={st.color} fontSize="10" fontFamily="monospace" textAnchor="middle">{st.short}</text>
        {state === 'loose' ? <text x="310" y="55" fill="var(--c-b3261e)" fontSize="11" textAnchor="middle">🔥</text> : null}
        <line x1="330" y1="75" x2="530" y2="75" stroke="var(--c-1f7a4d)" strokeWidth="4" />
        <rect x="530" y="40" width="18" height="70" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
        {[0, 1, 2, 3].map((i) => <circle key={i} cx="539" cy={50 + i * 17} r="3" fill="var(--c-66736c)" />)}
        <text x="585" y="78" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace" textAnchor="middle">SZYNA PE</text>

        {/* prąd pomiarowy */}
        <line x1="90" y1="75" x2="530" y2="75" stroke="var(--c-d97706)" strokeWidth={highCurrent ? 3 : 1.2} strokeDasharray="6 10" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="32" to="0" dur={highCurrent ? '0.4s' : '1.4s'} repeatCount="indefinite" />
        </line>

        {/* przewody pomiarowe: bolec PE gniazda i szyna PE */}
        <path d="M 250 17 L 56 17 L 56 84" fill="none" stroke="var(--c-b3261e)" strokeWidth="1.5" />
        <circle cx="56" cy="86" r="2.5" fill="var(--c-b3261e)" />
        <path d="M 390 17 L 539 17 L 539 40" fill="none" stroke="var(--c-2b3530)" strokeWidth="1.5" />
        <circle cx="539" cy="42" r="2.5" fill="var(--c-2b3530)" />
      </svg>

      <div className="grid grid-cols-3 gap-2">
        <ValueTile
          value={highCurrent ? `${fmt(reading)} Ω` : buzzer ? `PIK · ${fmt(reading)} Ω` : `${fmt(reading)} Ω`}
          label={highCurrent ? 'odczyt miernika ciągłości' : 'odczyt multimetru (brzęczyk do ~30 Ω)'}
          tone={looksBad ? 'red' : 'amber'}
        />
        <ValueTile value={`${fmt(st.trueR)} Ω`} label="rzeczywista rezystancja połączenia (elektryk jej nie zna)" tone={trulyBad ? 'red' : 'amber'} />
        <ValueTile value={zeroed ? '0,00 Ω' : `+${fmt(LEAD_R)} Ω`} label="błąd od przewodów pomiarowych" tone={zeroed ? 'amber' : 'red'} />
      </div>

      {state === 'oxide' && !highCurrent ? (
        <button onClick={() => setTick((t) => t + 1)} className="rounded-xs edge bg-[color:var(--b-fafbfa)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-gray-700" style={{ '--e': 'var(--c-d7ded9)' }}>
          Zmierz jeszcze raz →
        </button>
      ) : null}

      {!zeroed ? (
        <NoteBox type="warning" title={`Odczyt zawyżony o ${fmt(LEAD_R)} Ω – wyzeruj miernik!`}>
          Miernik dolicza rezystancję własnych przewodów pomiarowych. Przy wynikach rzędu dziesiątych części oma to tyle, ile cały badany obwód.
          Przed pomiarem: zewrzyj końcówki i wykonaj kompensację (zero).
        </NoteBox>
      ) : null}

      {!highCurrent && state === 'loose' ? (
        <NoteBox type="trap" title="Brzęczyk piszczy – a połączenie jest złe">
          Multimetr piszczy przy każdej rezystancji poniżej kilkudziesięciu omów, więc „ciągłość jest". Tymczasem {fmt(st.trueR)} Ω na krótkim obwodzie
          to kilka razy za dużo – luźny zacisk, który przy zwarciu podniesie impedancję pętli i może się przepalić. Brzęczyk odpowiada tylko na pytanie
          „jest przewód czy go nie ma", a nie „czy połączenie jest dobre". Przełącz na miernik ≥ 200 mA i odczytaj wartość.
        </NoteBox>
      ) : !highCurrent && state === 'oxide' ? (
        <NoteBox type="warning" title="Wynik skacze i jest zawyżony – to też błąd pomiaru">
          Połączenie jest metalicznie dobre, ale cienka warstwa tlenku przy ~1 mA działa jak izolator: odczyt jest zawyżony i za każdym razem inny.
          Mógłbyś niesłusznie „oblać" dobry obwód. Prąd ≥ 200 mA przebija taką warstwę – tak samo, jak zrobiłby to prąd zwarciowy – i pokazuje
          rzeczywistą, stabilną wartość. Kliknij „Zmierz jeszcze raz", a potem przełącz przyrząd.
        </NoteBox>
      ) : !highCurrent ? (
        <NoteBox type="warning" title="Wygląda dobrze – ale do protokołu się nie nadaje">
          Multimetr ma za małą rozdzielczość i za mały prąd, żeby miarodajnie odróżnić 0,2 Ω od 0,6 Ω. Do oceny i do protokołu liczy się pomiar
          przyrządem zgodnym z PN-EN 61557-4 (4–24 V, ≥ 200 mA).
        </NoteBox>
      ) : trulyBad ? (
        <NoteBox type="mistake" title={`${fmt(reading)} Ω – usterka wykryta`}>
          Dla kilkunastu metrów przewodu ochronnego spodziewasz się dziesiątych części oma. {fmt(reading)} Ω to luźne lub przegrzane połączenie –
          zacisk do oczyszczenia i dokręcenia (albo wymiany), potem pomiar ponownie.
        </NoteBox>
      ) : (
        <NoteBox type="remember" title={`${fmt(reading)} Ω – wynik stabilny i miarodajny`}>
          Przewód PE nieprzerwany od gniazda do szyny PE, wartość zgodna z długością i przekrojem przewodu. Taki wynik wpisujesz do protokołu.
          {state === 'oxide' ? ' Zauważ: ten sam zacisk multimetrem „wyglądał" na wadliwy.' : ''}
        </NoteBox>
      )}

      <NoteBox type="remember" title="Jak to powiedzieć komisji">
        „Mierzę miernikiem wg PN-EN 61557-4 – napięcie 4–24 V, prąd co najmniej 200 mA – po wyzerowaniu przewodów pomiarowych. Taki prąd daje
        miarodajny wynik w miliomach: przebija cienkie warstwy tlenków, a luźny zacisk widać jako konkretną wartość, a nie piśnięcie brzęczyka."
        Uwaga na <strong className="font-semibold text-[color:var(--c-14543e)]">równoległe drogi</strong> (rury, metalowe obudowy połączone z PE) – potrafią
        „przykryć" przerwany przewód niezależnie od przyrządu.
      </NoteBox>
    </div>
  )
}
