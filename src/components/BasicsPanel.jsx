import React from 'react'
import { Zap, Gauge, Waypoints, Map as MapIcon, ClipboardCheck } from 'lucide-react'
import { SectionFrame, NoteBox } from './ui.jsx'
import { TrafoSchematic } from './basics/TrafoSchematic.jsx'
import { VoltmeterLab } from './basics/VoltmeterLab.jsx'
import { CircuitLab } from './basics/CircuitLab.jsx'
import { InstallationMap } from './basics/InstallationMap.jsx'
import { ChapterCheck } from './ChapterCheck.jsx'
import { useStoredState } from '../lib/storage.js'

export function BasicsPanel() {
  const [chapterDone, setChapterDone] = useStoredState('chapters', {})
  const passed = !!chapterDone['podstawy-obwodu']

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Tryb 02 – fundament"
        title="Skąd prąd: od transformatora do twojego gniazdka"
        subtitle={'Zanim wejdziesz w pomiary i aparaty, musisz mieć w głowie jeden obraz: skąd bierze się napięcie, czym są L, N i PE, oraz kiedy prąd w ogóle płynie. Bez tego cała reszta to „abstrakcyjne gadanie".'}
      >
        <NoteBox type="remember" title="Cztery pytania, na które odpowiesz po tej sekcji">
          <ul className="mt-1 space-y-1">
            {[
              'Skąd fizycznie bierze się 230 V w gniazdku – i czemu akurat tyle?',
              'Czym są L, N i PE, gdzie się zaczynają i dlaczego N i PE „schodzą się" w jednym miejscu?',
              'Co się stanie, jak zewrę L z N, a co – jak dotknę L i kaloryfera? Jaki prąd popłynie i czy jest śmiertelny?',
              'Gdzie w mieszkaniu siedzi RCD, którędy przez niego idą przewody i dlaczego akurat tak?',
            ].map((q, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-6">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--b-1a5c46)]" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </NoteBox>
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Blok 1</span>}
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
        tag={<span className="inline-flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" /> Blok 2</span>}
        title="Napięcie jest MIĘDZY punktami – zmierz sam"
        subtitle="Przyłóż sondy woltomierza do dowolnych dwóch punktów i zobacz, ile jest napięcia – oraz dlaczego akurat tyle."
      >
        <VoltmeterLab />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><Waypoints className="h-3.5 w-3.5" /> Blok 3</span>}
        title="Kiedy popłynie prąd? Zamknij obwód"
        subtitle="Zwarcie L-N, dotknięcie fazy i kaloryfera, ptak na linii oraz przerwy w L1, N i PE – zobacz, którędy płynie prąd, ile go jest i co (albo nic) go wyłączy."
        accent="var(--c-c03538)"
      >
        <CircuitLab />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><MapIcon className="h-3.5 w-3.5" /> Blok 4</span>}
        title="Gdzie to wszystko siedzi w budynku"
        subtitle="Cała droga od stacji do gniazdka z rozbebeszoną rozdzielnicą: który aparat gdzie stoi i które przewody przez niego przechodzą."
      >
        <InstallationMap />
      </SectionFrame>

      <SectionFrame
        tag={<span className="inline-flex items-center gap-1.5"><ClipboardCheck className="h-3.5 w-3.5" /> Sprawdź się</span>}
        title="3 pytania z podstaw obwodu"
        subtitle="Bez tych trzech odpowiedzi reszta materiału będzie tylko wkuwaniem. Komplet 3/3 zalicza sekcję."
        badge={passed ? 'zaliczone ✓' : 'niezaliczone'}
        accent={passed ? 'var(--c-1f7a4d)' : 'var(--c-1a5c46)'}
      >
        <ChapterCheck
          chapterId="podstawy-obwodu"
          passed={passed}
          onPassed={() => setChapterDone((d) => ({ ...d, 'podstawy-obwodu': true }))}
        />
      </SectionFrame>
    </div>
  )
}
