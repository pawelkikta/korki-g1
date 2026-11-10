import React, { useEffect, useMemo, useState } from 'react'
import { Check, X, RotateCcw, Play, History } from 'lucide-react'
import { quiz } from '../data/quiz.js'
import { quizOf, topicById } from '../data/topics.js'
import { loadStored, useStoredState } from '../lib/storage.js'
import { plural } from '../lib/plural.js'
import { Button, NoteBox, OptionLetter, PageHeader, ProgressBar, Tag, optionClass } from './ui.jsx'
import { ReadMore } from './TopicLinks.jsx'

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

// każde pytanie z przetasowanymi odpowiedziami – zapamiętuj treść, nie literę
const withOrder = (qs) => qs.map((q) => ({ ...q, order: shuffle(q.options.map((_, i) => i)) }))

// Losowanie ważone bez powtórzeń: ostatnio błędne ×4, jeszcze niewidziane ×3, reszta ×1.
// Po kilku partiach przejdziesz wszystkie pytania, a błędy wracają częściej niż reszta.
function drawBatch(stats) {
  const weight = (q) => (stats[q.id]?.last === 'wrong' ? 4 : stats[q.id] ? 1 : 3)
  const pool = [...quiz]
  const out = []
  while (out.length < BATCH && pool.length) {
    let r = Math.random() * pool.reduce((sum, q) => sum + weight(q), 0)
    const i = pool.findIndex((q) => (r -= weight(q)) < 0)
    out.push(pool.splice(i < 0 ? pool.length - 1 : i, 1)[0])
  }
  return withOrder(out)
}

