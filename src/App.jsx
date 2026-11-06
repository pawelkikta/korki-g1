import React, { useEffect, useState } from 'react'
import { Home, BookOpen, Layers, ListChecks, GraduationCap, Table2, Zap, BookMarked, ToggleRight, Waypoints, ShieldCheck, Moon, Sun } from 'lucide-react'
import { StartPanel } from './components/StartPanel.jsx'
import { TrainingPanel } from './components/TrainingPanel.jsx'
import { FlashcardsPanel } from './components/FlashcardsPanel.jsx'
import { QuizPanel } from './components/QuizPanel.jsx'
import { ExamPanel } from './components/ExamPanel.jsx'
import { CheatsheetPanel } from './components/CheatsheetPanel.jsx'
import { GlossaryPanel } from './components/GlossaryPanel.jsx'
import { DevicesPanel } from './components/DevicesPanel.jsx'
import { BasicsPanel } from './components/BasicsPanel.jsx'
import { OrgPanel } from './components/OrgPanel.jsx'
import { Chamfer } from './components/ui.jsx'
import { APP_VERSION, APP_STAGE, REPO_URL } from './version.js'
import { useStoredState } from './lib/storage.js'

const SECTIONS = [
  { id: 'start', short: 'Start', label: 'Przegląd i postęp', icon: Home },
  { id: 'podstawy', short: 'Skąd prąd', label: 'Fundament: L, N, PE', icon: Waypoints },
  { id: 'szkolenie', short: 'Szkolenie', label: 'Pomiary – 7 rozdziałów', icon: BookOpen },
  { id: 'urzadzenia', short: 'Urządzenia', label: 'Aparaty – jak działają', icon: ToggleRight },
  { id: 'organizacja', short: 'Organizacja pracy', label: 'BHP: polecenia, strefa, role', icon: ShieldCheck },
  { id: 'fiszki', short: 'Fiszki', label: '55 pytań – 4 rundy', icon: Layers },
  { id: 'test', short: 'Test ABCD', label: '50 pytań zamkniętych', icon: ListChecks },
  { id: 'egzamin', short: 'Egzamin', label: 'Próbny – 10 losowych', icon: GraduationCap },
  { id: 'sciaga', short: 'Ściąga', label: 'Wartości graniczne', icon: Table2 },
  { id: 'slowniczek', short: 'Słowniczek', label: 'Pojęcia, urządzenia, skróty', icon: BookMarked },
]

function ThemeToggle({ theme, setTheme }) {
  const dark = theme === 'dark'
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
      className="cham-sm edge inline-flex shrink-0 items-center gap-1.5 bg-[color:var(--b-f3f6f4)] px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-700 transition hover:text-gray-900"
      style={{ '--e': 'var(--c-d7ded9)' }}
    >
      {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {dark ? 'Tryb jasny' : 'Tryb ciemny'}
    </button>
  )
}

function AppHeader({ theme, setTheme }) {
  return (
    <Chamfer size="lg">
      <header>
        <div className="h-1.5 bg-[color:var(--b-1a5c46)]" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-[color:var(--c-14543e)]">
              <Zap className="h-3.5 w-3.5" /> Eksploatacja + Dozór + Pomiary
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">Korki&nbsp;G1</h1>
            <span className="cham-sm edge bg-[color:var(--b-1a5c46)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white" style={{ '--e': 'var(--c-0f4030)' }}>
              {APP_STAGE} · v{APP_VERSION}
            </span>
          </div>
          <p className="mt-3 max-w-5xl text-[15px] leading-6 text-gray-600">
            Interaktywne przygotowanie do egzaminu kwalifikacyjnego SEP G1. Postęp nauki zapisuje się w przeglądarce.
          </p>
          <div className="mt-4 grid max-w-5xl gap-2 sm:grid-cols-3">
            <div className="cham edge bg-[color:var(--b-f3f6f4)] px-3 py-2.5" style={{ '--e': 'var(--c-d7ded9)' }}>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">Szkolenie + Urządzenia</div>
              <div className="mt-0.5 text-[12.5px] leading-5 text-gray-600">Teoria i symulacje skupione na <span className="font-semibold text-gray-800">pomiarach</span> (zakres kontrolno-pomiarowy).</div>
            </div>
            <div className="cham edge bg-[color:var(--b-f3f6f4)] px-3 py-2.5" style={{ '--e': 'var(--c-d7ded9)' }}>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">Organizacja pracy</div>
              <div className="mt-0.5 text-[12.5px] leading-5 text-gray-600">Teoria i symulacje z <span className="font-semibold text-gray-800">BHP i dozoru</span>: polecenia, strefa pracy, osoby funkcyjne.</div>
            </div>
            <div className="cham edge bg-[color:var(--b-f3f6f4)] px-3 py-2.5" style={{ '--e': 'var(--c-d7ded9)' }}>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--c-14543e)]">Fiszki · Test · Egzamin</div>
              <div className="mt-0.5 text-[12.5px] leading-5 text-gray-600">Pełny zakres G1: <span className="font-semibold text-gray-800">eksploatacja, dozór, BHP</span> i pomiary.</div>
            </div>
          </div>
        </div>
      </header>
    </Chamfer>
  )
}

