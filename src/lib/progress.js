import { questions } from '../data/questions.js'
import { chapters } from '../data/chapters.js'
import { AREAS } from '../data/areas.js'
import { DEVICES } from '../data/devices.js'
import { loadStored } from './storage.js'

// Cały postęp nauki w jednym miejscu – czyta localStorage (menu i ekran Plan).
export function readProgress() {
  const flash = loadStored('flash', {})
  const done = loadStored('chapters', {})
  const examHistory = loadStored('examHistory', [])
  const quizBest = loadStored('quizBest', null)
  const devicesSeen = loadStored('devicesSeen', {})
  const quizStats = loadStored('quizStats', {})

  const countIn = (qs, state) => qs.filter((q) => flash[q.id] === state).length
  const areaRows = AREAS.map((a) => {
    const qs = questions.filter((q) => a.cats.includes(q.category))
    return { label: a.label, known: countIn(qs, 'know'), review: countIn(qs, 'review'), total: qs.length }
  })

  return {
    known: countIn(questions, 'know'),
    review: countIn(questions, 'review'),
    total: questions.length,
    basicsDone: !!done['podstawy-obwodu'],
    orgDone: !!done['organizacja-pracy'],
    firstAidDone: !!done['pierwsza-pomoc'],
    quizToFix: Object.values(quizStats).filter((s) => s.last === 'wrong').length,
    chaptersPassed: chapters.filter((c) => done[c.id]).length,
    chapterCount: chapters.length,
    firstOpenChapter: chapters.findIndex((c) => !done[c.id]), // -1 = wszystkie zaliczone
    devicesSeen: DEVICES.filter((d) => devicesSeen[d.id]).length,
    deviceCount: DEVICES.length,
    quizBest,
    lastExam: examHistory[examHistory.length - 1] ?? null,
    examCount: examHistory.length,
    areas: areaRows,
  }
}

const passedShare = (r) => !!r && r.total > 0 && r.score / r.total >= 0.8

// Ścieżka nauki: Zrozum → Utrwal → Sprawdź. status: done | progress | todo | none (bez licznika).
// nav – krótka liczba do menu, next – co konkretnie otworzyć przy „Kontynuuj”.
export function learningPath(p) {
  const st = (isDone, started) => (isDone ? 'done' : started ? 'progress' : 'todo')
  const open = p.firstOpenChapter
  return [
    {
      id: 'podstawy', group: 'Zrozum', title: 'Skąd prąd',
      desc: 'Skąd 230 V, czym są L, N i PE i kiedy płynie prąd. Fundament pod resztę.',
      meta: p.basicsDone ? 'zaliczone' : '3 pytania na koniec',
      status: st(p.basicsDone, false), target: ['podstawy'],
    },
    {
      id: 'pomiary', group: 'Zrozum', title: 'Pomiary – 7 rozdziałów',
      desc: 'Izolacja, ciągłość PE, pętla zwarcia, RCD, uziemienie, protokół. Każdy rozdział z symulacją.',
      meta: `${p.chaptersPassed}/${p.chapterCount} zaliczone`, nav: `${p.chaptersPassed}/${p.chapterCount}`,
      status: st(p.chaptersPassed === p.chapterCount, p.chaptersPassed > 0),
      target: ['pomiary', String((open < 0 ? 0 : open) + 1)],
      next: open >= 0 ? `Rozdział ${open + 1}: ${chapters[open].title}` : null,
    },
    {
      id: 'urzadzenia', group: 'Zrozum', title: 'Urządzenia',
      desc: 'Jak działają wyłącznik nadprądowy, RCD, RCBO, ogranicznik przepięć i bezpiecznik.',
      meta: `${p.devicesSeen}/${p.deviceCount} obejrzane`, nav: `${p.devicesSeen}/${p.deviceCount}`,
      status: st(p.devicesSeen === p.deviceCount, p.devicesSeen > 0), target: ['urzadzenia'],
    },
    {
      id: 'organizacja', group: 'Zrozum', title: 'Organizacja pracy',
      desc: 'Polecenie pisemne, osoby funkcyjne, przygotowanie i likwidacja strefy pracy.',
      meta: p.orgDone ? 'zaliczone' : '3 pytania na koniec',
      status: st(p.orgDone, false), target: ['organizacja'],
    },
    {
      id: 'pierwsza-pomoc', group: 'Zrozum', title: 'Pierwsza pomoc',
      desc: 'Uwolnienie porażonego, ocena, RKO 30:2 i AED. Do tego gaszenie urządzeń pod napięciem.',
      meta: p.firstAidDone ? 'zaliczone' : '3 pytania na koniec',
      status: st(p.firstAidDone, false), target: ['pierwsza-pomoc'],
    },
    {
      id: 'fiszki', group: 'Utrwal', title: `Fiszki – ${p.total} pytań ustnych`,
      desc: 'Odpowiadasz na głos, odsłaniasz wzorzec i zaznaczasz, co padło.',
      meta: `${p.known}/${p.total} opanowane`, nav: `${p.known}/${p.total}`,
      status: st(p.known === p.total, p.known + p.review > 0), target: ['fiszki'],
    },
    {
      id: 'test', group: 'Utrwal', title: 'Test ABCD',
      desc: 'Szybka kontrola na pytaniach zamkniętych z typowymi błędnymi odpowiedziami.',
      meta: p.quizBest ? `rekord ${p.quizBest.score}/${p.quizBest.total}` : 'bez podejścia',
      status: st(passedShare(p.quizBest), !!p.quizBest), target: ['test'],
    },
    {
      id: 'sciaga', group: 'Utrwal', title: 'Ściąga – liczby na pamięć',
      desc: 'Wartości graniczne w jednym miejscu. Tryb drill zakrywa liczby.',
      meta: 'wracaj codziennie', status: 'none', target: ['sciaga'],
    },
    {
      id: 'egzamin', group: 'Sprawdź', title: 'Egzamin próbny',
      desc: '10 pytań ze wszystkich obszarów. Po każdym komisja dopytuje.',
      meta: p.lastExam ? `ostatnio ${p.lastExam.score}/${p.lastExam.total}` : 'bez podejścia',
      nav: p.lastExam ? `${p.lastExam.score}/${p.lastExam.total}` : null,
      status: st(passedShare(p.lastExam), !!p.lastExam), target: ['egzamin'],
    },
  ]
}
