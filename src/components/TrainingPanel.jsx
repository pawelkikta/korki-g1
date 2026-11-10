import React, { useEffect } from 'react'
import { ChevronLeft, ChevronRight, FlaskConical, ClipboardCheck } from 'lucide-react'
import { chapters } from '../data/chapters.js'
import { useStoredState } from '../lib/storage.js'
import { Badge, Button, FolderTabs, PageHeader, SectionFrame } from './ui.jsx'
import { ChapterSection } from './ChapterSection.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { PracticeTopic } from './TopicLinks.jsx'
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

// Rozdział wybiera adres (#/pomiary/3), więc „Wstecz” i odświeżenie wracają do tego samego rozdziału.
export function TrainingPanel({ chapterNum, onChapter }) {
  const idx = Math.min(Math.max(chapterNum - 1, 0), chapters.length - 1)
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const chapter = chapters[idx]
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]
  const sim = SIMS[chapter.id]
  const SimComponent = sim?.component
  const doneCount = chapters.filter((c) => chapterDone[c.id]).length
  const passed = !!chapterDone[chapter.id]

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && next) onChapter(idx + 2)
      else if (e.key === 'ArrowLeft' && prev) onChapter(idx)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [idx, next, prev, onChapter])

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Zrozum · pomiary"
        title="Pomiary elektryczne"
        lead={'Zakres kontrolno-pomiarowy w 7 rozdziałach. Każdy ma teorię, symulację przyrządu i 3 pytania „Sprawdź się” – komplet 3/3 zalicza rozdział. Przeczytaj przed rundami 2 i 4 fiszek.'}
        meta={`zaliczone ${doneCount}/${chapters.length}`}
      />

      <div>
        <FolderTabs
          label="Rozdziały"
          value={chapter.id}
          onChange={(id) => onChapter(chapters.findIndex((c) => c.id === id) + 1)}
          tabs={chapters.map((c) => ({ id: c.id, kicker: `Rozdział ${c.num}`, label: c.short, done: !!chapterDone[c.id] }))}
        />
        <SectionFrame tag={`Rozdział ${chapter.num} z ${chapters.length}`} title={chapter.title} subtitle={chapter.lead}>
          <div className="space-y-10">
            {chapter.sections.map((s) => <ChapterSection key={s.heading} section={s} />)}
          </div>
        </SectionFrame>
      </div>

      {SimComponent ? (
        <SectionFrame
          tag={<><FlaskConical className="h-3.5 w-3.5" /> Symulacja</>}
          title={sim.title}
          subtitle={sim.subtitle}
        >
          <SimComponent />
        </SectionFrame>
      ) : null}

      <SectionFrame
        tag={<><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</>}
        title={`3 pytania z rozdziału ${chapter.num}`}
        subtitle="Odpowiedz bez podglądania – to najlepszy moment na utrwalenie. Komplet 3/3 zalicza rozdział."
        badge={passed ? <Badge tone="ok">zaliczony ✓</Badge> : <Badge>niezaliczony</Badge>}
        accent={passed ? 'var(--ok)' : undefined}
      >
        <ChapterCheck
          key={chapter.id}
          chapterId={chapter.id}
          passed={passed}
          onPassed={() => setChapterDone((d) => ({ ...d, [chapter.id]: true }))}
        />
        <PracticeTopic topicId={chapter.id} />
      </SectionFrame>

      <div className="grid gap-2 sm:grid-cols-2">
        {prev ? (
          <Button variant="secondary" className="justify-start text-left" onClick={() => onChapter(idx)}>
            <ChevronLeft className="mr-1.5 h-4 w-4 shrink-0" /> <span className="truncate">Rozdział {prev.num}: {prev.short}</span>
          </Button>
        ) : <div className="hidden sm:block" />}
        {next ? (
          <Button className="justify-end text-right" onClick={() => onChapter(idx + 2)}>
            <span className="truncate">Rozdział {next.num}: {next.short}</span> <ChevronRight className="ml-1.5 h-4 w-4 shrink-0" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
