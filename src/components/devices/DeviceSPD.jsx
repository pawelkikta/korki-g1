import React, { useRef, useState } from 'react'
import { Zap, RotateCcw } from 'lucide-react'
import { Button, NoteBox, ValueTile } from '../ui.jsx'

// Ogranicznik przepięć (SPD) – warystor: normalnie izoluje, przy przepięciu zwiera udar do PE

const MAX_HITS = 3

function Schematic({ installed, surging, wornOut, tvDead }) {
  const varColor = surging && installed && !wornOut ? 'var(--c-b3261e)' : 'var(--c-66736c)'
  return (
    <svg viewBox="0 0 320 240" className="w-full max-w-[360px]">
      <text x="160" y="14" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">instalacja z ogranicznikiem przepięć (schemat)</text>
      {/* linia L od sieci do TV – SPD jest wpięty RÓWNOLEGLE (odgałęzienie do PE), nie w szereg */}
      <line x1="20" y1="60" x2="268" y2="60" stroke="var(--c-d68a0a)" strokeWidth="3" />
      <line x1="268" y1="60" x2="268" y2="70" stroke="var(--c-d68a0a)" strokeWidth="3" />
      {installed ? <circle cx="120" cy="60" r="3.5" fill="var(--c-d68a0a)" /> : null}
      <text x="24" y="80" fill="var(--c-b3540f)" fontSize="10" fontFamily="monospace">L (od sieci)</text>
      {/* udar */}
      {surging ? (
        <g>
          <path d="M 40 26 l 10 16 l -8 2 l 12 16" fill="none" stroke="var(--c-b3261e)" strokeWidth="3">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.25s" repeatCount="3" />
          </path>
          <text x="62" y="32" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold">UDAR ~kV!</text>
        </g>
      ) : null}
      {/* SPD: odgałęzienie L → warystor → PE */}
      {installed ? (
        <g>
          <line x1="120" y1="60" x2="120" y2="96" stroke="var(--c-66736c)" strokeWidth="3" />
          <rect x="96" y="96" width="48" height="56" rx="4" fill={wornOut ? 'var(--c-fdf0ee)' : 'var(--c-f3f6f4)'} stroke={wornOut ? 'var(--c-b3261e)' : 'var(--c-8a958e)'} strokeWidth="2" />
          {/* symbol warystora: rezystor + ukośna kreska z „ogonkiem" (rezystancja zależna od napięcia) */}
          <line x1="120" y1="96" x2="120" y2="108" stroke={varColor} strokeWidth="2" />
          <rect x="113" y="108" width="14" height="32" fill="var(--c-ffffff)" stroke={varColor} strokeWidth="2"
            style={{ filter: surging && installed && !wornOut ? 'drop-shadow(0 0 5px var(--c-b3261e))' : 'none' }} />
          <line x1="120" y1="140" x2="120" y2="152" stroke={varColor} strokeWidth="2" />
          <path d="M 101 146 L 106 146 L 136 112" fill="none" stroke={varColor} strokeWidth="2" />
          {/* okienko wskaźnika zużycia – w obudowie wkładki */}
          <rect x="130" y="99" width="11" height="7" fill={wornOut ? 'var(--c-b3261e)' : 'var(--c-1f7a4d)'} style={{ transition: 'fill 0.3s' }} />
          <text x="150" y="106" fill={wornOut ? 'var(--c-b3261e)' : 'var(--c-1f7a4d)'} fontSize="8" fontFamily="monospace">{wornOut ? 'okienko: WYMIEŃ' : 'okienko: OK'}</text>
          <text x="150" y="124" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace">warystor</text>
          <text x="150" y="135" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">(SPD T2)</text>
          <line x1="120" y1="152" x2="120" y2="186" stroke="var(--c-3f9e5c)" strokeWidth="3" />
          {/* przepływ udaru do PE */}
          {surging && !wornOut ? (
            <path d="M 52 60 L 120 60 L 120 186" fill="none" stroke="var(--c-b3261e)" strokeWidth="3" strokeDasharray="6 8">
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.3s" repeatCount="indefinite" />
            </path>
          ) : null}
        </g>
      ) : (
        <text x="120" y="120" fill="var(--c-8a958e)" fontSize="9" fontFamily="monospace" textAnchor="middle">(brak SPD)</text>
      )}
      {/* bez sprawnego SPD udar idzie linią prosto w odbiornik */}
      {surging && (!installed || wornOut) ? (
        <path d="M 52 60 L 268 60 L 268 70" fill="none" stroke="var(--c-b3261e)" strokeWidth="3" strokeDasharray="6 8">
          <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.3s" repeatCount="indefinite" />
        </path>
      ) : null}
      {/* uziemienie */}
      <line x1="104" y1="188" x2="136" y2="188" stroke="var(--c-3f9e5c)" strokeWidth="2.5" />
      <line x1="110" y1="194" x2="130" y2="194" stroke="var(--c-3f9e5c)" strokeWidth="2" />
      <line x1="116" y1="200" x2="124" y2="200" stroke="var(--c-3f9e5c)" strokeWidth="2" />
      <text x="142" y="196" fill="var(--c-1f7a4d)" fontSize="9" fontFamily="monospace">PE / uziom</text>
      {/* telewizor */}
      <rect x="240" y="70" width="56" height="40" rx="4" fill={tvDead ? 'var(--c-fdf0ee)' : 'var(--c-fafbfa)'} stroke={tvDead ? 'var(--c-b3261e)' : 'var(--c-8a958e)'} strokeWidth="2" />
      <rect x="248" y="76" width="40" height="22" fill={tvDead ? 'var(--c-e5b8b4)' : 'var(--c-dfe5e1)'} />
      <line x1="268" y1="110" x2="268" y2="118" stroke="var(--c-8a958e)" strokeWidth="2" />
      <line x1="254" y1="118" x2="282" y2="118" stroke="var(--c-8a958e)" strokeWidth="2" />
      <text x="268" y="134" fill={tvDead ? 'var(--c-b3261e)' : 'var(--c-66736c)'} fontSize="9" fontFamily="monospace" textAnchor="middle">{tvDead ? 'TV ZNISZCZONY ✗' : 'telewizor'}</text>
      {tvDead ? <path d="M 258 78 l 8 8 m 0 -8 l -8 8 m 14 -6 l 6 6 m 0 -6 l -6 6" stroke="var(--c-b3261e)" strokeWidth="1.5" fill="none" /> : null}
    </svg>
  )
}

