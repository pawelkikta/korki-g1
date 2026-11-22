// Moduł „Pierwsza pomoc” – porażenie prądem, RKO i pożar urządzenia pod napięciem.
// Treść zebrana z odpowiedzi w fiszkach, dopytaniach komisji i teście ABCD (r1q3, r1q9, r1q10, r3q9, r3q10, q6, q49),
// uzupełniona o kroki oceny poszkodowanego wg wytycznych ERC 2025 (rozdziały BLS i Pierwsza pomoc).
// ERC 2025 nie ma osobnej części o porażeniu prądem – uwolnienie spod napięcia to zasada bezpieczeństwa ratownika.
// Format sekcji jak w chapters.js (ChapterSection). Treść: Claude (AI) pod kierunkiem autora.

export const firstAidSections = [
  {
    heading: 'Co decyduje o skutkach porażenia',
    paragraphs: [
      'Najważniejsze jest **natężenie prądu płynącego przez ciało**, a nie samo napięcie. Liczą się też **czas przepływu**, **droga prądu** (przez serce – najgroźniejsza), rodzaj i częstotliwość prądu (przemienny 50 Hz jest groźniejszy niż stały) oraz rezystancja ciała.',
      'Mokra skóra ma znacznie mniejszą rezystancję – przy tym samym napięciu płynie kilka razy większy prąd. Przy 230 V przez 2000 Ω płynie ok. 115 mA, a przez 500 Ω – ok. 460 mA.',
    ],
    values: [
      { value: 'ok. 10 mA', label: 'próg samouwolnienia (AC) – dłoń zaciska się na przewodzie' },
      { value: '30 mA', label: 'prąd różnicowy RCD przeciwporażeniowego' },
      { value: '50 mA', label: 'prąd przemienny, który już może zabić' },
    ],
    box: { type: 'remember', text: 'Natężenie ważniejsze niż napięcie. O skutkach decydują prąd płynący przez ciało, czas i droga przepływu.' },
  },
  {
    heading: 'Najpierw uwolnij porażonego spod napięcia',
    paragraphs: [
      'Dopóki przez porażonego płynie prąd, każdy, kto dotknie go gołą ręką, staje się kolejną ofiarą. Dlatego pierwszy krok to zawsze **przerwanie przepływu prądu** – dopiero potem ocena i resuscytacja.',
    ],
    steps: [
      '**Wyłącz napięcie** – wyłącznikiem, zabezpieczeniem albo wyjmując wtyczkę. To najszybszy i najbezpieczniejszy sposób.',
      'Jeśli nie da się wyłączyć: **odizoluj siebie** – stań na suchym, nieprzewodzącym podłożu.',
      '**Odsuń porażonego suchym, nieprzewodzącym przedmiotem** – deską, suchą liną, złożoną suchą odzieżą. Nigdy gołymi rękami ani przedmiotem przewodzącym.',
      'Po uwolnieniu: sprawdź reakcję. Nie reaguje – od razu 112, potem oddech, RKO i AED.',
    ],
    box: {
      type: 'warning',
      title: 'Tylko do 1 kV',
      text: 'Przy napięciu powyżej 1 kV się nie podchodzi – trzeba doprowadzić do wyłączenia napięcia przez operatora sieci. Niebezpieczne jest już samo zbliżenie, m.in. przez **napięcie krokowe** (napięcie między stopami w pobliżu miejsca, w którym prąd spływa do ziemi). Z takiej strefy odchodzi się drobnymi krokami albo skacząc na złączonych nogach.',
    },
    box2: {
      type: 'mistake',
      text: 'Rękawice kuchenne nie są sprzętem ochronnym, a mokre drewno przewodzi. Liczy się suchy przedmiot izolujący i izolujące podłoże.',
    },
  },
  {
    heading: 'Ocena poszkodowanego i RKO',
    paragraphs: [
      'Wytyczne ERC 2025 zmieniły kolejność: **112 dzwonisz od razu, gdy poszkodowany nie reaguje**. Oddech oceniasz w trakcie połączenia, a dyspozytor pomoże ci rozpoznać, czy jest prawidłowy. Wcześniej (ERC 2021) najpierw oceniało się oddech, a dopiero potem dzwoniło.',
    ],
    steps: [
      'Sprawdź **reakcję** – zawołaj głośno, potrząśnij delikatnie za ramiona.',
      'Nie reaguje: **od razu wezwij 112** (najlepiej na głośniku telefonu) i poproś kogoś o **AED**.',
      'W trakcie połączenia udrożnij drogi oddechowe i **oceń oddech – nie dłużej niż 10 s**. Oddech wolny, ciężki albo pojedyncze westchnięcia (oddech agonalny) to nie jest prawidłowy oddech.',
      'Nie oddycha prawidłowo albo masz wątpliwości: zacznij **RKO: 30 uciśnięć klatki piersiowej + 2 oddechy**. Uciskasz na środku klatki piersiowej i po każdym uciśnięciu pozwalasz jej w pełni się unieść. Jeśli nie umiesz robić oddechów – uciskaj bez przerw.',
      'Gdy dotrze AED – włącz go i **wykonuj polecenia głosowe**. Nie przerywaj RKO, żeby samemu szukać AED.',
      'Oddycha prawidłowo, ale nie reaguje: **pozycja bezpieczna** i stała kontrola oddechu. Wyjątek: oznaki urazu, np. po upadku z drabiny – wtedy nie przekładaj poszkodowanego.',
    ],
    values: [
      { value: '≤ 10 s', label: 'ocena oddechu' },
      { value: '30:2', label: 'uciśnięcia : oddechy' },
      { value: '5–6 cm', label: 'głębokość uciśnięć u dorosłego' },
      { value: '100–120/min', label: 'tempo uciśnięć' },
    ],
    box: {
      type: 'remember',
      title: 'Dlaczego AED jest tu kluczowy',
      text: 'Porażenie prądem często wywołuje **migotanie komór**. Przerwać je może tylko defibrylacja – im wcześniej, tym większa szansa.',
    },
    box2: {
      type: 'warning',
      title: 'AED na mokrej posadzce',
      text: 'Przenieś poszkodowanego w suche miejsce albo osusz klatkę piersiową. Podczas analizy rytmu i wyładowania nikt nie dotyka poszkodowanego.',
    },
  },
  {
    heading: 'Przytomny i „czuje się dobrze” – i tak 112',
    paragraphs: [
      'Skutki porażenia bywają opóźnione: **zaburzenia rytmu serca** (zwykle w ciągu kilku godzin), uszkodzenia mięśni i nerek, oparzenia wewnętrzne wzdłuż drogi przepływu prądu. Dlatego po każdym porażeniu obowiązuje **ocena lekarska** – wezwij 112 albo zorganizuj transport do szpitala i obserwuj poszkodowanego do przyjazdu pomocy.',
      'Obejrzyj miejsca wejścia i wyjścia prądu – najczęściej dłonie i stopy. Oparzenie elektryczne bywa małe na skórze, ale głębokie w środku.',
    ],
    box: {
      type: 'trap',
      text: '„Skoro chodzi i mówi, że wszystko OK, może wracać do pracy” – to błąd. Po porażeniu zawsze 112 albo lekarz.',
    },
  },
  {
    heading: 'Gdy pali się urządzenie pod napięciem',
    steps: [
      'Jeśli to możliwe i bezpieczne – **wyłącz zasilanie** (wyłącznik główny albo przeciwpożarowy wyłącznik prądu).',
      'Zaalarmuj otoczenie i **wezwij straż pożarną**.',
      'Gaś **gaśnicą proszkową (ABC) albo śniegową (CO₂)** z odległości podanej na gaśnicy – typowo 1 m przy urządzeniach do 1 kV.',
    ],
    box: {
      type: 'mistake',
      title: 'Woda i zwykła piana – nie',
      text: 'Prąd może popłynąć strumieniem do ratownika. Gaśnica wodna lub mgłowa nadaje się tylko wtedy, gdy ma oznaczenie dopuszczające gaszenie urządzeń pod napięciem (np. „do 1000 V z odległości 1 m”).',
    },
    box2: {
      type: 'warning',
      title: 'Gaśnica śniegowa CO₂',
      text: 'Śnieg CO₂ ma ok. −78 °C – nie kieruje się go na ludzi, a gaśnicę trzyma się za uchwyt, bo dysza mocno się wychładza. W małym pomieszczeniu CO₂ wypiera tlen – po gaszeniu trzeba przewietrzyć.',
    },
  },
]

