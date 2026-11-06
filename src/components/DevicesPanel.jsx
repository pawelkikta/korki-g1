import React, { useState } from 'react'
import { SectionFrame } from './ui.jsx'
import { DeviceMCB } from './devices/DeviceMCB.jsx'
import { DeviceRCD } from './devices/DeviceRCD.jsx'
import { DeviceFuse } from './devices/DeviceFuse.jsx'
import { DeviceRCBO } from './devices/DeviceRCBO.jsx'
import { DeviceSPD } from './devices/DeviceSPD.jsx'
import { DeviceDobor } from './devices/DeviceDobor.jsx'

const DEVICES = [
  {
    id: 'mcb', short: 'Nadprądowy', title: 'Wyłącznik nadprądowy (MCB, „eska")',
    subtitle: 'Chroni przewody, a w układzie TN wyłącza też zwarcie na obudowę. Dwa wyzwalacze: bimetal łapie przeciążenia, cewka – zwarcia. Ustaw prąd suwakiem i zobacz, który zareaguje.',
    component: DeviceMCB,
  },
  {
    id: 'rcd', short: 'RCD', title: 'Wyłącznik różnicowoprądowy (RCD)',
    subtitle: 'Chroni ludzi. Porównuje prąd L i N – różnica oznacza, że prąd ucieka poza obwód. Zasymuluj upływ albo kliknij TEST na obudowie.',
    component: DeviceRCD,
  },
  {
    id: 'fuse', short: 'Topikowy', title: 'Bezpiecznik topikowy',
    subtitle: 'Najstarsze zabezpieczenie: drucik, który topi się od za dużego prądu. Jednorazowy – po zadziałaniu wymieniasz wkładkę.',
    component: DeviceFuse,
  },
  {
    id: 'rcbo', short: 'RCBO', title: 'RCBO – wyłącznik kombinowany',
    subtitle: 'MCB + RCD w jednym module. Wybierz rodzaj awarii i zobacz, która sekcja ją wykryje – to świetne ćwiczenie na rozumienie różnic.',
    component: DeviceRCBO,
  },
  {
    id: 'spd', short: 'SPD', title: 'Ogranicznik przepięć (SPD)',
    subtitle: 'Warystor: na co dzień izoluje, przy przepięciu zwiera udar do uziemienia. Wyślij piorun – z SPD i bez niego.',
    component: DeviceSPD,
  },
  {
    id: 'dobor', short: 'Dobór', title: 'Dobór wyłącznika do mocy odbiornika',
    subtitle: 'Kalkulator: oblicz prąd z mocy (wzór 1- i 3-fazowy), dobierz najbliższą wartość znamionową z szeregu i charakterystykę B/C.',
    component: DeviceDobor,
  },
]

export function DevicesPanel() {
  const [deviceId, setDeviceId] = useState('mcb')
  const device = DEVICES.find((d) => d.id === deviceId)
  const DeviceComponent = device.component

  return (
    <div className="space-y-6">
      <SectionFrame
        tag="Urządzenia"
        title="Aparaty w rozdzielnicy – jak działają od środka"
        subtitle={'Symboliczne rysunki (tak wyglądają na schematach i szynie DIN) + interaktywna zasada działania. Komisja często pyta „jak działa różnicówka?" – po tej sekcji odpowiesz z detalem przekładnika.'}
        badge={`${DEVICES.findIndex((d) => d.id === deviceId) + 1}/${DEVICES.length}`}
      >
        <div className="flex flex-wrap gap-1.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              onClick={() => setDeviceId(d.id)}
              className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition ${
                d.id === deviceId ? 'border-[color:var(--c-1a5c46)] bg-[color:var(--b-e7f0eb)] text-[color:var(--c-14543e)]' : 'border-[color:var(--c-e3e8e5)] bg-[color:var(--b-fafbfa)] text-gray-500 hover:border-[color:var(--c-b9c4bd)] hover:text-gray-800'
              }`}
            >
              {d.short}
            </button>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tag="Aparat" title={device.title} subtitle={device.subtitle}>
        <DeviceComponent />
      </SectionFrame>
    </div>
  )
}
