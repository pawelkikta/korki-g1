import React, { useState } from 'react'
import { NoteBox } from './ui.jsx'

// Dekoder oznaczeń układów sieci (PN-HD 60364-1): litera po literze + schemat źródło → odbiornik.
// Litery pochodzą z francuskiego – normy IEC wydaje się po angielsku i po francusku.

const C = {
  L: 'var(--c-a05a1f)',
  N: 'var(--c-2b6cb0)',
  PE: 'var(--c-1f7a4d)',
  PEyellow: 'var(--c-d9b310)',
  earth: 'var(--c-8a6d2f)',
  gray: 'var(--c-66736c)',
  light: 'var(--c-8a958e)',
  bad: 'var(--c-b3261e)',
}

const POSITIONS = {
  1: { title: '1. litera', about: 'źródło a ziemia' },
  2: { title: '2. litera', about: 'obudowy a ziemia' },
  3: { title: 'kolejne litery', about: 'przewody N i PE' },
}

const LETTERS = {
  1: {
    T: { word: 'Terre', pl: 'ziemia', text: 'Punkt neutralny źródła (transformatora) połączony bezpośrednio z ziemią – uziemienie robocze na stacji.' },
    I: { word: 'Isolé', pl: 'izolowany', text: 'Źródło odizolowane od ziemi albo połączone z nią przez dużą impedancję.' },
  },
  2: {
    N: { word: 'Neutre', pl: 'neutralny', text: 'Obudowy połączone przewodem z uziemionym punktem neutralnym źródła. Prąd zwarcia wraca metalicznie – jest duży.' },
    T: { word: 'Terre', pl: 'ziemia', text: 'Obudowy mają własny uziom, niezależny od uziemienia źródła. Prąd zwarcia wraca przez grunt – jest mały.' },
  },
  3: {
    C: { word: 'Combiné', pl: 'połączony', text: 'Funkcje N i PE w jednym przewodzie – PEN.' },
    S: { word: 'Séparé', pl: 'oddzielony', text: 'Osobne przewody N i PE.' },
  },
}

const SYSTEMS = {
  'TN-S': {
    letters: [[1, 'T'], [2, 'N'], [3, 'S']],
    summary: 'N i PE osobno na całej długości, od źródła do odbiornika. PE nigdy nie prowadzi prądu roboczego.',
    where: 'Obiekty z własną stacją transformatorową, przemysł, nowe budynki zasilane pięcioma przewodami.',
  },
  'TN-C': {
    letters: [[1, 'T'], [2, 'N'], [3, 'C']],
    summary: 'Do odbiornika biegnie jeden przewód PEN. Przerwa w PEN = napięcie na obudowach. RCD tu nie pomoże: prąd zwarcia wraca tym samym PEN, który przechodzi przez przekładnik.',
    where: 'Stare instalacje dwużyłowe („zerowanie"). PEN wolno dziś układać tylko w instalacji stałej o przekroju co najmniej 10 mm² Cu (16 mm² Al) – więc nie w obwodach mieszkania.',
  },
  'TN-C-S': {
    letters: [[1, 'T'], [2, 'N'], [3, 'C', 'Od źródła do punktu rozdziału: N i PE razem w PEN.'], [3, 'S', 'Za punktem rozdziału: osobno N i PE – już nigdy razem.']],
    summary: 'PEN dochodzi do budynku, w złączu lub rozdzielnicy głównej dzieli się na N i PE. Punkt rozdziału się uziemia.',
    where: 'Dziś typowa instalacja w Polsce – dom, blok, mały zakład.',
  },
  TT: {
    letters: [[1, 'T'], [2, 'T']],
    summary: 'Źródło i obudowy mają osobne uziomy. Prąd zwarcia przez dwa uziomy to zwykle kilka–kilkanaście amperów – za mało, żeby eska wyłączyła szybko. Ochronę daje RCD (RA × IΔn ≤ 50 V).',
    where: 'Zasilanie długą linią napowietrzną, np. gospodarstwa na wsi, gdzie pętla zwarcia przez sieć byłaby za słaba.',
  },
  IT: {
    letters: [[1, 'I'], [2, 'T']],
    summary: 'Pierwsze doziemienie nie wyłącza zasilania – alarmuje IMD (monitor stanu izolacji). Drugie doziemienie na innej fazie to już zwarcie – wtedy musi zadziałać zabezpieczenie.',
    where: 'Tam, gdzie nagłe wyłączenie jest groźniejsze niż samo doziemienie: sale operacyjne, kopalnie.',
  },
}

// symbol uziemienia: przewód dochodzi od góry do (x, y)
function Earth({ x, y, color }) {
  return (
    <g stroke={color} strokeWidth="2.5">
      <line x1={x - 11} y1={y} x2={x + 11} y2={y} />
      <line x1={x - 7} y1={y + 5} x2={x + 7} y2={y + 5} />
      <line x1={x - 3} y1={y + 10} x2={x + 3} y2={y + 10} />
    </g>
  )
}