export function DeviceSPD() {
  const [installed, setInstalled] = useState(true)
  const [hits, setHits] = useState(0)
  const [surging, setSurging] = useState(false)
  const [tvDead, setTvDead] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const timer = useRef(null)
  const wornOut = hits >= MAX_HITS

  const surge = () => {
    if (surging) return
    clearTimeout(timer.current)
    setSurging(true)
    timer.current = setTimeout(() => {
      setSurging(false)
      if (!installed) {
        setTvDead(true)
        setVerdict({ type: 'mistake', title: 'Brak SPD – przepięcie weszło w odbiorniki', text: 'Kilka kV poszło prosto w telewizor, router i płytę indukcyjną. Elektronika do wymiany, a ubezpieczyciel zapyta o ochronę przepięciową. SPD kosztuje ułamek tego sprzętu.' })
        return
      }
      if (wornOut) {
        setTvDead(true)
        setVerdict({ type: 'mistake', title: 'SPD zużyty – nie przejął udaru', text: 'Warystor po wcześniejszych udarach stracił właściwości (okienko czerwone) i przepięcie przeszło dalej. Dlatego wskaźnik wkładek SPD sprawdza się przy każdym przeglądzie, a wkładkę wymienia, gdy okienko zmieni kolor.' })
        return
      }
      const newHits = hits + 1
      setHits(newHits)
      setVerdict({
        type: newHits >= MAX_HITS ? 'warning' : 'remember',
        title: `Udar przejęty i odprowadzony do PE (${newHits}/${MAX_HITS} zadziałań wkładki)`,
        text: newHits >= MAX_HITS
          ? 'Warystor zadziałał, odbiorniki całe – ale wkładka właśnie się zużyła (okienko zmieniło kolor na czerwony). Następnego udaru już nie przejmie. Wymień wkładkę.'
          : 'Przy przepięciu rezystancja warystora spada z megaomów do pojedynczych omów – udar spływa do uziemienia zamiast w elektronikę. Po udarze warystor wraca do izolowania. Telewizor nawet nie mrugnął.',
      })
    }, 800)
  }

  const replaceCartridge = () => {
    setHits(0)
    setTvDead(false)
    setVerdict({ type: 'remember', title: 'Nowa wkładka SPD', text: 'Okienko wskaźnika znów zielone. Wkładki SPD są wymienne – podstawa zostaje na szynie, wymieniasz sam moduł warystora.' })
  }

  return (
    <div className="space-y-4">
      <Schematic installed={installed} surging={surging} wornOut={wornOut} tvDead={tvDead} />

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={surge} disabled={surging}><Zap className="mr-2 h-4 w-4" /> Wyślij udar (piorun)</Button>
          <Button variant="secondary" onClick={() => { setInstalled((v) => !v); setTvDead(false); setVerdict(null) }}>
            {installed ? 'Wymontuj SPD (zobacz różnicę)' : 'Zamontuj SPD'}
          </Button>
          <Button variant="secondary" onClick={replaceCartridge} disabled={!wornOut && !tvDead}><RotateCcw className="mr-2 h-4 w-4" /> Wymień wkładkę / napraw</Button>
        </div>
        <div className="mt-2 font-mono text-[11px] text-gray-500">
          Stan wkładki: {installed
            ? (wornOut
              ? 'ZUŻYTA (czerwone okienko)'
              : `sprawna – w tej symulacji przejmie jeszcze ${MAX_HITS - hits} ${MAX_HITS - hits === 1 ? 'duży udar' : 'duże udary'} (w realu zużycie zależy od energii udarów)`)
            : 'brak SPD w rozdzielnicy'}
        </div>
      </div>

      {verdict ? <NoteBox type={verdict.type} title={verdict.title}>{verdict.text}</NoteBox> : null}

      <div className="grid grid-cols-3 gap-2">
        <ValueTile value="T1" label="prądy piorunowe (bezpośrednie trafienie) – złącze/RG" />
        <ValueTile value="T2" label="przepięcia łączeniowe i pośrednie – rozdzielnica" />
        <ValueTile value="T3" label="dobezpieczenie czułej elektroniki – przy urządzeniu" />
      </div>
      <NoteBox type="remember" title="Sedno działania">
        Warystor to rezystor zależny od napięcia: przy 230 V = megaomy (izoluje), przy przepięciu = pojedyncze omy (zwiera udar do PE).
        Działa w nanosekundach i wraca do stanu spoczynku – ale każdy duży udar go zużywa, stąd okienko wskaźnika.
      </NoteBox>
    </div>
  )
}
