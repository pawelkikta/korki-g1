import React, { useState } from 'react'
import { Check, MessageCircleQuestion, Eye } from 'lucide-react'

// Lista kluczowych elementów odpowiedzi – zaznaczasz, co faktycznie powiedziałeś.
export function Checklist({ items, checked, onToggle, disabled = false, keys = true }) {
  const count = items.filter((_, i) => checked[i]).length
  return (
    <div className="cham edge bg-[color:var(--b-fafbfa)] px-3.5 py-3" style={{ '--e': 'var(--c-d7ded9)' }}>
      <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-14543e)]">Co padło w twojej odpowiedzi?</div>
        <div className={`font-mono text-[11px] font-bold ${count === items.length ? 'text-[color:var(--c-1f7a4d)]' : 'text-gray-500'}`}>{count}/{items.length}</div>
      </div>
      <div className="mt-2 grid gap-1.5">
        {items.map((it, i) => {
          const on = !!checked[i]
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onToggle(i)}
              className={`flex items-start gap-2.5 border px-2.5 py-2 text-left text-[13px] leading-5 transition disabled:cursor-default ${
                on ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-e9f4ed)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-ffffff)] text-gray-700 hover:border-[color:var(--c-1a5c46)]'
              }`}
            >
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${on ? 'border-[color:var(--c-1f7a4d)] bg-[color:var(--b-1f7a4d)]' : 'border-[color:var(--c-b9c4bd)]'}`}>
                {on ? <Check className="h-3 w-3 text-white" /> : null}
              </span>
              <span className="flex-1">{it}</span>
              {keys ? <span className="font-mono text-[10px] text-gray-400">[{i + 1}]</span> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Dopytania komisji – pytanie widoczne, odpowiedź po kliknięciu.
export function FollowUps({ items }) {
  const [open, setOpen] = useState({})
  if (!items?.length) return null
  return (
    <div className="cham edge bg-[color:var(--b-ffffff)] px-3.5 py-3" style={{ '--e': 'var(--c-bcd4c8)' }}>
      <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--c-14543e)]">
        <MessageCircleQuestion className="h-3.5 w-3.5" /> Komisja dopytuje
      </div>
      <div className="mt-2 space-y-2">
        {items.map((f, i) => (
          <div key={i} className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] px-3 py-2">
            <div className="text-[13px] font-semibold leading-5 text-gray-900">{f.q}</div>
            {open[i] ? (
              <div className="mt-1.5 text-[13px] leading-6 text-gray-700">{f.a}</div>
            ) : (
              <button
                onClick={() => setOpen((o) => ({ ...o, [i]: true }))}
                className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500 hover:text-[color:var(--c-14543e)]"
              >
                <Eye className="h-3 w-3" /> Odpowiedz na głos, potem odsłoń
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
