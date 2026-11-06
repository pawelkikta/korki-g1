import React, { useRef, useState } from 'react'
import { Zap, RotateCcw } from 'lucide-react'
import { Button, NoteBox, ValueTile, keepCase } from '../ui.jsx'

// Wyłącznik nadprądowy B16 – dwa wyzwalacze: termiczny (bimetal) i elektromagnetyczny (cewka)

function ModuleFront({ tripped }) {
  return (
    <svg viewBox="0 0 120 200" className="mx-auto w-full max-w-[150px]">
      {/* korpus modułu DIN */}
      <rect x="20" y="10" width="80" height="180" rx="6" fill="var(--c-f3f6f4)" stroke="var(--c-8a958e)" strokeWidth="2" />
      {/* zaciski */}
      <rect x="45" y="10" width="30" height="16" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      <rect x="45" y="174" width="30" height="16" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      <circle cx="60" cy="18" r="4" fill="none" stroke="var(--c-66736c)" strokeWidth="1.5" />
      <circle cx="60" cy="182" r="4" fill="none" stroke="var(--c-66736c)" strokeWidth="1.5" />
      {/* okno dźwigni */}
      <rect x="40" y="70" width="40" height="60" rx="4" fill="var(--c-e7ebec)" stroke="var(--c-8a958e)" />
      {/* dźwignia: góra = ON, dół = OFF */}
      <g style={{ transition: 'transform 0.25s ease-in', transform: tripped ? 'translateY(26px)' : 'translateY(0)' }}>
        <rect x="47" y="76" width="26" height="22" rx="3" fill={tripped ? 'var(--c-b3261e)' : 'var(--c-1a5c46)'} />
        <text x="60" y="91" fill="var(--c-ffffff)" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{tripped ? 'OFF' : 'ON'}</text>
      </g>
      {/* opisy */}
      <text x="60" y="48" fill="var(--c-2b3530)" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">B16</text>
      <text x="60" y="60" fill="var(--c-66736c)" fontSize="7" fontFamily="monospace" textAnchor="middle">230/400V~ 6000</text>
      <text x="60" y="150" fill="var(--c-66736c)" fontSize="7" fontFamily="monospace" textAnchor="middle">wyłącznik</text>
      <text x="60" y="160" fill="var(--c-66736c)" fontSize="7" fontFamily="monospace" textAnchor="middle">nadprądowy</text>
    </svg>
  )
}

