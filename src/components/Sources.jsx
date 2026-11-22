import React from 'react'
import { ExternalLink } from 'lucide-react'
import { SOURCES } from '../data/sources.js'

// Pod wzorcową odpowiedzią: przepis lub norma, na której opiera się odpowiedź.
// Akt prawny ma link do ISAP, wytyczne – link DOI (nowa karta), norma – tylko nazwę.
export function Sources({ items }) {
  if (!items?.length) return null
  return (
    <div className="mt-3 border-t border-rule pt-2.5">
      <div className="eyebrow">Podstawa</div>
      <ul className="mt-1 space-y-1 text-[13.5px] leading-snug text-ink-2">
        {items.map(({ act, at }) => {
          const s = SOURCES[act]
          const label = at ? `${at} – ${s.name}` : s.name
          return (
            <li key={`${act} ${at ?? ''}`}>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Otwiera źródło w nowej karcie"
                  className="underline decoration-rule-2 underline-offset-2 transition hover:text-accent-ink hover:decoration-current"
                >
                  {label}
                  <ExternalLink className="ml-1 inline h-3 w-3" aria-hidden="true" />
                </a>
              ) : (
                label
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
