import { APP_VERSION, REPO_URL } from '../version.js'

// Zgłaszanie błędów w treści. Link sam wpisuje, czego dotyczy zgłoszenie,
// więc zgłaszający opisuje tylko, co jest nie tak.
//
// Formularz Google „Korki G1 - zgłoś błąd” (https://forms.gle/kdq9isBgZpXAp5zx8).
// Numery pól entry.NNN: w edytorze ⋮ → „Pobierz link do wstępnego wypełnienia”. Nie zmieniają się po edycji
// treści pola, ale usunięcie pola i dodanie nowego daje nowy numer – wtedy popraw go tutaj.
// Pusty url = zgłoszenie otwiera się na GitHubie (szablon .github/ISSUE_TEMPLATE/blad-w-tresci.yml, wymaga konta).
export const REPORT_FORM = {
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSe7FC7Vi84P3jiH3McsgOj0JlJyomGiJiGFvw8Nz-57UvLoNQ/viewform',
  subject: 'entry.1527537435', // „Czego dotyczy?”
  meta: 'entry.1814484676', // „Wersja i miejsce w aplikacji”
}

const MAX = 280

// what – czego dotyczy zgłoszenie, po ludzku, np. „Fiszka r2q5: Jak mierzysz…”
export function reportUrl(what) {
  const subject = what.length > MAX ? `${what.slice(0, MAX - 1)}…` : what
  const meta = `v${APP_VERSION} · ${window.location.hash || '#/plan'}`
  if (REPORT_FORM.url) {
    const params = new URLSearchParams({ usp: 'pp_url', [REPORT_FORM.subject]: subject, [REPORT_FORM.meta]: meta })
    return `${REPORT_FORM.url}?${params}`
  }
  const params = new URLSearchParams({
    template: 'blad-w-tresci.yml',
    title: `Błąd: ${subject.length > 80 ? `${subject.slice(0, 79)}…` : subject}`,
    dotyczy: subject,
    wersja: meta,
  })
  return `${REPO_URL}/issues/new?${params}`
}
