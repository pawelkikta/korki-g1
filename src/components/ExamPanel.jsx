import React, { useEffect, useMemo, useState } from 'react'
import { Eye, Check, RotateCcw, GraduationCap, Zap, MessageCircleQuestion, ChevronRight } from 'lucide-react'
import { questions } from '../data/questions.js'
import { coach } from '../data/examCoach.js'
import { AREAS } from '../data/areas.js'
import { useStoredState, loadStored } from '../lib/storage.js'
import { Badge, Button, NoteBox, PageHeader, ProgressBar, Tag } from './ui.jsx'
import { Checklist } from './Coach.jsx'

const EXAM_SIZE = 10


function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function drawExam() {
  // losowanie ważone: „do powtórki" ×4, nowe ×2, opanowane ×1
  const progress = loadStored('flash', {})
  const weightOf = (q) => (progress[q.id] === 'review' ? 4 : progress[q.id] === 'know' ? 1 : 2)
  const pickWeighted = (pool, used) => {
    const bag = pool.filter((q) => !used.has(q.id)).flatMap((q) => Array(weightOf(q)).fill(q))
    return bag.length ? bag[Math.floor(Math.random() * bag.length)] : null
  }
  const used = new Set()
  const picked = []
  for (const area of AREAS) {
    const q = pickWeighted(questions.filter((x) => area.cats.includes(x.category)), used)
    if (q) { used.add(q.id); picked.push(q) }
  }
  while (picked.length < EXAM_SIZE && used.size < questions.length) {
    const q = pickWeighted(questions, used)
    if (!q) break
    used.add(q.id)
    picked.push(q)
  }
  // do każdego pytania jedno losowe dopytanie
  return shuffle(picked).map((q) => {
    const f = coach[q.id]?.followUps ?? []
    return { ...q, followUp: f.length ? f[Math.floor(Math.random() * f.length)] : null }
  })
}

