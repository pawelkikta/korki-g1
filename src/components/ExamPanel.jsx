import React, { useMemo, useState } from 'react'
import { Eye, Check, RotateCcw, GraduationCap, Zap, MessageCircleQuestion, ChevronRight } from 'lucide-react'
import { questions } from '../data/questions.js'
import { coach } from '../data/examCoach.js'
import { useStoredState, loadStored } from '../lib/storage.js'
import { Button, SectionFrame, NoteBox, Tag, ProgressBar } from './ui.jsx'
import { Checklist } from './Coach.jsx'

const EXAM_SIZE = 10

// Obszary egzaminu – z każdego co najmniej jedno pytanie, jak na prawdziwej komisji
const AREAS = [
  { label: 'BHP i pierwsza pomoc', cats: ['BHP', 'Pierwsza pomoc'] },
  { label: 'Dozór i organizacja pracy', cats: ['Dozór'] },
  { label: 'Pomiary', cats: ['Pomiary'] },
  { label: 'Eksploatacja', cats: ['Eksploatacja'] },
]

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
      <div className="space-y-6">
        <SectionFrame
          tag="Tryb 05"
          title="Egzamin próbny – symulacja komisji"
          subtitle={`${EXAM_SIZE} pytań ze wszystkich obszarów (BHP, dozór, pomiary, eksploatacja) – częściej te, których jeszcze nie opanowałeś. Odpowiadasz na głos, zaznaczasz, które kluczowe elementy padły, a potem komisja dopytuje. Pytanie jest zaliczone tylko wtedy, gdy padły wszystkie elementy i obroniłeś się przy dopytaniu.`}
          badge={history.length ? `ostatnio: ${history[history.length - 1].score}/${history[history.length - 1].total}` : 'brak podejść'}
        >
          {done ? (
            <div className="space-y-4">
              <NoteBox type={score >= 8 ? 'remember' : 'mistake'} title={`Wynik: ${score}/${exam.length}`}>
                {score >= 8
                  ? 'Tak trzymaj. Na prawdziwym egzaminie komisja oczekuje pewnych, pełnych odpowiedzi i spokoju przy dopytaniach.'
                  : 'Pytania niezaliczone trafiły do fiszek z oznaczeniem „do powtórki". Przejdź je, a potem podejdź do egzaminu jeszcze raz.'}
              </NoteBox>
              {failed.length ? (
                <div className="space-y-1.5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">Do poprawki</div>
                  {failed.map((q) => {
                    const r = results[q.id]
                    return (
                      <div key={q.id} className="border border-[color:var(--c-e5b8b4)] bg-[color:var(--b-fdf0ee)] px-3 py-2 text-[13px] leading-5">
                        <div className="font-semibold text-gray-900">{q.question}</div>
                        <div className="mt-0.5 text-[12px] text-[color:var(--c-b3261e)]">
                          {r.said < r.total ? `Brakowało kluczowych elementów: ${r.said}/${r.total}. ` : ''}
                          {!r.follow ? 'Nie obroniłeś się przy dopytaniu.' : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={start}><GraduationCap className="mr-2 h-4 w-4" /> {done ? 'Jeszcze raz' : 'Rozpocznij egzamin'}</Button>
            {history.length > 1 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {history.map((h, i) => (
                  <Tag key={i} tone={h.score / h.total >= 0.8 ? 'green' : 'red'}>{h.score}/{h.total}</Tag>
                ))}
              </div>
            ) : null}
          </div>
        </SectionFrame>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionFrame
        tag={`Egzamin – pytanie ${index + 1} / ${exam.length}`}
        title={card.category}
        accent={card.trap ? 'var(--c-c03538)' : 'var(--c-1a5c46)'}
        badge={`zaliczone: ${score}`}
      >
        <div className="mb-3"><ProgressBar value={answeredCount} max={exam.length} /></div>
        {card.trap ? <Tag tone="red"><span className="inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Podchwytliwe</span></Tag> : null}
        <div className="mt-3 min-h-[72px] text-lg font-semibold leading-7 text-gray-900">{card.question}</div>

        {phase === 'ask' ? (
          <div className="mt-4 border border-dashed border-[color:var(--c-b9c4bd)] bg-[color:var(--b-f6f8f7)] px-4 py-8 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Odpowiedz na głos, pełnym zdaniem – dopiero wtedy odsłoń</div>
            <Button className="mt-4" onClick={() => setPhase('check')}><Eye className="mr-2 h-4 w-4" /> Pokaż wzorcową odpowiedź</Button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--c-14543e)]">Wzorcowa odpowiedź</div>
              <div className="mt-2 text-sm leading-6 text-gray-800">{card.answer}</div>
            </div>
            <Checklist
              items={items}
              checked={checked}
              onToggle={(i) => setChecked((c) => ({ ...c, [i]: !c[i] }))}
              disabled={phase !== 'check'}
              keys={false}
            />
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
              <div className="cham edge bg-[color:var(--b-ffffff)] px-3.5 py-3" style={{ '--e': 'var(--c-1a5c46)' }}>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-14543e)]">
                  <MessageCircleQuestion className="h-3.5 w-3.5" /> Komisja dopytuje
                </div>
                <div className="mt-2 text-[15px] font-semibold leading-6 text-gray-900">{card.followUp.q}</div>
                {phase === 'follow' ? (
                  <Button className="mt-3" variant="secondary" onClick={() => setPhase('followShown')}>
                    <Eye className="mr-2 h-4 w-4" /> Odpowiedziałem – pokaż wzorzec
                  </Button>
                ) : (
                  <>
                    <div className="mt-2 border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)] px-3 py-2 text-[13px] leading-6 text-gray-800">{card.followUp.a}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button onClick={() => grade(true)} className="!bg-[color:var(--b-1f7a4d)] hover:!bg-[color:var(--b-27915d)]">
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
      </SectionFrame>
    </div>
  )
}
