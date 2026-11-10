import React from 'react'
import { HeartPulse, ListOrdered, ClipboardCheck } from 'lucide-react'
import { firstAidSections, firstAidSequence } from '../data/firstAid.js'
import { useStoredState } from '../lib/storage.js'
import { Badge, NoteBox, PageHeader, SectionFrame } from './ui.jsx'
import { ChapterSection } from './ChapterSection.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { SequenceDrill } from './SequenceDrill.jsx'
import { PracticeTopic } from './TopicLinks.jsx'

export function FirstAidPanel() {
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const passed = !!chapterDone['pierwsza-pomoc']

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Zrozum · BHP"
        title="Porażenie prądem i pierwsza pomoc"
        lead="Co robisz, gdy ktoś zostanie porażony – i gdy pali się urządzenie pod napięciem. Komisja pyta tu głównie o kolejność: najpierw twoje bezpieczeństwo i przerwanie przepływu prądu, potem poszkodowany."
        meta={passed ? <Badge tone="ok">zaliczone ✓</Badge> : null}
      />

      <NoteBox type="warning" title="To skrót na egzamin, nie kurs">
        Kroki są zgodne z odpowiedziami w fiszkach i z podstawowym schematem resuscytacji. Wytyczne resuscytacji (ERC) zmieniają się co
        kilka lat, a uciskania klatki piersiowej i obsługi AED uczy się w praktyce – na kursie pierwszej pomocy.
      </NoteBox>

      <SectionFrame tag={<><HeartPulse className="h-3.5 w-3.5" /> Teoria</>} title="Co musisz umieć powiedzieć komisji">
        <div className="space-y-10">
          {firstAidSections.map((s) => <ChapterSection key={s.heading} section={s} />)}
        </div>
      </SectionFrame>

      <SectionFrame
        tag={<><ListOrdered className="h-3.5 w-3.5" /> Ćwiczenie</>}
        title="Ułóż kolejność działań przy porażeniu"
        subtitle="Kroki są pomieszane. Klikaj je od pierwszego do ostatniego – krok kliknięty za wcześnie powie ci, czego jeszcze brakuje."
      >
        <SequenceDrill
          steps={firstAidSequence}
          doneText="Najpierw przerwanie przepływu prądu, potem reakcja i oddech, 112 z AED, RKO 30:2 i defibrylacja. Tak samo odpowiadasz komisji."
        />
      </SectionFrame>

      <SectionFrame
        tag={<><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</>}
        title="3 pytania z pierwszej pomocy"
        subtitle="Komplet 3/3 zalicza sekcję."
        badge={passed ? <Badge tone="ok">zaliczone ✓</Badge> : <Badge>niezaliczone</Badge>}
        accent={passed ? 'var(--ok)' : undefined}
      >
        <ChapterCheck
          chapterId="pierwsza-pomoc"
          passed={passed}
          onPassed={() => setChapterDone((d) => ({ ...d, 'pierwsza-pomoc': true }))}
        />
        <PracticeTopic topicId="pierwsza-pomoc" />
      </SectionFrame>
    </div>
  )
}
