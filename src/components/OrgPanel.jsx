import React from 'react'
import { ShieldCheck, FlaskConical, Users, FileSignature, ClipboardCheck } from 'lucide-react'
import { SectionFrame, NoteBox } from './ui.jsx'
import { ChapterSection } from './ChapterSection.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { SimStrefa } from './org/SimStrefa.jsx'
import { SimRole } from './org/SimRole.jsx'
import { SimPolecenie } from './org/SimPolecenie.jsx'
import { orgSections } from '../data/orgWork.js'
import { useStoredState } from '../lib/storage.js'

export function OrgPanel() {
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const passed = !!chapterDone['organizacja-pracy']

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Organizacja pracy"
        title="Bezpieczna organizacja pracy przy urządzeniach elektrycznych"
        subtitle="Polecenia, osoby funkcyjne, przygotowanie strefy pracy, dopuszczenie, przerwy i zakończenie. To najczęstszy temat pytań przy eksploatacji i dozorze – i najczęstszy powód oblania."
        badge={passed ? 'zaliczone ✓' : 'niezaliczone'}
      >
        <NoteBox type="remember" title="Podstawa prawna">
          Rozporządzenie Ministra Energii z 28 sierpnia 2019 r. w sprawie bezpieczeństwa i higieny pracy przy urządzeniach energetycznych
          (tekst jednolity: Dz.U. 2021 poz. 1210) oraz instrukcja organizacji bezpiecznej pracy (IOBP), którą pracodawca opracowuje na jego podstawie.
          Szczegóły (np. wzór polecenia, wykaz prac szczególnie niebezpiecznych) różnią się między zakładami – zasady opisane niżej są wspólne.
        </NoteBox>
      </SectionFrame>

      <SectionFrame tag={<span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Teoria</span>} title="Co musisz umieć powiedzieć komisji">
        <div className="space-y-8">
          {orgSections.map((s) => <ChapterSection key={s.heading} section={s} />)}
        </div>
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><FlaskConical className="h-3.5 w-3.5" /> Symulacja 1</span>}
        title="Przygotuj strefę pracy – i zlikwiduj ją"
        subtitle="Jesteś dopuszczającym. Klikaj czynności we właściwej kolejności i patrz, co dzieje się z obwodem. Zły krok – dowiesz się, czym by się skończył."
      >
        <SimStrefa />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Symulacja 2</span>}
        title="Kto jest kim?"
        subtitle="Przypisz zadania do osób funkcyjnych i sprawdź, które funkcje wolno łączyć."
      >
        <SimRole />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><FileSignature className="h-3.5 w-3.5" /> Symulacja 3</span>}
        title="Polecenie czy bez polecenia?"
        subtitle="Siedem sytuacji z życia elektryka – zdecyduj, na jakiej podstawie wolno je wykonać."
      >
        <SimPolecenie />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</span>}
        title="3 pytania z organizacji pracy"
        subtitle="Komplet 3/3 zalicza sekcję."
        badge={passed ? 'zaliczone ✓' : 'niezaliczone'}
        accent={passed ? 'var(--c-1f7a4d)' : 'var(--c-1a5c46)'}
      >
        <ChapterCheck
          chapterId="organizacja-pracy"
          passed={passed}
          onPassed={() => setChapterDone((d) => ({ ...d, 'organizacja-pracy': true }))}
        />
      </SectionFrame>
    </div>
  )
}
