// Aparaty w sekcji Urządzenia. Komponenty symulacji przypisuje DevicesPanel (po id).
export const DEVICES = [
  {
    id: 'mcb', short: 'Nadprądowy', title: 'Wyłącznik nadprądowy (MCB, „eska")',
    subtitle: 'Chroni przewody, a w układzie TN wyłącza też zwarcie na obudowę. Dwa wyzwalacze: bimetal łapie przeciążenia, cewka – zwarcia. Ustaw prąd suwakiem i zobacz, który zareaguje.',
  },
  {
    id: 'rcd', short: 'RCD', title: 'Wyłącznik różnicowoprądowy (RCD)',
    subtitle: 'Chroni ludzi. Porównuje prąd L i N – różnica oznacza, że prąd ucieka poza obwód. Zasymuluj upływ albo kliknij TEST na obudowie.',
  },
  {
    id: 'fuse', short: 'Topikowy', title: 'Bezpiecznik topikowy',
    subtitle: 'Najstarsze zabezpieczenie: drucik, który topi się od za dużego prądu. Jednorazowy – po zadziałaniu wymieniasz wkładkę.',
  },
  {
    id: 'rcbo', short: 'RCBO', title: 'RCBO – wyłącznik kombinowany',
    subtitle: 'MCB + RCD w jednym module. Wybierz rodzaj awarii i zobacz, która sekcja ją wykryje – to świetne ćwiczenie na rozumienie różnic.',
  },
  {
    id: 'spd', short: 'SPD', title: 'Ogranicznik przepięć (SPD)',
    subtitle: 'Warystor: na co dzień izoluje, przy przepięciu zwiera udar do uziemienia. Wyślij piorun – z SPD i bez niego.',
  },
  {
    id: 'dobor', short: 'Dobór', title: 'Dobór wyłącznika do mocy odbiornika',
    subtitle: 'Kalkulator: oblicz prąd z mocy (wzór 1- i 3-fazowy), dobierz najbliższą wartość znamionową z szeregu i charakterystykę B/C.',
  },
]
