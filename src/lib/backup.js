import { APP_VERSION } from '../version.js'
import { PREFIX, STORAGE_EVENT } from './storage.js'

// Przenoszenie postępu między urządzeniami: plik JSON ze wszystkimi wpisami sepg1.* z localStorage.
// Wczytanie pliku zastępuje cały postęp w tej przeglądarce.

const APP_ID = 'korki-g1'
const FORMAT = 1
const MAX_CHARS = 1_000_000

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

// Kształt wpisów, które menu i ekran Plan czytają bez sprawdzania (progress.js).
// Zły kształt wywróciłby aplikację przy starcie. Wpisy spoza listy (np. z nowszej wersji) przechodzą bez sprawdzania.
const SHAPES = {
  flash: isObject,
  chapters: isObject,
  devicesSeen: isObject,
  quizStats: (v) => isObject(v) && Object.values(v).every(isObject),
  examHistory: (v) => Array.isArray(v) && v.every(isObject),
  quizBest: (v) => v === null || isObject(v),
  flashPos: isObject,
  glossaryTab: (v) => typeof v === 'string',
}

function storedKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(PREFIX)) keys.push(key)
  }
  return keys
}

// menu i ekran Plan odświeżają się po tym zdarzeniu (storage.js)
const notify = () => window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: '*' }))

export function hasProgress() {
  try {
    return storedKeys().length > 0
  } catch {
    return false
  }
}

// Pobiera plik z postępem. Zwraca false, gdy przeglądarka blokuje dostęp do localStorage.
export function downloadProgress() {
  const data = {}
  try {
    for (const key of storedKeys()) {
      try {
        data[key.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(key))
      } catch {
        // uszkodzony wpis – pomijamy go, reszta postępu przechodzi
      }
    }
  } catch {
    return false
  }
  const exported = new Date().toISOString()
  const file = { app: APP_ID, format: FORMAT, version: APP_VERSION, exported, data }
  const url = URL.createObjectURL(new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `korki-g1-postep-${exported.slice(0, 10)}.json`
  document.body.append(link)
  link.click()
  link.remove()
  // Safari zaczyna pobieranie z opóźnieniem – adres zwalniamy dopiero po chwili
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
  return true
}

// Sprawdza tekst pliku. Zwraca { data, exported } albo { error } z komunikatem dla użytkownika.
export function parseProgress(text) {
  const notOurs = { error: 'To nie jest plik z postępem Korki G1. Wybierz plik zapisany przyciskiem „Zapisz do pliku”.' }
  if (text.length > MAX_CHARS) return notOurs
  let file
  try {
    file = JSON.parse(text)
  } catch {
    return notOurs
  }
  if (!isObject(file) || file.app !== APP_ID || !Number.isInteger(file.format) || !isObject(file.data)) return notOurs
  if (file.format > FORMAT) return { error: 'Ten plik zapisała nowsza wersja aplikacji. Zamknij i otwórz aplikację ponownie, żeby się zaktualizowała, i spróbuj jeszcze raz.' }
  const valid = Object.entries(file.data).every(([key, value]) => /^[\w.-]{1,64}$/.test(key) && (!SHAPES[key] || SHAPES[key](value)))
  if (!valid) return { error: 'Plik jest uszkodzony. Zapisz postęp do pliku jeszcze raz na tamtym urządzeniu.' }
  return { data: file.data, exported: typeof file.exported === 'string' ? file.exported.slice(0, 10) : null }
}

// Zastępuje postęp w tej przeglądarce danymi z pliku. Zwraca false, gdy przeglądarka nie pozwala zapisać.
export function restoreProgress(data) {
  try {
    for (const key of storedKeys()) localStorage.removeItem(key)
    for (const [key, value] of Object.entries(data)) localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  } finally {
    notify()
  }
}

export function clearProgress() {
  try {
    for (const key of storedKeys()) localStorage.removeItem(key)
  } catch {
    // brak dostępu do localStorage – nie ma czego usuwać
  }
  notify()
}
