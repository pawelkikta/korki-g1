import React, { useMemo, useState } from 'react'
import { BookMarked, Search, Type, Wrench } from 'lucide-react'
import { glossary, glossaryGroups } from '../data/glossary.js'
import { abbreviations, abbrGroups, abbrLangs } from '../data/abbreviations.js'
import { useStoredState } from '../lib/storage.js'
import { SystemDecoder } from './SystemDecoder.jsx'
import { NoteBox, SectionFrame, Tag } from './ui.jsx'

function GlossaryCard({ entry }) {
  return (
    <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-bold text-gray-900">{entry.term}</div>
        <Tag>{entry.group}</Tag>
      </div>
      <p className="mt-2 text-sm leading-6 text-gray-700">{entry.what}</p>
      <p className="mt-1.5 text-sm leading-6 text-gray-700"><span className="font-semibold text-[color:var(--c-14543e)]">Do czego służy: </span>{entry.use}</p>
      <div className="mt-2.5 border border-[color:var(--c-bcd4c8)] bg-[color:var(--b-e7f0eb)] px-3 py-2 text-sm leading-6 text-gray-800">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-14543e)]">W praktyce </span>
        <span className="mt-0.5 block">{entry.example}</span>
      </div>
    </div>
  )
}

// rozwinięcie skrótu: litery w [nawiasach] tworzą skrót – wyróżniamy je kolorem
function Expansion({ text }) {
  return text.split(/\[([^\]]+)\]/).map((part, i) =>
    i % 2 ? <strong key={i} className="font-extrabold text-[color:var(--c-14543e)]">{part}</strong> : <span key={i}>{part}</span>
  )
}

function AbbrCard({ entry }) {
  return (
    <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
      <div className="flex items-start gap-3">
        <div
          style={{ '--e': 'var(--c-bcd4c8)' }}
          className={`cham-sm edge w-24 shrink-0 bg-[color:var(--b-e7f0eb)] px-2 py-2 text-center font-mono font-bold leading-tight text-[color:var(--c-14543e)] ${entry.abbr.length > 8 ? 'text-[12px]' : 'text-lg'}`}
        >
          {entry.abbr}
        </div>
        <div className="min-w-0 flex-1">
          {entry.src ? <div className="text-[15px] leading-6 text-gray-900"><Expansion text={entry.src} /></div> : null}
          {entry.pl ? <div className="text-sm font-semibold leading-6 text-gray-800">→ {entry.pl}</div> : null}
          <div className="mt-1.5"><Tag tone={entry.lang === 'sym' ? 'slate' : 'amber'}>{abbrLangs[entry.lang]}</Tag></div>
        </div>
      </div>
      {entry.note ? <p className="mt-2.5 text-[13px] leading-6 text-gray-700">{entry.note}</p> : null}
    </div>
  )
}

const TABS = [
  { id: 'pojecia', label: 'Pojęcia i urządzenia', icon: BookMarked },
  { id: 'skroty', label: 'Skróty – skąd się biorą', icon: Type },
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
    <div className="space-y-6">
      <SectionFrame
        tag="Słowniczek"
        title={abbrMode ? 'Skróty i oznaczenia – skąd się biorą' : 'Pojęcia i urządzenia – od przewodu po miernik'}
        subtitle={
          abbrMode
            ? 'TN pochodzi z francuskiego, RCD z angielskiego, NH z niemieckiego. Rozwinięcie mówi, CO oznacza skrót – a komisja lubi zapytać, co znaczy litera T w TN.'
            : 'Krótko: co to jest, do czego służy i przykład z życia. Egzamin ustny to rozmowa – komisja lubi, gdy umiesz wyjaśnić pojęcie „po ludzku", a nie regułką.'
        }
        badge={abbrMode ? `${count}/${abbreviations.length} skrótów` : `${count}/${glossary.length} haseł`}
      >
        <div className="mb-3 grid gap-1.5 sm:grid-cols-2">
          {TABS.map((t) => {
            const Icon = t.icon
            const on = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`cham edge flex items-center gap-2 px-3 py-2.5 text-left text-sm font-bold transition ${on ? 'bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'bg-[color:var(--b-fafbfa)] text-gray-500 hover:text-gray-800'}`}
                style={{ '--e': on ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
              >
                <Icon className="h-4 w-4 shrink-0" /> {t.label}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)] px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={abbrMode ? 'Szukaj skrótu: TN, RCD, SELV, IP...' : 'Szukaj: RCD, pralka, cęgi, PEN...'}
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setGroup(null)}
            className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition ${
              group === null ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
            }`}
          >
            Wszystkie
          </button>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(group === g ? null : g)}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition ${
                group === g ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </SectionFrame>

      {showDecoder ? (
        <SectionFrame
          tag="Dekoder"
          title="TN, TT, IT – litera po literze"
          subtitle="Każda litera odpowiada na inne pytanie. Wybierz układ i kliknij literę, żeby zobaczyć na schemacie, czego dotyczy."
        >
          <SystemDecoder />
          <div className="mt-4">
            <NoteBox type="trap" title="Na egzaminie">
              Nie kończ na „T to ziemia". Powiedz, czego dotyczy litera: pierwsza – jak źródło jest połączone z ziemią, druga – jak
              połączone są obudowy, kolejne – czy N i PE biegną razem (C), czy osobno (S).
            </NoteBox>
          </div>
        </SectionFrame>
      ) : null}

      {count === 0 ? (
        <SectionFrame tag="Pusto" title={`Brak ${abbrMode ? 'skrótów' : 'haseł'} dla „${query}"`}>
          <div className="flex items-center gap-2 text-sm text-gray-600"><Wrench className="h-4 w-4" /> Spróbuj krócej, np. „RCD" albo „izolacja".</div>
        </SectionFrame>
      ) : abbrMode ? (
        q ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {filteredAbbr.map((e) => <AbbrCard key={e.id} entry={e} />)}
          </div>
        ) : (
          abbrGroups
            .filter((g) => filteredAbbr.some((e) => e.group === g))
            .map((g) => (
              <div key={g}>
                <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--c-14543e)]">{g}</div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {filteredAbbr.filter((e) => e.group === g).map((e) => <AbbrCard key={e.id} entry={e} />)}
                </div>
              </div>
            ))
        )
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((e) => <GlossaryCard key={e.id} entry={e} />)}
        </div>
      )}
    </div>
  )
}
