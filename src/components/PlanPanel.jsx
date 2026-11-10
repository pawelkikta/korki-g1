import React from 'react'
import { ArrowRight, Check, Circle, CircleDot, RotateCcw } from 'lucide-react'
import { readProgress, learningPath } from '../lib/progress.js'
import { plural } from '../lib/plural.js'
import { PageHeader, NoteBox, ProgressBar, Button } from './ui.jsx'

// Ekran „Plan” – odpowiada na dwa pytania: co teraz zrobić i czy jestem gotowy do egzaminu.
// Liczby czyta z localStorage przy każdym renderze; App renderuje go ponownie po zapisie postępu.

const STATUS_ICON = {
  done: <Check className="h-4 w-4 text-ok" aria-label="zrobione" />,
  progress: <CircleDot className="h-4 w-4 text-accent" aria-label="w toku" />,
  todo: <Circle className="h-4 w-4 text-ink-3" aria-label="nie zaczęte" />,
  none: <Circle className="h-4 w-4 text-rule-2" aria-hidden="true" />,
}

export function PlanPanel({ navigate }) {
  const p = readProgress()
  const path = learningPath(p)
  const fresh = path.every((s) => s.status === 'todo' || s.status === 'none')
  const next = path.find((s) => s.status === 'todo' || s.status === 'progress')
  const groups = ['Zrozum', 'Utrwal', 'Sprawdź']

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Plan nauki"
        title={fresh ? 'Zacznij od fundamentu' : next ? 'Następny krok' : 'Wszystko przerobione'}
        lead={
          fresh
            ? 'Egzamin SEP G1 to rozmowa z komisją: oceniają rozumienie, nie regułki. Apka prowadzi w trzech krokach: najpierw zrozum (teoria i symulacje), potem utrwal (fiszki, test, ściąga), na końcu sprawdź się na egzaminie próbnym.'
            : null
        }
      />

      {/* jeden główny ruch */}
      {next ? (
        <button
          onClick={() => navigate(...next.target)}
          className="sheet group relative z-[1] flex w-full items-center gap-4 overflow-hidden px-5 py-5 text-left transition hover:-translate-y-px md:px-7 md:py-6"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-accent" />
          <div className="min-w-0 flex-1">
            <div className="eyebrow !text-accent-ink">{fresh ? 'Zacznij tutaj' : 'Kontynuuj'} · {next.group}</div>
            <div className="mt-1 font-slab text-[23px] font-semibold leading-snug text-ink md:text-[26px]">{next.title}</div>
            {next.next ? <div className="mt-1 text-[15px] font-semibold text-ink-2">{next.next}</div> : null}
            <p className="mt-1.5 max-w-[60ch] font-serif text-[16px] leading-[1.55] text-ink-2">{next.desc}</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition group-hover:bg-accent-hover">
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      ) : (
        <NoteBox type="ok" title="Cała ścieżka zaliczona">
          Podchodź do egzaminu próbnego i wracaj do ściągi. Każde niezaliczone pytanie trafia do fiszek „do powtórki”.
        </NoteBox>
      )}

      {p.review > 0 || p.quizToFix > 0 ? (
        <div className="flex flex-wrap items-center gap-3 rounded-[3px] border-l-[3px] border-red-ink bg-red-soft px-4 py-3">
          <div className="min-w-0 flex-1 text-[15px] text-ink">
            <span className="font-semibold">Do powtórki: {[
              p.review ? `${p.review} ${plural(p.review, 'fiszka', 'fiszki', 'fiszek')}` : null,
              p.quizToFix ? `${p.quizToFix} ${plural(p.quizToFix, 'pytanie', 'pytania', 'pytań')} z testu` : null,
            ].filter(Boolean).join(' i ')}.</span>{' '}
            <span className="text-ink-2">Najlepiej powtórzyć je, zanim zaczniesz nowy materiał.</span>
          </div>
          {p.review ? <Button variant="secondary" onClick={() => navigate('fiszki')}><RotateCcw className="mr-1.5 h-4 w-4" /> Fiszki</Button> : null}
          {p.quizToFix ? <Button variant="secondary" onClick={() => navigate('test')}><RotateCcw className="mr-1.5 h-4 w-4" /> Test</Button> : null}
        </div>
      ) : null}

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* ścieżka */}
        <section className="sheet relative z-[1] px-5 py-5 md:px-7 md:py-6">
          <h2 className="font-slab text-[20px] font-semibold text-ink">Ścieżka</h2>
          <div className="mt-3 space-y-5">
            {groups.map((g) => (
              <div key={g}>
                <div className="eyebrow mb-1">{g}</div>
                <ol>
                  {path.filter((s) => s.group === g).map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => navigate(...s.target)}
                        className={`flex w-full items-center gap-3 rounded-[3px] px-2 py-2 text-left transition hover:bg-paper-2 ${next?.id === s.id ? 'bg-accent-soft hover:bg-accent-soft' : ''}`}
                      >
                        <span className="shrink-0">{STATUS_ICON[s.status]}</span>
                        <span className={`min-w-0 flex-1 text-[15.5px] ${s.status === 'done' ? 'text-ink-2' : 'font-semibold text-ink'}`}>{s.title}</span>
                        <span className="shrink-0 text-right text-[13px] tabular-nums text-ink-3">{s.meta}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* gotowość */}
        <section className="sheet relative z-[1] px-5 py-5 md:px-7 md:py-6">
          <h2 className="font-slab text-[20px] font-semibold text-ink">Gotowość do egzaminu</h2>
          <p className="mt-1 text-[13.5px] leading-5 text-ink-3">Udział fiszek opanowanych w każdym obszarze egzaminu.</p>
          <div className="mt-4 space-y-3.5">
            {p.areas.map((a) => (
              <div key={a.label}>
                <div className="flex items-baseline justify-between gap-3 text-[14.5px]">
                  <span className="font-semibold text-ink">{a.label}</span>
                  <span className="tabular-nums text-ink-2">
                    {a.known}/{a.total}
                    {a.review ? <span className="text-red-ink"> · {a.review} do powtórki</span> : null}
                  </span>
                </div>
                <div className="mt-1.5"><ProgressBar value={a.known} max={a.total} tone={a.known === a.total ? 'green' : 'amber'} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-rule pt-4 text-[14px]">
            <div>
              <div className="eyebrow">Egzamin próbny</div>
              <div className="mt-1 font-mono text-[19px] font-bold tabular-nums text-ink">{p.lastExam ? `${p.lastExam.score}/${p.lastExam.total}` : '–'}</div>
              <div className="text-[12.5px] text-ink-3">{p.examCount ? `ostatnie z ${p.examCount} podejść` : 'bez podejścia'}</div>
            </div>
            <div>
              <div className="eyebrow">Test ABCD</div>
              <div className="mt-1 font-mono text-[19px] font-bold tabular-nums text-ink">{p.quizBest ? `${p.quizBest.score}/${p.quizBest.total}` : '–'}</div>
              <div className="text-[12.5px] text-ink-3">{p.quizBest ? 'najlepszy wynik' : 'bez podejścia'}</div>
            </div>
          </div>
        </section>
      </div>

      <NoteBox type="remember" title="Strategia na egzamin">
        Komisja ocenia rozumienie, nie numerację norm. Wystarczy „zgodnie z normą instalacji elektrycznych PN-HD 60364".
        Ale liczby ze ściągi (1 MΩ, 500 V DC, 200 mA, 30 mA, 0,4 s...) musisz znać na pamięć – przy zakresie kontrolno-pomiarowym pytają szczegółowo.
      </NoteBox>
    </div>
  )
}