// topicId z adresu (#/test/<temat>) – test ze wszystkich pytań jednego tematu
export function QuizPanel({ topicId }) {
  const topic = topicById[topicId] && quizOf(topicId).length ? topicId : null
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState({}) // qid -> wybrany index (w potasowanej kolejności)
  const [finished, setFinished] = useState(false)
  const [custom, setCustom] = useState(null) // { kind: 'wrong' | 'history', items } – partie powtórkowe
  const [best, setBest] = useStoredState('quizBest', null)
  const [stats, setStats] = useStoredState('quizStats', {}) // qid -> { seen, wrong, last: 'ok' | 'wrong' }

  // statystyki czytamy przy losowaniu, nie przy każdej odpowiedzi – partia nie zmienia się w trakcie
  const drawn = useMemo(
    () => (topic ? withOrder(shuffle(quizOf(topic))) : drawBatch(loadStored('quizStats', {}))),
    [seed, topic], // eslint-disable-line react-hooks/exhaustive-deps
  )

  // zmiana tematu w adresie = nowa partia
  useEffect(() => {
    setCustom(null)
    setAnswers({})
    setFinished(false)
  }, [topic])

  const batch = custom?.items ?? drawn
  const total = batch.length

  const answered = batch.filter((q) => answers[q.id] != null).length
  const score = batch.reduce((acc, q) => {
    const picked = answers[q.id]
    return acc + (picked != null && q.order[picked] === q.correct ? 1 : 0)
  }, 0)
  const wrongQuestions = batch.filter((q) => answers[q.id] != null && q.order[answers[q.id]] !== q.correct)
  const seenCount = quiz.filter((q) => stats[q.id]).length
  const toFix = quiz.filter((q) => stats[q.id]?.last === 'wrong')

  // wynik zapisuje się od razu – nawet jeśli wyjdziesz w połowie partii
  const pick = (q, i) => {
    if (answers[q.id] != null) return
    const ok = q.order[i] === q.correct
    setAnswers((a) => ({ ...a, [q.id]: i }))
    setStats((s) => {
      const prev = s[q.id] ?? { seen: 0, wrong: 0 }
      return { ...s, [q.id]: { seen: prev.seen + 1, wrong: prev.wrong + (ok ? 0 : 1), last: ok ? 'ok' : 'wrong' } }
    })
  }

  const finish = () => {
    setFinished(true)
    // rekord liczymy tylko dla losowych partii – nie dla powtórek ani testu z tematu
    if (!custom && !topic && (!best || score > best.score)) setBest({ score, total, date: new Date().toISOString().slice(0, 10) })
  }

  const restart = () => {
    setCustom(null)
    setSeed((s) => s + 1)
    setAnswers({})
    setFinished(false)
    window.scrollTo(0, 0)
  }

  const startCustom = (kind, qs) => {
    setCustom({ kind, items: withOrder(shuffle(qs)) })
    setAnswers({})
    setFinished(false)
    window.scrollTo(0, 0)
  }

  const title = custom?.kind === 'wrong' ? 'Powtórka błędnych' : custom?.kind === 'history' ? 'Pytania do poprawki' : 'Test ABCD'
  const lead =
    custom?.kind === 'wrong'
      ? `${total} ${plural(total, 'pytanie poszło', 'pytania poszły', 'pytań poszło')} źle w poprzedniej partii. Odpowiedzi są przetasowane – nie zapamiętuj litery, zapamiętaj treść.`
      : custom?.kind === 'history'
      ? `${total} ${plural(total, 'pytanie', 'pytania', 'pytań')}, na które ostatnio odpowiedziałeś źle. Dobra odpowiedź zdejmuje pytanie z listy.`
      : topic
      ? `Wszystkie pytania z tematu: ${topicById[topic].label} (${total}). Teoria jest pod linkiem „Doczytaj”.`
      : `Partia ${BATCH} pytań z ${quiz.length}. Najpierw trafiają te, których jeszcze nie widziałeś, i te, w których ostatnio był błąd.`

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow={topic ? 'Utrwal · test z tematu' : 'Utrwal · pytania zamknięte'}
        title={title}
        lead={lead}
        meta={best ? `rekord ${best.score}/${best.total}` : 'pierwsze podejście'}
      />

      <section className="sheet relative z-[1] px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[140px] flex-1"><ProgressBar value={answered} max={total} /></div>
          <div className="font-mono text-[13px] font-semibold tabular-nums text-ink-2">{answered}/{total}</div>
          {finished ? (
            <Button onClick={restart}><RotateCcw className="mr-1.5 h-4 w-4" /> {topic && !custom ? 'Jeszcze raz' : 'Nowa partia'}</Button>
          ) : (
            <Button onClick={finish} disabled={answered < total}><Play className="mr-1.5 h-4 w-4" /> Zakończ</Button>
          )}
        </div>
        {!finished && answered < total ? <div className="mt-2 text-[13px] text-ink-3">Odpowiedz na wszystkie pytania, potem „Zakończ”.</div> : null}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-3 text-[13.5px] text-ink-2">
          <span>Widziane: <span className="font-semibold tabular-nums text-ink">{seenCount}/{quiz.length}</span></span>
          <span>Do poprawki: <span className={`font-semibold tabular-nums ${toFix.length ? 'text-red-ink' : 'text-ink'}`}>{toFix.length}</span></span>
          {toFix.length && custom?.kind !== 'history' ? (
            <button onClick={() => startCustom('history', toFix)} className="inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline">
              <History className="h-4 w-4" /> Powtórz pytania do poprawki
            </button>
          ) : null}
          {topic ? (
            <a href="#/test" className="ml-auto font-semibold text-accent-ink hover:underline">Wróć do losowych partii</a>
          ) : null}
        </div>

        {finished ? (
          <div className="mt-4 space-y-3">
            <NoteBox type={score >= total * 0.8 ? 'ok' : 'mistake'} title={`Wynik: ${score}/${total}`}>
              {score === total
                ? 'Komplet! Jesteś gotowy na ten zakres – przejdź do egzaminu próbnego.'
                : score >= total * 0.8
                ? 'Dobry wynik. Poniżej podsumowanie błędów – domknij je powtórką.'
                : 'Wróć do teorii i fiszek – poniżej widzisz, gdzie uciekły punkty.'}
            </NoteBox>
            {wrongQuestions.length > 0 ? (
              <div className="rounded-r-[3px] border-l-[3px] border-red-ink bg-red-soft px-4 py-3">
                <div className="eyebrow !text-red-ink">
                  Do poprawki: {wrongQuestions.length} {plural(wrongQuestions.length, 'pytanie', 'pytania', 'pytań')}
                </div>
                <ul className="mt-2 space-y-2">
                  {wrongQuestions.map((q) => (
                    <li key={q.id} className="font-serif text-[15.5px] leading-[1.5] text-ink-2">
                      {q.question}{' '}
                      <span className="font-semibold text-ink">→ {q.options[q.correct]}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Button variant="danger" onClick={() => startCustom('wrong', wrongQuestions)}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Powtórz tylko błędne ({wrongQuestions.length})
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      {batch.map((q, qi) => {
        const picked = answers[q.id]
        const isAnswered = picked != null
        const ok = isAnswered && q.order[picked] === q.correct
        return (
          <section key={q.id} className="sheet relative z-[1] overflow-hidden px-5 py-5 md:px-7 md:py-6">
            {isAnswered ? <div className="absolute inset-y-0 left-0 w-1" style={{ background: ok ? 'var(--ok)' : 'var(--red)' }} /> : null}
            <div className="flex items-center gap-2">
              <span className="eyebrow">Pytanie {qi + 1}</span>
              <Tag>{q.category}</Tag>
              {stats[q.id]?.last === 'wrong' && !isAnswered ? <Tag tone="red">ostatnio źle</Tag> : null}
            </div>
            <div className="mt-2 font-serif text-[18.5px] font-semibold leading-[1.45] text-ink">{q.question}</div>
            <div className="mt-4 grid gap-2">
              {q.order.map((optIdx, i) => {
                const isPicked = picked === i
                const isCorrect = optIdx === q.correct
                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => pick(q, i)}
                    className={`flex items-start gap-3 rounded-[4px] px-3.5 py-3 text-left text-[15px] leading-[1.45] transition disabled:cursor-default ${optionClass(isAnswered, isCorrect, isPicked)}`}
                  >
                    <OptionLetter letter={LETTERS[i]} isAnswered={isAnswered} isCorrect={isCorrect} isPicked={isPicked} />
                    <span className="flex-1">{q.options[optIdx]}</span>
                    {isAnswered && isCorrect ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> : null}
                    {isAnswered && isPicked && !isCorrect ? <X className="mt-0.5 h-4 w-4 shrink-0 text-red-ink" /> : null}
                  </button>
                )
              })}
            </div>
            {isAnswered ? (
              <div className="mt-4 space-y-2.5">
                <NoteBox type={ok ? 'ok' : 'mistake'} title={ok ? 'Dobrze' : 'Niestety nie'}>
                  {q.explain}
                </NoteBox>
                {!ok ? <ReadMore topicId={q.topic} /> : null}
              </div>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
