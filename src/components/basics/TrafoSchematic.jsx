import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react'
import { Button, NoteBox, Tag } from '../ui.jsx'

// Skąd się bierze napięcie w gniazdku – schemat stacji z narracją krok po kroku.
// Kolory jak w rzeczywistości: faza brązowa, N niebieski, PE żółto-zielony.

const C = {
  L: 'var(--c-a05a1f)',
  N: 'var(--c-2b6cb0)',
  PE: 'var(--c-1f7a4d)',
  PEyellow: 'var(--c-d9b310)',
  hv: 'var(--c-8a5a00)',
  gray: 'var(--c-66736c)',
  light: 'var(--c-8a958e)',
}

// Opisy elementów (tryb swobodnego klikania)
const PARTS = {
  primary: {
    label: 'Uzwojenia pierwotne (15 kV)',
    text: '**Strona średniego napięcia** – wchodzi 15 000 V z sieci energetycznej trzema przewodami fazowymi (bez przewodu neutralnego). W transformatorze są **trzy uzwojenia pierwotne** – po jednym na każdą fazę, połączone w trójkąt (na schemacie te połączenia pominięto) – i każde ma **bardzo dużo zwojów**. Kluczowe: **nie mają połączenia elektrycznego** z twoją instalacją ani z rdzeniem – energia przechodzi dalej wyłącznie przez **pole magnetyczne**.',
  },
  core: {
    label: 'Rdzeń transformatora (trzy kolumny)',
    text: 'Pakiet blach z **trzema kolumnami** – na każdej siedzi uzwojenie pierwotne i wtórne **jednej fazy**. Prąd przemienny 50 Hz wytwarza w kolumnie zmienne pole, a pole **indukuje napięcie** w uzwojeniu wtórnym. Pola w trzech kolumnach są przesunięte w czasie o 1/3 okresu (120°) – dlatego napięcia L1, L2, L3 też są przesunięte i między fazami jest 400 V. Gdyby wszystkie trzy uzwojenia siedziały na jednej kolumnie, miałyby to samo napięcie w tej samej chwili – między fazami byłoby 0 V. Przy prądzie stałym transformator nie działa – pole musi się zmieniać.',
  },
  secondary: {
    label: 'Trzy uzwojenia wtórne (230 V)',
    text: 'Trzy oddzielne cewki, każda na swojej kolumnie rdzenia, nad „swoim" uzwojeniem pierwotnym. W każdej indukuje się **230 V** – bo mają **znacznie mniej zwojów** niż uzwojenie pierwotne (w takim stosunku, w jakim 15 000 V ma się do 230 V, czyli ok. 65 razy mniej). To tutaj dosłownie „powstaje" napięcie z twojego gniazdka.',
  },
  star: {
    label: 'Punkt gwiazdowy (neutralny)',
    text: 'Jeden koniec **każdego z trzech uzwojeń** jest fizycznie skręcony razem w jeden wspólny punkt – stąd nazwa „gwiazda". Z tego punktu wyprowadza się **przewód N**. Gdy mówimy „faza ma 230 V", znaczy to: 230 V **względem punktu gwiazdowego**.',
  },
  earth: {
    label: 'Uziemienie punktu gwiazdowego',
    text: 'Punkt gwiazdowy jest **połączony z ziemią** przez uziom stacji. To najważniejszy fakt w całej elektryce budynkowej: dzięki temu **ziemia staje się drogą powrotną prądu**. Dotknięcie fazy, gdy stoisz na podłodze albo trzymasz kaloryfer, zamyka obwód **przez twoje ciało** – mimo że nie dotykasz żadnego drugiego przewodu.',
  },
  phases: {
    label: 'Fazy L1, L2, L3',
    text: 'Wolne końce trzech uzwojeń. Między **fazą a N: 230 V**. Między **dwiema fazami: 400 V** – nie 460, bo napięcia są przesunięte w czasie o 120°: 230 × √3 ≈ 400 V. Do mieszkania idzie zwykle **jedna faza + N**, do domu z kuchenką – wszystkie trzy.',
  },
  pen: {
    label: 'Przewód PEN (od stacji do budynku)',
    text: 'W typowej polskiej sieci ze słupa przychodzi **wspólny przewód PEN** – jednocześnie neutralny i ochronny (układ **TN-C**). Przerwa w PEN to bardzo groźna awaria: na obudowach urządzeń może pojawić się pełne napięcie fazowe.',
  },
  split: {
    label: 'Rozdział PEN → N + PE',
    text: 'W złączu albo w rozdzielnicy głównej budynku PEN **rozdziela się na osobne N i PE** (od tego miejsca układ **TN-S**) i punkt rozdziału **dodatkowo się uziemia**. Całość to **TN-C-S** – dzisiejszy standard. Po rozdzieleniu N i PE **nigdy się już nie łączą**.',
  },
  pe: {
    label: 'Przewód ochronny PE',
    text: 'Żółto-zielony, w normalnej pracy **nie płynie nim prąd**. Idzie do bolca w gnieździe i do metalowych obudów urządzeń klasy I. Jego jedyne zadanie: przy awarii dać prądowi **drogę powrotną o niskiej rezystancji**, żeby zabezpieczenie natychmiast wyłączyło obwód.',
  },
  socket: {
    label: 'Gniazdo 230 V',
    text: 'Trzy zaciski: **L** (faza, brązowy), **N** (neutralny, niebieski), **PE** (bolec, żółto-zielony). Prąd użytkowy płynie **L → odbiornik → N** i wraca aż do punktu gwiazdowego w stacji – kilkaset metrów dalej. PE czeka bezczynnie, aż do awarii.',
  },
}

