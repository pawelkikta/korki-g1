import React, { useRef, useState } from 'react'
import { Zap, RotateCcw } from 'lucide-react'
import { Button, NoteBox, ValueTile } from '../ui.jsx'

// Bezpiecznik topikowy gG 16 A – drucik topi się od prądu; jednorazowy

function Cartridge({ blown, glowing }) {
  return (
    <svg viewBox="0 0 300 120" className="mx-auto w-full max-w-[340px]">
      <text x="150" y="14" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">wkładka topikowa (przekrój symboliczny)</text>
      {/* końcówki stykowe */}
      <rect x="30" y="40" width="30" height="44" rx="4" fill="var(--c-c8cfd2)" stroke="var(--c-8a958e)" strokeWidth="2" />
      <rect x="240" y="40" width="30" height="44" rx="4" fill="var(--c-c8cfd2)" stroke="var(--c-8a958e)" strokeWidth="2" />
      {/* korpus porcelanowy */}
      <rect x="60" y="32" width="180" height="60" rx="8" fill="var(--c-f6f1e7)" stroke="var(--c-8a958e)" strokeWidth="2" />
      <text x="150" y="50" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">gG 16A · 500V</text>
      {/* drucik topikowy */}
      {blown ? (
        <g>
          <line x1="70" y1="72" x2="130" y2="72" stroke="var(--c-8a958e)" strokeWidth="2.5" />
          <line x1="170" y1="72" x2="230" y2="72" stroke="var(--c-8a958e)" strokeWidth="2.5" />
          <path d="M 138 64 l 8 8 l -6 2 l 9 9" fill="none" stroke="var(--c-b3261e)" strokeWidth="2" />
          <text x="150" y="106" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PRZEPALONA – do wymiany</text>
        </g>
      ) : (
        <line x1="70" y1="72" x2="230" y2="72" stroke={glowing ? 'var(--c-d97706)' : 'var(--c-8a958e)'} strokeWidth={glowing ? 4 : 2.5}
          style={{ transition: 'all 0.4s', filter: glowing ? 'drop-shadow(0 0 6px var(--c-d97706))' : 'none' }} />
      )}
      {/* wskaźnik zadziałania (oczko) */}
      <circle cx="150" cy="38" r="5" fill={blown ? 'var(--c-b3261e)' : 'var(--c-1f7a4d)'} stroke="var(--c-8a958e)" style={{ transition: 'fill 0.3s' }} />
      <text x="163" y="41" fill="var(--c-66736c)" fontSize="7" fontFamily="monospace">wskaźnik</text>
      {/* przepływ prądu */}
      {!blown ? (
        <line x1="30" y1="72" x2="270" y2="72" stroke="var(--c-d97706)" strokeWidth="1.6" strokeDasharray="5 9" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.8s" repeatCount="indefinite" />
        </line>
      ) : null}
    </svg>
  )
}

