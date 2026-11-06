import React, { useState } from 'react'
import { NoteBox, ValueTile, Tag } from '../ui.jsx'

// „Kiedy popłynie prąd?" – scenariusze zamykania obwodu + realny prąd przez ciało.

const C = {
  L: 'var(--c-a05a1f)',
  N: 'var(--c-2b6cb0)',
  PE: 'var(--c-1f7a4d)',
  earth: 'var(--c-8a6d2f)',
  gray: 'var(--c-66736c)',
  light: 'var(--c-8a958e)',
  hot: 'var(--c-d97706)',
  bad: 'var(--c-b3261e)',
}

const R_BULB = 880 // rezystancja żarówki 60 W – ogranicza prąd przy przerwie w N

const SCENARIOS = {
  lampa: {
    label: 'Żarówka L1 – N',
    desc: 'normalna praca odbiornika',
    bulb: true, glow: true,
    path: 'M 110 60 L 600 60 L 600 130 L 110 130 L 75 130 L 75 85 L 88 85',
    speed: '1.1s',
  },
  zwarcie: {
    label: 'Zwarcie L1 – N',
    desc: 'przetarty przewód w przedłużaczu',
    path: 'M 110 60 L 520 60 L 520 130 L 110 130 L 75 130 L 75 85 L 88 85',
    speed: '0.25s',
  },
  kaloryfer: {
    label: 'Dotyka L1 i kaloryfera',
    desc: 'najczęstszy scenariusz porażenia',
    human: true, touchL: true, touchKal: true, humanLabel: 'trzyma L1 i kaloryfer',
    path: 'M 110 60 L 362 60 L 362 124 a 6 6 0 0 1 0 12 L 362 200 L 380 214 L 430 218 L 478 222 L 478 275 L 75 275 L 75 85 L 88 85',
    speed: '0.7s',
  },
  reka: {
    label: 'Chwyta L1 i N',
    desc: 'obie ręce na przewodach',
    human: true, touchL: true, touchN: true, mat: true, humanLabel: 'trzyma L1 i N (stoi na macie izolacyjnej)',
    path: 'M 110 60 L 362 60 L 362 124 a 6 6 0 0 1 0 12 L 362 200 L 380 214 L 398 200 L 398 130 L 110 130 L 75 130 L 75 85 L 88 85',
    speed: '0.7s',
  },
  ptak: {
    label: 'Ptak / człowiek na izolacji',
    desc: 'dotyka TYLKO L1',
    bird: true,
    path: null,
  },
  przerwaL: {
    label: 'Przerwa w L1',
    desc: 'pęknięty przewód fazowy',
    bulb: true,
    breakAt: { x: 250, y: 60 },
    path: null,
  },
  przerwaN: {
    label: 'Przerwa w N',
    desc: 'pęknięty neutralny – pułapka!',
    bulb: true,
    breakAt: { x: 250, y: 130 },
    human: true, touchN: true, humanLabel: 'dotyka N za przerwą',
    path: 'M 110 60 L 600 60 L 600 130 L 398 130 L 398 200 L 380 214 L 380 240 L 368 273 L 75 275 L 75 85 L 88 85',
    speed: '0.9s',
  },
  przerwaPE: {
    label: 'Przerwa w PE',
    desc: 'cichy zabójca – nic nie widać',
    washer: true,
    breakAt: { x: 250, y: 245 },
    human: true, humanX: 560, touchWasher: true, humanLabel: 'dotyka obudowy pralki',
    // L1 → przebicie → metalowa obudowa (górna i prawa krawędź) → ręka → tułów → noga → ziemia
    path: 'M 110 60 L 475 60 L 475 124 a 6 6 0 0 1 0 12 L 475 150 L 520 150 L 520 217 L 560 216 L 560 240 L 548 273 L 75 275 L 75 85 L 88 85',
    speed: '0.7s',
  },
}

