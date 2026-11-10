import React from 'react'
import { ArrowRight, BookOpen, Layers, ListChecks } from 'lucide-react'
import { flashcardsOf, quizOf, topicById } from '../data/topics.js'

const linkCls =
  'inline-flex items-center gap-2 rounded-[4px] bg-paper px-3.5 py-2 text-[14.5px] font-semibold text-accent-ink shadow-[inset_0_0_0_1px_var(--accent-line)] transition hover:bg-accent-soft'

// Pod „Sprawdź się”: przejście od teorii do pytań z tego samego tematu.
export function PracticeTopic({ topicId }) {
  const cards = flashcardsOf(topicId).length
  const tests = quizOf(topicId).length
  if (!cards && !tests) return null
  return (
    <div className="mt-6 border-t border-rule pt-5">
      <div className="eyebrow">Utrwal ten temat</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {cards ? (
          <a href={`#/fiszki/${topicId}`} className={linkCls}>
            <Layers className="h-4 w-4" /> Fiszki z tego tematu ({cards})
          </a>
        ) : null}
        {tests ? (
          <a href={`#/test/${topicId}`} className={linkCls}>
            <ListChecks className="h-4 w-4" /> Test ABCD z tego tematu ({tests})
          </a>
        ) : null}
      </div>
    </div>
  )
}

// Przy pytaniu: gdzie doczytać teorię.
export function ReadMore({ topicId }) {
  const t = topicById[topicId]
  if (!t) return null
  return (
    <a href={t.href} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-ink hover:underline">
      <BookOpen className="h-4 w-4" /> Doczytaj: {t.label} <ArrowRight className="h-3.5 w-3.5" />
    </a>
  )
}
