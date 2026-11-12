import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { Compass, BookOpen, Layers, ListChecks, GraduationCap, Table2, BookMarked, ToggleRight, Waypoints, ShieldCheck, HeartPulse, Check, Lightbulb, X } from 'lucide-react'
import { PlanPanel } from './components/PlanPanel.jsx'
import { TrainingPanel } from './components/TrainingPanel.jsx'
import { FlashcardsPanel } from './components/FlashcardsPanel.jsx'
import { QuizPanel } from './components/QuizPanel.jsx'
import { ExamPanel } from './components/ExamPanel.jsx'
import { CheatsheetPanel } from './components/CheatsheetPanel.jsx'
import { GlossaryPanel } from './components/GlossaryPanel.jsx'
import { DevicesPanel } from './components/DevicesPanel.jsx'
import { BasicsPanel } from './components/BasicsPanel.jsx'
import { OrgPanel } from './components/OrgPanel.jsx'
import { FirstAidPanel } from './components/FirstAidPanel.jsx'
import { ReportLink } from './components/ReportLink.jsx'
import { APP_VERSION, APP_STAGE, REPO_URL } from './version.js'
import { useHashRoute } from './lib/route.js'
import { STORAGE_EVENT } from './lib/storage.js'
import { readProgress, learningPath } from './lib/progress.js'

// Menu według etapu nauki: najpierw zrozum, potem utrwal, na końcu sprawdź. Słowniczek – pod ręką.
const GROUPS = [
  { id: 'plan', label: null, items: [{ id: 'plan', label: 'Plan nauki', icon: Compass }] },
  {
    id: 'zrozum', label: 'Zrozum', icon: Lightbulb,
    items: [
      { id: 'podstawy', label: 'Skąd prąd', sub: 'L, N, PE od podstaw', icon: Waypoints },
      { id: 'pomiary', label: 'Pomiary', sub: '7 rozdziałów z symulacjami', icon: BookOpen },
      { id: 'urzadzenia', label: 'Urządzenia', sub: 'MCB, RCD, RCBO, SPD', icon: ToggleRight },
      { id: 'organizacja', label: 'Organizacja pracy', sub: 'polecenia, strefa, role', icon: ShieldCheck },
      { id: 'pierwsza-pomoc', label: 'Pierwsza pomoc', sub: 'porażenie, RKO, pożar', icon: HeartPulse },
    ],
  },
  {
    id: 'utrwal', label: 'Utrwal', icon: Layers,
    items: [
      { id: 'fiszki', label: 'Fiszki', sub: 'pytania ustne, 4 rundy', icon: Layers },
      { id: 'test', label: 'Test ABCD', sub: '50 pytań zamkniętych', icon: ListChecks },
      { id: 'sciaga', label: 'Ściąga', sub: 'liczby na pamięć', icon: Table2 },
    ],
  },
  { id: 'sprawdz', label: 'Sprawdź', items: [{ id: 'egzamin', label: 'Egzamin próbny', sub: '10 pytań + dopytania', icon: GraduationCap }] },
  { id: 'pod-reka', label: 'Pod ręką', items: [{ id: 'slowniczek', label: 'Słowniczek', sub: 'pojęcia i skróty', icon: BookMarked }] },
]
const ITEMS = GROUPS.flatMap((g) => g.items.map((it) => ({ ...it, group: g.id })))
const SECTION_IDS = ITEMS.map((it) => it.id)

// Liczba albo ✓ przy pozycji menu – z tej samej ścieżki co ekran Plan.
// Przelicza się po każdym zapisie postępu (zdarzenie z storage.js).
function useNavMeta() {
  const [tick, bump] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    window.addEventListener(STORAGE_EVENT, bump)
    return () => window.removeEventListener(STORAGE_EVENT, bump)
  }, [])
  return useMemo(() => Object.fromEntries(learningPath(readProgress()).map((s) => [s.id, s])), [tick])
}

function NavMeta({ step }) {
  if (!step) return null
  if (step.status === 'done') return <Check className="h-4 w-4 shrink-0 text-ok" aria-label="zrobione" />
  if (step.nav) return <span className="shrink-0 text-[12px] font-semibold tabular-nums text-ink-3">{step.nav}</span>
  return null
}

