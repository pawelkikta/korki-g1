import React, { useMemo, useState } from 'react'
import { BookMarked, Type, Wrench } from 'lucide-react'
import { glossary, glossaryGroups } from '../data/glossary.js'
import { abbreviations, abbrGroups, abbrLangs } from '../data/abbreviations.js'
import { useStoredState } from '../lib/storage.js'
import { SystemDecoder } from './SystemDecoder.jsx'
import { FilterChips, FolderTabs, NoteBox, PageHeader, SearchField, Tag } from './ui.jsx'

function GlossaryCard({ entry }) {
  return (
    <div className="rounded-[4px] bg-paper px-4 py-4 shadow-[inset_0_0_0_1px_var(--rule)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-slab text-[18px] font-semibold leading-snug text-ink">{entry.term}</div>
        <Tag>{entry.group}</Tag>
      </div>
      <p className="mt-2 font-serif text-[16px] leading-[1.6] text-ink">{entry.what}</p>
      <p className="mt-1.5 font-serif text-[16px] leading-[1.6] text-ink"><span className="font-sans text-[14px] font-bold text-ink-2">Do czego służy: </span>{entry.use}</p>
      <div className="mt-3 rounded-r-[3px] border-l-[3px] border-accent-line bg-accent-soft px-3 py-2">
        <div className="eyebrow !text-accent-ink">W praktyce</div>
        <div className="mt-0.5 font-serif text-[15.5px] leading-[1.55] text-ink">{entry.example}</div>
      </div>
    </div>
  )
}

// rozwinięcie skrótu: litery w [nawiasach] tworzą skrót – wyróżniamy je kolorem
function Expansion({ text }) {
  return text.split(/\[([^\]]+)\]/).map((part, i) =>
    i % 2 ? <strong key={i} className="font-bold text-red-ink">{part}</strong> : <span key={i}>{part}</span>
  )
}

function AbbrCard({ entry }) {
  return (
    <div className="rounded-[4px] bg-paper px-4 py-4 shadow-[inset_0_0_0_1px_var(--rule)]">
      <div className="flex items-start gap-3.5">
        <div className={`w-24 shrink-0 rounded-[3px] bg-paper-2 px-2 py-2 text-center font-mono font-bold leading-tight text-ink shadow-[inset_0_0_0_1px_var(--rule-2)] ${entry.abbr.length > 8 ? 'text-[12.5px]' : 'text-[18px]'}`}>
          {entry.abbr}
        </div>
        <div className="min-w-0 flex-1">
          {entry.src ? <div className="font-serif text-[16.5px] leading-[1.5] text-ink"><Expansion text={entry.src} /></div> : null}
          {entry.pl ? <div className="text-[14.5px] font-semibold leading-6 text-ink-2">→ {entry.pl}</div> : null}
          <div className="mt-1.5"><Tag tone={entry.lang === 'sym' ? 'slate' : 'amber'}>{abbrLangs[entry.lang]}</Tag></div>
        </div>
      </div>
      {entry.note ? <p className="mt-2.5 font-serif text-[15px] leading-[1.6] text-ink-2">{entry.note}</p> : null}
    </div>
  )
}

const TABS = [
  { id: 'pojecia', label: 'Pojęcia i urządzenia', icon: BookMarked },
  { id: 'skroty', label: 'Skróty', icon: Type },
]

