import React, { useMemo, useState } from 'react'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { chapterQuiz } from '../data/chapterQuiz.js'
import { Button, NoteBox, OptionLetter, optionClass } from './ui.jsx'

// „Sprawdź się” – 3 pytania po rozdziale (retrieval practice).
// Komplet poprawnych = rozdział zaliczony (zapis przez onPassed w panelu).

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
    <div className="space-y-6">
      {passed && answered === 0 ? (
        <NoteBox type="ok" title="Już zaliczone">
          Masz to opanowane – ale powtórka nigdy nie zaszkodzi. Odpowiedz jeszcze raz albo idź dalej.
        </NoteBox>
      ) : null}

      {items.map((q, qi) => {
        const picked = answers[qi]
        const isAnswered = picked != null
        return (
          <div key={`${attempt}-${qi}`}>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[15px] font-bold leading-6 text-ink-3">{qi + 1}.</span>
              <div className="font-serif text-[17px] font-semibold leading-[1.45] text-ink">{q.question}</div>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {q.order.map((optIdx, i) => {
                const isPicked = picked === i
                const isCorrect = optIdx === q.correct
                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => pick(qi, i)}
                    className={`flex items-start gap-2.5 rounded-[4px] px-3 py-2.5 text-left text-[14.5px] leading-[1.45] transition disabled:cursor-default ${optionClass(isAnswered, isCorrect, isPicked)}`}
                  >
                    <OptionLetter letter={LETTERS[i]} isAnswered={isAnswered} isCorrect={isCorrect} isPicked={isPicked} />
                    <span className="flex-1">{q.options[optIdx]}</span>
                    {isAnswered && isCorrect ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> : null}
                    {isAnswered && isPicked && !isCorrect ? <X className="mt-0.5 h-4 w-4 shrink-0 text-red-ink" /> : null}
                  </button>
                )
              })}
            </div>
            {isAnswered ? <p className="mt-2.5 font-serif text-[15.5px] leading-[1.55] text-ink-2">{q.explain}</p> : null}
          </div>
        )
      })}

      {done ? (
        allCorrect ? (
          <NoteBox type="ok" title={<span className="inline-flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> 3/3 – zaliczone</span>}>
            Cały rozdział siedzi. Zaliczenie zapisane – widać je w menu i na ekranie Plan. Idź dalej.
          </NoteBox>
        ) : (
          <div className="space-y-3">
            <NoteBox type="mistake" title={`Wynik: ${correct}/${items.length} – jeszcze raz`}>
              Przewiń wyżej, doczytaj fragmenty przy błędnych odpowiedziach i spróbuj ponownie. Zaliczasz kompletem 3/3.
            </NoteBox>
            <Button variant="secondary" onClick={retry}><RotateCcw className="mr-2 h-4 w-4" /> Spróbuj ponownie</Button>
          </div>
        )
      ) : null}
    </div>
  )
}