// przewód ochronny: zielony z żółtym przerywanym paskiem (PEN: niebieski z żółtym)
function Wire({ d, color, stripe = false, width = 3.5 }) {
  return (
    <g fill="none">
      <path d={d} stroke={color} strokeWidth={width} />
      {stripe ? <path d={d} stroke={C.PEyellow} strokeWidth="1.3" strokeDasharray="7 9" /> : null}
    </g>
  )
}

function Diagram({ id, focus }) {
  const sourceEarthed = id !== 'IT'
  const localEarth = id === 'TT' || id === 'IT'
  const hl = (pos) => focus === pos

  return (
    <svg viewBox="0 0 640 240" className="w-full min-w-[560px]">
      {/* podświetlenie obszaru, którego dotyczy wybrana litera */}
      {hl(1) ? <rect x="10" y="20" width="160" height="200" fill="var(--c-e7f0eb)" stroke="var(--c-1a5c46)" strokeDasharray="4 4" /> : null}
      {hl(2) ? <rect x="420" y="20" width="210" height="200" fill="var(--c-e7f0eb)" stroke="var(--c-1a5c46)" strokeDasharray="4 4" /> : null}
      {hl(3) ? <rect x="135" y="92" width="330" height="72" fill="var(--c-e7f0eb)" stroke="var(--c-1a5c46)" strokeDasharray="4 4" /> : null}

      {/* ziemia */}
      <line x1="20" y1="222" x2="620" y2="222" stroke={C.earth} strokeWidth="1.5" strokeDasharray="8 5" />
      <text x="620" y="236" fill={C.earth} fontSize="9" fontFamily="monospace" textAnchor="end">ZIEMIA</text>

      {/* ── źródło ── */}
      <rect x="25" y="34" width="105" height="150" fill="var(--c-f3f6f4)" stroke="var(--c-d7ded9)" />
      <text x="77" y="28" fill={C.gray} fontSize="9" fontFamily="monospace" textAnchor="middle">ŹRÓDŁO (TRAFO)</text>
      {/* uzwojenie: punkt neutralny → L */}
      <path d="M 90 110 L 90 96 a 6 6 0 0 1 0 -12 a 6 6 0 0 1 0 -12 a 6 6 0 0 1 0 -12 L 90 60 L 130 60" fill="none" stroke={C.L} strokeWidth="3" />
      <circle cx="90" cy="110" r="4.5" fill={C.N} />
      <text x="84" y="128" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="end">punkt</text>
      <text x="84" y="137" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="end">neutralny</text>

      {/* uziemienie źródła albo jego brak (IT) */}
      {sourceEarthed ? (
        <g>
          <line x1="90" y1="110" x2="90" y2="196" stroke={C.PE} strokeWidth="2.5" />
          <Earth x={90} y={196} color={C.PE} />
          <text x="100" y="200" fill={C.light} fontSize="8" fontFamily="monospace">uziemienie</text>
          <text x="100" y="209" fill={C.light} fontSize="8" fontFamily="monospace">robocze</text>
        </g>
      ) : (
        <g>
          <line x1="90" y1="110" x2="90" y2="196" stroke={C.light} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
          <Earth x={90} y={196} color={C.light} />
          <g stroke={C.bad} strokeWidth="3">
            <line x1="82" y1="150" x2="98" y2="166" />
            <line x1="98" y1="150" x2="82" y2="166" />
          </g>
          <text x="104" y="156" fill={C.bad} fontSize="8" fontFamily="monospace">brak połączenia</text>
          <text x="104" y="165" fill={C.bad} fontSize="8" fontFamily="monospace">z ziemią</text>
        </g>
      )}

      {/* ── przewody ── */}
      <Wire d="M 130 60 L 540 60 L 540 74" color={C.L} />
      <text x="142" y="53" fill={C.L} fontSize="11" fontFamily="monospace" fontWeight="bold">L</text>

      {id === 'TN-C' ? (
        <g>
          <Wire d="M 90 110 L 540 110 L 540 98" color={C.N} stripe />
          <text x="142" y="103" fill={C.N} fontSize="10" fontFamily="monospace" fontWeight="bold">PEN</text>
          {/* obudowa podłączona do PEN */}
          <circle cx="440" cy="110" r="4" fill={C.N} />
          <Wire d="M 440 110 L 440 150 L 470 150" color={C.PE} stripe width={3} />
        </g>
      ) : id === 'TN-C-S' ? (
        <g>
          <Wire d="M 90 110 L 300 110" color={C.N} stripe />
          <Wire d="M 300 110 L 540 110 L 540 98" color={C.N} />
          <text x="142" y="103" fill={C.N} fontSize="10" fontFamily="monospace" fontWeight="bold">PEN</text>
          <text x="318" y="103" fill={C.N} fontSize="11" fontFamily="monospace" fontWeight="bold">N</text>
          {/* rozdział PEN + uziemienie */}
          <circle cx="300" cy="110" r="5" fill={C.N} />
          <Wire d="M 300 110 L 300 150 L 470 150" color={C.PE} stripe />
          <line x1="300" y1="150" x2="300" y2="196" stroke={C.PE} strokeWidth="2.5" />
          <Earth x={300} y={196} color={C.PE} />
          <text x="318" y="143" fill={C.PE} fontSize="11" fontFamily="monospace" fontWeight="bold">PE</text>
          <text x="310" y="190" fill={C.light} fontSize="8" fontFamily="monospace">rozdział PEN</text>
          <text x="310" y="199" fill={C.light} fontSize="8" fontFamily="monospace">+ uziemienie</text>
        </g>
      ) : (
        <g opacity={id === 'IT' ? 0.45 : 1}>
          <Wire d="M 90 110 L 540 110 L 540 98" color={C.N} />
          <text x="142" y="103" fill={C.N} fontSize="11" fontFamily="monospace" fontWeight="bold">N</text>
        </g>
      )}
      {id === 'IT' ? <text x="160" y="103" fill={C.light} fontSize="8" fontFamily="monospace">– nie zawsze prowadzony</text> : null}

      {id === 'TN-S' ? (
        <g>
          <Wire d="M 90 150 L 470 150" color={C.PE} stripe />
          <circle cx="90" cy="150" r="4" fill={C.PE} />
          <text x="142" y="143" fill={C.PE} fontSize="11" fontFamily="monospace" fontWeight="bold">PE</text>
        </g>
      ) : null}

      {/* ── odbiornik klasy I ── */}
      <text x="540" y="28" fill={C.gray} fontSize="9" fontFamily="monospace" textAnchor="middle">ODBIORNIK (KLASA I)</text>
      <rect x="470" y="36" width="140" height="148" fill="none" stroke={C.gray} strokeWidth="3" />
      <rect x="526" y="74" width="28" height="24" fill="var(--c-f3f6f4)" stroke={C.gray} strokeWidth="2" />
      <text x="540" y="90" fill={C.gray} fontSize="8" fontFamily="monospace" textAnchor="middle">R</text>
      <text x="540" y="168" fill={C.light} fontSize="8" fontFamily="monospace" textAnchor="middle">metalowa obudowa</text>
      <circle cx="470" cy="150" r="4.5" fill={C.PE} />

      {/* obudowy na własnym uziomie (TT, IT) */}
      {localEarth ? (
        <g>
          <Wire d="M 470 150 L 440 150 L 440 196" color={C.PE} stripe width={3} />
          <Earth x={440} y={196} color={C.PE} />
          <text x="430" y="190" fill={C.light} fontSize="8" fontFamily="monospace" textAnchor="end">własny uziom</text>
          <text x="430" y="199" fill={C.light} fontSize="8" fontFamily="monospace" textAnchor="end">obudów (RA)</text>
        </g>
      ) : null}
    </svg>
  )
}

