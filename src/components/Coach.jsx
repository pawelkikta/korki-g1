import React, { useState } from 'react'
import { Check, MessageCircleQuestion, Eye } from 'lucide-react'

// Lista kluczowych elementów odpowiedzi – zaznaczasz, co faktycznie powiedziałeś.
export function Checklist({ items, checked, onToggle, disabled = false, keys = true }) {
  const count = items.filter((_, i) => checked[i]).length
  const all = count === items.length
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="eyebrow">Co padło w twojej odpowiedzi?</div>
        <div className={`font-mono text-[13px] font-bold tabular-nums ${all ? 'text-ok' : 'text-ink-3'}`}>{count}/{items.length}</div>
      </div>
      <div className="mt-2 grid gap-1.5">
        {items.map((it, i) => {
          const on = !!checked[i]
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onToggle(i)}
              className={`flex items-start gap-3 rounded-[4px] px-3 py-2.5 text-left text-[15px] leading-[1.45] transition disabled:cursor-default ${
                on ? 'bg-ok-soft text-ink shadow-[inset_0_0_0_1.5px_var(--ok)]' : 'bg-paper text-ink-2 shadow-[inset_0_0_0_1px_var(--rule-2)] hover:text-ink hover:shadow-[inset_0_0_0_1.5px_var(--accent)]'
              }`}
            >
              <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] ${on ? 'bg-ok' : 'bg-paper shadow-[inset_0_0_0_1.5px_var(--rule-2)]'}`}>
                {on ? <Check className="h-3.5 w-3.5 text-white" /> : null}
              </span>
              <span className="flex-1">{it}</span>
              {keys ? <span className="font-mono text-[11.5px] text-ink-3">{i + 1}</span> : null}
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
    <div className="rounded-r-[3px] border-l-[3px] border-accent bg-accent-soft px-4 py-3">
      <div className="eyebrow flex items-center gap-1.5 !text-accent-ink">
        <MessageCircleQuestion className="h-3.5 w-3.5" /> Komisja dopytuje
      </div>
      <div className="mt-2 divide-y divide-accent-line">
        {items.map((f, i) => (
          <div key={i} className="py-2.5 first:pt-1 last:pb-1">
            <div className="font-serif text-[16px] font-semibold leading-[1.45] text-ink">{f.q}</div>
            {open[i] ? (
              <div className="mt-1 font-serif text-[15.5px] leading-[1.6] text-ink-2">{f.a}</div>
            ) : (
              <button
                onClick={() => setOpen((o) => ({ ...o, [i]: true }))}
                className="mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent-ink hover:underline"
              >
                <Eye className="h-3.5 w-3.5" /> Odpowiedz na głos, potem odsłoń
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
