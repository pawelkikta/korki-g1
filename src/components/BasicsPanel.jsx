import React from 'react'
import { Zap, Gauge, Waypoints, Map as MapIcon, ClipboardCheck } from 'lucide-react'
import { SectionFrame, NoteBox, PageHeader, Badge } from './ui.jsx'
import { TrafoSchematic } from './basics/TrafoSchematic.jsx'
import { VoltmeterLab } from './basics/VoltmeterLab.jsx'
import { CircuitLab } from './basics/CircuitLab.jsx'
import { InstallationMap } from './basics/InstallationMap.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { PracticeTopic } from './TopicLinks.jsx'
import { useStoredState } from '../lib/storage.js'

export function BasicsPanel() {
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const passed = !!chapterDone['podstawy-obwodu']

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Zrozum · fundament"
        title="Skąd prąd: od transformatora do twojego gniazdka"
        lead={'Zanim wejdziesz w pomiary i aparaty, musisz mieć w głowie jeden obraz: skąd bierze się napięcie, czym są L, N i PE, oraz kiedy prąd w ogóle płynie. Bez tego cała reszta to „abstrakcyjne gadanie".'}
        meta={passed ? <Badge tone="ok">zaliczone ✓</Badge> : null}
      />

      <NoteBox type="remember" title="Cztery pytania, na które odpowiesz po tej sekcji">
        <ul className="mt-1 space-y-1.5">
          {[
            'Skąd fizycznie bierze się 230 V w gniazdku – i czemu akurat tyle?',
            'Czym są L, N i PE, gdzie się zaczynają i dlaczego N i PE „schodzą się" w jednym miejscu?',
            'Co się stanie, jak zewrę L z N, a co – jak dotknę L i kaloryfera? Jaki prąd popłynie i czy jest śmiertelny?',
            'Gdzie w mieszkaniu siedzi RCD, którędy przez niego idą przewody i dlaczego akurat tak?',
          ].map((q, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="font-mono text-[14px] font-bold text-accent-ink">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </NoteBox>

      <SectionFrame
        tag={<><Zap className="h-3.5 w-3.5" /> Blok 1</>}
        title="Jak powstaje napięcie – stacja transformatorowa"
        subtitle="Przejdź opowieść krok po kroku: od 15 000 V w sieci, przez indukcję w uzwojeniach, po punkt gwiazdowy i twoje gniazdo."
      >
        <TrafoSchematic />
        <div className="mt-4">
          <NoteBox type="warning" title="To tło do zrozumienia, nie twój teren pracy">
            Stacja SN/nn to urządzenie o napięciu powyżej 1 kV – praca przy niej wymaga świadectwa G1 pkt 3 i jest domeną operatora sieci.
            Złącze kablowe i układ pomiarowy (licznik) też należą do operatora i są plombowane. Elektryk z G1 pkt 2 zaczyna pracę
            za licznikiem – w instalacji odbiorcy. Ten schemat jest po to, żebyś rozumiał, skąd biorą się L, N i PE, a nie żebyś tam zaglądał.
          </NoteBox>
        </div>
      </SectionFrame>

      <SectionFrame
        tag={<><Gauge className="h-3.5 w-3.5" /> Blok 2</>}
        title="Napięcie jest MIĘDZY punktami – zmierz sam"
        subtitle="Przyłóż sondy woltomierza do dowolnych dwóch punktów i zobacz, ile jest napięcia – oraz dlaczego akurat tyle."
      >
        <VoltmeterLab />
      </SectionFrame>

      <SectionFrame
        tag={<><Waypoints className="h-3.5 w-3.5" /> Blok 3</>}
        title="Kiedy popłynie prąd? Zamknij obwód"
        subtitle="Zwarcie L-N, dotknięcie fazy i kaloryfera, ptak na linii oraz przerwy w L1, N i PE – zobacz, którędy płynie prąd, ile go jest i co (albo nic) go wyłączy."
      >
        <CircuitLab />
      </SectionFrame>

      <SectionFrame
        tag={<><MapIcon className="h-3.5 w-3.5" /> Blok 4</>}
        title="Gdzie to wszystko siedzi w budynku"
        subtitle="Cała droga od stacji do gniazdka z rozbebeszoną rozdzielnicą: który aparat gdzie stoi i które przewody przez niego przechodzą."
      >
        <InstallationMap />
      </SectionFrame>

      <SectionFrame
        tag={<><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</>}
        title="3 pytania z podstaw obwodu"
        subtitle="Bez tych trzech odpowiedzi reszta materiału będzie tylko wkuwaniem. Komplet 3/3 zalicza sekcję."
        badge={passed ? <Badge tone="ok">zaliczone ✓</Badge> : <Badge>niezaliczone</Badge>}
        accent={passed ? 'var(--ok)' : undefined}
      >
        <ChapterCheck
          chapterId="podstawy-obwodu"
          passed={passed}
          onPassed={() => setChapterDone((d) => ({ ...d, 'podstawy-obwodu': true }))}
        />
        <PracticeTopic topicId="podstawy-obwodu" />
      </SectionFrame>
    </div>
  )
}
