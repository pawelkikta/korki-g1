import React, { useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Eye, Check, Zap, ClipboardCheck } from 'lucide-react'
import { questions, rounds } from '../data/questions.js'
import { coach } from '../data/examCoach.js'
import { useStoredState } from '../lib/storage.js'
import { Badge, Button, FolderTabs, Kbd, NoteBox, PageHeader, ProgressBar, Switch, Tag } from './ui.jsx'
import { Checklist, FollowUps } from './Coach.jsx'
import { ReadMore } from './TopicLinks.jsx'
import { flashcardsOf, topicById } from '../data/topics.js'

function shuffleArr(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const byId = Object.fromEntries(questions.map((q) => [q.id, q]))

// pula: runda albo temat (z adresu #/fiszki/<temat>, np. po „Fiszki z tego tematu” w rozdziale)
const scopeOf = (roundId, topic) => (topic ? flashcardsOf(topic) : questions.filter((q) => q.round === roundId))

// kolejność pytań (lista id) zapisujemy razem z pozycją – po powrocie losowa kolejność
// i skład puli „do powtórki" są takie same jak przed wyjściem z fiszek
function buildOrder(roundId, onlyReview, shuffleOn, progress, topic = null) {
  const base = scopeOf(roundId, topic)
  const filtered = onlyReview ? base.filter((q) => progress[q.id] === 'review') : base
  return (shuffleOn ? shuffleArr(filtered) : filtered).map((q) => q.id)
}

const POS_DEFAULT = {
  roundId: 1,
  topic: null,
  onlyReview: false,
  shuffleOn: false,
  order: buildOrder(1, false, false, {}),
  index: 0,
  revealed: false,
  checked: {},
}

export function FlashcardsPanel({ topicId, onTopic }) {
  const [progress, setProgress] = useStoredState('flash', {})
  // pozycja w fiszkach zapisana w przeglądarce: po przejściu do innego trybu (i po odświeżeniu) wracasz do tego samego pytania
  const [storedPos, setPos] = useStoredState('flashPos', POS_DEFAULT)
  const pos = { ...POS_DEFAULT, ...storedPos }
  const { roundId, topic, onlyReview, shuffleOn, revealed, checked } = pos
  // temat z adresu jest ważniejszy niż zapisana pozycja
  const routeTopic = topicById[topicId] && flashcardsOf(topicId).length ? topicId : null
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
  const scope = scopeOf(roundId, topic)
  const known = scope.filter((q) => progress[q.id] === 'know').length
  const total = scope.length

  // zmiana rundy / tematu / filtra / losowania układa pulę od nowa i wraca na pierwsze pytanie
  const setPool = (next) => {
    const n = { roundId, topic, onlyReview, shuffleOn, ...next }
    patch({ ...n, order: buildOrder(n.roundId, n.onlyReview, n.shuffleOn, progress, n.topic), index: 0, revealed: false, checked: {} })
  }

  useEffect(() => {
    if ((topic ?? null) !== routeTopic) setPool({ topic: routeTopic })
  }, [routeTopic]) // eslint-disable-line react-hooks/exhaustive-deps

  const pickRound = (id) => {
    setPool({ roundId: id, topic: null })
    if (routeTopic) onTopic(null)
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

  const reviewInScope = scope.filter((q) => progress[q.id] === 'review').length
  const roundTabs = rounds.map((r) => {
    const k = questions.filter((q) => q.round === r.id && progress[q.id] === 'know').length
    return { id: r.id, kicker: `Runda ${r.id} · ${r.count} pyt.`, label: r.title, done: k === r.count }
  })
  const tabs = topic ? [{ id: `t:${topic}`, kicker: `Temat · ${total} pyt.`, label: topicById[topic]?.label }, ...roundTabs] : roundTabs
  const status = card ? progress[card.id] : null

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Utrwal · egzamin ustny"
        title="Fiszki"
        lead="Przeczytaj pytanie i odpowiedz na głos, jak przed komisją. Potem odsłoń i uczciwie zaznacz, które kluczowe elementy padły – dopiero wtedy przeczytaj wzorcową odpowiedź. Pytanie jest opanowane, gdy padły wszystkie elementy."
        meta={`opanowane ${topic ? 'w temacie' : 'w rundzie'} ${known}/${total}`}
      />

      <div>
        <FolderTabs
          label="Rundy"
          value={topic ? `t:${topic}` : roundId}
          onChange={(id) => (typeof id === 'number' ? pickRound(id) : null)}
          tabs={tabs}
        />
        <section className="sheet relative z-[1] overflow-hidden">
          {card?.trap ? <div className="absolute inset-y-0 left-0 w-1 bg-red-ink" /> : null}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-rule px-5 py-3.5 md:px-7">
            <Switch checked={onlyReview} onChange={(v) => setPool({ onlyReview: v })} label="Tylko do powtórki" hint={reviewInScope} />
            <Switch checked={shuffleOn} onChange={(v) => setPool({ shuffleOn: v })} label="Losowa kolejność" />
            <div className="flex min-w-[160px] flex-1 items-center gap-3">
              <div className="flex-1"><ProgressBar value={known} max={total} tone={known === total ? 'green' : 'amber'} /></div>
            </div>
          </div>

          {!card ? (
            <div className="px-5 py-8 md:px-7">
              <div className="font-slab text-[20px] font-semibold text-ink">{onlyReview ? 'Brak pytań do powtórki' : 'Brak pytań'}</div>
              {onlyReview ? <p className="mt-1 font-serif text-[16px] text-ink-2">W tej rundzie nie masz nic oznaczonego „do powtórki”. Dobra robota!</p> : null}
              <Button variant="secondary" className="mt-4" onClick={() => setPool({ onlyReview: false })}>Pokaż całą rundę</Button>
            </div>
          ) : (
            <div className="px-5 py-5 md:px-7 md:py-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-1">Pytanie {index + 1} z {pool.length}</span>
                <Tag>{card.category}</Tag>
                {card.trap ? <Tag tone="red"><Zap className="mr-1 h-3 w-3" /> Podchwytliwe</Tag> : null}
                <span className="ml-auto">
                  {status === 'know' ? <Badge tone="ok">opanowane ✓</Badge> : status === 'review' ? <Badge tone="red">do powtórki</Badge> : <Badge>nowe</Badge>}
                </span>
              </div>

              <div className="mt-4 min-h-[64px] font-serif text-[21px] font-semibold leading-[1.4] text-ink md:text-[23px]">{card.question}</div>

              {revealed ? (
                <div key={`answer-${card.id}`} className="mt-5 space-y-4">
                  {items.length ? (
                    <Checklist items={items} checked={checked} onToggle={toggle} />
                  ) : (
                    <NoteBox type="remember" title="Kluczowe">{card.keyPoints}</NoteBox>
                  )}
                  <div className="rounded-[3px] bg-paper-2 px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--rule)]">
                    <div className="eyebrow">Wzorcowa odpowiedź</div>
                    <div className="mt-1.5 font-serif text-[16.5px] leading-[1.65] text-ink">{card.answer}</div>
                  </div>
                  {card.trap ? <NoteBox type="trap" title="Pułapka">{card.trap}</NoteBox> : null}
                  {card.wrongAnswer ? <NoteBox type="mistake" title="Błędna odpowiedź">{card.wrongAnswer}</NoteBox> : null}
                  <FollowUps key={card.id} items={extra?.followUps} />
                  <ReadMore topicId={card.topic} />
                </div>
              ) : (
                <div key="hidden" className="mt-5">
                  <button
                    onClick={() => setRevealed(true)}
                    className="flex w-full flex-col items-center justify-center gap-1.5 rounded-[4px] border-2 border-dashed border-rule-2 bg-paper-2 px-4 py-9 text-ink-2 transition hover:border-accent hover:text-accent-ink"
                  >
                    <span className="flex items-center gap-2 text-[15.5px] font-semibold"><Eye className="h-4 w-4" /> Odsłoń odpowiedź</span>
                    <span className="text-[13px] text-ink-3">najpierw odpowiedz na głos · <Kbd>spacja</Kbd></span>
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-rule pt-5 md:grid-cols-[auto_auto_1fr]">
                <Button variant="secondary" onClick={() => go(-1)} disabled={index === 0}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
                </Button>
                <Button variant="secondary" onClick={() => go(1)} disabled={index >= pool.length - 1}>
                  Pomiń <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  onClick={confirm}
                  disabled={!revealed}
                  variant={revealed && allSaid ? 'ok' : 'primary'}
                  className="col-span-2 md:col-span-1"
                >
                  {revealed && allSaid ? <Check className="mr-1.5 h-4 w-4" /> : <ClipboardCheck className="mr-1.5 h-4 w-4" />}
                  {!revealed
                    ? 'Najpierw odpowiedz i odsłoń'
                    : allSaid
                      ? 'Zatwierdź: opanowane'
                      : `Zatwierdź: do powtórki (brakuje ${items.length - checkedCount})`}
                </Button>
              </div>
              <div className="mt-3 hidden text-[12.5px] text-ink-3 md:block">
                Klawiatura: <Kbd>spacja</Kbd> odsłoń · <Kbd>1</Kbd>–<Kbd>{items.length || 4}</Kbd> zaznacz element · <Kbd>Enter</Kbd> zatwierdź · <Kbd>←</Kbd> <Kbd>→</Kbd> poprzednie / następne
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