export function DeviceFuse() {
  const [amps, setAmps] = useState(10)
  const [blown, setBlown] = useState(false)
  const [glowing, setGlowing] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const timer = useRef(null)

  const simulate = () => {
    if (blown) return
    clearTimeout(timer.current)
    if (amps <= 16) {
      setVerdict({ type: 'remember', title: `${amps} A – wkładka przewodzi`, text: 'Prąd nie przekracza wartości znamionowej gG 16 A. Drucik lekko się grzeje, ale jest zaprojektowany na ciągłą pracę przy In.' })
      return
    }
    if (amps < 26) {
      // strefa niepewności gG: prąd probierczy nieprzepalający 1,25×In (20 A), przepalający 1,6×In (~26 A)
      setGlowing(true)
      timer.current = setTimeout(() => {
        setGlowing(false)
        setVerdict({
          type: 'warning',
          title: `Strefa niepewności – ${amps} A może NIE przepalić wkładki`,
          text: `${amps} A = ${(amps / 16).toFixed(2).replace('.', ',')}×In. Norma dla gG: przy 1,25×In (20 A) wkładka ma wytrzymać godzinę bez przepalenia, pewne przepalenie dopiero od 1,6×In (~26 A). Topik się grzeje, ale może tak pracować bardzo długo – dlatego bezpiecznik NIE jest precyzyjnym strażnikiem lekkich przeciążeń.`,
        })
      }, 1600)
      return
    }
    // orientacyjna charakterystyka gG 16 A: ~65 A → ok. 5 s, ~110 A (≈7×In) → ok. 0,4 s
    const when = amps >= 110
      ? 'Przy takim prądzie przepali się w czasie krótszym niż 0,4 s.'
      : amps >= 65
        ? 'Przepali się po około 0,4–5 s.'
        : amps >= 40
          ? 'Przepali się po kilku do kilkudziesięciu sekund.'
          : 'Przy umiarkowanym przeciążeniu potrwa to od kilkudziesięciu sekund do kilkunastu minut.'
    setGlowing(true)
    setVerdict({ type: 'warning', title: 'Drucik się nagrzewa...', text: `${amps} A ≥ 1,6×In – topik grzeje się ponad wytrzymałość. ${when}${amps < 65 ? ' W symulacji skracamy ten czas.' : ''}` })
    timer.current = setTimeout(() => {
      setGlowing(false)
      setBlown(true)
      setVerdict({
        type: 'mistake',
        title: 'Topik przepalony – obwód przerwany',
        text: `Drucik stopił się i przerwał obwód, piasek kwarcowy w korpusie zgasił łuk. Wkładka jest JEDNORAZOWA – wymieniasz na nową o tej samej charakterystyce i prądzie (gG 16 A). Wskaźnik (oczko) pokazuje zadziałanie bez wykręcania.${amps < 110 ? ' Uwaga: przy tym prądzie trwało to dłużej niż 0,4 s – jako ochrona przy zwarciu na obudowę w obwodzie gniazd byłoby to za wolno.' : ''}`,
      })
    }, amps >= 110 ? 500 : 1600)
  }

  const replace = () => {
    clearTimeout(timer.current)
    setBlown(false)
    setGlowing(false)
    setVerdict({ type: 'remember', title: 'Nowa wkładka założona', text: 'Zawsze ta sama wartość i charakterystyka. Większa wkładka „żeby nie przepalało" = kable grzeją się bez ochrony = pożar.' })
  }

  return (
    <div className="space-y-4">
      <Cartridge blown={blown} glowing={glowing} />

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
          <span>Prąd w obwodzie</span>
          <span className="text-base font-black text-[color:var(--c-14543e)]">{amps} A</span>
        </div>
        <input type="range" min={0} max={160} step={1} value={amps} onChange={(e) => setAmps(Number(e.target.value))} className="mt-3 w-full" />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>0 A</span><span>16 (In)</span><span>26 (1,6×In)</span><span>~110 (0,4 s)</span><span>160 A</span></div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={simulate} disabled={blown || glowing}><Zap className="mr-2 h-4 w-4" /> Symuluj ten prąd</Button>
          <Button variant="secondary" onClick={replace} disabled={!blown}><RotateCcw className="mr-2 h-4 w-4" /> Wymień wkładkę</Button>
        </div>
      </div>

      {verdict ? <NoteBox type={verdict.type} title={verdict.title}>{verdict.text}</NoteBox> : null}

      <div className="grid grid-cols-3 gap-2">
        <ValueTile value="gG" label="charakterystyka ogólnego przeznaczenia (kable, instalacje)" />
        <ValueTile value="aM" label="charakterystyka do silników – toleruje prąd rozruchu" />
        <ValueTile value="1 raz" label="wkładka jest jednorazowa – po zadziałaniu wymiana" />
      </div>
      <NoteBox type="remember" title="Wkładka gG 16 A a wyłącznik B16 – nie są zamienne przy ochronie">
        Żeby wyłączyć w 0,4 s, wyłącznik B16 potrzebuje 80 A (5×In), a wkładka gG 16 A – około 110 A (ok. 7×In, zależnie od producenta).
        Ta sama pętla zwarcia może więc wystarczyć dla B16, a nie wystarczyć dla bezpiecznika. Dopuszczalną impedancję pętli liczysz
        zawsze dla tego zabezpieczenia, które faktycznie stoi w obwodzie.
      </NoteBox>
      <NoteBox type="mistake" title="Śmiertelnie poważny błąd praktyczny">
        „Naprawianie" wkładki drucikiem albo wkładanie grubszej „żeby trzymała" – obwód zostaje bez ochrony, kable grzeją się do pożaru.
        Na egzaminie to pytanie-pewniak z BHP.
      </NoteBox>
    </div>
  )
}
