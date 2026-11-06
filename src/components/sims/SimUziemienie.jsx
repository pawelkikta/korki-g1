import React, { useState } from 'react'
import { NoteBox, ValueTile } from '../ui.jsx'

// Wymagania, z którymi elektryk z G1 pkt 2 (instalacje do 1 kV) faktycznie się spotyka.
// Uziemienia stacji SN/nn to zakres pkt 3 i operatora sieci – celowo pominięte.
const APPS = [
  { id: 'odgrom', label: 'Uziemienie odgromowe', limit: 10, rule: 'zalecenie PN-EN 62305-3: poniżej 10 Ω' },
  { id: 'tt30', label: 'Układ TT + RCD 30 mA', limit: 50 / 0.03, rule: 'PN-HD 60364-4-41: RA × IΔn ≤ 50 V → RA ≤ 1666 Ω' },
  { id: 'tt300', label: 'Układ TT + RCD 300 mA', limit: 50 / 0.3, rule: 'PN-HD 60364-4-41: RA × IΔn ≤ 50 V → RA ≤ 166 Ω' },
]

// suwak logarytmiczny 1–300 Ω
const posToR = (pos) => {
  const r = Math.pow(10, (pos / 100) * Math.log10(300))
  return r < 10 ? Math.round(r * 10) / 10 : Math.round(r)
}