function Schematic({ amps, heating, magnetic, tripped }) {
  const flowing = !tripped
  return (
    <svg viewBox="0 0 220 260" className="w-full max-w-[260px]">
      <text x="110" y="14" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace" textAnchor="middle">wnętrze wyłącznika (schemat)</text>
      {/* zacisk górny */}
      <rect x="98" y="20" width="24" height="12" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      <line x1="110" y1="32" x2="110" y2="52" stroke="var(--c-66736c)" strokeWidth="3" />
      {/* bimetal – zygzak, świeci przy przeciążeniu */}
      <path d="M 110 52 L 96 64 L 124 76 L 96 88 L 124 100 L 110 112" fill="none"
        stroke={heating ? 'var(--c-d97706)' : 'var(--c-66736c)'} strokeWidth={heating ? 4 : 3}
        style={{ transition: 'stroke 0.4s', filter: heating ? 'drop-shadow(0 0 4px var(--c-d97706))' : 'none' }} />
      <text x="20" y="84" fill={heating ? 'var(--c-b3540f)' : 'var(--c-66736c)'} fontSize="9" fontFamily="monospace">bimetal</text>
      <text x="20" y="95" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">(przeciążenie)</text>
      {/* cewka elektromagnesu */}
      <line x1="110" y1="112" x2="110" y2="124" stroke="var(--c-66736c)" strokeWidth="3" />
      <path d="M 110 124 q 14 5 0 10 q -14 5 0 10 q 14 5 0 10 q -14 5 0 10" fill="none"
        stroke={magnetic ? 'var(--c-b3261e)' : 'var(--c-66736c)'} strokeWidth={magnetic ? 4 : 3}
        style={{ transition: 'stroke 0.2s', filter: magnetic ? 'drop-shadow(0 0 5px var(--c-b3261e))' : 'none' }} />
      <text x="20" y="148" fill={magnetic ? 'var(--c-b3261e)' : 'var(--c-66736c)'} fontSize="9" fontFamily="monospace">cewka</text>
      <text x="20" y="159" fill="var(--c-8a958e)" fontSize="8" fontFamily="monospace">(zwarcie)</text>
      {/* styk – otwiera się przy zadziałaniu */}
      <line x1="110" y1="164" x2="110" y2="184" stroke="var(--c-66736c)" strokeWidth="3" />
      <circle cx="110" cy="186" r="3" fill="var(--c-2b3530)" />
      <line x1="110" y1="186" x2={tripped ? 138 : 110} y2={tripped ? 200 : 214} stroke="var(--c-2b3530)" strokeWidth="3"
        style={{ transition: 'all 0.25s ease-in' }} />
      <circle cx="110" cy="216" r="3" fill="var(--c-2b3530)" />
      <text x="148" y="200" fill="var(--c-66736c)" fontSize="9" fontFamily="monospace">styk</text>
      {/* zacisk dolny */}
      <line x1="110" y1="218" x2="110" y2="228" stroke="var(--c-66736c)" strokeWidth="3" />
      <rect x="98" y="228" width="24" height="12" fill="var(--c-dfe5e1)" stroke="var(--c-8a958e)" />
      {/* przepływ prądu */}
      {flowing && amps > 0 ? (
        <path d="M 110 32 L 110 52 L 96 64 L 124 76 L 96 88 L 124 100 L 110 112 L 110 184 L 110 216 L 110 228" fill="none"
          stroke="var(--c-d97706)" strokeWidth="2" strokeDasharray="5 9" opacity="0.9">
          <animate attributeName="stroke-dashoffset" from="28" to="0" dur={amps >= 80 ? '0.25s' : amps > 16 ? '0.5s' : '1s'} repeatCount="indefinite" />
        </path>
      ) : null}
      {tripped ? <text x="110" y="254" fill="var(--c-b3261e)" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">OBWÓD PRZERWANY</text> : null}
    </svg>
  )
}

export function DeviceMCB() {
  const [amps, setAmps] = useState(10)
  const [tripped, setTripped] = useState(false)
  const [heating, setHeating] = useState(false)
  const [magnetic, setMagnetic] = useState(false)
  const [verdict, setVerdict] = useState(null)
  const timer = useRef(null)

  const thermalSeconds = (i) => Math.max(2, Math.round(90 / ((i / 16) ** 2 - 1)))

  const simulate = () => {
    if (tripped) return
    clearTimeout(timer.current)
    if (amps <= 16) {
      setVerdict({ type: 'remember', title: 'Prąd w normie – wyłącznik nie reaguje', text: `${amps} A ≤ In (16 A). Wyłącznik przewodzi – od tego jest. Zwiększ prąd suwakiem, żeby zobaczyć wyzwalacze.` })
      return
    }
    if (amps < 1.45 * 16) {
      // strefa niepewności: prądy probiercze wg PN-EN 60898 – 1,13×In nie wyzwala, 1,45×In musi wyzwolić w 1 h
      setHeating(true)
      timer.current = setTimeout(() => {
        setHeating(false)
        setVerdict({
          type: 'warning',
          title: `Strefa niepewności – ${amps} A może NIE wyzwolić wcale`,
          text: `${amps} A = ${(amps / 16).toFixed(2).replace('.', ',')}×In. Norma: przy 1,13×In (~18 A) B16 ma NIE zadziałać, pewne zadziałanie termiczne dopiero od 1,45×In (23,2 A) – i to w ciągu godziny. Bimetal się grzeje, ale może tak trzymać godzinami. Dlatego kabel dobiera się z zapasem, a „lekko przeciążony" obwód potrafi grzać się latami bez wybicia.`,
        })
      }, 1800)
      return
    }
    if (amps >= 80) {
      setMagnetic(true)
      setVerdict(null)
      timer.current = setTimeout(() => {
        setTripped(true)
        setMagnetic(false)
        setVerdict({ type: 'mistake', title: `Wyzwalacz ELEKTROMAGNETYCZNY – czas < 0,01 s`, text: `${amps} A = ${(amps / 16).toFixed(1).replace('.', ',')}×In ≥ 5×In (80 A) – górna granica charakterystyki B. Od tego prądu cewka MUSI zadziałać natychmiast (norma: < 0,1 s, w praktyce kilka ms). Tak wyłączane są zwarcia – dlatego impedancja pętli musi być na tyle niska, żeby prąd zwarciowy przekroczył 80 A.` })
      }, 400)
    } else if (amps >= 48) {
      // strefa 3–5×In: cewka B16 może już zadziałać natychmiast, ale nie musi – zależy od egzemplarza
      const instant = amps >= 64 || (amps >= 56 && Math.random() < 0.5)
      if (instant) {
        setMagnetic(true)
        setVerdict(null)
        timer.current = setTimeout(() => {
          setTripped(true)
          setMagnetic(false)
          setVerdict({ type: 'warning', title: 'Ten egzemplarz wyzwolił natychmiast (cewka)', text: `${amps} A = ${(amps / 16).toFixed(1).replace('.', ',')}×In – strefa 3–5×In charakterystyki B. Tu cewka MOŻE zadziałać natychmiast, ale norma tego nie gwarantuje. Ten akurat zadziałał – inny mógłby wyłączyć dopiero termicznie, po kilku sekundach. Dlatego przy ocenie pętli zwarcia liczysz z GÓRNĄ granicą: 5×In = 80 A.` })
        }, 400)
      } else {
        setHeating(true)
        setVerdict({ type: 'warning', title: 'Strefa 3–5×In – cewka nie zareagowała, grzeje się bimetal', text: `${amps} A = ${(amps / 16).toFixed(1).replace('.', ',')}×In. Cewka B16 może zadziałać natychmiast dopiero w okolicy 48–80 A i ten egzemplarz nie zadziałał. Wyłączy bimetal – po kilku sekundach. Przy ochronie przeciwporażeniowej (limit 0,4 s) to za długo – dlatego liczy się 5×In.` })
        timer.current = setTimeout(() => {
          setTripped(true)
          setHeating(false)
          setVerdict({ type: 'mistake', title: 'Wyzwalacz TERMICZNY – po kilku sekundach', text: 'Bimetal wygiął się i zwolnił zamek. Obwód wyłączony – ale gdyby to było zwarcie na obudowę, przez kilka sekund dotknięta obudowa byłaby pod napięciem. Wniosek: dla pewnego zadziałania natychmiastowego B16 potrzebuje ≥ 80 A.' })
        }, 1800)
      }
    } else {
      setHeating(true)
      const ratio = amps / 16
      // orientacyjnie wg PN-EN 60898-1: 1,45×In – poniżej 1 h, 2,55×In – od 1 do 60 s; dokładny czas zależy od egzemplarza i temperatury
      const when =
        ratio < 2
          ? 'Przy takim prądzie trwa to minuty – a tuż nad 1,45×In norma dopuszcza nawet godzinę.'
          : ratio < 2.55
          ? 'Przy takim prądzie trwa to od kilkunastu sekund do kilku minut.'
          : `Przy takim prądzie trwa to ok. ${thermalSeconds(amps)} s (norma przy 2,55×In: od 1 do 60 s).`
      setVerdict({ type: 'warning', title: 'Bimetal się nagrzewa...', text: `${amps} A = ${ratio.toFixed(1).replace('.', ',')}×In – to przeciążenie, nie zwarcie. Cewka reaguje dopiero od 3×In (48 A), więc wyłączy bimetal, gdy się nagrzeje i wygnie. ${when} W symulacji skracamy ten czas do 2 sekund.` })
      timer.current = setTimeout(() => {
        setTripped(true)
        setHeating(false)
        setVerdict({ type: 'mistake', title: 'Wyzwalacz TERMICZNY – przeciążenie', text: 'Bimetal wygiął się i zwolnił zamek – obwód wyłączony. Tak działa ochrona przed przeciążeniem, np. gdy na jednym obwodzie pracuje za dużo odbiorników naraz. Bimetal reaguje wolno, ale przewód też nagrzewa się powoli – wyłączenie po sekundach czy minutach wystarcza, żeby izolacja się nie przegrzała. Na zwarcie byłby za wolny – od tego jest cewka.' })
      }, 1800)
    }
  }

  const reset = () => {
    clearTimeout(timer.current)
    setTripped(false)
    setHeating(false)
    setMagnetic(false)
    setVerdict(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
        <div>
          <ModuleFront tripped={tripped} />
          <div className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">widok symboliczny</div>
        </div>
        <div className="space-y-3">
          <Schematic amps={amps} heating={heating} magnetic={magnetic} tripped={tripped} />
        </div>
      </div>

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
          <span>Prąd w obwodzie</span>
          <span className="text-base font-black text-[color:var(--c-14543e)]">{amps} A {amps > 16 ? <>({(amps / 16).toFixed(1).replace('.', ',')}×<span className="normal-case">In</span>)</> : ''}</span>
        </div>
        <input type="range" min={0} max={200} step={1} value={amps} onChange={(e) => setAmps(Number(e.target.value))} className="mt-3 w-full" />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-400"><span>0 A</span><span>16 (In)</span><span>23,2 (1,45×In)</span><span>48–80 (3–5×In)</span><span>200 A</span></div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={simulate} disabled={tripped || heating || magnetic}><Zap className="mr-2 h-4 w-4" /> Symuluj ten prąd</Button>
          <Button variant="secondary" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" /> Załącz ponownie</Button>
        </div>
      </div>

      {verdict ? <NoteBox type={verdict.type} title={verdict.title}>{verdict.text}</NoteBox> : null}

      <div className="grid grid-cols-3 gap-2">
        <ValueTile value="B / C / D" label="charakterystyki: B 3–5×In (dom), C 5–10×In (silniki), D 10–20×In (przemysł)" />
        <ValueTile value="bimetal" label="wyzwalacz termiczny – przeciążenia (sekundy/minuty)" />
        <ValueTile value="cewka" label="wyzwalacz elektromagnetyczny – zwarcia (< 0,01 s)" />
      </div>

      <div className="border-t border-[color:var(--c-e3e8e5)] pt-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Budowa wyłącznika – co siedzi w środku</div>
        <ol className="mt-2 grid gap-1.5 md:grid-cols-2">
          {[
            'Dźwignia napędowa – ręczne załączanie / wskazanie zadziałania',
            'Zamek (mechanizm zatrzaskowy) – trzyma styki załączone',
            'Styk stały i styk ruchomy – tędy płynie prąd obwodu',
            'Zaciski przyłączowe – góra i dół, do przewodów',
            'Wyzwalacz termobimetalowy – reaguje na przeciążenie',
            'Wkręt regulacyjny – fabryczna kalibracja bimetalu',
            'Wyzwalacz elektromagnetyczny (cewka) – reaguje na zwarcie',
            'Komora gaszeniowa – gasi łuk elektryczny przy rozłączaniu',
          ].map((t, i) => (
            <li key={i} className="flex gap-2.5 border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-1.5 text-[13px] leading-5 text-gray-700">
              <span style={{ '--e': 'var(--c-bcd4c8)' }} className="cham-sm edge flex h-5 w-5 shrink-0 items-center justify-center bg-[color:var(--b-e7f0eb)] font-mono text-[10px] font-bold text-[color:var(--c-14543e)]">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <div className="mt-2"><NoteBox type="remember" title="Komora gaszeniowa">Przy rozłączaniu pod obciążeniem powstaje łuk elektryczny. Pakiet metalowych blaszek (komora) dzieli go i wygasza – to dlatego wyłącznik może bezpiecznie przerwać prąd zwarciowy.</NoteBox></div>
      </div>

      <div className="border-t border-[color:var(--c-e3e8e5)] pt-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Liczba biegunów – dobór do rodzaju sieci</div>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          <ValueTile value="1P" label="1 faza – typowy obwód domowy (gniazda, światło)" />
          <ValueTile value="2P" label="faza + N rozłączane razem – gdy trzeba odciąć też N (np. układ TT, zasilanie z agregatu)" />
          <ValueTile value="3P" label="3 fazy – silniki, kuchenki, zasilanie 400 V" />
          <ValueTile value="4P" label="3 fazy + N – gdy trzeba rozłączyć też neutralny" />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <ValueTileTag>1F = jednofazowa 230 V</ValueTileTag>
          <ValueTileTag>3F = trójfazowa 400 V</ValueTileTag>
        </div>
      </div>

      <NoteBox type="trap" title="Pułapka egzaminacyjna">
        „Czy wyłącznik nadprądowy chroni przed porażeniem?" – odpowiedź brzmi: częściowo. Komisja chce usłyszeć oba przypadki.
        <ul className="mt-1.5 list-disc space-y-1 pl-5">
          <li>
            <b>Faza zwiera się z obudową</b> (uszkodzona izolacja w urządzeniu) – <b>TAK</b>. W układzie TN prąd zwarcia wraca przewodem PE
            i jest duży, więc B16 wyłącza obwód w ułamku sekundy (norma: najpóźniej 0,4 s). Warunek: prąd zwarcia co najmniej 80 A,
            czyli Zs ≤ 2,88 Ω. Wyłącznik reaguje na prąd zwarcia, a nie na człowieka – obudowa jest pod napięciem tylko przez tę chwilę,
            niezależnie od tego, czy ktoś jej dotyka.
          </li>
          <li>
            <b>Człowiek dotyka fazy</b> (np. odsłoniętego przewodu) – <b>NIE</b>. Przez ciało płyną dziesiątki–setki mA, a B16 potrzebuje
            80 A. Tu chroni tylko RCD 30 mA.
          </li>
        </ul>
        <span className="mt-1.5 block">
          W układzie TT prąd zwarcia płynie przez ziemię i zwykle jest za mały, żeby wyłącznik zadziałał – tam przy zwarciu na obudowę też
          chroni RCD.
        </span>
      </NoteBox>
    </div>
  )
}

function ValueTileTag({ children }) {
  return <span style={{ '--e': 'var(--c-d7ded9)' }} className="cham-sm edge bg-[color:var(--b-fafbfa)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-600">{keepCase(children)}</span>
}