// progi oddziaływania prądu przemiennego na człowieka (orientacyjnie, 50 Hz)
function danger(mA) {
  if (mA < 1) return { zone: 'nieodczuwalny', text: 'Poniżej progu odczuwania (~1 mA).' }
  if (mA < 10) return { zone: 'odczuwalny', text: 'Czujesz mrowienie i skurcz mięśni, ale możesz jeszcze puścić przewód.' }
  if (mA < 30) return { zone: 'skurcz – nie puścisz', text: 'Powyżej progu samouwolnienia (~10 mA): mięśnie kurczą się tak, że NIE MOŻESZ puścić przewodu.' }
  if (mA < 50) return { zone: 'porażenie – duszność', text: 'Skurcz mięśni oddechowych, rosnące ryzyko zatrzymania oddechu.' }
  return { zone: 'ŚMIERTELNY', text: 'Powyżej ~50 mA przez klatkę piersiową grozi migotanie komór serca – to jest prąd, który zabija.' }
}

// maksymalny czas zadziałania RCD 30 mA (typ ogólny) dla danego prądu różnicowego: 1×, 2×, 5× IΔn
function rcdTime(mA) {
  if (mA >= 150) return '≤ 40 ms'
  if (mA >= 60) return '≤ 150 ms'
  return '≤ 300 ms'
}

// znacznik przerwy w przewodzie: biała szczelina + czerwony X
function BreakMark({ x, y }) {
  return (
    <g>
      <rect x={x - 11} y={y - 9} width="22" height="18" fill="var(--c-ffffff)" />
      <path
        d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
        stroke="var(--c-b3261e)" strokeWidth="2.5" fill="none"
      />
      <text x={x} y={y - 16} fill="var(--c-b3261e)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PRZERWA</text>
    </g>
  )
}

