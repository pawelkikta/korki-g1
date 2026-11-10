import React, { useEffect } from 'react'
import { DEVICES } from '../data/devices.js'
import { useStoredState } from '../lib/storage.js'
import { FolderTabs, PageHeader, SectionFrame } from './ui.jsx'
import { PracticeTopic } from './TopicLinks.jsx'
import { DeviceMCB } from './devices/DeviceMCB.jsx'
import { DeviceRCD } from './devices/DeviceRCD.jsx'
import { DeviceFuse } from './devices/DeviceFuse.jsx'
import { DeviceRCBO } from './devices/DeviceRCBO.jsx'
import { DeviceSPD } from './devices/DeviceSPD.jsx'
import { DeviceDobor } from './devices/DeviceDobor.jsx'

const COMPONENTS = { mcb: DeviceMCB, rcd: DeviceRCD, fuse: DeviceFuse, rcbo: DeviceRCBO, spd: DeviceSPD, dobor: DeviceDobor }

// Aparat wybiera adres (#/urzadzenia/rcd). Obejrzane aparaty liczy ekran Plan.
export function DevicesPanel({ deviceId, onDevice }) {
  const device = DEVICES.find((d) => d.id === deviceId) ?? DEVICES[0]
  const DeviceComponent = COMPONENTS[device.id]
  const [seen, setSeen] = useStoredState('devicesSeen', {})

  useEffect(() => {
    if (!seen[device.id]) setSeen((s) => ({ ...s, [device.id]: true }))
  }, [device.id, seen, setSeen])

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Zrozum · aparaty"
        title="Aparaty w rozdzielnicy – jak działają od środka"
        lead={'Symboliczne rysunki (tak wyglądają na schematach i szynie DIN) i interaktywna zasada działania. Komisja często pyta „jak działa różnicówka?" – po tej sekcji odpowiesz z detalem przekładnika.'}
        meta={`obejrzane ${DEVICES.filter((d) => seen[d.id]).length}/${DEVICES.length}`}
      />

      <div>
        <FolderTabs
          label="Aparaty"
          value={device.id}
          onChange={onDevice}
          tabs={DEVICES.map((d) => ({ id: d.id, label: d.short, done: !!seen[d.id] }))}
        />
        <SectionFrame title={device.title} subtitle={device.subtitle}>
          <DeviceComponent />
          <PracticeTopic topicId="urzadzenia" />
        </SectionFrame>
      </div>
    </div>
  )
}
