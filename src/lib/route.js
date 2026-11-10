import { useCallback, useEffect, useState } from 'react'

// Adres ekranu w części # (np. #/pomiary/3). Działa na GitHub Pages bez konfiguracji serwera,
// a przycisk „Wstecz”, odświeżenie i zakładki przeglądarki trafiają w to samo miejsce.
function parseHash(hash, ids, fallback) {
  const [section = '', sub = ''] = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/')
  return ids.includes(section) ? { section, sub } : { section: fallback, sub: '' }
}

// ids – stała tablica dozwolonych sekcji (poza komponentem, żeby efekt nie odpinał się przy każdym renderze)
export function useHashRoute(ids, fallback) {
  const [route, setRoute] = useState(() => parseHash(window.location.hash, ids, fallback))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash, ids, fallback))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [ids, fallback])

  const navigate = useCallback((section, sub = '') => {
    window.location.hash = sub ? `/${section}/${sub}` : `/${section}`
  }, [])

  return [route, navigate]
}
