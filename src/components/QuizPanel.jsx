import React, { useMemo, useState } from 'react'
import { Check, X, RotateCcw, Play } from 'lucide-react'
import { quiz } from '../data/quiz.js'
import { useStoredState } from '../lib/storage.js'
import { Button, SectionFrame, NoteBox, Tag, ProgressBar } from './ui.jsx'

function shuffle(arr, rng = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LETTERS = ['A', 'B', 'C', 'D']
const BATCH = 10

export function QuizPanel() {
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState({}) // qid -> wybrany index (w potasowanej kolejności)
  const [finished, setFinished] = useState(false)
  const [customBatch, setCustomBatch] = useState(null) // partia "powtórz błędne"
  const [best, setBest] = useStoredState('quizBest', null)

  // Partia 10 losowych pytań z potasowanymi odpowiedziami
  const randomBatch = useMemo(() => {
    return shuffle(quiz).slice(0, BATCH).map((q) => {
      const order = shuffle(q.options.map((_, i) => i))
      return { ...q, order }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  const batch = customBatch ?? randomBatch
  const total = batch.length

  const answered = Object.keys(answers).filter((id) => batch.some((q) => q.id === id)).length
  const score = batch.reduce((acc, q) => {
    const picked = answers[q.id]
    return acc + (picked != null && q.order[picked] === q.correct ? 1 : 0)
  }, 0)

  const wrongQuestions = batch.filter((q) => answers[q.id] != null && q.order[answers[q.id]] !== q.correct)

  const finish = () => {
    setFinished(true)
    // rekord liczymy tylko dla pełnych losowych partii, nie dla powtórek błędnych
    if (!customBatch && (!best || score > best.score)) setBest({ score, total, date: new Date().toISOString().slice(0, 10) })
  }

  const restart = () => {
    setCustomBatch(null)
    setSeed((s) => s + 1)
    setAnswers({})
    setFinished(false)
  }

  const retryWrong = () => {
    // nowa partia tylko z błędnych pytań, z przetasowanymi odpowiedziami
    setCustomBatch(wrongQuestions.map((q) => ({ ...q, order: shuffle(q.options.map((_, i) => i)) })))
    setAnswers({})
    setFinished(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Tryb 04"
        title={customBatch ? `Powtórka błędnych – ${total} ${total === 1 ? 'pytanie' : 'pytania(-ań)'}` : 'Test ABCD – 10 losowych pytań'}
        subtitle={customBatch
          ? 'Te pytania poszły źle w poprzedniej partii. Odpowiedzi są przetasowane – nie zapamiętuj litery, zapamiętaj treść.'
          : 'Pytania zamknięte wygenerowane z materiału egzaminacyjnego. Dystraktory to typowe błędne odpowiedzi z egzaminów – uważaj na pułapki.'}
        badge={best ? `rekord: ${best.score}/${best.total}` : 'pierwsze podejście'}
        accent={customBatch ? 'var(--c-c03538)' : 'var(--c-1a5c46)'}
      >
        <div className="flex items-center gap-4">
          <div className="flex-1"><ProgressBar value={answered} max={total} /></div>
          <div className="font-mono text-xs text-gray-600">{answered}/{total}</div>
          {finished ? (
            <Button onClick={restart}><RotateCcw className="mr-1 h-4 w-4" /> Nowa partia</Button>
          ) : (
            <Button onClick={finish} disabled={answered < total}><Play className="mr-1 h-4 w-4" /> Zakończ</Button>
          )}
        </div>
        {finished ? (
          <div className="mt-4 space-y-3">
            <NoteBox type={score === total ? 'remember' : score >= total * 0.8 ? 'remember' : 'mistake'} title={`Wynik: ${score}/${total}`}>
              {score === total
                ? 'Komplet! Jesteś gotowy na ten zakres – przejdź do egzaminu próbnego.'
                : score >= total * 0.8
                ? 'Dobry wynik. Poniżej podsumowanie błędów – domknij je powtórką.'
                : 'Wróć do szkolenia i fiszek – poniżej widzisz, gdzie uciekły punkty.'}
            </NoteBox>
            {wrongQuestions.length > 0 ? (
              <div className="border border-[color:var(--c-e5b8b4)] bg-[color:var(--b-fdf0ee)] p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-b3261e)]">
                  Do poprawki: {wrongQuestions.length} {wrongQuestions.length === 1 ? 'pytanie' : 'pytania(-ań)'}
                </div>
                <ul className="mt-2 space-y-1.5">
                  {wrongQuestions.map((q) => (
                    <li key={q.id} className="text-[13px] leading-5 text-gray-800">
                      <span className="text-gray-600">{q.question}</span>{' '}
                      <span className="font-semibold text-[color:var(--c-14543e)]">→ {q.options[q.correct]}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Button variant="danger" onClick={retryWrong}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Powtórz tylko błędne ({wrongQuestions.length})
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </SectionFrame>

      {batch.map((q, qi) => {
        const picked = answers[q.id]
        const isAnswered = picked != null
        return (
          <SectionFrame key={q.id} tag={`Pytanie ${qi + 1}`} title={q.category} accent={isAnswered ? (q.order[picked] === q.correct ? 'var(--c-1f7a4d)' : 'var(--c-c03538)') : 'var(--c-1a5c46)'}>
            <div className="text-base font-semibold leading-6 text-gray-900">{q.question}</div>
            <div className="mt-3 grid gap-2">
              {q.order.map((optIdx, i) => {
                const isPicked = picked === i
                const isCorrect = optIdx === q.correct
                let cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-700 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-900'
                if (isAnswered) {
                  if (isCorrect) cls = 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]'
                  else if (isPicked) cls = 'border-[color:var(--c-c03538)] bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)]'
                  else cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-400'
                }
                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                    className={`flex items-start gap-3 border px-3 py-2.5 text-left text-sm leading-5 transition disabled:cursor-default ${cls}`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-current font-mono text-[10px] font-bold">{LETTERS[i]}</span>
                    <span className="flex-1">{q.options[optIdx]}</span>
                    {isAnswered && isCorrect ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                    {isAnswered && isPicked && !isCorrect ? <X className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                  </button>
                )
              })}
            </div>
            {isAnswered ? (
              <div className="mt-3">
                <NoteBox type={q.order[picked] === q.correct ? 'remember' : 'mistake'} title={q.order[picked] === q.correct ? 'Dobrze' : 'Niestety nie'}>
                  {q.explain}
                </NoteBox>
              </div>
            ) : null}
          </SectionFrame>
        )
      })}

      <div className="flex justify-end gap-2">
        {!finished ? <Tag>Odpowiedz na wszystkie pytania, potem „Zakończ"</Tag> : null}
      </div>
    </div>
  )
}
