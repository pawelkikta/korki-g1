import { useState, useCallback } from 'react'

const PREFIX = 'sepg1.'

export function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveStored(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // storage pełny/zablokowany – apka działa dalej bez zapisu
  }
  // menu i ekran Plan pokazują postęp – odświeżają się po każdym zapisie.
  // Mikrozadanie: saveStored działa też w updaterze setState, a tam nie wolno aktualizować innych komponentów.
  queueMicrotask(() => window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: key })))
}

export const STORAGE_EVENT = 'sepg1-storage'

export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => loadStored(key, fallback))
  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        saveStored(key, resolved)
        return resolved
      })
    },
    [key],
  )
  return [value, set]
}
