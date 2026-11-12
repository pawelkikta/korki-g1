import React from 'react'
import { Flag } from 'lucide-react'
import { reportUrl } from '../lib/report.js'

// Cichy link „Zgłoś błąd” – otwiera formularz w nowej karcie z wpisanym kontekstem.
// Aplikacja sama nic nie wysyła: dane trafiają dalej dopiero, gdy zgłaszający wyśle formularz.
export function ReportLink({ what, label = 'Zgłoś błąd', className = '' }) {
  return (
    <a
      href={reportUrl(what)}
      target="_blank"
      rel="noopener noreferrer"
      title="Otwiera formularz zgłoszenia w nowej karcie"
      className={`inline-flex items-center gap-1.5 text-[13px] text-ink-3 underline-offset-2 transition hover:text-ink hover:underline ${className}`}
    >
      <Flag className="h-3.5 w-3.5" /> {label}
    </a>
  )
}
