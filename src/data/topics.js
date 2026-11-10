import { chapters } from './chapters.js'
import { questions } from './questions.js'
import { quiz } from './quiz.js'

// Tematy łączą teorię z pytaniami: każde pytanie (fiszka i test ABCD) ma pole topic.
// Z rozdziału prowadzi przycisk „Fiszki z tego tematu”, z pytania – link „Doczytaj”.
// href – gdzie jest teoria tematu.
export const TOPICS = [
  { id: 'podstawy-obwodu', label: 'Skąd prąd', href: '#/podstawy' },
  ...chapters.map((c) => ({ id: c.id, label: `Rozdział ${c.num} · ${c.short}`, href: `#/pomiary/${c.num}` })),
  { id: 'urzadzenia', label: 'Urządzenia', href: '#/urzadzenia' },
  { id: 'organizacja-pracy', label: 'Organizacja pracy', href: '#/organizacja' },
  { id: 'pierwsza-pomoc', label: 'Pierwsza pomoc', href: '#/pierwsza-pomoc' },
  { id: 'klasy', label: 'Słowniczek · systemy i klasy', href: '#/slowniczek' },
]

export const topicById = Object.fromEntries(TOPICS.map((t) => [t.id, t]))

export const flashcardsOf = (topicId) => questions.filter((q) => q.topic === topicId)
export const quizOf = (topicId) => quiz.filter((q) => q.topic === topicId)
