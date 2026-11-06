import React, { useMemo, useState } from 'react'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { chapterQuiz } from '../data/chapterQuiz.js'
import { Button, NoteBox } from './ui.jsx'

// „Sprawdź się" – 3 pytania po rozdziale (retrieval practice).
// Komplet poprawnych = rozdział zaliczony (zapis przez onPassed w TrainingPanel).

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LETTERS = ['A', 'B', 'C', 'D']

export function ChapterCheck({ chapterId, passed, onPassed }) {
  const [attempt, setAttempt] = useState(0)
  const [answers, setAnswers] = useState({}) // idx pytania -> wybrany idx w potasowanej kolejności

  const items = useMemo(() => {
    const base = chapterQuiz[chapterId] ?? []
    return base.map((q) => ({ ...q, order: shuffle(q.options.map((_, i) => i)) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, attempt])

  const answered = Object.keys(answers).length
  const correct = items.reduce((acc, q, qi) => acc + (answers[qi] != null && q.order[answers[qi]] === q.correct ? 1 : 0), 0)
  const done = answered === items.length && items.length > 0
  const allCorrect = done && correct === items.length

  const pick = (qi, i) => {
    if (answers[qi] != null) return
    const next = { ...answers, [qi]: i }
    setAnswers(next)
    // komplet poprawnych → zalicz rozdział
    if (Object.keys(next).length === items.length) {
      const ok = items.every((q, j) => q.order[next[j]] === q.correct)
      if (ok) onPassed?.()
    }
  }

  const retry = () => {
    setAnswers({})
    setAttempt((a) => a + 1)
  }

  if (!items.length) return null

  return (
    <div className="space-y-4">
      {passed && answered === 0 ? (
        <NoteBox type="remember" title="Rozdział już zaliczony ✓">
          Masz to opanowane – ale powtórka nigdy nie zaszkodzi. Odpowiedz jeszcze raz albo idź dalej.
        </NoteBox>
      ) : null}

      {items.map((q, qi) => {
        const picked = answers[qi]
        const isAnswered = picked != null
        return (
          <div key={`${attempt}-${qi}`} className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
            <div className="flex items-start gap-2">
              <span style={{ '--e': 'var(--c-bcd4c8)' }} className="cham-sm edge mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[color:var(--b-e7f0eb)] font-mono text-[10px] font-bold text-[color:var(--c-14543e)]">{qi + 1}</span>
              <div className="text-sm font-semibold leading-6 text-gray-900">{q.question}</div>
            </div>
            <div className="mt-2.5 grid gap-1.5 md:grid-cols-2">
              {q.order.map((optIdx, i) => {
                const isPicked = picked === i
                const isCorrect = optIdx === q.correct
                let cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-b9c4bd)]'
                if (isAnswered) {
                  if (isCorrect) cls = 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-[color:var(--c-1f7a4d)]'
                  else if (isPicked) cls = 'border-[color:var(--c-c03538)] bg-[color:var(--b-fdf0ee)] text-[color:var(--c-b3261e)]'
                  else cls = 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-400'
                }
                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => pick(qi, i)}
                    className={`flex items-start gap-2 border px-2.5 py-2 text-left text-[13px] leading-5 transition disabled:cursor-default ${cls}`}
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-current font-mono text-[9px] font-bold">{LETTERS[i]}</span>
                    <span className="flex-1">{q.options[optIdx]}</span>
                    {isAnswered && isCorrect ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : null}
                    {isAnswered && isPicked && !isCorrect ? <X className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : null}
                  </button>
                )
              })}
            </div>
            {isAnswered ? <div className="mt-2 text-[12px] leading-5 text-gray-600">{q.explain}</div> : null}
          </div>
        )
      })}

      {done ? (
        allCorrect ? (
          <NoteBox type="remember" title={<span className="inline-flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> 3/3 – rozdział zaliczony!</span>}>
            Cały rozdział siedzi. Zaliczenie zapisane – widać je na liście rozdziałów i na stronie Start. Leć do następnego.
          </NoteBox>
        ) : (
          <div className="space-y-2">
            <NoteBox type="mistake" title={`Wynik: ${correct}/${items.length} – jeszcze raz`}>
              Przewiń wyżej, doczytaj fragmenty przy błędnych odpowiedziach i spróbuj ponownie. Rozdział zaliczasz kompletem 3/3.
            </NoteBox>
            <Button variant="secondary" onClick={retry}><RotateCcw className="mr-2 h-4 w-4" /> Spróbuj ponownie</Button>
          </div>
        )
      ) : null}
    </div>
  )
}
