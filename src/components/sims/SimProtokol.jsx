import React, { useState } from 'react'
import { Check, RotateCcw, FileCheck } from 'lucide-react'
import { Button, NoteBox } from '../ui.jsx'

const ORDER_STEPS = [
  { id: 1, label: 'Oględziny instalacji' },
  { id: 2, label: 'Ciągłość przewodów PE' },
  { id: 3, label: 'Rezystancja izolacji' },
  { id: 4, label: 'Impedancja pętli zwarcia' },
  { id: 5, label: 'Sprawdzenie RCD miernikiem' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function OrderGame() {
  const [items, setItems] = useState(() => shuffle(ORDER_STEPS))
  const [picked, setPicked] = useState([])
  const [wrong, setWrong] = useState(null)

  const click = (step) => {
    if (picked.includes(step.id)) return
    if (step.id === picked.length + 1) {
      setPicked((p) => [...p, step.id])
      setWrong(null)
    } else {
      setWrong(step)
    }
  }

  const reset = () => { setItems(shuffle(ORDER_STEPS)); setPicked([]); setWrong(null) }
  const complete = picked.length === ORDER_STEPS.length

  return (
    <div className="space-y-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        Ćwiczenie 1: ułóż pomiary odbiorcze w kolejności zalecanej przez PN-HD 60364-6 ({picked.length}/{ORDER_STEPS.length})
      </div>
      <div className="grid gap-1.5 md:grid-cols-2">
        {items.map((s) => {
          const done = picked.includes(s.id)
          return (
            <button
              key={s.id}
              disabled={done}
              onClick={() => click(s)}
              className={`flex items-center gap-2 border px-3 py-2 text-left text-sm transition ${
                done ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-700 hover:border-[color:var(--c-1a5c46)]'
              }`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-[10px] font-bold ${done ? 'border-[color:var(--c-1f7a4d)]' : 'border-[color:var(--c-d7ded9)]'}`}>
                {done ? picked.indexOf(s.id) + 1 : '?'}
              </span>
              {s.label}
            </button>
          )
        })}
      </div>
      {wrong ? (
        <NoteBox type="mistake" title="Nie ta kolejność">
          „{wrong.label}" wykonuje się później. Kolejność zalecana w normie: oględziny → ciągłość PE → izolacja → impedancja pętli → RCD. Każdy krok opiera się na poprzednim – na egzaminie trzymaj się jej.
        </NoteBox>
      ) : null}
      {complete ? (
        <NoteBox type="remember" title="Kolejność opanowana">
          Te pięć kroków w tej kolejności wystarczy na egzaminie. Logika: najpierw patrzysz (oględziny), potem sprawdzasz drogę ochronną (PE),
          szczelność (izolacja), skuteczność wyłączania (pętla) i na końcu RCD.
        </NoteBox>
      ) : null}
      <Button variant="secondary" onClick={reset}><RotateCcw className="mr-1 h-4 w-4" /> Wymieszaj od nowa</Button>
    </div>
  )
}

const PROTOCOL_ITEMS = [
  { id: 'obiekt', label: 'Dane identyfikacyjne obiektu (adres, właściciel)', required: true },
  { id: 'schemat', label: 'Schemat lub opis badanej instalacji', required: true },
  { id: 'przyrzady', label: 'Wykaz przyrządów z ważnymi świadectwami wzorcowania', required: true },
  { id: 'wyniki', label: 'Wyniki pomiarów każdego obwodu z jednostkami', required: true },
  { id: 'ocena', label: 'Ocena wyników (zgodne / niezgodne z normą)', required: true },
  { id: 'data', label: 'Data wykonania pomiaru', required: true },
  { id: 'podpis', label: 'Podpis osoby wykonującej pomiary (świadectwo z zakresem kontrolno-pomiarowym)', required: true },
  { id: 'logo', label: 'Kolorowe logo firmy', required: false },
  { id: 'cena', label: 'Cena usługi pomiarowej', required: false },
]

function ProtocolGame() {
  const [checked, setChecked] = useState({})
  const [verdict, setVerdict] = useState(null)

  const validate = () => {
    const missing = PROTOCOL_ITEMS.filter((i) => i.required && !checked[i.id])
    setVerdict({ missing })
  }

  return (
    <div className="space-y-3 border-t border-[color:var(--c-d7ded9)] pt-4">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
        Ćwiczenie 2: zaznacz, co MUSI zawierać protokół pomiarowy
      </div>
      <div className="grid gap-1.5 md:grid-cols-2">
        {PROTOCOL_ITEMS.map((i) => (
          <button
            key={i.id}
            onClick={() => { setChecked((c) => ({ ...c, [i.id]: !c[i.id] })); setVerdict(null) }}
            className={`flex items-center gap-2 border px-3 py-2 text-left text-sm transition ${
              checked[i.id] ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-600 hover:border-[color:var(--c-b9c4bd)]'
            }`}
          >
            <span className={`flex h-4 w-4 shrink-0 items-center justify-center border ${checked[i.id] ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-1a5c46)]' : 'border-[color:var(--c-b9c4bd)]'}`}>
              {checked[i.id] ? <Check className="h-3 w-3 text-white" /> : null}
            </span>
            {i.label}
          </button>
        ))}
      </div>
      <Button onClick={validate}><FileCheck className="mr-2 h-4 w-4" /> Sprawdź protokół</Button>
      {verdict ? (
        verdict.missing.length === 0 ? (
          PROTOCOL_ITEMS.filter((i) => !i.required && checked[i.id]).length > 0 ? (
            <NoteBox type="remember" title="Protokół kompletny (z nadmiarem)">
              Wszystkie 7 wymaganych elementów jest. Logo i cena nie szkodzą, ale o wartości protokołu decyduje tylko 7 elementów obowiązkowych.
            </NoteBox>
          ) : (
            <NoteBox type="remember" title="Protokół kompletny ✓">
              Komplet: dane obiektu, schemat, przyrządy ze świadectwami wzorcowania, wyniki, ocena, data i podpis osoby z zakresem kontrolno-pomiarowym.
              Pamiętaj: świadectwa wzorcowania muszą być ważne W DNIU pomiaru.
            </NoteBox>
          )
        ) : (
          <NoteBox type="mistake" title={`Protokół niekompletny – brakuje ${verdict.missing.length} element(ów)`}>
            Brak: {verdict.missing.map((m) => m.label.toLowerCase()).join('; ')}. Bez któregokolwiek z 7 elementów protokół zostanie zakwestionowany – pomiary do powtórki.
          </NoteBox>
        )
      ) : null}
    </div>
  )
}

export function SimProtokol() {
  return (
    <div className="space-y-6">
      <OrderGame />
      <ProtocolGame />
    </div>
  )
}
