import React, { useState } from 'react'
import { NoteBox, Tag } from '../ui.jsx'

// „Gdzie to wszystko siedzi" – droga L / N / PE od stacji do gniazdka,
// z pokazaniem, KTÓRE przewody przechodzą przez KTÓRY aparat.

const C = {
  L: 'var(--c-a05a1f)',
  N: 'var(--c-2b6cb0)',
  PE: 'var(--c-1f7a4d)',
  PEyellow: 'var(--c-d9b310)',
  gray: 'var(--c-66736c)',
  light: 'var(--c-8a958e)',
  hot: 'var(--c-d97706)',
  bad: 'var(--c-b3261e)',
}

const Y = { L: 78, N: 134, PE: 196 }

const NODES = {
  stacja: {
    label: 'Stacja transformatorowa',
    where: 'Kilkadziesiąt – kilkaset metrów od budynku (słup lub budyneczek).',
    wires: 'Wychodzą: L1, L2, L3 + PEN',
    text: 'Tu powstaje napięcie i tu jest **uziemiony punkt gwiazdowy**. Wszystko, co dzieje się dalej, wraca ostatecznie do tego punktu – przewodem N albo przez ziemię.',
  },
  zlacze: {
    label: 'Złącze kablowe + rozdział PEN',
    where: 'Szafka na ścianie budynku lub w ogrodzeniu (te z plombą i bezpiecznikami mocy NH).',
    wires: 'Wchodzi PEN → wychodzą osobno N i PE',
    text: 'Tu kończy się układ TN-C i zaczyna TN-S. **PEN rozgałęzia się na N i PE**, a punkt rozdziału jest dodatkowo uziemiony uziomem budynku. Od tego miejsca **N i PE już nigdy się nie łączą**. Tu też siedzą bezpieczniki przedlicznikowe (wkładki NH).\n\n**Złącze należy do operatora sieci i jest plombowane** – elektryk z G1 pkt 2 nie otwiera go ani nie wymienia tam wkładek bez zgody operatora.\n\nRozdział PEN bywa zrobiony w złączu albo dopiero w **rozdzielnicy głównej budynku** – zasada jest identyczna. Na schemacie w bloku 1 widzisz ten drugi wariant.',
  },
  licznik: {
    label: 'Licznik energii',
    where: 'W szafce na klatce schodowej albo w złączu – zawsze przed rozdzielnicą mieszkania.',
    wires: 'Przechodzą: L i N (PE go omija)',
    text: 'Mierzy zużytą energię. **Przez licznik przechodzą tylko przewody robocze L i N** – bo tylko nimi płynie prąd, za który płacisz. PE nie ma z licznikiem nic wspólnego, biegnie obok. Licznik jest własnością operatora i jest zaplombowany – nie wolno go odłączać ani zdejmować plomb.',
  },
  glowny: {
    label: 'Wyłącznik główny (rozłącznik)',
    where: 'Pierwszy aparat w twojej rozdzielnicy, od lewej.',
    wires: 'Rozłącza: L i N',
    text: 'Jednym ruchem odcina **całe mieszkanie**. Rozłącza L i N (dlatego jest 2-biegunowy). To on daje ci „brak napięcia" przed pracą – ale i tak **musisz sprawdzić wskaźnikiem**, czy faktycznie zniknęło.',
  },
  spd: {
    label: 'Ogranicznik przepięć (SPD)',
    where: 'Na początku rozdzielnicy, tuż za wyłącznikiem głównym.',
    wires: 'Wpięty RÓWNOLEGLE: L–PE i N–PE',
    text: 'SPD **nie jest wpięty w szereg** jak wyłącznik – prąd obciążenia przez niego nie płynie. Wisi równolegle do instalacji: jeden moduł **między L a PE**, drugi **między N a PE** (za rozdziałem PEN, w układzie TN-S).\n\nNormalnie izoluje (megaomy) i nic nie robi. Gdy przyjdzie przepięcie – na chwilę przewodzi i **spuszcza udar do PE i uziomu**, zamiast pozwolić mu wejść w twoją elektronikę.',
  },
  rcd: {
    label: 'Wyłącznik różnicowoprądowy (RCD)',
    where: 'W rozdzielnicy, za wyłącznikiem głównym – zwykle jeden na kilka obwodów albo RCBO na każdy.',
    wires: 'Przechodzą przez niego: L i N. PE go OMIJA!',
    text: 'To jest sedno, którego zwykle nikt nie pokazuje: **przez przekładnik RCD przewleczone są przewody L i N – ale NIE PE**. Dzięki temu RCD porównuje, ile prądu wypłynęło L i ile wróciło N.\n\nGdy prąd ucieknie inną drogą (przez PE albo przez człowieka do ziemi) – **nie wróci przez przekładnik**, pojawi się różnica i wyłącznik zadziała. Gdyby PE też przez niego przechodził, prąd upływu do PE wracałby przez przekładnik, różnica by się „zasklepiła" i RCD by nie zadziałał.',
  },
  mcb: {
    label: 'Wyłączniki nadprądowe (MCB)',
    where: 'Rządek „esek" w rozdzielnicy – po jednym na każdy obwód: gniazda, światło, kuchenka.',
    wires: 'Jednobiegunowy (1P): TYLKO na L',
    text: 'W instalacji 1-fazowej zwykła „eska" 1P **przerywa wyłącznie przewód fazowy L** – N i PE idą obok nietknięte. Chroni kabel danego obwodu przed przeciążeniem i zwarciem. Stąd oczywisty wniosek: **po zadziałaniu „eski" przewód N nadal jest połączony** z resztą instalacji.',
  },
  gniazdo: {
    label: 'Gniazdo w ścianie',
    where: 'Koniec obwodu – kilka do kilkunastu metrów kabla od rozdzielnicy.',
    wires: 'Dochodzą wszystkie trzy: L, N, PE',
    text: 'Dwa styki okrągłe (**L i N**) i **bolec PE**. Prąd użytkowy krąży L → odbiornik → N. Bolec PE jest bezczynny do momentu, aż faza dotknie metalowej obudowy – wtedy daje prądowi drogę powrotną i zabezpieczenie wyłącza obwód.',
  },
}