function Brand({ compact = false }) {
  return (
    <a href="#/plan" className="block">
      <div className={`font-slab font-bold leading-none tracking-[-0.02em] text-ink ${compact ? 'text-[20px]' : 'text-[27px]'}`}>Korki G1</div>
      {compact ? null : <div className="mt-1.5 text-[13px] leading-snug text-ink-3">Trener do egzaminu SEP G1<br />eksploatacja · dozór · pomiary</div>}
    </a>
  )
}

// „Zgłoś błąd” w stopce i menu: kontekstem jest bieżąca strona (pytania mają własne linki z ID)
const pageReport = (section, sub) => {
  const item = ITEMS.find((it) => it.id === section)
  return `Strona: ${item?.label ?? section}${sub ? ` (${sub})` : ''}`
}

function Sidebar({ section, meta, report }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[256px] shrink-0 flex-col overflow-y-auto px-4 py-7 lg:flex">
      <div className="px-2"><Brand /></div>
      <nav className="mt-7 space-y-5" aria-label="Sekcje">
        {GROUPS.map((g) => (
          <div key={g.id}>
            {g.label ? <div className="eyebrow mb-1.5 px-2">{g.label}</div> : null}
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = it.icon
                const active = it.id === section
                return (
                  <a
                    key={it.id}
                    href={`#/${it.id}`}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2.5 rounded-[4px] px-2 py-1.5 text-[15px] transition ${
                      active ? 'bg-paper font-semibold text-ink shadow-sheet' : 'text-ink-2 hover:bg-paper/60 hover:text-ink'
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-accent' : 'text-ink-3'}`} />
                    <span className="min-w-0 flex-1 truncate">{it.label}</span>
                    <NavMeta step={meta[it.id]} />
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-auto px-2 pt-8 text-[12px] leading-5 text-ink-3">
        <div className="mb-2"><ReportLink what={report} label="Zgłoś błąd na tej stronie" className="!text-[12px]" /></div>
        wersja {APP_VERSION} ({APP_STAGE.toLowerCase()})
        <br />
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">kod na GitHubie</a>
      </div>
    </aside>
  )
}

// Telefon: dolny pasek. „Zrozum” i „Utrwal” otwierają listę swoich sekcji.
const MOBILE_TABS = [
  { id: 'plan', label: 'Plan', icon: Compass, target: 'plan' },
  { id: 'zrozum', label: 'Zrozum', icon: Lightbulb },
  { id: 'utrwal', label: 'Utrwal', icon: Layers },
  { id: 'egzamin', label: 'Egzamin', icon: GraduationCap, target: 'egzamin' },
  { id: 'slowniczek', label: 'Słowniczek', icon: BookMarked, target: 'slowniczek' },
]

function MobileNav({ section, meta, navigate }) {
  const [open, setOpen] = useState(null)
  const current = ITEMS.find((it) => it.id === section)
  const openGroup = GROUPS.find((g) => g.id === open)

  useEffect(() => setOpen(null), [section])

  return (
    <>
      {openGroup ? (
        <>
          <div className="fixed inset-0 z-30 bg-ink/25 lg:hidden" onClick={() => setOpen(null)} />
          <div className="sheet fixed inset-x-3 bottom-[calc(68px+env(safe-area-inset-bottom))] z-40 p-2 lg:hidden">
            <div className="flex items-center justify-between px-2 pb-1 pt-1">
              <div className="eyebrow">{openGroup.label}</div>
              <button onClick={() => setOpen(null)} aria-label="Zamknij" className="p-1 text-ink-3"><X className="h-4 w-4" /></button>
            </div>
            {openGroup.items.map((it) => {
              const Icon = it.icon
              const active = it.id === section
              return (
                <a key={it.id} href={`#/${it.id}`} className={`flex items-center gap-3 rounded-[4px] px-2.5 py-2.5 ${active ? 'bg-accent-soft' : ''}`}>
                  <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : 'text-ink-3'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] font-semibold text-ink">{it.label}</span>
                    <span className="block text-[13px] text-ink-3">{it.sub}</span>
                  </span>
                  <NavMeta step={meta[it.id]} />
                </a>
              )
            })}
          </div>
        </>
      ) : null}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Sekcje">
        <div className="grid grid-cols-5">
          {MOBILE_TABS.map((t) => {
            const Icon = t.icon
            const active = t.target ? t.target === section : current?.group === t.id
            return (
              <button
                key={t.id}
                onClick={() => (t.target ? navigate(t.target) : setOpen(open === t.id ? null : t.id))}
                className={`flex flex-col items-center gap-0.5 pb-2 pt-2.5 text-[11.5px] font-semibold ${active || open === t.id ? 'text-accent' : 'text-ink-3'}`}
              >
                <Icon className="h-5 w-5" />
                {t.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

function MobileTopBar({ section }) {
  const current = ITEMS.find((it) => it.id === section)
  return (
    <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-rule bg-desk/90 px-4 py-2.5 backdrop-blur lg:hidden">
      <Brand compact />
      {current && current.id !== 'plan' ? <span className="truncate text-[14px] font-semibold text-ink-2">· {current.label}</span> : null}
    </div>
  )
}

function AppFooter({ report }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-rule-2 pt-4 text-[13px] leading-6 text-ink-3">
      <div className="flex flex-wrap gap-x-2 gap-y-0.5">
        <span className="font-semibold text-ink-2">Korki G1</span>
        <span>·</span>
        <span>© {year} Paweł Kikta</span>
        <span>·</span>
        <span>kod: MIT · treść: CC0</span>
        <span>·</span>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">GitHub</a>
      </div>
      <p className="mt-1">
        Pomoc do nauki, nie oficjalny materiał egzaminacyjny. Treść przygotował model AI (Claude) pod kierunkiem autora.
        Widzisz błąd? <ReportLink what={report} label="Zgłoś go" className="!text-[13px] font-semibold !text-ink-2" />
      </p>
      <details className="mt-1">
        <summary className="cursor-pointer font-semibold text-ink-2 hover:text-ink">Pełne zastrzeżenie</summary>
        <p className="mt-1 max-w-[80ch]">
          Materiał ma charakter wyłącznie pomocniczy i edukacyjny. Treść przygotował model AI (Claude) pod kierunkiem autora.
          Autor sprawdził ją z tekstami przepisów i wartościami z norm (m.in. PN-HD 60364), ale może zawierać błędy – nie jest
          oficjalnym materiałem egzaminacyjnym, źródłem prawa ani substytutem szkolenia z uprawnionym wykładowcą. To prywatny
          projekt autora, niezwiązany ze Stowarzyszeniem Elektryków Polskich (SEP) ani z żadną komisją kwalifikacyjną. Wartości
          i procedury upraszczamy na potrzeby nauki; przed przystąpieniem do egzaminu i do jakichkolwiek prac przy instalacjach
          elektrycznych kieruj się aktualnymi normami, przepisami oraz posiadanymi uprawnieniami. Autor nie ponosi
          odpowiedzialności za skutki wykorzystania informacji zawartych w aplikacji.
        </p>
      </details>
    </footer>
  )
}

export default function App() {
  const [{ section, sub }, navigate] = useHashRoute(SECTION_IDS, 'plan')
  const meta = useNavMeta()
  const report = pageReport(section, sub)

  // każda zmiana ekranu albo rozdziału zaczyna się od góry strony
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [section, sub])

  return (
    <div className="min-h-screen text-ink lg:flex">
      <Sidebar section={section} meta={meta} report={report} />
      <MobileTopBar section={section} />
      <main className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-8 lg:pb-12 lg:pt-9">
        <div className="mx-auto max-w-[980px] space-y-7">
          {section === 'plan' && <PlanPanel navigate={navigate} />}
          {section === 'podstawy' && <BasicsPanel />}
          {section === 'pomiary' && <TrainingPanel chapterNum={Number(sub) || 1} onChapter={(n) => navigate('pomiary', String(n))} />}
          {section === 'urzadzenia' && <DevicesPanel deviceId={sub} onDevice={(id) => navigate('urzadzenia', id)} />}
          {section === 'organizacja' && <OrgPanel />}
          {section === 'pierwsza-pomoc' && <FirstAidPanel />}
          {section === 'fiszki' && <FlashcardsPanel topicId={sub} onTopic={(t) => navigate('fiszki', t ?? '')} />}
          {section === 'test' && <QuizPanel topicId={sub} />}
          {section === 'egzamin' && <ExamPanel />}
          {section === 'sciaga' && <CheatsheetPanel />}
          {section === 'slowniczek' && <GlossaryPanel />}
          <AppFooter report={report} />
        </div>
      </main>
      <MobileNav section={section} meta={meta} navigate={navigate} />
    </div>
  )
}