// Narracja: od sieci 15 kV do gniazdka
const STEPS = [
  {
    part: 'primary',
    title: 'Krok 1 – do stacji przychodzi 15 000 V',
    text: 'Prąd w twoim mieszkaniu nie „bierze się z gniazdka". Płynie z elektrowni linią wysokiego napięcia, a do twojego osiedla dociera linią **średniego napięcia 15 kV** – do szarego budyneczku albo transformatora na słupie. Tak wysokie napięcie dlatego, że przy wysokim napięciu prąd jest mały i **mniej energii ginie po drodze** na grzaniu przewodów.',
  },
  {
    part: 'core',
    title: 'Krok 2 – prąd wytwarza pole magnetyczne w rdzeniu',
    text: 'Trzy uzwojenia pierwotne (15 kV) nawinięte są na **trzy kolumny rdzenia z blach** – każda faza na swojej. Prąd przemienny 50 Hz wytwarza w każdej kolumnie **zmienne pole magnetyczne** – 50 razy na sekundę narastające i zanikające, w każdej kolumnie przesunięte o 1/3 okresu.',
  },
  {
    part: 'secondary',
    title: 'Krok 3 – pole indukuje 230 V w trzech uzwojeniach',
    text: 'Na każdej kolumnie, obok uzwojenia pierwotnego, nawinięte jest **uzwojenie wtórne** – razem trzy. Zmienne pole magnetyczne **indukuje** w nich napięcie – to jest zjawisko indukcji, serce transformatora. Ile napięcia? Zależy od **liczby zwojów**: uzwojenie wtórne ma ich ok. **65 razy mniej**, więc z 15 000 V robi się **230 V**. Uwaga: obie strony **nie są ze sobą połączone drutem** – łączy je wyłącznie pole magnetyczne.',
  },
  {
    part: 'star',
    title: 'Krok 4 – końce uzwojeń łączą się w punkt gwiazdowy',
    text: 'Każde z trzech uzwojeń ma dwa końce. **Jeden koniec z każdego** jest fizycznie skręcony razem z pozostałymi w jeden wspólny punkt – to **punkt gwiazdowy** (bo trzy uzwojenia rozchodzą się z niego jak ramiona gwiazdy). Z tego wspólnego punktu wyprowadza się **przewód neutralny** – do budynku biegnie on jako wspólny PEN (o tym w kroku 7).',
  },
  {
    part: 'earth',
    title: 'Krok 5 – punkt gwiazdowy jest uziemiony (to zmienia wszystko)',
    text: 'Punkt gwiazdowy jest **połączony z uziomem stacji** – metalową elektrodą w gruncie. Konsekwencja: **ziemia staje się częścią obwodu**. Od tej chwili prąd może wrócić do transformatora nie tylko przewodem N, ale też **przez grunt** – a więc przez podłogę, rury, kaloryfer… i przez człowieka, który ich dotyka. Zapamiętaj to na cały egzamin.',
  },
  {
    part: 'phases',
    title: 'Krok 6 – wolne końce to L1, L2, L3',
    text: 'Drugie końce uzwojeń wychodzą ze stacji jako **trzy fazy**. Między każdą z nich a punktem gwiazdowym (czyli N) jest **230 V**. Między dwiema fazami – **400 V**, bo ich napięcia są przesunięte w czasie o 120°.',
  },
  {
    part: 'pen',
    title: 'Krok 7 – do budynku idą fazy i PEN',
    text: 'Ze stacji do twojego złącza biegną **fazy + wspólny przewód PEN**, pełniący naraz rolę neutralnego i ochronnego. To układ **TN-C** – standard na odcinku sieciowym.',
  },
  {
    part: 'split',
    title: 'Krok 8 – w budynku PEN dzieli się na N i PE',
    text: 'W złączu albo w rozdzielnicy głównej budynku PEN **rozgałęzia się na dwa osobne przewody: N i PE**, a punkt rozdziału dodatkowo się uziemia. Od tego miejsca dalej – już nigdy ich nie łączymy. Ten układ nazywa się **TN-C-S** i tak wygląda dziś praktycznie każdy polski dom.',
  },
  {
    part: 'socket',
    title: 'Krok 9 – i tak powstaje twoje gniazdko',
    text: 'Do gniazda docierają trzy przewody: **L** (faza), **N** (powrót prądu roboczego) i **PE** (bolec ochronny). Włączasz czajnik – prąd płynie **z uzwojenia w stacji → L → czajnik → N → z powrotem do punktu gwiazdowego**. Zamknięta pętla, kilkaset metrów w jedną stronę.',
  },
]