export function ExamPanel() {
  const [running, setRunning] = useState(false)
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('ask') // ask → check → follow → followShown
  const [checked, setChecked] = useState({})
  const [results, setResults] = useState({}) // qid -> { ok, said, total, follow }
  const [history, setHistory] = useStoredState('examHistory', [])
  const [, setProgress] = useStoredState('flash', {})

  const exam = useMemo(() => (running ? drawExam() : []), [running, seed]) // eslint-disable-line react-hooks/exhaustive-deps
  const card = exam[index]
  const items = card ? coach[card.id]?.checklist ?? [] : []
  const said = items.filter((_, i) => checked[i]).length
  const answeredCount = Object.keys(results).length
  const score = Object.values(results).filter((r) => r.ok).length
  const done = running && answeredCount === exam.length && exam.length > 0

  // nowe pytanie zaczyna się od góry – po dopytaniu jesteś na dole poprzedniego
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index, running, done])

  const start = () => {
    setSeed((s) => s + 1)
    setRunning(true)
    setIndex(0)
    setPhase('ask')
    setChecked({})
    setResults({})
  }

  const grade = (followOk) => {
    const ok = said === items.length && followOk
    const next = { ...results, [card.id]: { ok, said, total: items.length, follow: followOk } }
    setResults(next)
    // niezaliczone pytanie trafia do powtórki w fiszkach
    if (!ok) setProgress((p) => ({ ...p, [card.id]: 'review' }))
    setChecked({})
    setPhase('ask')
    if (index < exam.length - 1) {
      setIndex((i) => i + 1)
    } else {
      const finalScore = Object.values(next).filter((r) => r.ok).length
      setHistory((h) => [...h.slice(-9), { score: finalScore, total: exam.length, date: new Date().toISOString().slice(0, 10) }])
    }
  }

  if (!running || done) {
    const failed = done ? exam.filter((q) => !results[q.id]?.ok) : []
    return (
      <div className="space-y-7">
        <PageHeader
          eyebrow="Sprawdź · symulacja komisji"
          title="Egzamin próbny"
          lead={`${EXAM_SIZE} pytań ze wszystkich obszarów (BHP, dozór, pomiary, eksploatacja) – częściej te, których jeszcze nie opanowałeś. Odpowiadasz na głos, zaznaczasz, które kluczowe elementy padły, a potem komisja dopytuje. Pytanie jest zaliczone tylko wtedy, gdy padły wszystkie elementy i obroniłeś się przy dopytaniu.`}
          meta={history.length ? `ostatnio ${history[history.length - 1].score}/${history[history.length - 1].total}` : 'brak podejść'}
        />

        <section className="sheet relative z-[1] px-5 py-5 md:px-7 md:py-6">
          {done ? (
            <div className="mb-5 space-y-4">
              <NoteBox type={score >= 8 ? 'ok' : 'mistake'} title={`Wynik: ${score}/${exam.length}`}>
                {score >= 8
                  ? 'Tak trzymaj. Na prawdziwym egzaminie komisja oczekuje pewnych, pełnych odpowiedzi i spokoju przy dopytaniach.'
                  : 'Pytania niezaliczone trafiły do fiszek z oznaczeniem „do powtórki". Przejdź je, a potem podejdź do egzaminu jeszcze raz.'}
              </NoteBox>
              {failed.length ? (
                <div>
                  <div className="eyebrow mb-2">Do poprawki</div>
                  <ul className="divide-y divide-rule">
                    {failed.map((q) => {
                      const r = results[q.id]
                      return (
                        <li key={q.id} className="py-2.5">
                          <div className="font-serif text-[16px] font-semibold leading-[1.45] text-ink">{q.question}</div>
                          <div className="mt-0.5 text-[13.5px] text-red-ink">
                            {r.said < r.total ? `Brakowało kluczowych elementów: ${r.said}/${r.total}. ` : ''}
                            {!r.follow ? 'Nie obroniłeś się przy dopytaniu.' : ''}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={start}><GraduationCap className="mr-2 h-4 w-4" /> {done ? 'Jeszcze raz' : 'Rozpocznij egzamin'}</Button>
            {history.length > 1 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[13px] text-ink-3">Historia:</span>
                {history.map((h, i) => (
                  <Tag key={i} tone={h.score / h.total >= 0.8 ? 'green' : 'red'}>{h.score}/{h.total}</Tag>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <section className="sheet relative z-[1] overflow-hidden px-5 py-5 md:px-7 md:py-6">
        {card.trap ? <div className="absolute inset-y-0 left-0 w-1 bg-red-ink" /> : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Egzamin · pytanie {index + 1} z {exam.length}</span>
          <Tag>{card.category}</Tag>
          {card.trap ? <Tag tone="red"><Zap className="mr-1 h-3 w-3" /> Podchwytliwe</Tag> : null}
          <span className="ml-auto"><Badge tone="ok">zaliczone: {score}</Badge></span>
        </div>
        <div className="mt-3"><ProgressBar value={answeredCount} max={exam.length} /></div>
        <div className="mt-5 min-h-[64px] font-serif text-[21px] font-semibold leading-[1.4] text-ink md:text-[23px]">{card.question}</div>

        {phase === 'ask' ? (
          <div className="mt-5 rounded-[4px] border-2 border-dashed border-rule-2 bg-paper-2 px-4 py-8 text-center">
            <div className="text-[15px] font-semibold text-ink-2">Odpowiedz na głos, pełnym zdaniem – dopiero wtedy odsłoń</div>
            <Button className="mt-4" onClick={() => setPhase('check')}><Eye className="mr-2 h-4 w-4" /> Odpowiedziałem – pokaż kluczowe elementy</Button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <Checklist
              items={items}
              checked={checked}
              onToggle={(i) => setChecked((c) => ({ ...c, [i]: !c[i] }))}
              disabled={phase !== 'check'}
              keys={false}
            />
            <div className="rounded-[3px] bg-paper-2 px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--rule)]">
              <div className="eyebrow">Wzorcowa odpowiedź</div>
              <div className="mt-1.5 font-serif text-[16.5px] leading-[1.65] text-ink">{card.answer}</div>
            </div>
            {card.trap && phase === 'check' ? <NoteBox type="trap" title="Pułapka">{card.trap}</NoteBox> : null}

            {phase === 'check' ? (
              card.followUp ? (
                <Button onClick={() => setPhase('follow')}>
                  Dalej – komisja dopytuje <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => grade(true)}>Zatwierdź odpowiedź</Button>
              )
            ) : null}

            {phase === 'follow' || phase === 'followShown' ? (
              <div className="rounded-r-[3px] border-l-[3px] border-accent bg-accent-soft px-4 py-3.5">
                <div className="eyebrow flex items-center gap-1.5 !text-accent-ink">
                  <MessageCircleQuestion className="h-3.5 w-3.5" /> Komisja dopytuje
                </div>
                <div className="mt-1.5 font-serif text-[18px] font-semibold leading-[1.45] text-ink">{card.followUp.q}</div>
                {phase === 'follow' ? (
                  <Button className="mt-3" variant="secondary" onClick={() => setPhase('followShown')}>
                    <Eye className="mr-2 h-4 w-4" /> Odpowiedziałem – pokaż wzorzec
                  </Button>
                ) : (
                  <>
                    <div className="mt-2 rounded-[3px] bg-paper px-3.5 py-2.5 font-serif text-[15.5px] leading-[1.6] text-ink shadow-[inset_0_0_0_1px_var(--rule)]">{card.followUp.a}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button variant="ok" onClick={() => grade(true)}>
                        <Check className="mr-1 h-4 w-4" /> Obroniłem się
                      </Button>
                      <Button variant="danger" onClick={() => grade(false)}>
                        <RotateCcw className="mr-1 h-4 w-4" /> Nie umiałem
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        )}
      </section>
    </div>
  )
}
