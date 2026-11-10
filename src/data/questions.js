// 55 pytań egzaminacyjnych SEP G1 – 4 rundy (treść: Claude (AI) pod kierunkiem autora, sprawdzona z przepisami)
// trap: opis pułapki (pytania podchwytliwe), wrongAnswer: typowa błędna odpowiedź na egzaminie
// category: obszar egzaminu (areas.js), topic: gdzie doczytać teorię (topics.js)

export const rounds = [
  { id: 1, title: 'Podstawy', subtitle: 'Eksploatacja, BHP, dozór, pierwsza pomoc', count: 12 },
  { id: 2, title: 'Pomiary + dozór', subtitle: 'Pomiary, klasy ochronności, IP', count: 14 },
  { id: 3, title: 'Podchwytliwe', subtitle: 'Typowe błędy na egzaminie', count: 13 },
  { id: 4, title: 'Pomiary – pełny zakres', subtitle: 'Zakres kontrolno-pomiarowy + ściąga', count: 16 },
]

export const questions = [
  // ───────────────────────────── RUNDA 1 ─────────────────────────────
  {
    id: 'r1q1', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Co to są uprawnienia SEP grupy G1 i co obejmują?',
    answer:
      'Świadectwo kwalifikacyjne grupy 1 – urządzenia, instalacje i sieci elektroenergetyczne. Rozporządzenie z 2022 r. dzieli grupę na 16 punktów (rodzajów urządzeń), m.in. pkt 2 – urządzenia, instalacje i sieci do 1 kV, pkt 9 – oświetlenie uliczne, pkt 13 – aparatura kontrolno-pomiarowa i automatyka. Do tego dochodzi zakres czynności: obsługa, konserwacja, remont, montaż, kontrolno-pomiarowy.',
    keyPoints: '„Elektroenergetyczne", rodzaj urządzeń (np. pkt 2 – do 1 kV) + zakres czynności (w tym kontrolno-pomiarowy). Numeracja punktów wg rozporządzenia z 2022 r.',
  },
  {
    id: 'r1q2', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Czym różni się eksploatacja (E) od dozoru (D) w uprawnieniach SEP?',
    answer:
      'Eksploatacja (E) to uprawnienie do bezpośredniej pracy przy urządzeniach – obsługa, konserwacja, montaż, pomiary. Dozór (D) to uprawnienie do nadzorowania prac wykonywanych przez innych, planowania i organizacji bezpiecznej pracy.',
    keyPoints: 'E = fizyczna praca, D = nadzór nad innymi.',
  },
  {
    id: 'r1q3', round: 1, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Jakie środki gaśnicze wolno stosować przy gaszeniu urządzeń elektrycznych pod napięciem?',
    answer:
      'Przy urządzeniach pod napięciem używa się gaśnic dopuszczonych do gaszenia urządzeń pod napięciem – w praktyce proszkowych (ABC) lub śniegowych (CO2). Dopuszczalne napięcie i bezpieczną odległość podaje oznaczenie na gaśnicy, np. „do 1000 V z odległości 1 m". Nie gasi się wodą z hydrantu ani zwykłą pianą – prąd może popłynąć strumieniem do ratownika. Gaśnica wodna lub mgłowa nadaje się tylko wtedy, gdy ma takie oznaczenie (przeszła badanie dielektryczne).',
    keyPoints: 'Proszek ABC i CO2 – TAK (sprawdź oznaczenie, np. do 1000 V, 1 m). Woda i zwykła piana – NIE.',
  },
  {
    id: 'r1q4', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Czym są strefa prac pod napięciem i strefa prac w pobliżu napięcia? Jakie odległości obowiązują do 1 kV?',
    answer:
      'Rozporządzenie BHP przy urządzeniach energetycznych (2019) wyznacza wokół nieosłoniętych części pod napięciem dwie strefy: strefę prac pod napięciem (granica DL) i strefę prac w pobliżu napięcia (granica DV). Dla urządzeń do 1 kV: DL – „bez dotyku" (każde dotknięcie części czynnej to już praca pod napięciem), DV – 0,3 m. Pracując w pobliżu napięcia, nie wolno przekroczyć tych odstępów żadną częścią ciała, narzędziem ani przedmiotem – chyba że części czynne zostaną osłonięte.',
    keyPoints: 'Do 1 kV: DL = bez dotyku, DV = 0,3 m. Dwie strefy: prac pod napięciem i prac w pobliżu napięcia.',
    trap: 'Stare materiały podają „0,5 m" i „strefę niebezpieczną" – to nie są pojęcia z obecnego rozporządzenia.',
    wrongAnswer: '„Do 1 kV bezpieczna odległość to 0,5 m" – obecnie granica strefy prac w pobliżu napięcia to 0,3 m.',
  },
  {
    id: 'r1q5', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Na kim spoczywa obowiązek wyposażenia stanowisk pracy w instrukcje eksploatacyjne?',
    answer:
      'Obowiązek spoczywa na pracodawcy lub osobie kierującej pracownikami. Pracodawca jest zobowiązany do opracowania i udostępnienia instrukcji eksploatacyjnych dla każdego stanowiska pracy przy urządzeniach elektrycznych.',
    keyPoints: 'Pracodawca – nie pracownik, nie SEP.',
  },
  {
    id: 'r1q6', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Co to jest polecenie pisemne i kiedy jest wymagane przy pracach eksploatacyjnych?',
    answer:
      'Polecenie pisemne wydaje poleceniodawca (osoba upoważniona przez pracodawcę, ze świadectwem D). Określa zakres i miejsce pracy, środki bezpieczeństwa, sposób przygotowania strefy pracy oraz osoby funkcyjne (dopuszczający, kierujący zespołem, ewentualnie koordynujący i nadzorujący). Na polecenie pisemne wykonuje się prace stwarzające możliwość wystąpienia szczególnego zagrożenia dla zdrowia lub życia. Które prace wymagają polecenia, a które można wykonywać bez niego, określa pracodawca w instrukcji organizacji bezpiecznej pracy (IOBP).',
    keyPoints: 'Polecenie pisemne = prace w warunkach szczególnego zagrożenia. Wydaje poleceniodawca (D). Wykaz prac – w IOBP pracodawcy.',
  },
  {
    id: 'r1q7', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Jakie dokumenty powinien posiadać elektryk przystępujący do pracy?',
    answer:
      'Ważne świadectwo kwalifikacyjne (E, z właściwą grupą, punktem i zakresem czynności), aktualne badania lekarskie, aktualne szkolenie BHP oraz upoważnienie pracodawcy. Do prac w warunkach szczególnego zagrożenia dodatkowo polecenie pisemne i dopuszczenie do pracy.',
    keyPoints: 'Świadectwo kwalifikacyjne + badania lekarskie + BHP + upoważnienie pracodawcy; przy pracach szczególnie niebezpiecznych – polecenie i dopuszczenie.',
  },
  {
    id: 'r1q8', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Co to jest napięcie znamionowe i jaka wartość przyjmuje się za granicę grupy G1?',
    answer:
      'Napięcie znamionowe to napięcie, do pracy przy którym urządzenie zostało zaprojektowane. W grupie G1 kluczowa granica to 1 kV (1000 V): do 1 kV – pkt 2 (większość instalacji budynkowych i przemysłowych nn), powyżej – pkt 3–5. Sama grupa G1 obejmuje wszystkie napięcia.',
    keyPoints: '1 kV = granica pkt 2 w G1. Sieć domowa 230/400 V = pkt 2.',
  },
  {
    id: 'r1q9', round: 1, category: 'Pierwsza pomoc', topic: 'pierwsza-pomoc',
    question: 'Jak udzielić pierwszej pomocy osobie porażonej prądem elektrycznym?',
    answer:
      '1. Odłącz napięcie lub odsuń poszkodowanego od źródła prądu izolowanym przedmiotem – nigdy gołymi rękami. 2. Sprawdź reakcję, udrożnij drogi oddechowe i oceń oddech (do 10 s). 3. Jeśli nie oddycha prawidłowo – wezwij 112, poproś o AED i natychmiast zacznij RKO: 30 uciśnięć klatki piersiowej + 2 oddechy. 4. Gdy dotrze AED – włącz go i wykonuj polecenia; porażenie prądem często wywołuje migotanie komór, które może przerwać tylko defibrylacja. 5. Jeśli oddycha, ale jest nieprzytomny – pozycja bezpieczna i stała kontrola oddechu.',
    keyPoints: 'Najpierw odłącz prąd. Brak oddechu → 112 + AED + RKO 30:2. Po porażeniu AED jest kluczowy (migotanie komór).',
  },
  {
    id: 'r1q10', round: 1, category: 'Pierwsza pomoc', topic: 'pierwsza-pomoc',
    question: 'Jakie czynniki wpływają na skutki porażenia prądem elektrycznym?',
    answer:
      'Wartość natężenia prądu (najważniejsza), napięcie, rodzaj prądu (AC groźniejszy niż DC), czas przepływu, droga prądu przez ciało, opór ciała (sucha/mokra skóra), częstotliwość (50 Hz AC szczególnie groźna). Już 50 mA AC może być śmiertelne.',
    keyPoints: 'Natężenie > napięcie. 50 mA AC = zagrożenie życia. Mokra skóra = mniejszy opór = większe niebezpieczeństwo.',
  },
  {
    id: 'r1q11', round: 1, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie są obowiązki osoby sprawującej dozór nad pracami przy urządzeniach elektrycznych?',
    answer:
      'Osoba dozorująca musi: zapewnić warunki BHP przed rozpoczęciem prac, sprawdzić kwalifikacje pracowników, nadzorować przebieg prac, wydawać polecenia, kontrolować środki ochrony indywidualnej, dopilnować bezpiecznego zakończenia pracy i przywrócenia urządzeń do stanu normalnego.',
    keyPoints: 'Dozór = odpowiedzialność za bezpieczeństwo całego zespołu.',
  },
  {
    id: 'r1q12', round: 1, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Na jak długo wydawane są świadectwa kwalifikacyjne SEP i kiedy można je odnowić?',
    answer:
      'Świadectwo kwalifikacyjne jest ważne 5 lat od daty wydania (art. 54 Prawa energetycznego). „Odnowienie" to ponowne zdanie egzaminu – warto zaplanować je z wyprzedzeniem. Dawne świadectwa „bezterminowe" straciły ważność 3 lipca 2026 r. Po wygaśnięciu świadectwa nie wolno wykonywać prac, do których jest wymagane.',
    keyPoints: '5 lat od daty wydania. Odnowienie = egzamin. Bezterminowe świadectwa wygasły 3.07.2026.',
  },

  // ───────────────────────────── RUNDA 2 ─────────────────────────────
  {
    id: 'r2q1', round: 2, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Co to jest pomiar rezystancji izolacji i kiedy się go wykonuje?',
    answer:
      'Sprawdza, czy izolacja przewodów i urządzeń nie jest uszkodzona – mierzy opór między przewodem fazowym a PE lub ekranem. Wykonuje się go przy odbiorze nowej instalacji, po remoncie, po zalaniu lub pożarze, oraz w ramach przeglądów okresowych.',
    keyPoints: 'Megaomomierz, 500 V DC dla instalacji 230/400 V, wynik min. 1 MΩ.',
  },
  {
    id: 'r2q2', round: 2, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jaki przyrząd i jakie napięcie pomiarowe stosuje się do pomiaru rezystancji izolacji instalacji 230/400 V?',
    answer:
      'Megaomomierz (miernik rezystancji izolacji). Napięcie pomiarowe: 500 V DC. Minimalna dopuszczalna wartość rezystancji izolacji: 1 MΩ. Poniżej 1 MΩ – instalacja wymaga naprawy przed oddaniem do użytku.',
    keyPoints: 'Megaomomierz + 500 V DC + wynik ≥ 1 MΩ. Trzy liczby do zapamiętania.',
  },
  {
    id: 'r2q3', round: 2, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Na czym polega pomiar impedancji pętli zwarcia i jaki jest jego cel?',
    answer:
      'Mierzy impedancję pętli: przewód fazowy → urządzenie → przewód ochronny PE → powrót do źródła. Na podstawie wyniku oblicza się prąd zwarciowy i sprawdza, czy zadziała zabezpieczenie. Im niższa impedancja, tym wyższy prąd zwarciowy, tym pewniejsze zadziałanie.',
    keyPoints: 'Mała impedancja = dobra ochrona. TN 230 V: ≤ 0,4 s dla obwodów odbiorczych do 32 A (z gniazdami do 63 A), ≤ 5 s dla obwodów rozdzielczych.',
  },
  {
    id: 'r2q4', round: 2, category: 'Pomiary', topic: 'rcd',
    question: 'Co to jest wyłącznik różnicowoprądowy (RCD) i jak sprawdzić jego poprawne działanie?',
    answer:
      'Wyłącznik reagujący na prąd różnicowy między fazą a neutralem – wykrywa upływ prądu np. przez ciało człowieka. RCD o IΔn 30 mA daje ochronę uzupełniającą przy dotyku części czynnej. Sprawdzenie: przyciskiem TEST na obudowie – zwykle raz w miesiącu, wg zalecenia producenta – oraz miernikiem RCD, który mierzy czas i prąd zadziałania.',
    keyPoints: 'IΔn 30 mA = ochrona uzupełniająca. Czas zadziałania przy 1×IΔn ≤ 300 ms. TEST – zwykle co miesiąc, wg zalecenia producenta.',
  },
  {
    id: 'r2q5', round: 2, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Czym różni się pomiar ciągłości przewodów ochronnych PE od pomiaru rezystancji izolacji?',
    answer:
      'Ciągłość PE: sprawdza czy przewód ochronny jest nieprzerwany. Mierzy się małą rezystancję (mΩ..Ω) przy niskim napięciu DC. Rezystancja izolacji: sprawdza jakość izolacji. Mierzy się bardzo dużą rezystancję (MΩ) przy wysokim napięciu DC (500 V). Oba pomiary obowiązkowe przy odbiorze instalacji.',
    keyPoints: 'PE ciągłość = małe R, izolacja = duże R. Różne przyrządy, różne napięcia, różny cel.',
  },
  {
    id: 'r2q6', round: 2, category: 'Pomiary', topic: 'podstawy-prawne',
    question: 'Co musisz mieć w świadectwie kwalifikacyjnym, żeby wykonywać pomiary instalacji elektrycznej? Czym jest punkt 13 (dawniej 10)?',
    answer:
      'Do wykonywania pomiarów potrzebny jest zakres kontrolno-pomiarowy wpisany dla urządzeń, które mierzysz – dla instalacji w budynkach to G1 pkt 2 (do 1 kV). Punkt 13 grupy G1 (w rozporządzeniu z 2003 r. był to pkt 10) to rodzaj urządzeń: aparatura kontrolno-pomiarowa oraz urządzenia i instalacje automatycznej regulacji, sterowania i zabezpieczeń. Kontrolę okresową instalacji z art. 62 Prawa budowlanego może przeprowadzić osoba z kwalifikacjami dozoru (D) albo z uprawnieniami budowlanymi.',
    keyPoints: 'Pomiary = zakres kontrolno-pomiarowy. Pkt 13 (dawniej 10) = aparatura pomiarowa i automatyka. Dziś pkt 10 = sieć trakcyjna.',
    trap: 'Na kursach wciąż mówi się „pomiary z pkt 10" – to stara numeracja i skrót myślowy.',
    wrongAnswer: '„Pkt 10 = pomiary" – od 2022 r. pkt 10 grupy G1 to elektryczna sieć trakcyjna.',
  },
  {
    id: 'r2q7', round: 2, category: 'Pomiary', topic: 'protokol',
    question: 'Jakie elementy musi zawierać protokół pomiarowy?',
    answer:
      'Protokół musi zawierać: dane obiektu i instalacji, typ i numer seryjny przyrządów pomiarowych ze świadectwami wzorcowania, wyniki pomiarów dla każdego obwodu z jednostkami, ocenę zgodności z normą, datę wykonania, podpis osoby wykonującej pomiary – ze świadectwem kwalifikacyjnym obejmującym zakres kontrolno-pomiarowy.',
    keyPoints: 'Świadectwa wzorcowania + wyniki każdego obwodu + podpis osoby z zakresem kontrolno-pomiarowym.',
  },
  {
    id: 'r2q8', round: 2, category: 'Eksploatacja', topic: 'klasy',
    question: 'Co oznaczają klasy ochronności urządzeń elektrycznych I, II i III?',
    answer:
      'Klasa I: izolacja podstawowa + przewód ochronny PE (uziemienie). Klasa II: podwójna lub wzmocniona izolacja, brak PE – symbol kwadratu w kwadracie. Klasa III: zasilanie napięciem bezpiecznym SELV/PELV (≤ 50 V AC lub ≤ 120 V DC). Klasa II i III nie wymagają uziemienia.',
    keyPoints: 'I = PE wymagany, II = bez PE (kwadrat w kwadracie), III = ≤ 50 V AC.',
  },
  {
    id: 'r2q9', round: 2, category: 'Eksploatacja', topic: 'klasy',
    question: 'Co oznacza oznaczenie IP (np. IP44) na urządzeniu elektrycznym?',
    answer:
      'IP (Ingress Protection) – stopień ochrony obudowy. Pierwsza cyfra (0–6): ochrona przed ciałami stałymi i pyłem (4 = cząstki > 1 mm). Druga cyfra (0–9): ochrona przed wodą (4 = bryzgi z każdego kierunku). IP44 = minimum dla urządzeń na zewnątrz lub w wilgotnych pomieszczeniach.',
    keyPoints: '1. cyfra = pył, 2. cyfra = woda. IP44 = minimum zewnętrze. IP67 = zanurzenie do 1 m.',
  },
  {
    id: 'r2q10', round: 2, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Jakie są obowiązki elektryka bezpośrednio przed przystąpieniem do pracy przy urządzeniu wyłączonym spod napięcia?',
    answer:
      'Elektryk musi: sprawdzić ważność swoich uprawnień SEP, upewnić się że ma polecenie, osobiście sprawdzić brak napięcia wskaźnikiem napięcia – nigdy nie wolno zakładać że napięcie jest wyłączone, sprawdzić czy założone są uziemiacze i tabliczki ostrzegawcze, dopiero wtedy przystąpić do pracy.',
    keyPoints: 'Zawsze sprawdź napięcie wskaźnikiem osobiście. „Założył, że jest wyłączone" = najczęstsza przyczyna wypadków.',
  },
  {
    id: 'r2q11', round: 2, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie osoby funkcyjne występują przy pracy na polecenie pisemne i jakie muszą mieć kwalifikacje?',
    answer:
      'Poleceniodawca – wydaje polecenie pisemne; świadectwo D i upoważnienie pracodawcy. Koordynujący – koordynuje prace kilku zespołów lub w kilku miejscach; świadectwo D. Dopuszczający – przygotowuje strefę pracy (czynności łączeniowe) i dopuszcza zespół; świadectwo E i upoważnienie. Kierujący zespołem – kieruje pracą na miejscu, sprawdza i przyjmuje strefę pracy; świadectwo E. Nadzorujący – nadzoruje pracę osób bez kwalifikacji lub obcych firm i nie wykonuje innych prac; E lub D. Członkowie zespołu – wykonują pracę. Przy poleceniu pisemnym nie łączy się więcej niż dwóch funkcji, a funkcji dopuszczającego i kierującego zespołem nie łączy się wcale (wyjątek: prace pod napięciem).',
    keyPoints: 'Poleceniodawca (D), koordynujący (D), dopuszczający (E), kierujący zespołem (E), nadzorujący (E lub D), członek zespołu. Dopuszczający ≠ kierujący.',
  },
  {
    id: 'r2q12', round: 2, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie czynności musi wykonać dopuszczający przed dopuszczeniem zespołu do pracy?',
    answer:
      'Po uzyskaniu zezwolenia od koordynującego lub poleceniodawcy: 1) wyłączyć napięcie ze wszystkich stron tak, by uzyskać przerwę izolacyjną, 2) zabezpieczyć przed przypadkowym załączeniem (do 1 kV: wyjęte wkładki albo zablokowany napęd) i wywiesić tablice „Nie załączać – pracują ludzie", 3) sprawdzić brak napięcia sprawnym wskaźnikiem na wszystkich fazach i N, 4) uziemić i zewrzeć – ze wszystkich stron, co najmniej jeden uziemiacz widoczny z miejsca pracy, 5) ogrodzić i oznaczyć strefę, osłonić sąsiednie części pod napięciem, 6) dopuścić zespół: wskazać strefę, udowodnić brak napięcia, potwierdzić podpisami w poleceniu.',
    keyPoints: 'Wyłącz → zabezpiecz → sprawdź brak napięcia → uziem → oznacz strefę → dopuść. Uziemienie zakłada się po sprawdzeniu braku napięcia, nie przed.',
  },
  {
    id: 'r2q13', round: 2, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Jak często należy wykonywać przeglądy i pomiary instalacji elektrycznych w budynkach?',
    answer:
      'Art. 62 Prawa budowlanego: kontrola instalacji elektrycznej co najmniej raz na 5 lat – może ją przeprowadzić osoba z kwalifikacjami dozoru (D) albo z uprawnieniami budowlanymi. Częściej kontroluje się tam, gdzie ryzyko jest większe – np. w strefach zagrożenia wybuchem częstotliwość ustala pracodawca w dokumencie zabezpieczenia przed wybuchem, zwykle co rok. Pomiary wykonuje elektryk z zakresem kontrolno-pomiarowym.',
    keyPoints: 'Co 5 lat = art. 62 (kontroluje osoba z D albo z uprawnieniami budowlanymi). Strefy Ex = częściej, wg dokumentu zabezpieczenia przed wybuchem (typowo co rok).',
  },
  {
    id: 'r2q14', round: 2, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Jakie środki ochrony indywidualnej są wymagane przy pracach przy urządzeniach elektrycznych?',
    answer:
      'Sprzęt ochronny izolacyjny dobrany do napięcia: rękawice elektroizolacyjne, obuwie lub dywanik izolacyjny, drążki izolacyjne. Sprzęt do zabezpieczenia strefy: wskaźnik napięcia, uziemiacze lub zwieracze przenośne, tablice. Przy ryzyku łuku elektrycznego: hełm z przeciwłukową osłoną twarzy i odzież trudnopalna. Sprzęt ogląda się przed każdym użyciem i musi mieć aktualne badania okresowe.',
    keyPoints: 'Sprzęt izolacyjny dobrany do napięcia + wskaźnik + uziemiacze. Łuk = hełm z osłoną twarzy. Oględziny przed użyciem i aktualne badania okresowe.',
  },

  // ───────────────────────────── RUNDA 3 ─────────────────────────────
  {
    id: 'r3q1', round: 3, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Czy elektryk z uprawnieniami E może sam wyłączyć napięcie i przystąpić do pracy bez polecenia?',
    answer:
      'To zależy od rodzaju pracy – a samo wyłączenie napięcia niczego tu nie zmienia. Prace stwarzające możliwość szczególnego zagrożenia wykonuje się wyłącznie na polecenie pisemne, z przygotowaniem strefy pracy i dopuszczeniem. Bez polecenia wolno wykonywać tylko prace wskazane przez pracodawcę – typowo rutynowe czynności opisane w instrukcji eksploatacji – oraz działania ratujące życie, zdrowie lub mienie (z niezwłocznym powiadomieniem przełożonego).',
    keyPoints: 'Szczególne zagrożenie → polecenie pisemne. Bez polecenia: prace z instrukcji eksploatacji wskazane w IOBP i ratowanie życia/mienia. Uprawnienia E same nie wystarczą.',
    trap: 'Brzmi logicznie – sam wyłączył, sam sprawdził. Komisja sprawdza, czy wiesz, kiedy potrzebne jest polecenie.',
    wrongAnswer: '„Tak, bo mam E i sam wyłączyłem napięcie." – uprawnienia nie zastępują polecenia ani dopuszczenia.',
  },
  {
    id: 'r3q2', round: 3, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Kolega mówi ci że sprawdził napięcie i jest wyłączone – czy możesz zacząć pracę?',
    answer:
      'Nie. Każda osoba przystępująca do pracy musi osobiście sprawdzić brak napięcia własnym wskaźnikiem – bezpośrednio przed dotykiem. Zasada: „Nie zakładaj, zawsze sprawdź." Słowo kolegi nie jest wystarczającym zabezpieczeniem.',
    keyPoints: 'Osobiste sprawdzenie wskaźnikiem = obowiązek każdego elektryka.',
    trap: 'Komisja sprawdza czy wiesz że zaufanie = śmierć w elektryce.',
    wrongAnswer: '„Tak, ufam koledze." – komisja przerwie i obleje.',
  },
  {
    id: 'r3q3', round: 3, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Instalacja ma rezystancję izolacji 0,8 MΩ – czy można ją oddać do użytku?',
    answer:
      'Nie. Minimalna dopuszczalna rezystancja izolacji dla instalacji 230/400 V wynosi 1 MΩ. Wynik 0,8 MΩ jest poniżej normy – instalacja nie może zostać oddana do użytku. Należy zlokalizować i naprawić uszkodzenie izolacji, następnie powtórzyć pomiar.',
    keyPoints: '< 1 MΩ = instalacja do naprawy. Nie ma „prawie dobrze".',
    trap: '0,8 MΩ to dużo – brzmi jak dobry wynik. Ale próg to 1 MΩ.',
    wrongAnswer: '„Tak, to dużo omów." – wartości poniżej 1 MΩ dyskwalifikują instalację.',
  },
  {
    id: 'r3q4', round: 3, category: 'Eksploatacja', topic: 'urzadzenia',
    question: 'Czy wyłącznik nadprądowy (np. B16) chroni człowieka przed porażeniem prądem?',
    answer:
      'Częściowo – i trzeba umieć powiedzieć kiedy. W układzie TN wyłącznik nadprądowy realizuje ochronę przy uszkodzeniu (dotyk pośredni) przez samoczynne wyłączenie zasilania: gdy faza zewrze się z obudową, prąd zwarciowy płynie przez PE i wyłącznik wyłącza obwód – pod warunkiem, że impedancja pętli zwarcia jest dostatecznie mała (B16: ≥ 80 A, czyli Zs ≤ 2,88 Ω). Nie chroni natomiast przy dotyku części czynnej (np. fazy) – prąd płynący przez ciało (dziesiątki–setki mA) jest dla niego niezauważalny. Tu działa ochrona uzupełniająca: RCD 30 mA.',
    keyPoints: 'Zwarcie na obudowę (dotyk pośredni) → wyłącznik nadprądowy, jeśli Zs jest mała. Dotyk fazy przez człowieka → tylko RCD 30 mA. Podstawowa funkcja MCB to ochrona przewodów przed przeciążeniem i zwarciem.',
    trap: 'Slogan „bezpiecznik chroni kable, RCD chroni ludzi" jest za prosty – komisja dopyta o samoczynne wyłączenie zasilania w TN.',
    wrongAnswer: '„Nie, wyłącznik nadprądowy w ogóle nie chroni przed porażeniem" – a pomiar pętli zwarcia sprawdza właśnie tę ochronę.',
  },
  {
    id: 'r3q5', round: 3, category: 'Eksploatacja', topic: 'klasy',
    question: 'Czy urządzenie klasy II (podwójna izolacja) musi być podłączone do przewodu ochronnego PE?',
    answer:
      'Nie. Urządzenie klasy II ma podwójną lub wzmocnioną izolację i jest zaprojektowane do pracy bez przewodu ochronnego PE. Symbol klasy II to kwadrat w kwadracie na tabliczce znamionowej.',
    keyPoints: 'Klasa II = bezpieczna bez PE. Symbol kwadrat w kwadracie.',
    trap: 'PE kojarzony z bezpieczeństwem – intuicja mówi „tak".',
    wrongAnswer: '„Tak, dla bezpieczeństwa zawsze PE." – klasa II jest bezpieczna bez PE z założenia.',
  },
  {
    id: 'r3q6', round: 3, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Kierujący zespołem musi na chwilę opuścić miejsce pracy zespołu – co robi, zanim odejdzie?',
    answer:
      'Kierujący zespołem nie może samowolnie opuścić strefy pracy, w której pracuje zespół. Jeśli musi odejść, przerywa pracę i wyprowadza zespół ze strefy pracy (zabezpieczając ją), albo kierowanie przejmuje inna osoba wyznaczona zgodnie z poleceniem – ze świadectwem E. Po przerwie w pracy wykonywanej na polecenie pisemne wznowienie wymaga ponownego dopuszczenia.',
    keyPoints: 'Kierujący zespołem (E) nie opuszcza samowolnie strefy pracy. Albo przerwanie pracy i wyjście zespołu, albo formalne przejęcie kierowania.',
  },
  {
    id: 'r3q7', round: 3, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Poleceniodawca wydał polecenie pisemne. Czy może je cofnąć w trakcie pracy?',
    answer:
      'Tak. Poleceniodawca może w każdej chwili cofnąć polecenie pisemne jeżeli warunki pracy uległy zmianie lub pojawia się zagrożenie. Musi poinformować dopuszczającego i kierującego zespołem, a prace należy natychmiast wstrzymać. Cofnięcie dokumentuje się w poleceniu.',
    keyPoints: 'Tak – cofnięcie jest zawsze możliwe. Bezpieczeństwo ponad wszystko.',
  },
  {
    id: 'r3q8', round: 3, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Elektryk pracuje przy tablicy rozdzielczej. Nieoczekiwanie wraca napięcie – co robi?',
    answer:
      'Natychmiast przerywa pracę i oddala się od urządzenia bez dotykania jakichkolwiek elementów. Nie próbuje dokończyć czynności ani wyłączyć napięcia gołymi rękami. Powiadamia kierującego zespołem lub dopuszczającego. Praca może być wznowiona dopiero po ustaleniu przyczyny i ponownym przygotowaniu strefy pracy.',
    keyPoints: 'Odejdź natychmiast, nic nie dotykaj, zgłoś kierującemu zespołem lub dopuszczającemu.',
  },
  {
    id: 'r3q9', round: 3, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Poszkodowany po porażeniu prądem jest przytomny i mówi że czuje się dobrze. Czy można zrezygnować z wezwania pomocy?',
    answer:
      'Nie. Porażenie może powodować opóźnione skutki – arytmię serca, uszkodzenia wewnętrzne, oparzenia niewidoczne z zewnątrz. Nawet jeśli poszkodowany czuje się dobrze, należy wezwać pogotowie (112) lub niezwłocznie przetransportować do szpitala na obserwację.',
    keyPoints: 'Zawsze 112 po porażeniu prądem. Objawy mogą pojawić się z opóźnieniem godzin.',
    trap: 'Czuje się dobrze = jest dobrze. To błędne założenie.',
    wrongAnswer: '„Skoro chodzi to wszystko OK." – objawy mogą pojawić się z opóźnieniem.',
  },
  {
    id: 'r3q10', round: 3, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Jak prawidłowo odciągnąć osobę porażoną prądem gdy nie można wyłączyć napięcia?',
    answer:
      'Używamy wyłącznie suchych, nieprzewodzących przedmiotów – drewniana deska, plastikowy fotel, sucha lina, złożona sucha odzież. Nigdy gołymi rękami – ratownik staje się kolejną ofiarą. Stajemy na suchym, izolującym podłożu. Dotyczy to tylko napięcia do 1 kV – przy wyższym nie podchodzimy, tylko wzywamy pomoc i czekamy na wyłączenie napięcia. Po odciągnięciu: sprawdzamy oddech, wzywamy 112, RKO jeśli brak oddechu.',
    keyPoints: 'Suchy nieprzewodzący przedmiot. Nigdy gołymi rękami. Tylko do 1 kV.',
  },
  {
    id: 'r3q11', round: 3, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Czy osoba z uprawnieniami D (dozór) może samodzielnie wykonywać prace fizyczne przy urządzeniach elektrycznych?',
    answer:
      'Tylko jeśli posiada równocześnie uprawnienia E. Samo D uprawnia wyłącznie do nadzorowania prac – nie do ich fizycznego wykonywania. Dlatego standardowo bierze się E+D łącznie.',
    keyPoints: 'D bez E = tylko nadzór. Aby pracować fizycznie potrzeba E.',
    trap: 'D wydaje się „wyższą" kategorią niż E – więc logicznie może więcej.',
    wrongAnswer: '„Tak, D to wyższe uprawnienia." – D bez E = tylko nadzór, zero pracy fizycznej.',
  },
  {
    id: 'r3q12', round: 3, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Świadectwo kwalifikacyjne SEP wygasło tydzień temu. Czy można pracować do końca miesiąca?',
    answer:
      'Nie. Po upływie daty ważności świadectwo traci moc prawną natychmiast – nie ma okresu karencji. Praca bez ważnego świadectwa to naruszenie przepisów: pracodawcy grozi kara za dopuszczenie do pracy osoby bez wymaganych kwalifikacji, a w razie wypadku obaj odpowiadają także karnie i cywilnie.',
    keyPoints: 'Natychmiastowa utrata ważności. Brak okresu karencji.',
    trap: 'Tydzień to nic – „prawie ważne".',
    wrongAnswer: '„Kilka dni to drobiazg." – dla inspektora PIP nie jest.',
  },
  {
    id: 'r3q13', round: 3, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Miernik nie wskazuje napięcia przy urządzeniu. Czy to znaczy że napięcia nie ma?',
    answer:
      'Nie zawsze. Miernik może być uszkodzony, rozładowany lub mieć przerwany przewód pomiarowy. Zasada: przed pomiarem sprawdź działanie miernika na znanym napięciu (np. gniazdku 230 V). Po pomiarze sprawdź ponownie. Dopiero dwa poprawne odczyty dają pewność.',
    keyPoints: 'Zawsze testuj miernik przed i po pomiarze. Uszkodzony miernik = fałszywe bezpieczeństwo.',
    trap: 'Brak wskazania = brak napięcia. Niekoniecznie.',
    wrongAnswer: '„Nie wskazuje = nie ma napięcia." – uszkodzony miernik zabił niejednego elektryka.',
  },

  // ───────────────────────────── RUNDA 4 ─────────────────────────────
  {
    id: 'r4q1', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jakie jest minimalne napięcie pomiarowe przy pomiarze rezystancji izolacji instalacji 230/400 V i dlaczego nie stosuje się zwykłego multimetru?',
    answer:
      'Stosuje się napięcie pomiarowe 500 V DC (megaomomierz). Zwykły multimetr mierzy rezystancję przy kilku woltach – tak niskie napięcie nie wykryje mikrouszkodzeń izolacji które ujawnią się dopiero pod napięciem roboczym. Megaomomierz „stresuje" izolację napięciem wyższym od roboczego.',
    keyPoints: '500 V DC, megaomomierz. Multimetr = za niskie napięcie = fałszywie dobry wynik.',
  },
  {
    id: 'r4q2', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Ile wynosi minimalna rezystancja izolacji dla instalacji 230/400 V i co oznacza wynik 0,5 MΩ?',
    answer:
      'Minimum wynosi 1 MΩ (PN-HD 60364-6). Wynik 0,5 MΩ oznacza że izolacja jest uszkodzona lub zawilgocona – instalacja nie może być oddana do użytku ani eksploatowana. Należy zlokalizować uszkodzenie, naprawić i zmierzyć ponownie.',
    keyPoints: '< 1 MΩ = instalacja do naprawy, zakaz oddania do użytku.',
  },
  {
    id: 'r4q3', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Czy przed pomiarem rezystancji izolacji należy odłączyć urządzenia końcowe (np. komputery)? Dlaczego?',
    answer:
      'Tak – bezwzględnie. Megaomomierz przykłada 500 V DC. Większość urządzeń elektronicznych (komputery, zasilacze, sterowniki, falowniki) zostanie trwale uszkodzona przez 500 V DC. Przed pomiarem odłączamy wszystkie urządzenia, wyjmujemy żarówki i odłączamy ograniczniki przepięć (SPD), a łączniki w obwodzie ustawiamy w pozycji załączonej, żeby pomiar objął cały obwód.',
    keyPoints: '500 V DC niszczy elektronikę. Odłącz wszystko przed pomiarem – to obowiązek, nie opcja.',
  },
  {
    id: 'r4q4', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jak prawidłowo przeprowadzić pomiar rezystancji izolacji – podaj kolejność czynności?',
    answer:
      '1. Wyłącz napięcie i sprawdź jego brak wskaźnikiem. 2. Odłącz wszystkie urządzenia końcowe. 3. Podłącz megaomomierz i zmierz L–PE, N–PE i L–N (albo zwarte L+N do PE). 4. Odczytaj wynik po ustabilizowaniu wskazania – w praktyce po 60 sekundach. 5. Rozładuj obwód – nie odpinaj przewodów, dopóki miernik nie pokaże 0 V; obwód trzyma ładunek i może razić! 6. Zapisz wynik w protokole.',
    keyPoints: 'Odczyt po ustabilizowaniu (praktyka: 60 s). Rozładowanie po pomiarze – obowiązkowe!',
  },
  {
    id: 'r4q5', round: 4, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Co mierzy się podczas pomiaru ciągłości przewodów ochronnych PE i jakie narzędzie stosujemy?',
    answer:
      'Sprawdzamy czy przewód ochronny PE jest nieprzerwany od gniazda aż do szyny PE w rozdzielnicy. Mierzy się małą rezystancję (omy lub miliomy) przy niskim napięciu (4–24 V) i prądzie co najmniej 200 mA. Stosuje się miernik małych rezystancji wg PN-EN 61557-4 – zwykle funkcję ciągłości w mierniku wielofunkcyjnym instalacji.',
    keyPoints: 'PE ciągłość = małe R. Brak ciągłości = brak ochrony przeciwporażeniowej.',
  },
  {
    id: 'r4q6', round: 4, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Dlaczego pomiar ciągłości PE wykonuje się prądem o wartości co najmniej 200 mA?',
    answer:
      'Mierzy się ułamki oma, więc wynik musi być miarodajny. Norma PN-HD 60364-6 wymaga przyrządu (wg PN-EN 61557-4) o napięciu 4–24 V i prądzie co najmniej 200 mA. Taki prąd przebija cienkie warstwy tlenków na zaciskach (jak prąd zwarciowy) i daje stabilny wynik w miliomach, w którym luźny zacisk widać jako konkretną, za dużą wartość. Multimetr przy ~1 mA bywa zawyżony i niestabilny przez tlenki, a jego brzęczyk piszczy nawet przy kilku omach – nie odróżni dobrego połączenia od złego.',
    keyPoints: '≥ 200 mA przy 4–24 V (PN-EN 61557-4) = wynik miarodajny i powtarzalny. Brzęczyk multimetru mówi tylko „jest przewód", nie „połączenie jest dobre".',
  },
  {
    id: 'r4q7', round: 4, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Co to jest impedancja pętli zwarcia i jak obliczyć na jej podstawie czy zabezpieczenie zadziała?',
    answer:
      'Impedancja pętli zwarcia (Zs) to całkowity opór drogi którą płynie prąd zwarciowy: źródło → przewód fazowy → miejsce zwarcia → przewód PE → powrót do źródła. Prąd zwarciowy: Ik = U₀ / Zs (gdzie U₀ = 230 V). Wynik pomiaru Zs porównujemy z tabelą maksymalnych impedancji dla danego zabezpieczenia.',
    keyPoints: 'Ik = 230 / Zs. Im mniejsze Zs, tym wyższy prąd zwarciowy, tym pewniejsza ochrona.',
  },
  {
    id: 'r4q8', round: 4, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Jakie są maksymalne czasy samoczynnego wyłączenia zasilania w układzie TN 230 V?',
    answer:
      'Wg PN-HD 60364-4-41: obwody odbiorcze do 32 A (a z gniazdami – do 63 A) – maksymalnie 0,4 s. Dotyczy to gniazd, ale też np. obwodu oświetlenia czy ogrzewania. Obwody rozdzielcze (np. WLZ) oraz obwody odbiorcze powyżej tych prądów – maksymalnie 5 s.',
    keyPoints: 'TN 230 V: obwody odbiorcze do 32 A = 0,4 s (także oświetlenie). Obwody rozdzielcze = 5 s.',
    trap: 'Stare materiały: „obwody stałe = 5 s". Według aktualnej normy obwód oświetlenia B10 też musi wyłączyć w 0,4 s.',
    wrongAnswer: '„Oświetlenie wbudowane – 5 s" – to zapis ze starej normy.',
  },
  {
    id: 'r4q9', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Jakie rodzaje wyłączników RCD stosuje się w instalacjach i czym się różnią?',
    answer:
      'Typ AC: reaguje wyłącznie na sinusoidalny prąd AC – najprostszy, ale dziś wypierany (w nowej instalacji wymaga się minimum typu A). Typ A: reaguje na AC i pulsujący DC – dziś podstawowy domowy, do obwodów z elektroniką. Typ F: jak A, plus prądy o mieszanej częstotliwości i większa odporność na udary – urządzenia z falownikiem jednofazowym (pralki, pompy ciepła, klimatyzatory). Typ B: reaguje na wszystkie rodzaje prądów, też gładki DC – falowniki trójfazowe, napędy, PV; przy ładowaniu EV stosuje się typ B albo typ A z detekcją DC 6 mA.',
    keyPoints: 'Dziś minimum to typ A (AC – wypierany). A = elektronika. F = falowniki 1-fazowe. B = gładki DC: napędy, PV, EV. Typ AC nie zadziała przy prądzie pulsującym DC.',
  },
  {
    id: 'r4q10', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Jak wykonuje się pomiar czasu i prądu zadziałania wyłącznika RCD miernikiem?',
    answer:
      'Miernik RCD przykłada wzrastający prąd różnicowy i mierzy kiedy RCD zadziała oraz ile czasu minęło. Trzy punkty: 0,5×IΔn (nie może zadziałać), 1×IΔn (musi zadziałać w czasie ≤ 300 ms), 5×IΔn (czas ≤ 40 ms). Wykonuje się też test przy prądzie ujemnym (odwrócona polaryzacja).',
    keyPoints: '0,5×IΔn = nie działa, 1×IΔn = działa ≤ 300 ms, 5×IΔn = działa ≤ 40 ms.',
  },
  {
    id: 'r4q11', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Czy przycisk TEST na RCD zastępuje pomiar miernikiem RCD?',
    answer:
      'Nie. Przycisk TEST sprawdza wyłącznie mechanizm wyzwalający – czy RCD w ogóle zadziała. Nie mierzy czasu zadziałania ani dokładnego prądu zadziałania. Do odbioru instalacji i protokołu pomiarowego wymagany jest pomiar miernikiem RCD z udokumentowanymi wynikami.',
    keyPoints: 'TEST = sprawdzenie mechaniczne, wystarczy do eksploatacji co miesiąc. Miernik RCD = wymagany do protokołu odbiorczego.',
    trap: 'Przycisk TEST wystarczy, przecież działa.',
    wrongAnswer: '„TEST wystarczy." Na odbiór instalacji – nie wystarczy.',
  },
  {
    id: 'r4q12', round: 4, category: 'Pomiary', topic: 'uziemienie',
    question: 'Co to jest rezystancja uziemienia i jakie są dopuszczalne wartości?',
    answer:
      'Rezystancja uziemienia (RE) to opór między elektrodą uziemiającą a ziemią odniesienia. Wymaganie zależy od funkcji uziomu: uziemienie odgromowe – zalecane poniżej 10 Ω (PN-EN 62305-3); układ TT z RCD – RA × IΔn ≤ 50 V (przy RCD 30 mA: RA ≤ 1666 Ω); w układzie TN nie ma jednej wartości RE – o ochronie decyduje impedancja pętli zwarcia. Uziemienia stacji SN/nn ocenia operator sieci.',
    keyPoints: 'Odgrom: poniżej 10 Ω. TT z RCD: RA × IΔn ≤ 50 V. TN: liczy się pętla zwarcia.',
  },
  {
    id: 'r4q13', round: 4, category: 'Pomiary', topic: 'uziemienie',
    question: 'Jaką metodą mierzy się rezystancję uziemienia i dlaczego nie można użyć zwykłego omomierza?',
    answer:
      'Stosuje się metodę trójzaciskową (spadku potencjału): trzy elektrody – badana, pomocnicza prądowa i pomocnicza napięciowa. Na kursach bywa nazywana „metodą Wernera" (ściśle: Wenner to 4-elektrodowy pomiar rezystywności gruntu). Zwykły omomierz nie może być użyty, bo elektroda jest z definicji połączona z ziemią i omomierz pokazałby zwarcie lub wynik bezsensowny.',
    keyPoints: 'Metoda trójzaciskowa / spadku potencjału, dedykowany miernik uziemienia. Zwykły omomierz = błędny wynik.',
  },
  {
    id: 'r4q14', round: 4, category: 'Pomiary', topic: 'protokol',
    question: 'Jakie pomiary są obowiązkowe przy odbiorze nowej instalacji elektrycznej wg PN-HD 60364-6?',
    answer:
      'Norma podaje zalecaną kolejność: 1) Oględziny, 2) Pomiar ciągłości przewodów ochronnych PE, 3) Pomiar rezystancji izolacji, 4) Ochrona przez separację / SELV / PELV (jeśli zastosowana), 5) Samoczynne wyłączenie zasilania – impedancja pętli zwarcia, 6) Sprawdzenie działania RCD, 7) Sprawdzenie kolejności faz (instalacje 3-fazowe) i próby funkcjonalne.',
    keyPoints: 'Oględziny → ciągłość PE → izolacja → impedancja pętli → RCD. Pięć kroków w kolejności.',
  },
  {
    id: 'r4q15', round: 4, category: 'Pomiary', topic: 'protokol',
    question: 'Co musi zawierać protokół pomiarowy?',
    answer:
      'Protokół musi zawierać: dane identyfikacyjne obiektu, schemat lub opis badanej instalacji, wykaz zastosowanych przyrządów ze świadectwami wzorcowania (ważne w dniu pomiaru!), wyniki pomiarów dla każdego obwodu, ocenę wyników, datę, imię, nazwisko i podpis osoby wykonującej pomiary – ze świadectwem kwalifikacyjnym obejmującym zakres kontrolno-pomiarowy.',
    keyPoints: 'Świadectwa wzorcowania muszą być ważne w dniu pomiaru. Brak = protokół nieważny.',
  },
  {
    id: 'r4q16', round: 4, category: 'Pomiary', topic: 'podstawy-prawne',
    question: 'Instalacja ma 8 lat, działa bez zarzutu, nikt nie zgłaszał problemów. Czy przegląd i pomiary są wymagane?',
    answer:
      'Tak – bezwzględnie. Prawo budowlane art. 62 nakłada obowiązek przeglądu instalacji elektrycznej co 5 lat niezależnie od tego czy instalacja „działa". Upływ 8 lat bez przeglądu to naruszenie prawa. Izolacja degraduje się z czasem niewidocznie – dopiero pomiar ujawnia rzeczywisty stan.',
    keyPoints: '5 lat = obowiązek ustawowy, nie opcja. Za jego niedopełnienie właścicielowi grozi grzywna – bez względu na stan instalacji.',
    trap: 'Instalacja działa – po co sprawdzać? Bo wypadki przy „działających" instalacjach zdarzają się najczęściej.',
    wrongAnswer: '„Działa dobrze, nie trzeba." – degradacja izolacji jest niewidoczna gołym okiem.',
  },
]

export const questionsByRound = (roundId) => questions.filter((q) => q.round === roundId)
