// Skróty i oznaczenia – skąd się biorą. Każdy wpis: skrót, rozwinięcie w języku źródłowym
// (litery tworzące skrót w [nawiasach] – panel je wyróżnia), znaczenie po polsku i krótka uwaga.
// lang: fr | en | de | pl | sym (symbol / oznaczenie, nie skrót słów)

export const abbrLangs = {
  fr: 'z francuskiego',
  en: 'z angielskiego',
  de: 'z niemieckiego',
  pl: 'polski skrót',
  sym: 'oznaczenie',
}

export const abbrGroups = ['Układy sieci', 'Przewody', 'Aparaty i zabezpieczenia', 'Pomiary i symbole', 'Napięcia i ochrona', 'BHP i uprawnienia']

export const abbreviations = [
  // ───────────── Układy sieci ─────────────
  {
    id: 'tn', group: 'Układy sieci', abbr: 'TN', lang: 'fr', src: '[T]erre + [N]eutre', pl: 'ziemia + neutralny',
    note: 'Źródło uziemione na stacji, obudowy połączone przewodem z tym uziemionym punktem neutralnym. Prąd zwarcia na obudowę wraca metalicznie przez PE/PEN – jest duży, więc zabezpieczenie nadprądowe wyłącza szybko.',
  },
  {
    id: 'tn-c', group: 'Układy sieci', abbr: 'TN-C', lang: 'fr', src: 'TN-[C]ombiné', pl: 'połączony',
    note: 'N i PE w jednej żyle – przewodzie PEN. Stare instalacje dwużyłowe („zerowanie"). Przerwa w PEN = napięcie na obudowach.',
  },
  {
    id: 'tn-s', group: 'Układy sieci', abbr: 'TN-S', lang: 'fr', src: 'TN-[S]éparé', pl: 'oddzielony',
    note: 'Osobne N i PE na całej długości – od źródła do odbiornika.',
  },
  {
    id: 'tn-c-s', group: 'Układy sieci', abbr: 'TN-C-S', lang: 'fr', src: 'TN-[C]ombiné-[S]éparé', pl: 'najpierw razem, potem osobno',
    note: 'Do budynku przychodzi PEN, w złączu lub rozdzielnicy głównej rozdziela się go na N i PE. Za punktem rozdziału N i PE już nigdy się nie łączą. Dziś standard w Polsce.',
  },
  {
    id: 'tt', group: 'Układy sieci', abbr: 'TT', lang: 'fr', src: '[T]erre + [T]erre', pl: 'ziemia + ziemia',
    note: 'Źródło uziemione na stacji, obudowy na własnym, osobnym uziomie. Prąd zwarcia płynie przez grunt i dwa uziomy – jest mały, dlatego ochronę w praktyce daje RCD (warunek RA × IΔn ≤ 50 V).',
  },
  {
    id: 'it', group: 'Układy sieci', abbr: 'IT', lang: 'fr', src: '[I]solé + [T]erre', pl: 'izolowany + ziemia',
    note: 'Źródło odizolowane od ziemi (albo połączone z nią przez dużą impedancję), obudowy uziemione. Pierwsze doziemienie nie wyłącza zasilania – sygnalizuje je IMD. Sale operacyjne, kopalnie.',
  },
  {
    id: 'imd', group: 'Układy sieci', abbr: 'IMD', lang: 'en', src: '[I]nsulation [M]onitoring [D]evice', pl: 'urządzenie do monitorowania stanu izolacji',
    note: 'Serce układu IT: cały czas mierzy rezystancję izolacji względem ziemi i alarmuje po pierwszym doziemieniu.',
  },

  // ───────────── Przewody ─────────────
  {
    id: 'l', group: 'Przewody', abbr: 'L', lang: 'en', src: '[L]ine', pl: 'przewód liniowy (potocznie: fazowy)',
    note: 'L1, L2, L3 – trzy fazy sieci. Na starych schematach i tabliczkach fazy oznaczano R, S, T.',
  },
  {
    id: 'n', group: 'Przewody', abbr: 'N', lang: 'en', src: '[N]eutral', pl: 'przewód neutralny',
    note: 'Dawniej nazywany „zerowym" – stąd potoczne „zero" i stare słowo „zerowanie".',
  },
  {
    id: 'pe', group: 'Przewody', abbr: 'PE', lang: 'en', src: '[P]rotective [E]arth', pl: 'przewód ochronny',
    note: 'Dosłownie „ochronne uziemienie". Tylko żółto-zielony – tego koloru nie wolno użyć do niczego innego.',
  },
  {
    id: 'pen', group: 'Przewody', abbr: 'PEN', lang: 'en', src: '[PE] + [N]', pl: 'przewód ochronno-neutralny',
    note: 'Jedna żyła, dwie funkcje. Oznaczenie: żółto-zielony z niebieskimi końcówkami (albo niebieski z żółto-zielonymi). W punkcie rozdziału PEN łączy się z szyną PE – funkcja ochronna jest ważniejsza.',
  },
  {
    id: 'wlz', group: 'Przewody', abbr: 'WLZ', lang: 'pl', src: '[W]ewnętrzna [L]inia [Z]asilająca',
    note: 'Kabel od złącza do rozdzielnicy mieszkania lub domu. W bloku – pion na klatce schodowej.',
  },
  {
    id: 'zk', group: 'Przewody', abbr: 'ZK', lang: 'pl', src: '[Z]łącze [K]ablowe',
    note: 'Skrzynka na ścianie budynku lub w ogrodzeniu, gdzie kabel operatora łączy się z instalacją odbiorcy. Często tu jest granica własności i rozdział PEN.',
  },

  // ───────────── Aparaty i zabezpieczenia ─────────────
  {
    id: 'mcb', group: 'Aparaty i zabezpieczenia', abbr: 'MCB', lang: 'en', src: '[M]iniature [C]ircuit [B]reaker', pl: 'wyłącznik nadprądowy (instalacyjny)',
    note: 'Dosłownie „miniaturowy wyłącznik obwodu". Potocznie „eska" – od litery S w oznaczeniach popularnych serii (np. S301 B16).',
  },
  {
    id: 'bcd', group: 'Aparaty i zabezpieczenia', abbr: 'B / C / D', lang: 'sym', pl: 'charakterystyki wyłącznika nadprądowego',
    note: 'To nie skróty, tylko kolejne litery. Mówią, przy jakiej krotności In zadziała wyzwalacz zwarciowy: B – 3–5×In, C – 5–10×In, D – 10–20×In.',
  },
  {
    id: 'rcd', group: 'Aparaty i zabezpieczenia', abbr: 'RCD', lang: 'en', src: '[R]esidual [C]urrent [D]evice', pl: 'wyłącznik różnicowoprądowy',
    note: '„Residual" = reszta: to, co zostaje po zsumowaniu prądów w L i N. W sprawnym obwodzie suma wynosi 0. Gdy coś zostaje, prąd ucieka poza obwód – np. przez człowieka.',
  },
  {
    id: 'rccb', group: 'Aparaty i zabezpieczenia', abbr: 'RCCB', lang: 'en', src: '[R]esidual [C]urrent [C]ircuit [B]reaker', pl: 'wyłącznik różnicowoprądowy bez członu nadprądowego',
    note: 'Tak „różnicówka" nazywa się na tabliczce i w katalogu (PN-EN 61008). Nie chroni przed przeciążeniem ani zwarciem – potrzebuje zabezpieczenia nadprądowego.',
  },
  {
    id: 'rcbo', group: 'Aparaty i zabezpieczenia', abbr: 'RCBO', lang: 'en', src: '[R]esidual [C]urrent operated [B]reaker with [O]vercurrent protection', pl: 'wyłącznik różnicowoprądowy z członem nadprądowym',
    note: 'Różnicówka i eska w jednym module (PN-EN 61009). Jeden obwód = jedno RCBO, więc awaria nie wyłącza sąsiednich obwodów.',
  },
  {
    id: 'rcd-typy', group: 'Aparaty i zabezpieczenia', abbr: 'AC / A / F / B', lang: 'sym', src: 'typ AC: [A]lternating [C]urrent', pl: 'typy RCD – na jaki prąd różnicowy reagują',
    note: 'AC – tylko sinusoidalny prąd przemienny. A, F i B to oznaczenia typów, nie skróty słów: A – także pulsujący DC, F – także mieszane częstotliwości (falowniki 1-fazowe), B – także gładki DC (falowniki 3-fazowe, PV, ładowarki EV).',
  },
  {
    id: 'spd', group: 'Aparaty i zabezpieczenia', abbr: 'SPD', lang: 'en', src: '[S]urge [P]rotective [D]evice', pl: 'ogranicznik przepięć',
    note: 'Typy T1, T2, T3. Dawniej klasy B, C, D – nie myl ich z charakterystykami eski!',
  },
  {
    id: 'nh', group: 'Aparaty i zabezpieczenia', abbr: 'NH', lang: 'de', src: '[N]iederspannungs-[H]ochleistungs-Sicherung', pl: 'bezpiecznik niskonapięciowy dużej mocy (wkładka nożowa)',
    note: 'Niemiecki skrót, bo ten system wkładek pochodzi z norm niemieckich. Spotkasz go w złączach kablowych i rozdzielnicach głównych.',
  },
  {
    id: 'gg', group: 'Aparaty i zabezpieczenia', abbr: 'gG / aM', lang: 'sym', pl: 'oznaczenie wkładki topikowej',
    note: '1. litera – zakres wyłączania: g – pełnozakresowa (od przeciążeń po zwarcia), a – niepełnozakresowa (tylko zwarcia). 2. litera – przeznaczenie: G – ogólne, M – obwody silnikowe. Na starych wkładkach zobaczysz gL – dziś to gG.',
  },
  {
    id: 'pwp', group: 'Aparaty i zabezpieczenia', abbr: 'PWP', lang: 'pl', src: '[P]rzeciwpożarowy [W]yłącznik [P]rądu',
    note: 'Odcina zasilanie budynku przed akcją gaśniczą.',
  },

  // ───────────── Pomiary i symbole ─────────────
  {
    id: 'in', group: 'Pomiary i symbole', abbr: 'In', lang: 'sym', pl: 'prąd znamionowy',
    note: 'Indeks n – znamionowy (nominalny). Wyłącznik B16 → In = 16 A.',
  },
  {
    id: 'idn', group: 'Pomiary i symbole', abbr: 'IΔn', lang: 'sym', src: 'Δ – grecka litera delta, w technice znak różnicy', pl: 'znamionowy różnicowy prąd zadziałania RCD',
    note: '30 mA – ochrona ludzi, 300 mA – ochrona przeciwpożarowa. Sprawny RCD wyłącza przy prądzie między 0,5 a 1×IΔn.',
  },
  {
    id: 'ik', group: 'Pomiary i symbole', abbr: 'Ik', lang: 'de', src: 'I + [K]urzschluss', pl: 'prąd zwarciowy',
    note: 'Indeks k od niemieckiego Kurzschluss – zwarcie. Ik = U₀ / Zs, np. 230 V / 0,5 Ω = 460 A.',
  },
  {
    id: 'zs', group: 'Pomiary i symbole', abbr: 'Zs', lang: 'sym', pl: 'impedancja pętli zwarcia',
    note: 'Z – symbol impedancji, czyli „oporu" obwodu prądu przemiennego. Pętla: źródło → L → miejsce zwarcia → PE → z powrotem do źródła.',
  },
  {
    id: 'ia', group: 'Pomiary i symbole', abbr: 'Ia', lang: 'sym', pl: 'prąd samoczynnego zadziałania zabezpieczenia',
    note: 'Prąd, przy którym zabezpieczenie wyłączy w wymaganym czasie. Dla B16: 5 × 16 = 80 A. Warunek ochrony w TN: Zs × Ia ≤ U₀.',
  },
  {
    id: 'u0', group: 'Pomiary i symbole', abbr: 'U₀', lang: 'sym', pl: 'napięcie nominalne względem ziemi',
    note: 'W sieci 230/400 V: U₀ = 230 V. Między fazami jest 400 V, ale do warunków ochrony bierzesz U₀.',
  },
  {
    id: 're', group: 'Pomiary i symbole', abbr: 'RE', lang: 'en', src: 'R + [E]arth', pl: 'rezystancja uziemienia',
    note: 'E od angielskiego earth – ziemia, uziom.',
  },
  {
    id: 'ra', group: 'Pomiary i symbole', abbr: 'RA', lang: 'sym', pl: 'rezystancja uziemienia obudów w układzie TT',
    note: 'Suma rezystancji uziomu i przewodu ochronnego do obudowy. Warunek: RA × IΔn ≤ 50 V – przy RCD 30 mA wystarczy RA ≤ 1666 Ω.',
  },
  {
    id: 'epc', group: 'Pomiary i symbole', abbr: 'E / P / C', lang: 'en', src: '[E]arth · [P]otential · [C]urrent', pl: 'zaciski miernika uziemień',
    note: 'E – badany uziom, P – sonda napięciowa, C – sonda prądowa. Na części mierników zobaczysz E, S, H – z niemieckiego: Erder (uziom), Sonde (sonda), Hilfserder (uziom pomocniczy).',
  },
  {
    id: 'acdc', group: 'Pomiary i symbole', abbr: 'AC / DC', lang: 'en', src: '[A]lternating [C]urrent / [D]irect [C]urrent', pl: 'prąd przemienny / prąd stały',
    note: 'Rezystancję izolacji mierzy się napięciem stałym (DC) – dla instalacji 230/400 V jest to 500 V DC.',
  },
  {
    id: 'rms', group: 'Pomiary i symbole', abbr: 'RMS', lang: 'en', src: '[R]oot [M]ean [S]quare', pl: 'wartość skuteczna (pierwiastek ze średniej kwadratów)',
    note: 'TRUE RMS – miernik naprawdę liczy wartość skuteczną, także przy odkształconym przebiegu (zasilacze, falowniki, LED). Tańszy miernik zakłada sinusoidę i przy elektronice może pokazać błędny wynik.',
  },
  {
    id: 'cat', group: 'Pomiary i symbole', abbr: 'CAT II / III / IV', lang: 'en', src: '[CAT]egory', pl: 'kategoria pomiarowa miernika',
    note: 'Mówi, w którym miejscu instalacji miernik jest bezpieczny przy przepięciach: CAT II – gniazda i odbiorniki, CAT III – instalacja stała i rozdzielnice, CAT IV – początek instalacji: przyłącze, złącze, licznik. Mierzysz w złączu – potrzebujesz CAT IV.',
  },

  // ───────────── Napięcia i ochrona ─────────────
  {
    id: 'elv', group: 'Napięcia i ochrona', abbr: 'ELV', lang: 'en', src: '[E]xtra-[L]ow [V]oltage', pl: 'bardzo niskie napięcie',
    note: 'Do 50 V AC i 120 V DC (napięcia zakresu I).',
  },
  {
    id: 'selv', group: 'Napięcia i ochrona', abbr: 'SELV', lang: 'en', src: '[S]afety [E]xtra-[L]ow [V]oltage', pl: 'bardzo niskie napięcie bezpieczne',
    note: 'Obwód oddzielony od sieci (np. transformatorem bezpieczeństwa) i nieuziemiony.',
  },
  {
    id: 'pelv', group: 'Napięcia i ochrona', abbr: 'PELV', lang: 'en', src: '[P]rotective [E]xtra-[L]ow [V]oltage', pl: 'bardzo niskie napięcie ochronne',
    note: 'Jak SELV, ale obwód może być uziemiony.',
  },
  {
    id: 'felv', group: 'Napięcia i ochrona', abbr: 'FELV', lang: 'en', src: '[F]unctional [E]xtra-[L]ow [V]oltage', pl: 'bardzo niskie napięcie funkcjonalne',
    note: 'Niskie, bo tak potrzebuje urządzenie – ale bez oddzielenia bezpieczeństwa od sieci. Samo w sobie nie chroni przed porażeniem.',
  },
  {
    id: 'nn', group: 'Napięcia i ochrona', abbr: 'nN / SN / WN / NN', lang: 'pl', src: '[n]iskie [N]apięcie · [Ś]rednie · [W]ysokie · [N]ajwyższe', pl: 'poziomy napięć w sieci',
    note: 'nN – do 1 kV (instalacje 230/400 V), SN – w Polsce zwykle 15 lub 20 kV, WN – 110 kV, NN – 220 i 400 kV. Małe „n" w nN odróżnia niskie napięcie od najwyższego.',
  },
  {
    id: 'ip', group: 'Napięcia i ochrona', abbr: 'IP', lang: 'en', src: '[I]nternational [P]rotection', pl: 'stopień ochrony obudowy',
    note: 'Tak nazywa to norma PN-EN 60529; potocznie mówi się też Ingress Protection – ochrona przed wnikaniem. 1. cyfra – ciała stałe i pył, 2. cyfra – woda. X zamiast cyfry (np. IPX4) – tej cechy nie badano.',
  },
  {
    id: 'pvev', group: 'Napięcia i ochrona', abbr: 'PV / EV', lang: 'en', src: '[P]hoto[V]oltaics / [E]lectric [V]ehicle', pl: 'fotowoltaika / samochód elektryczny',
    note: 'Przy falownikach PV i ładowarkach EV może płynąć gładki prąd DC upływu – dlatego RCD typu B (albo typ A z detekcją DC 6 mA w ładowarce).',
  },

  // ───────────── BHP i uprawnienia ─────────────
  {
    id: 'sep', group: 'BHP i uprawnienia', abbr: 'SEP', lang: 'pl', src: '[S]towarzyszenie [E]lektryków [P]olskich',
    note: 'Przy SEP działa wiele komisji kwalifikacyjnych – stąd potoczna nazwa „uprawnienia SEP". Formalnie to świadectwo kwalifikacyjne.',
  },
  {
    id: 'ged', group: 'BHP i uprawnienia', abbr: 'G1 / E / D', lang: 'pl', src: '[G]rupa 1 · [E]ksploatacja · [D]ozór',
    note: 'G1 – urządzenia, instalacje i sieci elektroenergetyczne. E – sam wykonujesz prace eksploatacyjne. D – kierujesz pracami innych i nadzorujesz eksploatację (np. jako poleceniodawca).',
  },
  {
    id: 'bhp', group: 'BHP i uprawnienia', abbr: 'BHP', lang: 'pl', src: '[B]ezpieczeństwo i [H]igiena [P]racy',
  },
  {
    id: 'iobp', group: 'BHP i uprawnienia', abbr: 'IOBP', lang: 'pl', src: '[I]nstrukcja [O]rganizacji [B]ezpiecznej [P]racy',
    note: 'Zakładowa instrukcja: kto wydaje polecenia, jak przygotować strefę pracy, jakie dokumenty. Różni się od instrukcji eksploatacji – ta opisuje urządzenie.',
  },
  {
    id: 'ppn', group: 'BHP i uprawnienia', abbr: 'PPN', lang: 'pl', src: '[P]raca [P]od [N]apięciem',
    note: 'Wymaga specjalnego szkolenia i upoważnienia – samo świadectwo E lub D nie wystarcza.',
  },
  {
    id: 'dldv', group: 'BHP i uprawnienia', abbr: 'DL / DV', lang: 'en', src: '[D]istance – [L]ive working / [D]istance – [V]icinity', pl: 'granice stref wokół części pod napięciem',
    note: 'DL – zewnętrzna granica strefy prac pod napięciem, DV – zewnętrzna granica strefy prac w pobliżu napięcia (PN-EN 50110-1). Dla nN: DL – bez dotyku, DV – 0,3 m.',
  },
  {
    id: 'soi', group: 'BHP i uprawnienia', abbr: 'ŚOI', lang: 'pl', src: '[Ś]rodki [O]chrony [I]ndywidualnej',
    note: 'Rękawice, okulary lub osłona twarzy, odzież trudnopalna, hełm. Dobór zależy od zagrożenia, np. łuku elektrycznego.',
  },
  {
    id: 'rko', group: 'BHP i uprawnienia', abbr: 'RKO', lang: 'pl', src: '[R]esuscytacja [K]rążeniowo-[O]ddechowa',
    note: 'Po porażeniu: najpierw uwolnij poszkodowanego spod napięcia (odłącz zasilanie), potem sprawdź oddech. Brak oddechu: 112 + AED + RKO 30:2.',
  },
  {
    id: 'aed', group: 'BHP i uprawnienia', abbr: 'AED', lang: 'en', src: '[A]utomated [E]xternal [D]efibrillator', pl: 'automatyczny defibrylator zewnętrzny',
    note: 'Sam analizuje rytm serca i prowadzi głosem – może go użyć każdy świadek zdarzenia.',
  },
  {
    id: 'pn', group: 'BHP i uprawnienia', abbr: 'PN-EN / PN-HD', lang: 'en', src: '[P]olska [N]orma + [E]uropean [N]orm / [H]armonization [D]ocument', pl: 'polska wersja normy europejskiej / dokumentu harmonizacyjnego',
    note: 'PN-HD 60364 to seria norm o instalacjach niskiego napięcia – stąd warunki ochrony i czasy wyłączenia.',
  },
]
