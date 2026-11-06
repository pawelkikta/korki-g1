import React, { useState } from 'react'
import { NoteBox, ValueTile } from '../ui.jsx'

// Wyzwalacz elektromagnetyczny: pewne natychmiastowe zadziałanie od górnej granicy zakresu
// B = 3–5×In, C = 5–10×In, D = 10–20×In → dla In = 16 A progi 80 / 160 / 320 A
const CHARS = {
  B: { mult: 5, range: '3–5×In', uses: 'oświetlenie, gniazda (dom)' },
  C: { mult: 10, range: '5–10×In', uses: 'silniki, urządzenia z rozruchem' },
  D: { mult: 20, range: '10–20×In', uses: 'przemysł, duże udary rozruchowe' },
}
const IN = 16

export function SimPetlaZwarcia() {
  const [zs, setZs] = useState(0.5)
  const [char, setChar] = useState('B')
  const ik = 230 / zs
  const threshold = IN * CHARS[char].mult
  const zsMax = 230 / threshold // maks. dopuszczalna impedancja pętli dla pewnego wyzwolenia
  const instant = ik >= threshold
  const speed = Math.max(0.25, Math.min(2.5, 120 / ik)) // animacja: większy prąd = szybszy przepływ

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 640 240" className="w-full">
        {/* transformator: lewe koło = uzwojenie 15 kV, prawe = uzwojenie 230 V.
            Pętla zwarcia zamyka się WYŁĄCZNIE przez uzwojenie 230 V – strony nie są połączone galwanicznie */}
        <circle cx="58" cy="135" r="22" fill="none" stroke="var(--c-66736c)" strokeWidth="2" />
        <circle cx="88" cy="135" r="22" fill="none" stroke="var(--c-66736c)" strokeWidth="2" />
        <text x="32" y="139" fill="var(--c-8a958e)" fontSize="9" fontFamily="monospace" textAnchor="end">15 kV</text>
        <text x="114" y="139" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace">230 V</text>
        <text x="58" y="104" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace" textAnchor="middle">TRAFO</text>

        {/* przewód L: uzwojenie 230 V → bezpiecznik → gniazdo → urządzenie */}
        <path d="M 88 113 L 88 80 L 470 80" fill="none" stroke="var(--c-d68a0a)" strokeWidth="3" />
        {/* przewód PE: obudowa → szyna PE → (PEN) → punkt neutralny tego samego uzwojenia */}
        <path d="M 500 138 L 500 190 L 88 190 L 88 157" fill="none" stroke="var(--c-1f7a4d)" strokeWidth="3" />
        <text x="300" y="208" fill="var(--c-1f7a4d)" fontSize="10" fontFamily="monospace" textAnchor="middle">PE – droga powrotna prądu zwarciowego</text>

        {/* animowany prąd zwarciowy w pętli (pod aparatami, żeby nie zasłaniał opisów) */}
        <path d="M 88 113 L 88 80 L 500 80 L 500 138 L 500 190 L 88 190 L 88 157" fill="none" stroke="var(--c-d97706)" strokeWidth="2.5" strokeDasharray="8 12" opacity="0.95">
          <animate attributeName="stroke-dashoffset" from="40" to="0" dur={`${speed}s`} repeatCount="indefinite" />
        </path>

        {/* wyłącznik nadprądowy */}
        <rect x="200" y="62" width="36" height="36" fill={instant ? 'var(--c-e9f4ed)' : 'var(--c-fdf0ee)'} stroke={instant ? 'var(--c-1f7a4d)' : 'var(--c-c03538)'} strokeWidth="2" />
        <text x="218" y="84" fill={instant ? 'var(--c-1f7a4d)' : 'var(--c-b3261e)'} fontSize="9" fontFamily="monospace" textAnchor="middle">{char}{IN}</text>
        <text x="218" y="52" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">{instant ? 'WYŁĄCZA ✓' : 'NIE CZUJE ✗'}</text>

        {/* urządzenie ze zwarciem na obudowę */}
        <rect x="470" y="58" width="90" height="80" fill="none" stroke="var(--c-8a958e)" strokeWidth="2" />
        <text x="536" y="116" fill="var(--c-66736c)" fontSize="10" fontFamily="monospace" textAnchor="middle">PRALKA</text>
        <text x="515" y="50" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" textAnchor="middle">zwarcie L→obudowa</text>
        <path d="M 488 84 l 8 12 l -6 2 l 9 13" fill="none" stroke="var(--c-b3261e)" strokeWidth="2" />
        <text x="330" y="70" fill="var(--c-14543e)" fontSize="11" fontFamily="monospace" textAnchor="middle">Ik = {Math.round(ik)} A</text>
      </svg>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_240px]">
        <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
            <span>Impedancja pętli zwarcia <span className="normal-case">Zs</span></span>
            <span className="text-base font-black text-[color:var(--c-14543e)]">{zs.toFixed(2).replace('.', ',')} Ω</span>
          </div>
          <div className="relative mt-3">
            <input type="range" min={0.2} max={10} step={0.1} value={zs} onChange={(e) => setZs(Number(e.target.value))} className="w-full" />
            {/* znacznik Zs max dla wybranej charakterystyki */}
            <div
              className="pointer-events-none absolute -top-1 h-6 w-0.5 bg-[color:var(--b-c03538)]"
              style={{ left: `${((zsMax - 0.2) / 9.8) * 100}%`, transition: 'left 0.25s' }}
            />
            <div
              className="pointer-events-none absolute -top-5 -translate-x-1/2 font-mono text-[9px] font-bold text-[color:var(--c-b3261e)]"
              style={{ left: `${((zsMax - 0.2) / 9.8) * 100}%`, transition: 'left 0.25s' }}
            >
              Zs max
            </div>
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>0,2 Ω – krótka, gruba linia</span><span>10 Ω – długa, cienka, złe styki</span></div>
        </div>
        <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Charakterystyka</div>
          <div className="mt-2 flex gap-1.5">
            {Object.keys(CHARS).map((c) => (
              <button
                key={c}
                onClick={() => setChar(c)}
                className={`flex-1 border px-2 py-1.5 text-center font-mono text-sm font-bold transition ${
                  char === c ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
                }`}
              >
                {c}{IN}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[11px] leading-4 text-gray-500">
            {char}: wyzwalacz {CHARS[char].range} → pewne zadziałanie od <span className="font-bold text-[color:var(--c-14543e)]">{threshold} A</span>
            <br />({CHARS[char].uses})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <ValueTile value={`${Math.round(ik)} A`} label="prąd zwarciowy Ik = 230 / Zs" tone={instant ? 'amber' : 'red'} />
        <ValueTile value={`${threshold} A`} label={`próg pewnego wyzwolenia ${char}${IN} (${CHARS[char].mult}×In)`} />
        <ValueTile value={`${zsMax.toFixed(2).replace('.', ',')} Ω`} label={`maks. dopuszczalne Zs dla ${char}${IN} – tak oceniasz wynik pomiaru`} tone={zs <= zsMax ? 'amber' : 'red'} />
        <ValueTile value={instant ? '< 0,1 s' : '?'} label="czas wyłączenia (limit dla obwodu odbiorczego: 0,4 s)" tone={instant ? 'amber' : 'red'} />
      </div>

      {instant ? (
        <NoteBox type="remember" title="Zabezpieczenie zadziała">
          Ik = {Math.round(ik)} A ≥ {threshold} A – cewka {char}{IN} wyzwala natychmiast, dużo szybciej niż wymagane 0,4 s. Niska impedancja = dobra ochrona.
          {zs > (2 / 3) * zsMax ? ` Uwaga praktyczna: mierzysz na zimnych przewodach, a przy zwarciu się nagrzewają i ich rezystancja rośnie. Norma w załączniku informacyjnym podpowiada zapas – zmierzone Zs najlepiej do ok. 2/3 wartości granicznej (tu ${(zsMax * 2 / 3).toFixed(2).replace('.', ',')} Ω). Ten wynik jest blisko granicy.` : ''}
          {char !== 'B' ? ` Zauważ: przy charakterystyce ${char} potrzeba ${CHARS[char].mult}×In – czyli tym niższej impedancji pętli, im „twardsza" charakterystyka.` : ''}
        </NoteBox>
      ) : (
        <NoteBox type="mistake" title="Zabezpieczenie może nie zdążyć">
          Zmierzone Zs = {zs.toFixed(2).replace('.', ',')} Ω przekracza dopuszczalne {zsMax.toFixed(2).replace('.', ',')} Ω dla {char}{IN} (Ik = {Math.round(ik)} A &lt; {threshold} A). Obudowa zostaje pod napięciem na sekundy lub dłużej – przekroczony limit 0,4 s.
          {char !== 'B' && 230 / zs >= 80
            ? ` Uwaga: zwykły B16 by tu zadziałał (próg 80 A) – to pokazuje, że przy charakterystyce ${char} wymagana jest niższa impedancja pętli.`
            : ' W praktyce: napraw pętlę (lepsze styki, większy przekrój) albo system wymaga RCD (jak w sieciach TT).'}
        </NoteBox>
      )}
    </div>
  )
}
