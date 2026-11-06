import React, { useState } from 'react'
import { Building2, Flame, Home, Fuel } from 'lucide-react'
import { NoteBox, ValueTile } from '../ui.jsx'

const OBJECTS = [
  { id: 'blok', icon: Home, label: 'Blok mieszkalny', interval: 5, basis: 'art. 62', basisLabel: 'Prawa budowlanego – kontrola co najmniej raz na 5 lat', why: 'budynek mieszkalny – kontrola okresowa z art. 62 Prawa budowlanego' },
  { id: 'biuro', icon: Building2, label: 'Biurowiec', interval: 5, basis: 'art. 62', basisLabel: 'Prawa budowlanego – kontrola co najmniej raz na 5 lat', why: 'budynek użytkowy – kontrola okresowa z art. 62 Prawa budowlanego' },
  // strefy Ex: żaden przepis nie podaje „co rok" wprost – częstotliwość ustala pracodawca (dokument zabezpieczenia
  // przed wybuchem, § 7 rozporządzenia z 8.07.2010 o atmosferze wybuchowej); co rok to typowy wybór
  { id: 'lakiernia', icon: Flame, label: 'Lakiernia', interval: 1, typical: true, basis: 'dokument Ex', basisLabel: 'dokument zabezpieczenia przed wybuchem i instrukcja eksploatacji (art. 62 i tak: min. co 5 lat)', why: 'strefa zagrożenia wybuchem (opary rozpuszczalników) – pracodawca ustala częstsze kontrole na podstawie oceny ryzyka, typowo co rok' },
  { id: 'stacja', icon: Fuel, label: 'Stacja paliw', interval: 1, typical: true, basis: 'dokument Ex', basisLabel: 'dokument zabezpieczenia przed wybuchem i instrukcja eksploatacji (art. 62 i tak: min. co 5 lat)', why: 'obiekt zagrożony wybuchem – pracodawca ustala częstsze kontrole na podstawie oceny ryzyka, typowo co rok' },
]

export function SimPrzeglady() {
  const [objId, setObjId] = useState('blok')
  const [years, setYears] = useState(3)
  const obj = OBJECTS.find((o) => o.id === objId)
  const overdue = years > obj.interval

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {OBJECTS.map((o) => {
          const Icon = o.icon
          const active = o.id === objId
          return (
            <button
              key={o.id}
              onClick={() => setObjId(o.id)}
              className={`flex flex-col items-center gap-2 border px-3 py-3 transition ${
                active ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-gray-900' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? 'text-[color:var(--c-14543e)]' : ''}`} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em]">{o.label}</span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ValueTile
          value={`${obj.typical ? 'typowo ' : ''}co ${obj.interval} ${obj.interval === 1 ? 'rok' : 'lat'}`}
          label={obj.typical ? 'częstotliwość ustalona przez pracodawcę – pomiary / kontrola instalacji' : 'wymagane pomiary / kontrola instalacji elektrycznej'}
        />
        <ValueTile value={obj.basis} label={obj.basisLabel} />
      </div>

      <div className="border border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] p-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-gray-600">
          <span>Lata od ostatniego przeglądu</span>
          <span className="text-base font-black text-[color:var(--c-14543e)]">{years} {years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat'}</span>
        </div>
        <input type="range" min={0} max={10} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-3 w-full" />
        <div className="mt-3">
          {overdue ? (
            <NoteBox type="mistake" title="Przegląd przeterminowany">
              {obj.typical ? (
                <>
                  {obj.label}: przyjęty termin to {obj.interval} rok ({obj.why}). Przekroczenie łamie zasady z dokumentu
                  zabezpieczenia przed wybuchem i instrukcji eksploatacji – a w strefie Ex usterka instalacji może zapalić
                  mieszaninę wybuchową. Po 5 latach to też naruszenie art. 62 Prawa budowlanego.
                </>
              ) : (
                <>
                  {obj.label}: limit to {obj.interval} {obj.interval === 1 ? 'rok' : 'lat'} ({obj.why}). Właściciel łamie przepisy –
                  grozi mu grzywna, a przy wypadku odpowiada też cywilnie, nawet jeśli „instalacja działa".
                </>
              )}
            </NoteBox>
          ) : (
            <NoteBox type="remember" title="W terminie">
              {obj.label}: {obj.why}.{' '}
              {obj.interval - years === 0
                ? 'Termin mija właśnie teraz – kontrola musi odbyć się w tym roku.'
                : `Następna kontrola najpóźniej za ${obj.interval - years} ${obj.interval - years === 1 ? 'rok' : obj.interval - years < 5 ? 'lata' : 'lat'}.`}
            </NoteBox>
          )}
        </div>
      </div>
    </div>
  )
}