export function GlossaryPanel() {
  const [tab, setTab] = useStoredState('glossaryTab', 'pojecia')
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState(null)
  const abbrMode = tab === 'skroty'
  const groups = abbrMode ? abbrGroups : glossaryGroups
  const q = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    return glossary.filter((e) => {
      if (group && e.group !== group) return false
      if (!q) return true
      return [e.term, e.what, e.use, e.example].join(' ').toLowerCase().includes(q)
    })
  }, [q, group])

  const filteredAbbr = useMemo(() => {
    const hits = abbreviations.filter((e) => {
      if (group && e.group !== group) return false
      if (!q) return true
      return [e.abbr, e.src, e.pl, e.note].join(' ').replace(/[[\]]/g, '').toLowerCase().includes(q)
    })
    // trafienia w samym skrócie najpierw
    return q ? [...hits].sort((a, b) => Number(!a.abbr.toLowerCase().includes(q)) - Number(!b.abbr.toLowerCase().includes(q))) : hits
  }, [q, group])

  const switchTab = (id) => {
    setTab(id)
    setGroup(null)
  }

  const count = abbrMode ? filteredAbbr.length : filtered.length
  const showDecoder = abbrMode && !q && (group === null || group === 'Układy sieci')

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Pod ręką"
        title="Słowniczek"
        lead="Pojęcia i urządzenia wyjaśnione „po ludzku” oraz skróty – skąd się biorą. Egzamin ustny to rozmowa: komisja lubi, gdy umiesz wyjaśnić pojęcie własnymi słowami, a nie regułką."
      />

      <div>
        <FolderTabs label="Słowniczek" value={tab} onChange={switchTab} tabs={TABS.map((t) => ({ ...t, label: `${t.label} (${t.id === 'skroty' ? abbreviations.length : glossary.length})` }))} />
        <section className="sheet relative z-[1] px-5 py-5 md:px-7 md:py-6">
          <p className="max-w-[70ch] font-serif text-[16px] leading-[1.55] text-ink-2">
            {abbrMode
              ? 'TN pochodzi z francuskiego, RCD z angielskiego, NH z niemieckiego. Rozwinięcie mówi, CO oznacza skrót – a komisja lubi zapytać, co znaczy litera T w TN.'
              : 'Krótko: co to jest, do czego służy i przykład z życia.'}
          </p>
          <div className="mt-4">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder={abbrMode ? 'Szukaj skrótu: TN, RCD, SELV, IP...' : 'Szukaj: RCD, pralka, cęgi, PEN...'}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[13px] font-semibold text-ink-3">Pokaż:</span>
            <FilterChips options={groups} value={group} onChange={setGroup} />
            <span className="ml-auto text-[13px] tabular-nums text-ink-3">{abbrMode ? `${count} z ${abbreviations.length}` : `${count} z ${glossary.length}`}</span>
          </div>

          {showDecoder ? (
            <div className="mt-6 border-t border-rule pt-5">
              <div className="eyebrow">Dekoder</div>
              <h2 className="mt-1 font-slab text-[20px] font-semibold text-ink">TN, TT, IT – litera po literze</h2>
              <p className="mt-1 font-serif text-[15.5px] leading-[1.55] text-ink-2">Każda litera odpowiada na inne pytanie. Wybierz układ i kliknij literę, żeby zobaczyć na schemacie, czego dotyczy.</p>
              <div className="mt-4"><SystemDecoder /></div>
              <div className="mt-4">
                <NoteBox type="trap" title="Na egzaminie">
                  Nie kończ na „T to ziemia". Powiedz, czego dotyczy litera: pierwsza – jak źródło jest połączone z ziemią, druga – jak
                  połączone są obudowy, kolejne – czy N i PE biegną razem (C), czy osobno (S).
                </NoteBox>
              </div>
            </div>
          ) : null}

          <div className="mt-6 border-t border-rule pt-5">
            {count === 0 ? (
              <div className="flex items-center gap-2 text-[15px] text-ink-2">
                <Wrench className="h-4 w-4" /> Brak {abbrMode ? 'skrótów' : 'haseł'} dla „{query}”. Spróbuj krócej, np. „RCD” albo „izolacja”.
              </div>
            ) : abbrMode ? (
              q ? (
                <div className="grid gap-3 lg:grid-cols-2">
                  {filteredAbbr.map((e) => <AbbrCard key={e.id} entry={e} />)}
                </div>
              ) : (
                <div className="space-y-6">
                  {abbrGroups
                    .filter((g) => filteredAbbr.some((e) => e.group === g))
                    .map((g) => (
                      <div key={g}>
                        <div className="eyebrow mb-2">{g}</div>
                        <div className="grid gap-3 lg:grid-cols-2">
                          {filteredAbbr.filter((e) => e.group === g).map((e) => <AbbrCard key={e.id} entry={e} />)}
                        </div>
                      </div>
                    ))}
                </div>
              )
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {filtered.map((e) => <GlossaryCard key={e.id} entry={e} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
