import React, { useRef, useState } from 'react'
import { Download, Trash2, Upload } from 'lucide-react'
import { Button } from './ui.jsx'
import { clearProgress, downloadProgress, hasProgress, parseProgress, restoreProgress } from '../lib/backup.js'

// Ekran Plan: zapis postępu do pliku, wczytanie z pliku i start od zera.
// Komponent renderuje się ponownie po każdej zmianie postępu (App słucha STORAGE_EVENT).

const plDate = (iso) => {
  const d = iso ? new Date(iso) : null
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString('pl-PL') : null
}

export function ProgressTransfer() {
  const input = useRef(null)
  const [msg, setMsg] = useState(null) // { ok: boolean, text }
  const any = hasProgress()

  const save = () =>
    setMsg(
      downloadProgress()
        ? { ok: true, text: 'Plik z postępem jest w pobranych plikach. Przenieś go na drugie urządzenie i wczytaj tam przyciskiem „Wczytaj z pliku”.' }
        : { ok: false, text: 'Przeglądarka blokuje dostęp do zapisanych danych, więc nie ma czego zapisać.' },
    )

  const load = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // ten sam plik da się wtedy wybrać jeszcze raz
    if (!file) return
    const result = parseProgress(await file.text())
    if (result.error) return setMsg({ ok: false, text: result.error })
    const when = plDate(result.exported)
    const saved = when ? `zapisany ${when}` : 'z pliku'
    if (any && !window.confirm(`Wczytać postęp ${saved}? Zastąpi on postęp zapisany w tej przeglądarce.`)) return
    setMsg(
      restoreProgress(result.data)
        ? { ok: true, text: `Wczytano postęp ${saved}.` }
        : { ok: false, text: 'Przeglądarka nie pozwala zapisywać danych (np. w trybie prywatnym), więc postępu nie wczytano.' },
    )
  }

  const reset = () => {
    if (!window.confirm('Usunąć cały postęp zapisany w tej przeglądarce? Tego nie da się cofnąć. Jeśli chcesz go zachować, najpierw zapisz go do pliku.')) return
    clearProgress()
    setMsg({ ok: true, text: 'Postęp usunięty. Zaczynasz od nowa.' })
  }

  return (
    <section className="sheet relative z-[1] px-5 py-5 md:px-7 md:py-6">
      <h2 className="font-slab text-[20px] font-semibold text-ink">Twój postęp</h2>
      <p className="mt-1 max-w-[65ch] text-[14.5px] leading-6 text-ink-2">
        Postęp zapisuje się tylko w tej przeglądarce. Uczysz się na telefonie i na komputerze? Zapisz postęp do pliku
        i wczytaj go na drugim urządzeniu.
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button variant="secondary" onClick={save} disabled={!any}>
          <Download className="mr-1.5 h-4 w-4" /> Zapisz do pliku
        </Button>
        <Button variant="secondary" onClick={() => input.current?.click()}>
          <Upload className="mr-1.5 h-4 w-4" /> Wczytaj z pliku
        </Button>
        <Button variant="secondary" onClick={reset} disabled={!any} className="sm:ml-auto">
          <Trash2 className="mr-1.5 h-4 w-4" /> Zacznij od nowa
        </Button>
        {/* bez accept: część telefonów z Androidem nie pozwala wtedy wybrać pliku .json */}
        <input ref={input} type="file" onChange={load} className="hidden" />
      </div>
      {/* zawsze w DOM, żeby czytnik ekranu ogłosił komunikat (pusty akapit ma zerową wysokość) */}
      <p role="status" className={`text-[14px] leading-5 ${msg?.ok ? 'text-ok' : 'text-red-ink'} ${msg ? 'mt-3' : ''}`}>
        {msg?.text}
      </p>
    </section>
  )
}