function Rich({ text }) {
  return String(text).split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-[color:var(--c-14543e)]">{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>,
  )
}

function coilPath(x, y, turns = 4, w = 13, r = 8) {
  let d = `M ${x} ${y}`
  for (let i = 0; i < turns; i++) d += ` a ${r} ${r} 0 0 1 ${w} 0`
  return d
}

export function TrafoSchematic() {
  const [step, setStep] = useState(0)
  const [free, setFree] = useState(null) // ręcznie wybrany element (tryb swobodny)

  const sel = free ?? STEPS[step].part
  const info = free ? PARTS[free] : STEPS[step]

  const on = (id) => ({
    onClick: () => setFree(free === id ? null : id),
    style: { cursor: 'pointer' },
    opacity: sel && sel !== id ? 0.55 : 1,
  })
  const hi = (id, base) => (sel === id ? 'var(--c-b3261e)' : base)
  const sw = (id, base) => (sel === id ? base + 1.5 : base)

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 900 350" className="w-full min-w-[820px]">
          {/* obudowa stacji */}
          <rect x="14" y="40" width="340" height="270" fill="none" stroke="var(--c-d7ded9)" strokeDasharray="5 5" />
          <text x="184" y="328" fill={C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">STACJA TRANSFORMATOROWA</text>

          {/* ── sieć 15 kV + trzy uzwojenia pierwotne (po jednym na fazę, połączone w trójkąt) ── */}
          {/* trzy przewody fazowe SN – każdy do uzwojenia na swojej kolumnie (połączenia trójkąta pominięte dla czytelności) */}
          <g {...on('primary')}>
            <text x="22" y="60" fill={hi('primary', C.hv)} fontSize="11" fontFamily="monospace" fontWeight="bold">SIEĆ 15 000 V</text>
            {[96, 146, 196].map((y) => (
              <g key={y}>
                <line x1="22" y1={y} x2="100" y2={y} stroke={hi('primary', C.hv)} strokeWidth={sw('primary', 2)} />
                {/* dużo drobnych zwojów, bez połączenia z rdzeniem – energia przechodzi tylko przez pole magnetyczne */}
                <path d={coilPath(100, y, 8, 6, 3.5)} fill="none" stroke={hi('primary', C.hv)} strokeWidth={sw('primary', 2.5)} />
              </g>
            ))}
            <text x="22" y="76" fill={C.light} fontSize="8" fontFamily="monospace">3 przewody fazowe SN</text>
            <text x="22" y="236" fill={C.light} fontSize="9" fontFamily="monospace">uzwojenia pierwotne</text>
            <text x="22" y="247" fill={C.light} fontSize="9" fontFamily="monospace">(dużo zwojów, trójkąt)</text>
          </g>

          {/* ── rdzeń trójkolumnowy: każda faza ma własną kolumnę i własny strumień ── */}
          <g {...on('core')}>
            {[96, 146, 196].map((y) => (
              <rect key={y} x="160" y={y - 21} width="16" height="42" fill="none" stroke={hi('core', C.gray)} strokeWidth={sw('core', 3)} />
            ))}
            <text x="168" y="64" fill={sel === 'core' ? 'var(--c-b3261e)' : C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">rdzeń</text>
            <text x="168" y="232" fill={sel === 'core' ? 'var(--c-b3261e)' : C.light} fontSize="8" fontFamily="monospace" textAnchor="middle">3 kolumny</text>
          </g>

          {/* ── punkt gwiazdowy: wspólna szyna końców uzwojeń, z niej wychodzi PEN ── */}
          <g {...on('star')}>
            <text x="218" y="68" fill={sel === 'star' ? 'var(--c-b3261e)' : C.N} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">punkt</text>
            <text x="218" y="79" fill={sel === 'star' ? 'var(--c-b3261e)' : C.N} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">gwiazdowy</text>
            <line x1="196" y1="96" x2="196" y2="252" stroke={hi('star', C.N)} strokeWidth={sw('star', 3.5)} />
            <circle cx="196" cy="146" r={sel === 'star' ? 8 : 6} fill={hi('star', C.N)} />
          </g>

          {/* ── trzy uzwojenia wtórne: mniej zwojów niż pierwotne ── */}
          <g {...on('secondary')}>
            {[96, 146, 196].map((y) => (
              <path key={y} d={coilPath(196, y, 3, 13, 8)} fill="none" stroke={hi('secondary', C.L)} strokeWidth={sw('secondary', 2.5)} />
            ))}
            <text x="280" y="224" fill={sel === 'secondary' ? 'var(--c-b3261e)' : C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">3 × 230 V · mało zwojów</text>
          </g>

          {/* ── uziemienie punktu gwiazdowego (od punktu odejścia PEN w dół do uziomu) ── */}
          <g {...on('earth')}>
            <line x1="196" y1="252" x2="196" y2="274" stroke={hi('earth', C.PE)} strokeWidth={sw('earth', 2.5)} />
            <line x1="178" y1="276" x2="214" y2="276" stroke={hi('earth', C.PE)} strokeWidth="3" />
            <line x1="184" y1="282" x2="208" y2="282" stroke={hi('earth', C.PE)} strokeWidth="2.5" />
            <line x1="190" y1="288" x2="202" y2="288" stroke={hi('earth', C.PE)} strokeWidth="2" />
            <text x="222" y="288" fill={sel === 'earth' ? 'var(--c-b3261e)' : C.PE} fontSize="9" fontFamily="monospace">uziom stacji</text>
          </g>

          {/* ── fazy ── */}
          <g {...on('phases')}>
            <line x1="235" y1="96" x2="760" y2="96" stroke={hi('phases', C.L)} strokeWidth={sw('phases', 3)} />
            <line x1="235" y1="146" x2="600" y2="146" stroke={hi('phases', C.L)} strokeWidth={sw('phases', 3)} />
            <line x1="235" y1="196" x2="600" y2="196" stroke={hi('phases', C.L)} strokeWidth={sw('phases', 3)} />
            {[{ y: 96, n: 'L1' }, { y: 146, n: 'L2' }, { y: 196, n: 'L3' }].map(({ y, n }) => (
              <text key={n} x="380" y={y - 8} fill={sel === 'phases' ? 'var(--c-b3261e)' : C.L} fontSize="11" fontFamily="monospace" fontWeight="bold">{n}</text>
            ))}
          </g>

          {/* ── PEN ── */}
          <g {...on('pen')}>
            <line x1="196" y1="252" x2="632" y2="252" stroke={hi('pen', C.N)} strokeWidth={sw('pen', 3)} />
            <line x1="196" y1="252" x2="632" y2="252" stroke={C.PEyellow} strokeWidth="1.2" strokeDasharray="7 9" />
            <text x="380" y="244" fill={sel === 'pen' ? 'var(--c-b3261e)' : C.N} fontSize="11" fontFamily="monospace" fontWeight="bold">PEN</text>
            <text x="380" y="270" fill={C.light} fontSize="8" fontFamily="monospace">N i PE jeszcze razem</text>
          </g>

          {/* etykiety napięć */}
          <g opacity={sel === 'phases' ? 1 : 0.35}>
            <line x1="470" y1="96" x2="470" y2="146" stroke="var(--c-b3261e)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="476" y="126" fill="var(--c-b3261e)" fontSize="11" fontFamily="monospace" fontWeight="bold">400 V</text>
            <line x1="524" y1="96" x2="524" y2="252" stroke="var(--c-b3261e)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="530" y="180" fill="var(--c-b3261e)" fontSize="11" fontFamily="monospace" fontWeight="bold">230 V</text>
          </g>

          {/* rozdzielnica */}
          <rect x="600" y="64" width="130" height="228" fill="var(--c-fafbfa)" stroke="var(--c-d7ded9)" strokeWidth="2" />
          <text x="665" y="56" fill={C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">ZŁĄCZE / ROZDZIELNICA GŁÓWNA</text>

          {/* ── rozdział PEN → N + PE ── */}
          <g {...on('split')}>
            <circle cx="632" cy="252" r={sel === 'split' ? 7 : 5} fill={hi('split', C.N)} />
            <text x="646" y="250" fill={sel === 'split' ? 'var(--c-b3261e)' : C.light} fontSize="8" fontFamily="monospace" fontWeight="bold">tu PEN się dzieli</text>
            <line x1="632" y1="252" x2="632" y2="190" stroke={hi('split', C.N)} strokeWidth={sw('split', 3)} />
            <line x1="632" y1="252" x2="632" y2="286" stroke={hi('split', C.PE)} strokeWidth={sw('split', 3)} />
            {/* uziom budynku */}
            <line x1="632" y1="286" x2="632" y2="304" stroke={hi('split', C.PE)} strokeWidth="2" />
            <line x1="620" y1="306" x2="644" y2="306" stroke={hi('split', C.PE)} strokeWidth="2.5" />
            <line x1="624" y1="311" x2="640" y2="311" stroke={hi('split', C.PE)} strokeWidth="2" />
            <line x1="628" y1="316" x2="636" y2="316" stroke={hi('split', C.PE)} strokeWidth="1.8" />
            <text x="652" y="312" fill={C.light} fontSize="8" fontFamily="monospace">uziom budynku</text>
          </g>

          {/* ── N i PE do gniazda ── */}
          <g {...on('pe')}>
            {/* N */}
            <line x1="632" y1="190" x2="791" y2="190" stroke={C.N} strokeWidth="3" opacity={sel === 'pe' ? 0.45 : 1} />
            <text x="700" y="184" fill={C.N} fontSize="11" fontFamily="monospace" fontWeight="bold" opacity={sel === 'pe' ? 0.45 : 1}>N</text>
            {/* PE */}
            <line x1="632" y1="286" x2="800" y2="286" stroke={hi('pe', C.PE)} strokeWidth={sw('pe', 3)} />
            <line x1="800" y1="286" x2="800" y2="241" stroke={hi('pe', C.PE)} strokeWidth={sw('pe', 3)} />
            <line x1="632" y1="286" x2="800" y2="286" stroke={C.PEyellow} strokeWidth="1.2" strokeDasharray="7 9" />
            <text x="700" y="280" fill={sel === 'pe' ? 'var(--c-b3261e)' : C.PE} fontSize="11" fontFamily="monospace" fontWeight="bold">PE</text>
          </g>

          {/* L1 do gniazda */}
          <g opacity={sel === 'socket' || sel === 'phases' ? 1 : 0.55}>
            <line x1="760" y1="96" x2="760" y2="140" stroke={C.L} strokeWidth="3" />
            <line x1="760" y1="140" x2="791" y2="140" stroke={C.L} strokeWidth="3" />
          </g>

          {/* ── gniazdo ── */}
          <g {...on('socket')}>
            <rect x="770" y="110" width="100" height="150" rx="3" fill="var(--c-ffffff)" stroke={hi('socket', C.gray)} strokeWidth={sw('socket', 2)} />
            <circle cx="800" cy="140" r="9" fill="none" stroke={C.L} strokeWidth="2.5" />
            <text x="818" y="145" fill={C.L} fontSize="10" fontFamily="monospace" fontWeight="bold">L</text>
            <circle cx="800" cy="190" r="9" fill="none" stroke={C.N} strokeWidth="2.5" />
            <text x="818" y="195" fill={C.N} fontSize="10" fontFamily="monospace" fontWeight="bold">N</text>
            <rect x="792" y="228" width="16" height="13" fill="none" stroke={C.PE} strokeWidth="2.5" />
            <text x="818" y="239" fill={C.PE} fontSize="10" fontFamily="monospace" fontWeight="bold">PE</text>
            <text x="820" y="276" fill={C.light} fontSize="9" fontFamily="monospace" textAnchor="middle">TWOJE GNIAZDO</text>
          </g>

          {/* strzałka indukcji */}
          {sel === 'core' || sel === 'secondary' ? (
            <g>
              <line x1="142" y1="120" x2="190" y2="120" stroke="var(--c-b3261e)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 184 115 L 192 120 L 184 125" fill="none" stroke="var(--c-b3261e)" strokeWidth="2" />
              <text x="206" y="124" fill="var(--c-b3261e)" fontSize="9" fontFamily="monospace" fontWeight="bold">indukcja</text>
            </g>
          ) : null}
        </svg>
      </div>

      {/* narracja / opis elementu */}
      <NoteBox type="remember" title={free ? info.label : info.title}>
        <Rich text={info.text} />
      </NoteBox>

      {free ? (
        <Button variant="secondary" onClick={() => setFree(null)}>
          ← Wróć do opowieści (krok {step + 1}/{STEPS.length})
        </Button>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
          </Button>
          <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>
            Dalej <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Krok ${i + 1}`}
                className={`h-2 w-6 transition ${i === step ? 'bg-[color:var(--b-1a5c46)]' : i < step ? 'bg-[color:var(--b-9fcab1)]' : 'bg-[color:var(--b-d7ded9)]'}`}
              />
            ))}
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
            <MousePointerClick className="h-3.5 w-3.5" /> możesz też klikać elementy schematu
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        <Tag tone="amber">L = brązowy (faza)</Tag>
        <Tag tone="slate">N = niebieski (powrót prądu)</Tag>
        <Tag tone="green">PE = żółto-zielony (ochronny)</Tag>
      </div>
    </div>
  )
}
