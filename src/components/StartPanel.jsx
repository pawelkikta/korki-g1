import React from 'react'
import { BookOpen, Layers, ListChecks, GraduationCap, Table2, BookMarked, ToggleRight, ArrowRight, Waypoints, ShieldCheck } from 'lucide-react'
import { questions, rounds } from '../data/questions.js'
import { chapters } from '../data/chapters.js'
import { loadStored } from '../lib/storage.js'
import { SectionFrame, NoteBox, ProgressBar, ValueTile } from './ui.jsx'

const PATH = [
  { icon: Waypoints, target: 'podstawy', title: '1. Skąd prąd – zacznij TUTAJ', desc: 'Fundament: skąd bierze się 230 V, czym są L, N i PE, co się stanie jak zewrzesz L z kaloryferem i gdzie w mieszkaniu siedzi RCD. Bez tego reszta to wkuwanie na pamięć.' },
  { icon: BookOpen, target: 'szkolenie', title: '2. Szkolenie z pomiarów', desc: '7 rozdziałów z interaktywnymi symulacjami przyrządów – zrozum, zanim zaczniesz wkuwać. Przeczytaj przed rundami 2 i 4.' },
  { icon: ToggleRight, target: 'urzadzenia', title: '3. Urządzenia – jak działają', desc: 'MCB, RCD, bezpiecznik topikowy, RCBO, SPD – symboliczny rysunek + interaktywna zasada działania. Wyślij piorun, zasymuluj zwarcie, naciśnij TEST.' },
  { icon: ShieldCheck, target: 'organizacja', title: '4. Organizacja pracy – BHP i dozór', desc: 'Polecenie pisemne, osoby funkcyjne, przygotowanie i likwidacja strefy pracy. Trzy symulacje – to tu najczęściej oblewa się eksploatację.' },
  { icon: Layers, target: 'fiszki', title: '5. Fiszki – 4 rundy', desc: '55 pytań egzaminacyjnych. Odpowiadasz na głos, odsłaniasz meritum i zaznaczasz, które kluczowe elementy padły. Do każdego pytania – dopytania komisji.' },
  { icon: ListChecks, target: 'test', title: '6. Test ABCD', desc: 'Pytania zamknięte z dystraktorami opartymi na typowych błędach kandydatów. Szybka kontrola, czy wiedza siedzi.' },
  { icon: GraduationCap, target: 'egzamin', title: '7. Egzamin próbny', desc: '10 pytań ze wszystkich obszarów, a po każdym – dopytanie komisji. Zaliczasz pytanie tylko wtedy, gdy padły kluczowe elementy i obroniłeś się przy dopytaniu.' },
  { icon: Table2, target: 'sciaga', title: 'Ściąga z liczbami', desc: 'Wszystkie wartości graniczne w jednym miejscu + tryb drill do wkuwania. Wracaj tu codziennie.' },
  { icon: BookMarked, target: 'slowniczek', title: 'Słowniczek pojęć, urządzeń i skrótów', desc: 'Od przewodu PE po kamerę termowizyjną – co to jest, do czego służy i przykład z życia. Plus skróty: skąd się wzięło TN, RCD czy SELV.' },
]

export function StartPanel({ goTo }) {
  const progress = loadStored('flash', {})
  const examHistory = loadStored('examHistory', [])
  const chapterDone = loadStored('chapters', {})
  const totalKnown = questions.filter((q) => progress[q.id] === 'know').length
  const totalReview = questions.filter((q) => progress[q.id] === 'review').length
  const sectionIds = ['podstawy-obwodu', ...chapters.map((c) => c.id), 'organizacja-pracy']
  const chaptersDone = sectionIds.filter((id) => chapterDone[id]).length
  const lastExam = examHistory[examHistory.length - 1]

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Start"
        title="Jak przygotować się tą apką"
        subtitle="Egzamin SEP G1 to rozmowa z komisją – oceniają rozumienie, nie regułki. Apka prowadzi cię od zrozumienia (szkolenie + symulacje) przez trening (fiszki) do sprawdzenia (test, egzamin próbny)."
      >
        <div className="grid gap-2">
          {PATH.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.target}
                onClick={() => goTo(p.target)}
                className="group flex items-start gap-3 border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-3 text-left transition hover:border-[color:var(--c-1a5c46)] hover:bg-[color:var(--b-eef3f0)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f3f6f4)]">
                  <Icon className="h-4 w-4 text-[color:var(--c-14543e)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-gray-900">{p.title}</div>
                  <div className="mt-0.5 text-xs leading-5 text-gray-600">{p.desc}</div>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-gray-400 transition group-hover:text-[color:var(--c-14543e)]" />
              </button>
            )
          })}
        </div>
      </SectionFrame>

      <SectionFrame tag="Postęp" title="Twój stan przygotowania" badge="zapisywane w przeglądarce">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <ValueTile value={`${chaptersDone}/${sectionIds.length}`} label={'sekcji zaliczonych („Sprawdź się")'} tone={chaptersDone === 0 ? 'red' : 'amber'} />
          <ValueTile value={`${totalKnown}/${questions.length}`} label="pytań opanowanych (fiszki)" />
          <ValueTile value={String(totalReview)} label={'oznaczonych „powtórzyć"'} tone={totalReview > 0 ? 'red' : 'amber'} />
          <ValueTile value={lastExam ? `${lastExam.score}/${lastExam.total}` : '–'} label="ostatni egzamin próbny" />
          <ValueTile value={String(examHistory.length)} label="podejść do egzaminu" />
        </div>
        <div className="mt-4 space-y-2">
          {rounds.map((r) => {
            const roundQs = questions.filter((q) => q.round === r.id)
            const known = roundQs.filter((q) => progress[q.id] === 'know').length
            return (
              <div key={r.id} className="flex items-center gap-3">
                <div className="w-44 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-gray-600">R{r.id} · {r.title}</div>
                <div className="flex-1"><ProgressBar value={known} max={roundQs.length} tone={known === roundQs.length ? 'green' : 'amber'} /></div>
                <div className="w-12 text-right font-mono text-xs text-gray-700">{known}/{roundQs.length}</div>
              </div>
            )
          })}
        </div>
      </SectionFrame>

      <NoteBox type="remember" title="Strategia na egzamin">
        Komisja ocenia rozumienie, nie numerację norm. Wystarczy „zgodnie z normą instalacji elektrycznych PN-HD 60364".
        Ale liczby ze ściągi (1 MΩ, 500 V DC, 200 mA, 30 mA, 0,4 s...) musisz znać na pamięć – przy zakresie kontrolno-pomiarowym pytają szczegółowo.
      </NoteBox>
    </div>
  )
}
