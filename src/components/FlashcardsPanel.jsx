import React, { useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Eye, Check, RotateCcw, Zap, Shuffle, ClipboardCheck } from 'lucide-react'
import { questions, rounds } from '../data/questions.js'
import { coach } from '../data/examCoach.js'
import { useStoredState } from '../lib/storage.js'
import { Button, SectionFrame, NoteBox, Tag, ProgressBar } from './ui.jsx'
import { Checklist, FollowUps } from './Coach.jsx'

function shuffleArr(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const byId = Object.fromEntries(questions.map((q) => [q.id, q]))

// kolejność pytań (lista id) zapisujemy razem z pozycją – po powrocie losowa kolejność
// i skład puli „do powtórki" są takie same jak przed wyjściem z fiszek
function buildOrder(roundId, onlyReview, shuffleOn, progress) {
  const base = questions.filter((q) => q.round === roundId)
  const filtered = onlyReview ? base.filter((q) => progress[q.id] === 'review') : base
  return (shuffleOn ? shuffleArr(filtered) : filtered).map((q) => q.id)
}

const POS_DEFAULT = {
  roundId: 1,
  onlyReview: false,
  shuffleOn: false,
  order: buildOrder(1, false, false, {}),
  index: 0,
  revealed: false,
  checked: {},
}

export function FlashcardsPanel() {
  const [progress, setProgress] = useStoredState('flash', {})
  // pozycja w fiszkach zapisana w przeglądarce: po przejściu do innego trybu (i po odświeżeniu) wracasz do tego samego pytania
  const [storedPos, setPos] = useStoredState('flashPos', POS_DEFAULT)
  const pos = { ...POS_DEFAULT, ...storedPos }
  const { roundId, onlyReview, shuffleOn, revealed, checked } = pos
  const patch = (next) => setPos((s) => ({ ...POS_DEFAULT, ...s, ...(typeof next === 'function' ? next({ ...POS_DEFAULT, ...s }) : next) }))

  const pool = useMemo(() => {
    const ids = Array.isArray(pos.order) ? pos.order : buildOrder(roundId, false, false, {})
    return ids.map((id) => byId[id]).filter(Boolean)
  }, [pos.order, roundId])

  const index = Math.max(0, Math.min(pos.index, pool.length - 1))
  const card = pool[index]
  const extra = card ? coach[card.id] : null
  const items = extra?.checklist ?? []
  const checkedCount = items.filter((_, i) => checked[i]).length
  const allSaid = items.length > 0 && checkedCount === items.length
  const known = questions.filter((q) => q.round === roundId && progress[q.id] === 'know').length
  const total = questions.filter((q) => q.round === roundId).length

  // zmiana rundy / filtra / losowania układa pulę od nowa i wraca na pierwsze pytanie
  const setPool = (next) => {
    const n = { roundId, onlyReview, shuffleOn, ...next }
    patch({ ...n, order: buildOrder(n.roundId, n.onlyReview, n.shuffleOn, progress), index: 0, revealed: false, checked: {} })
  }

  const go = (dir) => {
    patch({ index: Math.max(0, Math.min(pool.length - 1, index + dir)), revealed: false, checked: {} })
  }

  // ocena wynika z listy kluczowych elementów: wszystkie padły → opanowane, czegoś brakuje → do powtórki
  const confirm = () => {
    if (!card || !revealed) return
    setProgress((p) => ({ ...p, [card.id]: allSaid ? 'know' : 'review' }))
    if (index < pool.length - 1) go(1)
    else patch({ revealed: false, checked: {} })
  }

  const setRevealed = (value) => patch({ revealed: value })
  const toggle = (i) => patch((s) => ({ checked: { ...s.checked, [i]: !s.checked[i] } }))

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === ' ') {
        e.preventDefault()
        patch((s) => ({ revealed: !s.revealed }))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (revealed && /^[1-9]$/.test(e.key) && Number(e.key) <= items.length) {
        toggle(Number(e.key) - 1)
      } else if (revealed && e.key === 'Enter') {
        e.preventDefault()
        confirm()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Tryb 03"
        title="Fiszki – trening egzaminu ustnego"
        subtitle="Przeczytaj pytanie i odpowiedz na głos, jak przed komisją. Potem odsłoń meritum i uczciwie zaznacz, które kluczowe elementy padły – pytanie jest opanowane dopiero wtedy, gdy padły wszystkie. Skróty: spacja = odsłoń, 1–4 = zaznacz element, Enter = zatwierdź, ← → = nawigacja."
        badge={`${known}/${total} opanowane`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {rounds.map((r) => {
            const active = r.id === roundId && !onlyReview
            return (
              <button
                key={r.id}
                onClick={() => setPool({ roundId: r.id, onlyReview: false })}
                className={`border px-3 py-2 text-left transition ${
                  active ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.16em]">Runda {r.id} · {r.count} pyt.</div>
                <div className="text-xs font-bold">{r.title}</div>
              </button>
            )
          })}
          <button
            onClick={() => setPool({ onlyReview: !onlyReview })}
            className={`border px-3 py-2 transition ${
              onlyReview ? 'border-[color:var(--c-c03538)] bg-[color:var(--b-fdf0ee)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"><RotateCcw className="h-3 w-3" /> Do powtórki</div>
            <div className="text-xs font-bold">{questions.filter((q) => q.round === roundId && progress[q.id] === 'review').length} pytań</div>
          </button>
          <button
            onClick={() => setPool({ shuffleOn: !shuffleOn })}
            title={'Losowa kolejność pytań – żeby nie uczyć się „kolejnością"'}
            className={`border px-3 py-2 transition ${
              shuffleOn ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"><Shuffle className="h-3 w-3" /> Losowo</div>
            <div className="text-xs font-bold">{shuffleOn ? 'włączone' : 'po kolei'}</div>
          </button>
        </div>

        <div className="mt-4">
          <ProgressBar value={known} max={total} />
        </div>
      </SectionFrame>

      {!card ? (
        <SectionFrame tag="Pusto" title={onlyReview ? 'Brak pytań do powtórki' : 'Brak pytań'} subtitle={onlyReview ? 'W tej rundzie nie masz nic oznaczonego „powtórzyć". Dobra robota!' : ''}>
          <Button variant="secondary" onClick={() => setPool({ onlyReview: false })}>Pokaż całą rundę</Button>
        </SectionFrame>
      ) : (
        <SectionFrame
          tag={`Pytanie ${index + 1} / ${pool.length}`}
          title={card.category}
          accent={card.trap ? 'var(--c-c03538)' : 'var(--c-1a5c46)'}
          badge={progress[card.id] === 'know' ? 'opanowane ✓' : progress[card.id] === 'review' ? 'do powtórki' : 'nowe'}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone={card.trap ? 'red' : 'amber'}>{card.trap ? <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Podchwytliwe</span> : `Runda ${card.round}`}</Tag>
            <Tag>{card.category}</Tag>
          </div>

          <div className="mt-4 min-h-[72px] text-lg font-semibold leading-7 text-gray-900">{card.question}</div>

          {revealed ? (
            <div key={`answer-${card.id}`} className="mt-4 space-y-3">
              <div className="border border-[color:var(--c-d7ded9)] bg-[color:var(--b-f6f8f7)] p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--c-14543e)]">Odpowiedź – meritum</div>
                <div className="mt-2 text-sm leading-7 text-gray-800">{card.answer}</div>
              </div>
              {items.length ? (
                <Checklist items={items} checked={checked} onToggle={toggle} />
              ) : (
                <NoteBox type="remember" title="Kluczowe">{card.keyPoints}</NoteBox>
              )}
              {card.trap ? <NoteBox type="trap" title="Pułapka">{card.trap}</NoteBox> : null}
              {card.wrongAnswer ? <NoteBox type="mistake" title="✗ Błędna odpowiedź">{card.wrongAnswer}</NoteBox> : null}
              <FollowUps key={card.id} items={extra?.followUps} />
            </div>
          ) : (
            <div key="hidden" className="mt-4">
              <button
                onClick={() => setRevealed(true)}
                className="flex w-full items-center justify-center gap-2 border border-dashed border-[color:var(--c-b9c4bd)] bg-[color:var(--b-f6f8f7)] px-4 py-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 transition hover:border-[color:var(--c-1a5c46)] hover:text-[color:var(--c-14543e)]"
              >
                <Eye className="h-4 w-4" /> Odsłoń odpowiedź (spacja)
              </button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[color:var(--c-d7ded9)] pt-4 md:grid-cols-[1fr_1fr_2fr]">
            <Button variant="secondary" onClick={() => go(-1)} disabled={index === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
            </Button>
            <Button variant="secondary" onClick={() => go(1)} disabled={index >= pool.length - 1}>
              Dalej <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              onClick={confirm}
              disabled={!revealed}
              variant={revealed && !allSaid ? 'danger' : 'primary'}
              className={`col-span-2 md:col-span-1 ${revealed && allSaid ? '!bg-[color:var(--b-1f7a4d)] hover:!bg-[color:var(--b-27915d)]' : ''}`}
            >
              {revealed && allSaid ? <Check className="mr-1 h-4 w-4" /> : <ClipboardCheck className="mr-1 h-4 w-4" />}
              {!revealed
                ? 'Najpierw odpowiedz i odsłoń'
                : allSaid
                  ? 'Zatwierdź: opanowane [Enter]'
                  : `Zatwierdź: do powtórki – brakuje ${items.length - checkedCount} [Enter]`}
            </Button>
          </div>
        </SectionFrame>
      )}
    </div>
  )
}
