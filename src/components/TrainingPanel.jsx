import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, FlaskConical, ClipboardCheck, Check } from 'lucide-react'
import { chapters } from '../data/chapters.js'
import { useStoredState } from '../lib/storage.js'
import { Button, SectionFrame } from './ui.jsx'
import { ChapterSection } from './ChapterSection.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { SimPrzeglady } from './sims/SimPrzeglady.jsx'
import { SimMegaomomierz } from './sims/SimMegaomomierz.jsx'
import { SimCiagloscPE } from './sims/SimCiagloscPE.jsx'
import { SimPetlaZwarcia } from './sims/SimPetlaZwarcia.jsx'
import { SimRCD } from './sims/SimRCD.jsx'
import { SimUziemienie } from './sims/SimUziemienie.jsx'
import { SimProtokol } from './sims/SimProtokol.jsx'

const SIMS = {
  'podstawy-prawne': { component: SimPrzeglady, title: 'Kiedy przegląd jest obowiązkowy?', subtitle: 'Wybierz typ obiektu i sprawdź, jak często trzeba kontrolować instalację – i z jakiego przepisu to wynika.' },
  'rezystancja-izolacji': { component: SimMegaomomierz, title: 'Wirtualny megaomomierz', subtitle: 'Wykonaj procedurę pomiaru we właściwej kolejności, potem zbadaj izolację suwakiem.' },
  'ciaglosc-pe': { component: SimCiagloscPE, title: 'Dlaczego 200 mA?', subtitle: 'Zmierz luźny zacisk i zacisk z tlenkiem multimetrem oraz miernikiem 200 mA – zobacz, który przyrząd mówi prawdę.' },
  'petla-zwarcia': { component: SimPetlaZwarcia, title: 'Pętla zwarcia na żywo', subtitle: 'Reguluj impedancję Zs, zmieniaj charakterystykę B/C/D i obserwuj, kiedy zabezpieczenie zdąży wyłączyć.' },
  'rcd': { component: SimRCD, title: 'Wirtualny tester RCD', subtitle: 'Przetestuj wyłącznik różnicowoprądowy prądami 0,5×IΔn, 1×IΔn i 5×IΔn.' },
  'uziemienie': { component: SimUziemienie, title: 'Metoda trójzaciskowa (spadku potencjału)', subtitle: 'Układ elektrod E-P-C i ocena rezystancji uziemienia wg zastosowania.' },
  'protokol': { component: SimProtokol, title: 'Odbiór instalacji – ćwiczenie', subtitle: 'Ułóż pomiary w kolejności zalecanej przez normę i skompletuj protokół.' },
}

export function TrainingPanel() {
  const [idx, setIdx] = useState(0)
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const chapter = chapters[idx]
  const sim = SIMS[chapter.id]
  const SimComponent = sim?.component
  const doneCount = chapters.filter((c) => chapterDone[c.id]).length

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(i + 1, chapters.length - 1))
      else if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Tryb 02 – szkolenie"
        title="Pomiary elektryczne (zakres kontrolno-pomiarowy)"
        subtitle={'7 rozdziałów z pełnym wyjaśnieniem zagadnień pomiarowych. Przeczytaj przed rundami 2 i 4 fiszek. Każdy rozdział kończy się symulacją i mini-quizem „Sprawdź się" – komplet 3/3 zalicza rozdział.'}
        badge={`zaliczone ${doneCount}/7 · rozdział ${chapter.num}/7`}
      >
        <div className="flex flex-wrap gap-1.5">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setIdx(i)}
              className={`inline-flex items-center gap-1.5 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition ${
                i === idx ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
              }`}
            >
              {c.num}. {c.short}
              {chapterDone[c.id] ? <Check className="h-3.5 w-3.5 text-[color:var(--c-1f7a4d)]" /> : null}
            </button>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tag={`Rozdział ${chapter.num}`} title={chapter.title} subtitle={chapter.lead}>
        <div className="space-y-8">
          {chapter.sections.map((s) => <ChapterSection key={s.heading} section={s} />)}
        </div>
      </SectionFrame>

      {SimComponent ? (
        <SectionFrame
          tag={<span className="inline-flex items-center gap-1.5"><FlaskConical className="h-3.5 w-3.5" /> Symulacja</span>}
          title={sim.title}
          subtitle={sim.subtitle}
        >
          <SimComponent />
        </SectionFrame>
      ) : null}

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</span>}
        title={`3 pytania z rozdziału ${chapter.num}`}
        subtitle="Odpowiedz bez podglądania – to najlepszy moment na utrwalenie. Komplet 3/3 zalicza rozdział."
        badge={chapterDone[chapter.id] ? 'zaliczony ✓' : 'niezaliczony'}
        accent={chapterDone[chapter.id] ? 'var(--c-1f7a4d)' : 'var(--c-1a5c46)'}
      >
        <ChapterCheck
          key={chapter.id}
          chapterId={chapter.id}
          passed={!!chapterDone[chapter.id]}
          onPassed={() => setChapterDone((d) => ({ ...d, [chapter.id]: true }))}
        />
      </SectionFrame>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" onClick={() => setIdx((i) => Math.max(i - 1, 0))} disabled={idx === 0}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Poprzedni rozdział
        </Button>
        <Button onClick={() => setIdx((i) => Math.min(i + 1, chapters.length - 1))} disabled={idx === chapters.length - 1}>
          Następny rozdział <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