function Sidebar({ section, setSection }) {
  return (
    <Chamfer size="lg" className="lg:sticky lg:top-6">
      <aside className="p-3">
        <div className="border-b border-[color:var(--c-e3e8e5)] pb-3">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--c-14543e)]">Tryby nauki</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5 lg:grid-cols-1">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon
            const active = s.id === section
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                style={{ '--e': active ? 'var(--c-1a5c46)' : 'var(--c-e3e8e5)' }}
                className={`cham edge px-3 py-3 text-left transition ${
                  active
                    ? 'bg-[color:var(--b-e7f0eb)] text-gray-900'
                    : 'bg-[color:var(--b-fafbfa)] text-gray-500 hover:bg-[color:var(--b-eef3f0)] hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="cham-sm edge flex h-8 w-8 shrink-0 items-center justify-center bg-[color:var(--b-f3f6f4)]" style={{ '--e': 'var(--c-d7ded9)' }}>
                    <Icon className={`h-4 w-4 ${active ? 'text-[color:var(--c-14543e)]' : ''}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400">{String(i + 1).padStart(2, '0')}</div>
                    <div className="text-[13px] font-bold tracking-tight">{s.short}</div>
                    <div className="mt-0.5 hidden truncate text-[11px] text-gray-500 lg:block">{s.label}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </Chamfer>
  )
}

export default function App() {
  const [section, setSection] = useState('start')
  // motyw: ciemny domyślnie, jasny z wyboru użytkownika (klasa .dark na <html>, kolory w theme.css)
  const [theme, setTheme] = useStoredState('theme', 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,var(--c-dde2e3)_0%,var(--c-e7ebec)_45%,var(--c-dde2e3)_100%)] p-4 text-gray-900 md:p-6">
      <div className="mx-auto max-w-[1560px] space-y-6">
        <AppHeader theme={theme} setTheme={setTheme} />
        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
          <Sidebar section={section} setSection={setSection} />
          <div className="min-w-0 space-y-6">
            {section === 'start' && <StartPanel goTo={setSection} />}
            {section === 'podstawy' && <BasicsPanel />}
            {section === 'szkolenie' && <TrainingPanel />}
            {section === 'urzadzenia' && <DevicesPanel />}
            {section === 'organizacja' && <OrgPanel />}
            {section === 'fiszki' && <FlashcardsPanel />}
            {section === 'test' && <QuizPanel />}
            {section === 'egzamin' && <ExamPanel />}
            {section === 'sciaga' && <CheatsheetPanel />}
            {section === 'slowniczek' && <GlossaryPanel />}
          </div>
        </div>
        <AppFooter />
      </div>
    </main>
  )
}

function AppFooter() {
  const year = new Date().getFullYear()
  return (
    <Chamfer size="lg">
      <footer className="px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-gray-800">
          <Zap className="h-3.5 w-3.5 text-[color:var(--c-1a5c46)]" />
          <span>Korki G1</span>
          <span className="text-gray-400">·</span>
          <span>© {year} Paweł Kikta</span>
          <span className="text-gray-400">·</span>
          <span className="font-normal text-gray-500">kod: MIT · treść: CC0</span>
          <span className="text-gray-400">·</span>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-normal text-[color:var(--c-14543e)] underline underline-offset-2 hover:text-gray-900">
            GitHub
          </a>
          <span className="text-gray-400">·</span>
          <span className="font-mono text-[11px] font-medium text-[color:var(--c-14543e)]">wersja {APP_VERSION} ({APP_STAGE.toLowerCase()})</span>
        </div>
        <p className="mt-2 max-w-4xl text-[12px] leading-5 text-gray-500">
          <span className="font-semibold text-gray-600">Zastrzeżenie:</span> Materiał ma charakter wyłącznie pomocniczy
          i edukacyjny. Treść przygotował model AI (Claude) pod kierunkiem autora. Autor sprawdził ją z tekstami przepisów
          i wartościami z norm (m.in. PN-HD 60364), ale może zawierać błędy – nie jest oficjalnym materiałem egzaminacyjnym, źródłem prawa
          ani substytutem szkolenia z uprawnionym wykładowcą. To prywatny projekt autora, niezwiązany ze Stowarzyszeniem
          Elektryków Polskich (SEP) ani z żadną komisją kwalifikacyjną. Wartości i procedury upraszczamy na potrzeby nauki;
          przed przystąpieniem do egzaminu i do jakichkolwiek prac przy instalacjach elektrycznych kieruj się aktualnymi
          normami, przepisami oraz posiadanymi uprawnieniami. Autor nie ponosi odpowiedzialności za skutki wykorzystania
          informacji zawartych w aplikacji.
        </p>
      </footer>
    </Chamfer>
  )
}
