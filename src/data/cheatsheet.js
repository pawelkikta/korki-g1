// Ściąga – wartości graniczne do wkucia (treść: Claude (AI) pod kierunkiem autora, skorygowane do aktualnych norm i przepisów)

export const cheatsheet = [
  { id: 'iso-u', group: 'Rezystancja izolacji', param: 'Napięcie pomiarowe (230/400 V)', value: '500 V DC', hint: 'Wyższe niż robocze – megaomomierz „stresuje" izolację' },
  { id: 'iso-min', group: 'Rezystancja izolacji', param: 'Minimum dopuszczalne', value: '1 MΩ', hint: '0,8 MΩ = instalacja do naprawy, nie ma „prawie dobrze"' },
  { id: 'iso-t', group: 'Rezystancja izolacji', param: 'Odczyt wyniku', value: 'po 60 s', hint: 'Praktyka: czekasz, aż wskazanie się ustabilizuje – izolacja ładuje się jak kondensator' },
  { id: 'pe-i', group: 'Ciągłość PE', param: 'Prąd / napięcie pomiarowe', value: '≥ 200 mA', hint: 'Przy 4–24 V (PN-EN 61557-4) – wynik miarodajny w mΩ. Brzęczyk multimetru piszczy nawet przy kilku Ω' },
  { id: 'rcd-in', group: 'RCD typ ogólny', param: 'Prąd różnicowy', value: '30 mA', hint: '300 mA to RCD przeciwpożarowy, nie przeciwporażeniowy' },
  { id: 'rcd-1in', group: 'RCD', param: 'Czas zadziałania przy 1×IΔn', value: '≤ 300 ms', hint: 'Przy znamionowym prądzie różnicowym' },
  { id: 'rcd-5in', group: 'RCD', param: 'Czas zadziałania przy 5×IΔn', value: '≤ 40 ms', hint: 'Większy prąd = musi wyłączyć szybciej' },
  { id: 'loop-04', group: 'Pętla zwarcia', param: 'Czas wyłączenia – obwody odbiorcze (TN 230 V)', value: '≤ 0,4 s', hint: 'Obwody do 32 A (z gniazdami do 63 A) – także oświetlenie' },
  { id: 'loop-5', group: 'Pętla zwarcia', param: 'Czas wyłączenia – obwody rozdzielcze (TN)', value: '≤ 5 s', hint: 'WLZ i obwody odbiorcze powyżej 32 A / 63 A' },
  { id: 're-10', group: 'Uziemienie odgromowe', param: 'Zalecana RE', value: '< 10 Ω', hint: 'PN-EN 62305-3. Nie mierz tuż po deszczu – zaniżysz wynik' },
  { id: 're-tt', group: 'Uziemienie w układzie TT', param: 'Warunek dla uziomu z RCD', value: 'RA·IΔn ≤ 50 V', hint: 'RCD 30 mA → RA ≤ 1666 Ω; RCD 300 mA → RA ≤ 166 Ω' },
  { id: 'rev-5', group: 'Kontrole inst. elektr.', param: 'Każdy budynek (art. 62 Prawa budowlanego)', value: 'co 5 lat', hint: 'Kontrolę może przeprowadzić osoba z D (art. 62 ust. 5) albo z uprawnieniami budowlanymi (ust. 4)' },
  { id: 'rev-1', group: 'Kontrole inst. elektr.', param: 'Strefy zagrożenia wybuchem', value: 'typowo co rok', hint: 'Ustala pracodawca w dokumencie zabezpieczenia przed wybuchem (ocena ryzyka). Przepis nie podaje „co rok" wprost' },
]

// Bonusowe liczby spoza tabeli, które padają na egzaminie
export const extraNumbers = [
  { id: 'g1-limit', group: 'Grupa G1', param: 'Granica pkt 2 (instalacje w budynkach)', value: '1 kV', hint: 'Powyżej 1 kV to już pkt 3–5 grupy G1' },
  { id: 'g1-pkt13', group: 'Grupa G1', param: 'Aparatura kontrolno-pomiarowa i automatyka', value: 'pkt 13', hint: 'Numeracja od 2022 r. – w starych materiałach „pkt 10" (dziś pkt 10 = sieć trakcyjna)' },
  { id: 'dist-03', group: 'BHP', param: 'Granica strefy prac w pobliżu napięcia (DV) do 1 kV', value: '0,3 m', hint: 'DL (strefa prac pod napięciem) do 1 kV = „bez dotyku". Rozporządzenie BHP 2019' },
  { id: 'lethal', group: 'Porażenie', param: 'Prąd potencjalnie śmiertelny', value: '50 mA AC', hint: 'Dlatego RCD 30 mA – wyłącza zanim będzie groźnie' },
  { id: 'cert-5', group: 'Świadectwo kwalifikacyjne', param: 'Ważność świadectwa', value: '5 lat', hint: 'Od daty wydania. Bezterminowe wygasły 3.07.2026. Odnowienie = egzamin' },
  { id: 'class3', group: 'Klasa III', param: 'Napięcie bezpieczne SELV/PELV', value: '≤ 50 V AC', hint: 'Lub ≤ 120 V DC' },
  { id: 'rko', group: 'Pierwsza pomoc', param: 'Schemat RKO', value: '30 : 2', hint: '30 uciśnięć + 2 oddechy, wezwij 112' },
]
