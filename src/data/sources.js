// Akty prawne i normy, na które powołują się wzorcowe odpowiedzi (pole `sources` w questions.js).
// Przy pytaniu: sources: [{ act: 'bhp', at: '§ 23 ust. 3' }] – act to klucz z tej listy, at to miejsce w akcie (opcjonalnie).
// Akt prawny ma link do karty aktu w ISAP: tam jest zawsze aktualny tekst ujednolicony i historia zmian.
// Wytyczne ERC mają link DOI do rozdziału w czasopiśmie „Resuscitation”. Normy PN są płatne, więc nie mają linku.
// Stan prawny i wytyczne sprawdzone w listopadzie 2026 r.

const isap = (id) => `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=${id}`

export const SOURCES = {
  // ── Ustawy ──
  pe: { name: 'Prawo energetyczne', url: isap('WDU19970540348') },
  pb: { name: 'Prawo budowlane', url: isap('WDU19940890414') },
  kp: { name: 'Kodeks pracy', url: isap('WDU19740240141') },
  pe2021: { name: 'ustawa z 20 maja 2021 r. o zmianie ustawy – Prawo energetyczne (Dz.U. 2021 poz. 1093)', url: isap('WDU20210001093') },

  // ── Rozporządzenia ──
  bhp: { name: 'rozporządzenie BHP przy urządzeniach energetycznych (t.j. Dz.U. 2021 poz. 1210)', url: isap('WDU20190001830') },
  kwal: { name: 'rozporządzenie w sprawie kwalifikacji do eksploatacji urządzeń (Dz.U. 2022 poz. 1392)', url: isap('WDU20220001392') },

  // ── Wytyczne resuscytacji ──
  'erc-bls': { name: 'Wytyczne ERC 2025: podstawowe zabiegi resuscytacyjne u dorosłych (BLS)', url: 'https://doi.org/10.1016/j.resuscitation.2025.110771' },
  'erc-fa': { name: 'Wytyczne ERC 2025: pierwsza pomoc', url: 'https://doi.org/10.1016/j.resuscitation.2025.110752' },

  // ── Normy ──
  'pn-hd-60364-1': { name: 'PN-HD 60364-1 (wymagania podstawowe, układy sieci)' },
  'pn-hd-60364-4-41': { name: 'PN-HD 60364-4-41 (ochrona przeciwporażeniowa)' },
  'pn-hd-60364-6': { name: 'PN-HD 60364-6 (sprawdzanie instalacji)' },
  'pn-hd-60364-7-722': { name: 'PN-HD 60364-7-722 (zasilanie pojazdów elektrycznych)' },
  'pn-en-50110-1': { name: 'PN-EN 50110-1 (eksploatacja urządzeń elektrycznych)' },
  'pn-en-61557': { name: 'PN-EN 61557 (przyrządy do pomiarów ochrony)' },
  'pn-en-61008-1': { name: 'PN-EN 61008-1 (wyłączniki różnicowoprądowe)' },
  'pn-en-62423': { name: 'PN-EN 62423 (wyłączniki różnicowoprądowe typu F i B)' },
  'pn-en-62305-3': { name: 'PN-EN 62305-3 (ochrona odgromowa obiektów)' },
  'pn-en-61140': { name: 'PN-EN 61140 (klasy ochronności)' },
  'pn-en-60529': { name: 'PN-EN 60529 (kod IP)' },
  'pn-en-3-7': { name: 'PN-EN 3-7 (gaśnice przenośne)' },
  'iec-60479-1': { name: 'IEC 60479-1 (skutki przepływu prądu przez ciało)' },
}