export function SystemDecoder() {
  const [id, setId] = useState('TN-C-S')
  const [focus, setFocus] = useState(null)
  const sys = SYSTEMS[id]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(SYSTEMS).map((k) => (
          <button
            key={k}
            onClick={() => { setId(k); setFocus(null) }}
            className={`cham-sm edge px-3 py-1.5 font-mono text-[12px] font-bold tracking-[0.08em] transition ${id === k ? 'bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'bg-[color:var(--b-fafbfa)] text-gray-500 hover:text-gray-800'}`}
            style={{ '--e': id === k ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
          >
            {k}
          </button>
        ))}
      </div>

      <div className={`grid gap-2 ${sys.letters.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : sys.letters.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {sys.letters.map(([pos, letter, override], i) => {
          const l = LETTERS[pos][letter]
          const on = focus === pos
          return (
            <button
              key={i}
              onClick={() => setFocus(on ? null : pos)}
              className={`cham edge px-3 py-2.5 text-left transition ${on ? 'bg-[color:var(--b-e7f0eb)]' : 'bg-[color:var(--b-fafbfa)] hover:bg-[color:var(--b-eef3f0)]'}`}
              style={{ '--e': on ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                {POSITIONS[pos].title} · {POSITIONS[pos].about}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-[color:var(--c-14543e)]">{letter}</span>
                <span className="text-sm text-gray-900"><span className="font-semibold italic">{l.word}</span> – {l.pl}</span>
              </div>
              <div className="mt-1 text-[12px] leading-5 text-gray-600">{override ?? l.text}</div>
            </button>
          )
        })}
      </div>
      <div className="text-[11px] text-gray-500">Kliknij literę – na schemacie podświetli się część układu, której dotyczy.</div>

      <div className="overflow-x-auto border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] p-2">
        <Diagram id={id} focus={focus} />
      </div>

      <NoteBox type="remember" title={`${id} w skrócie`}>
        {sys.summary} <span className="text-gray-600">Gdzie: {sys.where}</span>
      </NoteBox>
    </div>
  )
}