export function SimUziemienie() {
  const [rePos, setRePos] = useState(36) // ≈ 8 Ω
  const re = posToR(rePos)
  const [appId, setAppId] = useState('odgrom')
  const [disconnected, setDisconnected] = useState(true)
  const [pPos, setPPos] = useState(50) // pozycja elektrody P w % odległości E→C
  const app = APPS.find((a) => a.id === appId)
  const isTT = appId !== 'odgrom'

  // strefy oddziaływania uziomów: P za blisko E zaniża wynik, za blisko C – zawyża
  const deviation = pPos < 35 ? -((35 - pPos) / 25) : pPos > 65 ? (pPos - 65) / 25 : 0
  const stable = deviation === 0
  const measured = re * (1 + deviation * 0.55)
  const ok = measured <= app.limit
  const pX = 110 + ((530 - 110) * pPos) / 100

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 640 246" className="w-full">
        {/* niebo/grunt */}
        <rect x="0" y="0" width="640" height="110" fill="var(--c-f3f6f4)" />
        <rect x="0" y="110" width="640" height="136" fill="var(--c-efe6d8)" />
        <line x1="0" y1="110" x2="640" y2="110" stroke="var(--c-b59b6b)" strokeWidth="2" />
        <text x="615" y="128" fill="var(--c-8a6d2f)" fontSize="10" fontFamily="monospace" textAnchor="end">grunt</text>

        {/* miernik */}
        <rect x="250" y="28" width="140" height="52" fill="var(--c-fafbfa)" stroke="var(--c-d7ded9)" strokeWidth="2" />
        <text x="320" y="48" fill="var(--c-14543e)" fontSize="11" fontFamily="monospace" textAnchor="middle">MIERNIK RE</text>
        <text x="320" y="66" fill={stable ? 'var(--c-66736c)' : 'var(--c-b3540f)'} fontSize="9" fontFamily="monospace" textAnchor="middle">
          RE = U / I = {measured.toFixed(1).replace('.', ',')} Ω{stable ? '' : ' (!)'}
        </text>

        {/* strefy oddziaływania uziomów E i C */}
        <rect x="110" y="112" width={(420 * 35) / 100} height="66" fill="var(--c-b3261e)" opacity="0.06" />
        <rect x={110 + (420 * 65) / 100} y="112" width={(420 * 35) / 100} height="66" fill="var(--c-b3261e)" opacity="0.06" />

        {/* elektrody E i C (stałe) */}
        {[
          { x: 110, name: 'E', desc: 'badana' },
          { x: 530, name: 'C', desc: 'prądowa (20–40 m)' },
        ].map((e) => (
          <g key={e.name}>
            <rect x={e.x - 4} y={110} width={8} height={70} fill="var(--c-9aa5ad)" stroke="var(--c-8a958e)" />
            <text x={e.x} y={200} fill="var(--c-2b3530)" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{e.name}</text>
            <text x={e.x} y={215} fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">{e.desc}</text>
          </g>
        ))}
        {/* elektroda P – ruchoma */}
        <g style={{ transition: 'transform 0.2s' }} transform={`translate(${pX - 320}, 0)`}>
          <rect x={316} y={110} width={8} height={70} fill={stable ? 'var(--c-9aa5ad)' : 'var(--c-c98a5a)'} stroke={stable ? 'var(--c-8a958e)' : 'var(--c-b06a4a)'} />
          <text x={320} y={200} fill={stable ? 'var(--c-2b3530)' : 'var(--c-b3540f)'} fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">P</text>
          <text x={320} y={215} fill={stable ? 'var(--c-66736c)' : 'var(--c-b3540f)'} fontSize="9" fontFamily="monospace" textAnchor="middle">napięciowa</text>
        </g>

        {/* przewody do miernika */}
        <path d="M 110 110 L 110 70 L 250 60" fill="none" stroke="var(--c-1f7a4d)" strokeWidth="2" />
        <path d={`M ${pX} 110 L ${pX} 92 L 320 80`} fill="none" stroke="var(--c-14543e)" strokeWidth="2" />
        <path d="M 530 110 L 530 70 L 390 60" fill="none" stroke="var(--c-d68a0a)" strokeWidth="2" />

        {/* prąd pomiarowy E→C w gruncie */}
        <path d="M 110 150 Q 320 195 530 150" fill="none" stroke="var(--c-d97706)" strokeWidth="2" strokeDasharray="6 10" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        <text x="320" y="238" fill="var(--c-8a6d2f)" fontSize="9" fontFamily="monospace" textAnchor="middle">prąd pomiarowy płynie E → C, napięcie mierzone na P</text>

        {/* połączenie z instalacją – równoległa droga do innych uziomów przez szynę PE */}
        {!disconnected ? (
          <g>
            <path d="M 110 70 L 62 70" fill="none" stroke="var(--c-c03538)" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="6" y="56" width="56" height="30" fill="var(--c-fdf0ee)" stroke="var(--c-c03538)" strokeWidth="1.5" />
            <text x="34" y="69" fill="var(--c-b3261e)" fontSize="8" fontFamily="monospace" textAnchor="middle">szyna PE</text>
            <text x="34" y="80" fill="var(--c-b3261e)" fontSize="7" fontFamily="monospace" textAnchor="middle">+ inne uziomy</text>
            <text x="8" y="46" fill="var(--c-b3261e)" fontSize="9" fontFamily="monospace">wciąż podłączona do instalacji!</text>
          </g>
        ) : null}
      </svg>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="space-y-2">
          <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
              <span>Rzeczywista RE uziomu</span>
              <span className="text-base font-black text-[color:var(--c-14543e)]">{re.toFixed(re < 10 ? 1 : 0).replace('.', ',')} Ω</span>
            </div>
            <input type="range" min={0} max={100} step={1} value={rePos} onChange={(e) => setRePos(Number(e.target.value))} className="mt-3 w-full" />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>1 Ω</span><span>10 Ω</span><span>100 Ω</span><span>300 Ω</span></div>
          </div>
          <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
              <span>Pozycja elektrody P</span>
              <span className={`text-base font-black ${stable ? 'text-[color:var(--c-14543e)]' : 'text-[color:var(--c-b3540f)]'}`}>{pPos}% E→C</span>
            </div>
            <input type="range" min={10} max={90} step={1} value={pPos} onChange={(e) => setPPos(Number(e.target.value))} className="mt-3 w-full" />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>przy E</span><span>środek odległości E–C</span><span>przy C</span></div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-[11px] text-gray-500">Zastosowanie uziemienia:</div>
          <div className="grid gap-1.5">
            {APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAppId(a.id)}
                className={`border px-3 py-1.5 text-left text-xs transition ${appId === a.id ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'}`}
              >
                {a.label} <span className="font-mono text-[10px] text-gray-500">(≤ {Math.floor(a.limit)} Ω)</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] leading-4 text-gray-500">{app.rule}</div>
          <div className="text-[11px] leading-4 text-gray-400">
            Uziemienia stacji SN/nn mierzy i ocenia operator sieci – to urządzenia powyżej 1 kV (pkt 3), poza zakresem G1 pkt 2.
          </div>
        </div>
      </div>

      <button
        onClick={() => setDisconnected((v) => !v)}
        className={`w-full border px-3 py-2.5 text-left transition ${disconnected ? 'border-[color:var(--c-9fcab1)] bg-[color:var(--b-e9f4ed)]' : 'border-[color:var(--c-e5b8b4)] bg-[color:var(--b-fdf0ee)]'}`}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Stan badanej elektrody (kliknij, by zmienić)</div>
        <div className={`text-sm font-bold ${disconnected ? 'text-[color:var(--c-1f7a4d)]' : 'text-[color:var(--c-b3261e)]'}`}>
          {disconnected ? 'Odłączona od instalacji – pomiar prawidłowy' : 'NIE odłączona – pomiar bez sensu'}
        </div>
      </button>

      {!disconnected ? (
        <NoteBox type="mistake" title="Wynik niemiarodajny">
          Elektroda wciąż połączona z instalacją – mierzysz rezystancję całej sieci uziemiającej, nie pojedynczej elektrody.
          Odłącz badaną elektrodę przed pomiarem.
        </NoteBox>
      ) : !stable ? (
        <NoteBox type="warning" title={`Odczyt ${measured.toFixed(1).replace('.', ',')} Ω jest przekłamany (rzeczywiste: ${re.toFixed(1).replace('.', ',')} Ω)`}>
          Elektroda P stoi w strefie oddziaływania uziomu {pPos < 35 ? 'badanego E – wynik ZANIŻONY' : 'prądowego C – wynik ZAWYŻONY'}.
          Przesuń P w okolice środka. W praktyce: wykonuje się pomiar, przesuwa P o kilka metrów i porównuje – jeśli wyniki
          się różnią, elektrody stoją źle.
        </NoteBox>
      ) : isTT ? (
        <NoteBox type={ok ? 'remember' : 'mistake'} title={`RA × IΔn = ${(measured * (appId === 'tt30' ? 0.03 : 0.3)).toFixed(1).replace('.', ',')} V ${ok ? '≤' : '>'} 50 V – wynik ${ok ? 'zgodny' : 'niezgodny'}`}>
          W układzie TT przy zwarciu na obudowę prąd płynie przez uziom budynku i uziom sieci – jest za mały, żeby szybko zadziałał wyłącznik
          nadprądowy. Ochronę zapewnia RCD, a uziom ma tylko pilnować, żeby napięcie na obudowie przy prądzie zadziałania RCD nie przekroczyło 50 V.
          {appId === 'tt30'
            ? ' Z RCD 30 mA wymaganie jest łagodne (≤ 1666 Ω) – dlatego w TT stawia się różnicówki 30 mA, a nie liczy na wyłącznik nadprądowy.'
            : ' Przy RCD 300 mA (np. przeciwpożarowym) limit spada do 166 Ω – im mniej czuły RCD, tym lepszy musi być uziom.'}
        </NoteBox>
      ) : ok ? (
        <NoteBox type="remember" title={`${measured.toFixed(1).replace('.', ',')} Ω ≤ ${app.limit} Ω – wynik zgodny (i stabilny)`}>
          {app.label}: rezystancja w normie, a P poza strefami oddziaływania – przesunięcie elektrody nie zmienia odczytu,
          więc pomiar jest wiarygodny. Pamiętaj o porze pomiaru: mokry grunt zaniża wynik – w innych warunkach niż suche stosuje się współczynnik poprawkowy.
        </NoteBox>
      ) : (
        <NoteBox type="mistake" title={`${measured.toFixed(1).replace('.', ',')} Ω > ${app.limit} Ω – wynik niezgodny`}>
          {app.label}: zalecane RE poniżej {app.limit} Ω. Popraw uziom: dodatkowe pręty, dłuższa taśma, lepszy kontakt z gruntem – i zmierz ponownie.
        </NoteBox>
      )}
    </div>
  )
}