// Ćwiczenie: kolejność działań przy porażeniu. why – dlaczego ten krok jest za wcześnie, gdy klikniesz go przed czasem.
export const firstAidSequence = [
  { id: 'uwolnij', label: 'Przerwij przepływ prądu: wyłącz napięcie albo odsuń porażonego suchym, izolującym przedmiotem', why: '' },
  { id: 'reakcja', label: 'Sprawdź reakcję: zawołaj, potrząśnij za ramiona', why: 'Najpierw przerwij przepływ prądu – dopiero wtedy wolno dotknąć porażonego.' },
  { id: '112', label: 'Nie reaguje: od razu wezwij 112 (głośnik telefonu) i poproś o AED', why: 'Najpierw uwolnienie spod napięcia i sprawdzenie, czy poszkodowany reaguje.' },
  { id: 'oddech', label: 'W trakcie połączenia: udrożnij drogi oddechowe i oceń oddech (do 10 s)', why: 'Według wytycznych ERC 2025 najpierw dzwonisz na 112 – oddech oceniasz, czekając na połączenie.' },
  { id: 'rko', label: 'Nie oddycha prawidłowo: RKO 30 uciśnięć + 2 oddechy', why: 'RKO zaczynasz, gdy wiesz, że poszkodowany nie oddycha prawidłowo – po wezwaniu 112 i ocenie oddechu.' },
  { id: 'aed', label: 'AED dotarł: włącz go i wykonuj polecenia głosowe', why: 'AED dociera w trakcie RKO – do tego czasu uciskasz klatkę piersiową.' },
]