function Rich({ text }) {
  return String(text).split('\n\n').map((para, pi) => (
    <p key={pi} className={pi ? 'mt-2' : ''}>
      {para.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold text-[color:var(--c-14543e)]">{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>,
      )}
    </p>
  ))
}

export function InstallationMap() {
  const [sel, setSel] = useState('rcd')
  const info = NODES[sel]

  const box = (id, x, w, yTop, h, label, sub) => {
    const active = sel === id
    return (
      <g onClick={() => setSel(id)} style={{ cursor: 'pointer' }} opacity={active ? 1 : 0.75}>
        <rect
          x={x} y={yTop} width={w} height={h} rx="2"
          fill={active ? 'var(--c-e7f0eb)' : 'var(--c-fafbfa)'}
          stroke={active ? 'var(--c-1a5c46)' : 'var(--c-b9c4bd)'}
          strokeWidth={active ? 2.5 : 1.5}
        />
        <text x={x + w / 2} y={yTop - 8} fill={active ? 'var(--c-14543e)' : C.gray} fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{label}</text>
        {sub ? <text x={x + w / 2} y={yTop + h + 14} fill={C.light} fontSize="8" fontFamily="monospace" textAnchor="middle">{sub}</text> : null}
      </g>
    )
  }

  const spdOn = sel === 'spd'
  const spdLeg = spdOn ? C.bad : C.gray

  return (
    <div className="space-y-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        Kliknij aparat, żeby zobaczyć gdzie siedzi i które przewody przez niego przechodzą
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 880 300" className="w-full min-w-[820px]">
          {/* rozdzielnica – tło */}
          <rect x="292" y="40" width="378" height="200" fill="var(--c-f3f6f4)" stroke="var(--c-d7ded9)" strokeDasharray="5 5" />
          <text x="481" y="233" fill={C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">ROZDZIELNICA MIESZKANIA</text>

          {/* ── szyny L / N / PE ── */}
          <line x1="60" y1={Y.L} x2="790" y2={Y.L} stroke={C.L} strokeWidth="3.5" />
          <line x1="60" y1={Y.N} x2="790" y2={Y.N} stroke={C.N} strokeWidth="3.5" />
          {/* PE zaczyna się dopiero w punkcie rozdziału PEN i omija aparaty */}
          <line x1="150" y1={Y.PE} x2="790" y2={Y.PE} stroke={C.PE} strokeWidth="3.5" />
          <line x1="150" y1={Y.PE} x2="790" y2={Y.PE} stroke={C.PEyellow} strokeWidth="1.3" strokeDasharray="7 9" />

          {/* PEN przed rozdziałem */}
          <line x1="60" y1={Y.N} x2="150" y2={Y.N} stroke={C.PEyellow} strokeWidth="1.3" strokeDasharray="7 9" />

          {/* opisy przewodów – przy odcinkach, których dotyczą */}
          <text x="70" y={Y.L - 7} fill={C.L} fontSize="11" fontFamily="monospace" fontWeight="bold">L</text>
          <text x="80" y={Y.N - 7} fill={C.N} fontSize="10" fontFamily="monospace" fontWeight="bold">PEN</text>
          <text x="190" y={Y.N - 7} fill={C.N} fontSize="11" fontFamily="monospace" fontWeight="bold">N</text>
          <text x="190" y={Y.PE - 7} fill={C.PE} fontSize="11" fontFamily="monospace" fontWeight="bold">PE</text>

          {/* ── stacja ── */}
          {box('stacja', 16, 44, 56, 100, 'STACJA', '15 kV → 230 V')}
          <text x="38" y="112" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="middle">punkt</text>
          <text x="38" y="122" fill={C.N} fontSize="8" fontFamily="monospace" textAnchor="middle">gwiazd.</text>

          {/* ── złącze + rozdział PEN ── */}
          {box('zlacze', 116, 68, 56, 130, 'ZŁĄCZE', null)}
          <g onClick={() => setSel('zlacze')} style={{ cursor: 'pointer' }}>
            <circle cx="150" cy={Y.N} r="5" fill={C.N} />
            <line x1="150" y1={Y.N} x2="150" y2={Y.PE} stroke={C.PE} strokeWidth="3" />
            <circle cx="150" cy={Y.PE} r="4" fill={C.PE} />
            {/* uziom budynku */}
            <line x1="150" y1={Y.PE} x2="150" y2="228" stroke={C.PE} strokeWidth="2" />
            <line x1="140" y1="230" x2="160" y2="230" stroke={C.PE} strokeWidth="2.5" />
            <line x1="144" y1="235" x2="156" y2="235" stroke={C.PE} strokeWidth="2" />
            <text x="164" y="224" fill={C.light} fontSize="8" fontFamily="monospace">rozdział PEN</text>
            <text x="164" y="234" fill={C.light} fontSize="8" fontFamily="monospace">+ uziom budynku</text>
          </g>

          {/* ── licznik ── */}
          {box('licznik', 206, 60, 56, 100, 'LICZNIK', 'tylko L i N')}

          {/* ── wyłącznik główny ── */}
          {box('glowny', 300, 56, 56, 100, 'WYŁ. GŁÓWNY', '2-biegunowy')}

          {/* ── SPD: moduły RÓWNOLEGLE, L–PE i N–PE ── */}
          <g onClick={() => setSel('spd')} style={{ cursor: 'pointer' }} opacity={spdOn ? 1 : 0.8}>
            <rect x="364" y="36" width="72" height="182" fill="transparent" />
            <text x="400" y="48" fill={spdOn ? 'var(--c-14543e)' : C.gray} fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SPD</text>
            {/* noga z L – przeskakuje nad szyną N (brak połączenia) */}
            <path d={`M 384 ${Y.L} L 384 ${Y.N - 6} a 6 6 0 0 1 0 12 L 384 150`} fill="none" stroke={spdLeg} strokeWidth="2.5" />
            <circle cx="384" cy={Y.L} r="3.5" fill={C.L} />
            {/* noga z N */}
            <line x1="416" y1={Y.N} x2="416" y2="150" stroke={spdLeg} strokeWidth="2.5" />
            <circle cx="416" cy={Y.N} r="3.5" fill={C.N} />
            {/* dwa moduły warystorowe */}
            {[384, 416].map((x) => (
              <g key={x}>
                <rect x={x - 9} y="150" width="18" height="28" rx="2" fill={spdOn ? 'var(--c-e7f0eb)' : 'var(--c-fafbfa)'} stroke={spdOn ? 'var(--c-1a5c46)' : 'var(--c-b9c4bd)'} strokeWidth={spdOn ? 2 : 1.5} />
                <path d={`M ${x - 5} 173 L ${x - 2} 173 L ${x + 5} 155`} fill="none" stroke={spdOn ? 'var(--c-1a5c46)' : C.gray} strokeWidth="1.3" />
                <line x1={x} y1="178" x2={x} y2={Y.PE} stroke={spdLeg} strokeWidth="2.5" />
                <circle cx={x} cy={Y.PE} r="3.5" fill={C.PE} />
              </g>
            ))}
            <text x="400" y="213" fill={spdOn ? C.bad : C.light} fontSize="8" fontFamily="monospace" textAnchor="middle">L–PE, N–PE</text>
          </g>

          {/* ── RCD ── */}
          {box('rcd', 452, 86, 56, 100, 'RCD 30 mA', 'L i N przez przekładnik')}
          <g onClick={() => setSel('rcd')} style={{ cursor: 'pointer' }}>
            {/* przekładnik obejmujący L i N */}
            <ellipse
              cx="495" cy={(Y.L + Y.N) / 2} rx="26" ry="38"
              fill="none" stroke={sel === 'rcd' ? C.bad : 'var(--c-8a958e)'} strokeWidth={sel === 'rcd' ? 3.5 : 2}
            />
            <text x="495" y={(Y.L + Y.N) / 2 + 4} fill={sel === 'rcd' ? C.bad : C.light} fontSize="8" fontFamily="monospace" textAnchor="middle">Σ</text>
            {sel === 'rcd' ? (
              <>
                <text x="495" y="30" fill={C.bad} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L + N przechodzą</text>
                <text x="560" y={Y.PE - 8} fill={C.bad} fontSize="9" fontFamily="monospace" fontWeight="bold">PE OMIJA przekładnik ↓</text>
              </>
            ) : null}
          </g>

          {/* ── MCB ── */}
          {box('mcb', 570, 76, 56, 44, 'MCB B16 (1P)', 'tylko na L')}
          {sel === 'mcb' ? (
            <text x="608" y="150" fill={C.bad} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">N i PE idą obok</text>
          ) : null}

          {/* ── gniazdo ── */}
          {box('gniazdo', 700, 90, 56, 150, 'GNIAZDO', 'L + N + PE')}
          <g onClick={() => setSel('gniazdo')} style={{ cursor: 'pointer' }}>
            <circle cx="726" cy="100" r="8" fill="none" stroke={C.L} strokeWidth="2.5" />
            <circle cx="766" cy="100" r="8" fill="none" stroke={C.N} strokeWidth="2.5" />
            <rect x="738" y="150" width="14" height="11" fill="none" stroke={C.PE} strokeWidth="2.5" />
          </g>
          {/* dojścia do styków gniazda */}
          <line x1="726" y1={Y.L} x2="726" y2="92" stroke={C.L} strokeWidth="2.5" />
          <line x1="766" y1={Y.N} x2="766" y2="108" stroke={C.N} strokeWidth="2.5" />
          <line x1="745" y1={Y.PE} x2="745" y2="161" stroke={C.PE} strokeWidth="2.5" />

          {/* podświetlenie przewodów przechodzących przez wybrany aparat */}
          {sel === 'rcd' ? (
            <>
              <line x1="452" y1={Y.L} x2="538" y2={Y.L} stroke={C.hot} strokeWidth="4" opacity="0.9" />
              <line x1="452" y1={Y.N} x2="538" y2={Y.N} stroke={C.hot} strokeWidth="4" opacity="0.9" />
            </>
          ) : null}
          {sel === 'mcb' ? <line x1="570" y1={Y.L} x2="646" y2={Y.L} stroke={C.hot} strokeWidth="4" opacity="0.9" /> : null}
          {sel === 'licznik' ? (
            <>
              <line x1="206" y1={Y.L} x2="266" y2={Y.L} stroke={C.hot} strokeWidth="4" opacity="0.9" />
              <line x1="206" y1={Y.N} x2="266" y2={Y.N} stroke={C.hot} strokeWidth="4" opacity="0.9" />
            </>
          ) : null}
          {sel === 'glowny' ? (
            <>
              <line x1="300" y1={Y.L} x2="356" y2={Y.L} stroke={C.hot} strokeWidth="4" opacity="0.9" />
              <line x1="300" y1={Y.N} x2="356" y2={Y.N} stroke={C.hot} strokeWidth="4" opacity="0.9" />
            </>
          ) : null}
        </svg>
      </div>

      <NoteBox type={sel === 'rcd' ? 'trap' : 'remember'} title={info.label}>
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tag tone="slate">{info.where}</Tag>
          <Tag tone={sel === 'rcd' ? 'red' : 'amber'}>{info.wires}</Tag>
        </div>
        <Rich text={info.text} />
      </NoteBox>

      <div className="flex flex-wrap gap-1.5">
        {Object.entries(NODES).map(([id, n]) => (
          <button
            key={id}
            onClick={() => setSel(id)}
            className={`rounded-xs edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
              sel === id ? 'bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'bg-[color:var(--b-fafbfa)] text-gray-500 hover:text-gray-800'
            }`}
            style={{ '--e': sel === id ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
          >
            {n.label}
          </button>
        ))}
      </div>
    </div>
  )
}