export function CircuitLab() {
  const [id, setId] = useState('lampa')
  const [bodyR, setBodyR] = useState(1000)
  const sc = SCENARIOS[id]
  const hx = sc.humanX ?? 380 // pozycja człowieka na schemacie

  // prąd przez ciało: przy przerwie w N ogranicza go jeszcze rezystancja odbiornika
  const seriesR = id === 'przerwaN' ? bodyR + R_BULB : bodyR
  const bodyMa = Math.round(230000 / seriesR)
  const d = danger(bodyMa)

  const stats = {
    lampa: { i: '0,26 A', iLabel: 'prąd żarówki 60 W', rcd: 'nie reaguje', rcdTone: 'amber', mcb: 'nie reaguje', mcbTone: 'amber' },
    zwarcie: { i: 'setki A', iLabel: 'prąd zwarciowy (typowo 200–500 A w gnieździe)', rcd: 'NIE reaguje', rcdTone: 'red', mcb: 'wyłącza < 0,01 s', mcbTone: 'amber' },
    kaloryfer: { i: `${bodyMa} mA`, iLabel: 'prąd przez ciało', rcd: `wyłącza ${rcdTime(bodyMa)}`, rcdTone: 'amber', mcb: 'nie reaguje', mcbTone: 'red' },
    reka: { i: `${bodyMa} mA`, iLabel: 'prąd przez ciało', rcd: 'NIE ZADZIAŁA', rcdTone: 'red', mcb: 'nie reaguje', mcbTone: 'red' },
    ptak: { i: '0 A', iLabel: 'prąd przez ptaka', rcd: 'nie reaguje', rcdTone: 'amber', mcb: 'nie reaguje', mcbTone: 'amber' },
    przerwaL: { i: '0 A', iLabel: 'prąd roboczy', rcd: 'nie reaguje', rcdTone: 'amber', mcb: 'nie reaguje', mcbTone: 'amber' },
    przerwaN: { i: `${bodyMa} mA`, iLabel: 'prąd przez ciało', rcd: `wyłącza ${rcdTime(bodyMa)}`, rcdTone: 'amber', mcb: 'nie reaguje', mcbTone: 'red' },
    przerwaPE: { i: `${bodyMa} mA`, iLabel: 'prąd przez ciało', rcd: 'dopiero gdy dotkniesz', rcdTone: 'red', mcb: 'nie reaguje', mcbTone: 'red' },
  }[id]

  return (
    <div className="space-y-4">
      <div className="grid gap-1.5 md:grid-cols-4">
        {Object.entries(SCENARIOS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setId(key)}
            className={`cham edge px-3 py-2 text-left transition ${id === key ? 'bg-[color:var(--b-e7f0eb)]' : 'bg-[color:var(--b-fafbfa)] hover:bg-[color:var(--b-ffffff)]'}`}
            style={{ '--e': id === key ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
          >
            <div className={`text-[13px] font-bold ${id === key ? 'text-gray-900' : 'text-gray-700'}`}>{s.label}</div>
            <div className="text-[11px] leading-4 text-gray-500">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 320" className="w-full min-w-[660px]">
          {/* ── stacja ── */}
          <rect x="20" y="30" width="90" height="130" fill="var(--c-fafbfa)" stroke="var(--c-d7ded9)" strokeWidth="2" />
          <text x="65" y="24" fill={C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">STACJA</text>
          {[55, 85, 115].map((y) => (
            <path key={y} d={`M 88 ${y} a 6 6 0 0 1 10 0 a 6 6 0 0 1 10 0`} fill="none" stroke={C.L} strokeWidth="2" />
          ))}
          {/* wolny koniec uzwojenia L1 → przewód L1 */}
          <line x1="108" y1="55" x2="110" y2="60" stroke={C.L} strokeWidth="2" />
          <line x1="88" y1="55" x2="88" y2="115" stroke={C.N} strokeWidth="3" />
          <circle cx="88" cy="85" r="5" fill={C.N} />
          <text x="48" y="78" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="middle">punkt</text>
          <text x="48" y="88" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="middle">gwiazd.</text>

          {/* N */}
          <path d="M 88 85 L 75 85 L 75 130 L 600 130" fill="none" stroke={C.N} strokeWidth="3" />
          <text x="300" y="124" fill={C.N} fontSize="11" fontFamily="monospace" fontWeight="bold">N</text>

          {/* uziemienie stacji */}
          <line x1="75" y1="130" x2="75" y2="272" stroke={C.PE} strokeWidth="2.5" />
          <text x="86" y="205" fill={C.PE} fontSize="8" fontFamily="monospace">uziom stacji</text>

          {/* L1 */}
          <line x1="110" y1="60" x2="600" y2="60" stroke={C.L} strokeWidth="3" />
          <text x="300" y="52" fill={C.L} fontSize="11" fontFamily="monospace" fontWeight="bold">L1</text>

          {/* ziemia */}
          <line x1="40" y1="275" x2="700" y2="275" stroke={C.earth} strokeWidth="2.5" strokeDasharray="8 5" />
          <text x="660" y="292" fill={C.earth} fontSize="10" fontFamily="monospace" textAnchor="end">ZIEMIA</text>

          {/* ── żarówka ── */}
          {sc.bulb ? (
            <g>
              <line x1="600" y1="60" x2="600" y2="80" stroke={C.L} strokeWidth="3" />
              <circle cx="600" cy="95" r="15" fill={sc.glow ? 'var(--c-ffd479)' : 'var(--c-eef3f0)'} stroke={sc.glow ? C.hot : C.gray} strokeWidth="2" />
              <line x1="600" y1="110" x2="600" y2="130" stroke={C.N} strokeWidth="3" />
              <text x="624" y="99" fill={C.gray} fontSize="9" fontFamily="monospace">
                {sc.glow ? 'żarówka świeci' : 'nie świeci'}
              </text>
            </g>
          ) : (
            <g opacity="0.35">
              <line x1="600" y1="60" x2="600" y2="80" stroke={C.L} strokeWidth="2" />
              <circle cx="600" cy="95" r="15" fill="none" stroke={C.gray} strokeWidth="2" />
              <line x1="600" y1="110" x2="600" y2="130" stroke={C.N} strokeWidth="2" />
            </g>
          )}

          {/* ── pralka klasy I (scenariusz przerwy w PE) ── */}
          {sc.washer ? (
            <g>
              {/* zasilanie pralki z L1 – mostek nad N (brak połączenia) */}
              <path d="M 475 60 L 475 124 a 6 6 0 0 1 0 12 L 475 150" fill="none" stroke={C.L} strokeWidth="3" />
              <rect x="430" y="150" width="90" height="70" fill="var(--c-fafbfa)" stroke={C.bad} strokeWidth="2.5" />
              <circle cx="475" cy="188" r="15" fill="none" stroke={C.gray} strokeWidth="2" />
              <text x="422" y="162" fill={C.gray} fontSize="9" fontFamily="monospace" textAnchor="end">PRALKA (klasa I)</text>
              <path d="M 466 156 l 8 10 l -6 2 l 9 11" fill="none" stroke={C.bad} strokeWidth="2">
                <animate attributeName="opacity" values="1;0.25;1" dur="0.45s" repeatCount="indefinite" />
              </path>
              <text x="528" y="170" fill={C.bad} fontSize="8" fontFamily="monospace">przebicie na obudowę</text>
              {/* przewód PE od obudowy – w TN wraca metalicznie do punktu neutralnego */}
              <line x1="475" y1="220" x2="475" y2="245" stroke={C.PE} strokeWidth="2.5" />
              <line x1="75" y1="245" x2="475" y2="245" stroke={C.PE} strokeWidth="2.5" />
              <text x="150" y="240" fill={C.PE} fontSize="9" fontFamily="monospace" fontWeight="bold">PE</text>
            </g>
          ) : null}

          {/* ── zwarcie ── */}
          {id === 'zwarcie' ? (
            <g>
              <line x1="520" y1="60" x2="520" y2="130" stroke={C.bad} strokeWidth="4" />
              <path d="M 508 78 l 10 14 l -8 3 l 12 16" fill="none" stroke={C.bad} strokeWidth="2.5">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.3s" repeatCount="indefinite" />
              </path>
              <text x="520" y="150" fill={C.bad} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ZWARCIE</text>
            </g>
          ) : null}

          {/* ── ptak ── */}
          {sc.bird ? (
            <g>
              <ellipse cx="250" cy="50" rx="13" ry="8" fill="var(--c-5b6470)" />
              <circle cx="262" cy="44" r="5" fill="var(--c-5b6470)" />
              <path d="M 267 43 l 6 2 l -6 2" fill="var(--c-d97706)" />
              <line x1="246" y1="57" x2="246" y2="60" stroke="var(--c-2b3530)" strokeWidth="1.5" />
              <line x1="254" y1="57" x2="254" y2="60" stroke="var(--c-2b3530)" strokeWidth="1.5" />
              <text x="250" y="32" fill={C.gray} fontSize="9" fontFamily="monospace" textAnchor="middle">obie nóżki na L1</text>
            </g>
          ) : null}

          {/* ── mata izolacyjna (scenariusz L1 + N) ── */}
          {sc.mat ? (
            <g>
              <rect x="350" y="273" width="60" height="8" fill="var(--c-3d4650)" />
              <text x="418" y="287" fill={C.gray} fontSize="8" fontFamily="monospace">mata izolacyjna</text>
            </g>
          ) : null}

          {/* ── człowiek ── */}
          {sc.human ? (
            <g>
              <circle cx={hx} cy="196" r="11" fill="none" stroke={C.bad} strokeWidth="2.5" />
              <line x1={hx} y1="207" x2={hx} y2="240" stroke={C.bad} strokeWidth="2.5" />
              <line x1={hx} y1="240" x2={hx - 12} y2="273" stroke={C.bad} strokeWidth="2.5" />
              <line x1={hx} y1="240" x2={hx + 12} y2="273" stroke={C.bad} strokeWidth="2.5" />
              {/* ręka do L1 przeskakuje mostkiem nad N – nie dotyka go */}
              {sc.touchL ? <path d="M 380 214 L 362 200 L 362 136 a 6 6 0 0 0 0 -12 L 362 62" fill="none" stroke={C.bad} strokeWidth="2.5" /> : null}
              {sc.touchN ? <path d="M 380 214 L 398 200 L 398 132" fill="none" stroke={C.bad} strokeWidth="2.5" /> : null}
              {sc.touchKal ? <path d="M 380 216 L 430 218 L 456 222" fill="none" stroke={C.bad} strokeWidth="2.5" /> : null}
              {sc.touchWasher ? <path d={`M ${hx} 216 L ${hx - 20} 216 L 520 217`} fill="none" stroke={C.bad} strokeWidth="2.5" /> : null}
              <text x={hx} y="308" fill={C.bad} fontSize="9" fontFamily="monospace" textAnchor="middle">{sc.humanLabel}</text>
            </g>
          ) : null}

          {/* ── kaloryfer ── */}
          {sc.touchKal ? (
            <g>
              <rect x="456" y="200" width="44" height="52" fill="var(--c-eef3f0)" stroke={C.gray} strokeWidth="2" />
              {[464, 474, 484, 494].map((x) => (
                <line key={x} x1={x} y1="204" x2={x} y2="248" stroke={C.gray} strokeWidth="1.5" />
              ))}
              <line x1="478" y1="252" x2="478" y2="275" stroke={C.PE} strokeWidth="2.5" />
              <text x="478" y="192" fill={C.gray} fontSize="9" fontFamily="monospace" textAnchor="middle">kaloryfer</text>
              <text x="506" y="266" fill={C.PE} fontSize="8" fontFamily="monospace">rury + wyrównania (PE) → ziemia</text>
            </g>
          ) : null}

          {/* ── animowany prąd ── */}
          {sc.path ? (
            <path d={sc.path} fill="none" stroke={C.hot} strokeWidth="3" strokeDasharray="8 11" opacity="0.95">
              <animate attributeName="stroke-dashoffset" from="38" to="0" dur={sc.speed} repeatCount="indefinite" />
            </path>
          ) : null}

          {/* ── znacznik przerwy (na wierzchu) ── */}
          {sc.breakAt ? <BreakMark x={sc.breakAt.x} y={sc.breakAt.y} /> : null}

          {sc.bird ? (
            <text x="360" y="180" fill={C.gray} fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PRZEZ PTAKA PRĄD NIE PŁYNIE – 0 V MIĘDZY NÓŻKAMI
            </text>
          ) : null}
          {!sc.path && sc.breakAt ? (
            <text x="360" y="180" fill={C.gray} fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PRĄD ROBOCZY NIE PŁYNIE
            </text>
          ) : null}
        </svg>
      </div>

      {sc.human ? (
        <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
            <span>Rezystancja ciała (od stanu skóry)</span>
            <span className="text-base font-black text-[color:var(--c-14543e)]">{bodyR} Ω</span>
          </div>
          <input type="range" min={500} max={3000} step={100} value={bodyR} onChange={(e) => setBodyR(Number(e.target.value))} className="mt-3 w-full" />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400">
            <span>500 Ω – mokre ręce, wanna</span>
            <span>1000 Ω – typowo</span>
            <span>3000 Ω – sucha skóra, lekki dotyk</span>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-2">
        <ValueTile value={stats.i} label={stats.iLabel} tone={sc.human ? 'red' : 'amber'} />
        <ValueTile value={stats.rcd} label="reakcja RCD 30 mA" tone={stats.rcdTone} />
        <ValueTile value={stats.mcb} label="reakcja wyłącznika nadprądowego B16" tone={stats.mcbTone} />
      </div>

      {/* werdykty */}
      {id === 'lampa' ? (
        <NoteBox type="remember" title="Obwód zamknięty – prąd płynie i wraca">
          Prąd wypływa z uzwojenia w stacji, biegnie <strong className="font-semibold text-[color:var(--c-14543e)]">L1 → żarówka → N</strong> i wraca aż do
          punktu gwiazdowego. To jest normalna praca: <strong className="font-semibold text-[color:var(--c-14543e)]">ile wypłynęło L, tyle wróciło N</strong> –
          dlatego RCD (który porównuje te dwa prądy) nic nie wykrywa. I bardzo dobrze.
        </NoteBox>
      ) : id === 'zwarcie' ? (
        <NoteBox type="mistake" title="Zwarcie – prąd ograniczony tylko rezystancją przewodów">
          L1 dotknęło N z pominięciem odbiornika. Nie ma już żarówki, która „hamowała" prąd – płynie <strong className="font-semibold text-[color:var(--c-14543e)]">kilkaset amperów</strong> – ogranicza go już tylko impedancja przewodów i transformatora (w gnieździe mieszkania typowo 200–500 A).
          Wyzwalacz elektromagnetyczny wyłącznika nadprądowego otwiera styki w kilka milisekund.
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Uwaga egzaminacyjna:</strong> RCD tego NIE widzi! Prąd wypłynął L i wrócił N – różnica dalej wynosi zero.
          Zwarcie L-N to robota dla wyłącznika nadprądowego, nie dla różnicówki.
        </NoteBox>
      ) : id === 'kaloryfer' ? (
        <NoteBox type="mistake" title={`Prąd ${bodyMa} mA przez ciało – strefa: ${d.zone}`}>
          Chwytasz fazę, a drugą ręką kaloryfer. Kaloryfer przez rury i połączenia wyrównawcze jest połączony z PE i z ziemią – a obie te drogi prowadzą do uziemionego punktu gwiazdowego w stacji.
          <strong className="font-semibold text-[color:var(--c-14543e)]"> Obwód zamyka się przez twoje ciało</strong>: L1 → ręka → tułów → ręka → kaloryfer → PE i ziemia → punkt gwiazdowy (na schemacie uproszczone do drogi przez ziemię).
          <br /><br />
          I = 230 V / {bodyR} Ω = <strong className="font-semibold text-[color:var(--c-14543e)]">{bodyMa} mA</strong>. {d.text}
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Ratuje cię tylko RCD</strong> – ten prąd nie wraca przewodem N, więc różnicówka widzi ubytek
          i wyłącza: przy {bodyMa} mA norma daje jej {rcdTime(bodyMa)} (przy 30 mA byłoby to 300 ms, przy 150 mA i więcej – 40 ms). Wyłącznik nadprądowy B16 nawet nie drgnie.
        </NoteBox>
      ) : id === 'reka' ? (
        <NoteBox type="trap" title={`Prąd ${bodyMa} mA przez ciało – i NIC go nie wyłączy`}>
          Trzymasz L1 jedną ręką, N drugą, stojąc na izolującym podłożu. Prąd przepływa <strong className="font-semibold text-[color:var(--c-14543e)]">przez klatkę piersiową</strong> – najgorsza możliwa droga.
          I = 230 V / {bodyR} Ω = <strong className="font-semibold text-[color:var(--c-14543e)]">{bodyMa} mA</strong>. {d.text}
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Dlaczego RCD nie zadziała?</strong> Bo cały prąd wypłynął przewodem L i wrócił przewodem N –
          dokładnie jak w normalnym odbiorniku. Różnica L−N wynosi zero. Wyłącznik B16 też nie – {bodyMa} mA to dla niego nic.
          (Gdybyś stał boso na mokrej posadzce, część prądu uciekłaby nogami do ziemi i RCD mógłby zadziałać – ale prąd przez klatkę piersiową i tak by popłynął.)
          <br /><br />
          To najgroźniejszy przypadek: <strong className="font-semibold text-[color:var(--c-14543e)]">żadne zabezpieczenie cię nie uratuje</strong>. Chroni wyłącznie
          izolacja, wyłączenie napięcia i sprawdzenie wskaźnikiem.
        </NoteBox>
      ) : id === 'ptak' ? (
        <NoteBox type="remember" title="Brak drugiego punktu – przez ptaka prąd nie płynie">
          Ptak siedzi obiema nóżkami na tym samym przewodzie. Między nóżkami jest <strong className="font-semibold text-[color:var(--c-14543e)]">ten sam potencjał</strong>,
          czyli 0 V różnicy – przez ptaka prąd nie płynie i ptak żyje, choć linią obok może płynąć prąd do odbiorników.
          Tak samo (teoretycznie) człowiek na suchej, izolującej drabinie, dotykający wyłącznie fazy – w praktyce wystarczy, że musnie ścianę.
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Wniosek:</strong> do porażenia potrzebne są zawsze DWA punkty o różnym potencjale.
          W budynku tym drugim punktem jest praktycznie wszystko dookoła: podłoga, rury, kaloryfer, wilgotna ściana.
        </NoteBox>
      ) : id === 'przerwaL' ? (
        <NoteBox type="warning" title="Przerwa w L1 – żarówka nie świeci, ale napięcie NIE zniknęło">
          Pęknięty przewód fazowy przerywa obwód, więc prąd roboczy nie płynie i odbiornik nie działa. Wygląda jak „brak prądu" – i to jest pułapka.
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Odcinek L1 od stacji do miejsca przerwy nadal ma pełne 230 V względem ziemi.</strong> Dotknięcie go
          kończy się porażeniem dokładnie tak samo, jak przy sprawnej instalacji. Za przerwą (od strony odbiornika) faza jest „martwa", bo przez żarówkę
          łączy się z N.
          <br /><br />
          Stąd żelazna zasada z egzaminu: <strong className="font-semibold text-[color:var(--c-14543e)]">„urządzenie nie działa" nie znaczy „nie ma napięcia"</strong>.
          Zawsze sprawdzasz wskaźnikiem, osobiście, bezpośrednio przed dotknięciem.
        </NoteBox>
      ) : id === 'przerwaN' ? (
        <NoteBox type="trap" title={`Przerwa w N – neutralny „ożywa" (${bodyMa} mA przez ciało)`}>
          Żarówka też nie świeci, więc objaw wygląda identycznie jak przy przerwie w fazie. Różnica jest zabójcza.
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Przewód N za przerwą jest przez odbiornik połączony z fazą</strong> – przyjmuje potencjał
          bliski 230 V. „Neutralny" przestaje być neutralny. Gdy go dotkniesz stojąc na ziemi, prąd popłynie: L1 → żarówka → N → twoje ciało → ziemia →
          uziom stacji → punkt gwiazdowy.
          <br /><br />
          Prąd ogranicza tu jeszcze rezystancja odbiornika: I = 230 V / ({R_BULB} Ω + {bodyR} Ω) = <strong className="font-semibold text-[color:var(--c-14543e)]">{bodyMa} mA</strong>. {d.text}
          <br /><br />
          RCD zadziała (prąd nie wraca przez N), ale wniosek na egzamin jest inny: <strong className="font-semibold text-[color:var(--c-14543e)]">przewodu N nigdy nie
          traktujemy jako bezpiecznego</strong>. Szczególnie groźna jest przerwa w PEN – wtedy napięcie pojawia się na obudowach urządzeń w całym budynku.
        </NoteBox>
      ) : (
        <NoteBox type="trap" title="Przerwa w PE – wszystko działa, ochrony nie ma">
          Najpodstępniejsza z awarii: <strong className="font-semibold text-[color:var(--c-14543e)]">nie daje żadnego objawu</strong>. Pralka pierze, światło świeci,
          użytkownik niczego nie zauważa – czasem latami.
          <br /><br />
          Problem ujawnia się dopiero przy przebiciu fazy na metalową obudowę. Normalnie prąd zwarciowy popłynąłby przez PE do rozdzielnicy i zabezpieczenie
          natychmiast wyłączyłoby obwód. <strong className="font-semibold text-[color:var(--c-14543e)]">Przy przerwanym PE prąd nie ma którędy popłynąć</strong> – więc nic
          nie wyłącza, a obudowa po prostu stoi pod napięciem i czeka.
          <br /><br />
          Czeka na człowieka. Dopiero jego dotknięcie zamyka obwód przez ciało do ziemi: I = 230 V / {bodyR} Ω = <strong className="font-semibold text-[color:var(--c-14543e)]">{bodyMa} mA</strong>. {d.text} RCD
          wtedy zadziała i najpewniej uratuje życie – ale porażenie już nastąpiło.
          <br /><br />
          <strong className="font-semibold text-[color:var(--c-14543e)]">Tej usterki nie wykryjesz wzrokiem ani działaniem urządzeń – tylko pomiarem ciągłości PE</strong> (prądem ≥ 200 mA).
          Właśnie dlatego jest to jeden z obowiązkowych pomiarów odbiorczych.
        </NoteBox>
      )}

      <div className="flex flex-wrap gap-1.5">
        <Tag tone="green">&lt; 1 mA – nieodczuwalny</Tag>
        <Tag tone="amber">10 mA – nie puścisz przewodu</Tag>
        <Tag tone="red">30 mA – próg RCD</Tag>
        <Tag tone="red">50 mA – zagrożenie życia</Tag>
      </div>
    </div>
  )
}
