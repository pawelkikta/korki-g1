// 7 rozdziałów szkolenia "Pomiary elektryczne" – treść: Claude (AI) pod kierunkiem autora,
// skorygowana do aktualnych przepisów (rozporządzenie MKiŚ z 1.07.2022, PN-HD 60364-4-41, PN-HD 60364-6)
// Formatowanie: **tekst** = pogrubienie w kolorze akcentu; paragraphs przyjmuje też obiekty:
//   { quote: '...' } – cytat/definicja, { formula: '...' } – wzór w ramce, { list: [...] } – wypunktowanie
// Sekcje: paragraphs, values (kafle), steps (numerowane), table, box / box2 (note: remember/warning/mistake/trap)

export const chapters = [
  {
    id: 'podstawy-prawne',
    num: 1,
    short: 'Uprawnienia i prawo',
    title: 'Podstawy prawne i zakres uprawnień',
    lead: 'Kto może mierzyć, kto kontroluje i jak często',
    sections: [
      {
        heading: 'Zakres kontrolno-pomiarowy i punkt 13 (dawniej 10) – co jest czym?',
        paragraphs: [
          'Świadectwo kwalifikacyjne opisuje dwie rzeczy: **rodzaj urządzeń** (grupa G1 i jej punkty – instalacje w budynkach to **pkt 2**: urządzenia, instalacje i sieci do 1 kV) oraz **zakres czynności**: obsługa, konserwacja, remont, montaż i **kontrolno-pomiarowy**.',
          'Prawo do **wykonywania pomiarów** instalacji daje właśnie **zakres kontrolno-pomiarowy** wpisany dla urządzeń, które mierzysz. Aparatura pomiarowa i automatyka to w obowiązującym rozporządzeniu (MKiŚ z 1 lipca 2022 r.) osobny rodzaj urządzeń – **punkt 13** grupy G1:',
          { quote: 'aparatura kontrolno-pomiarowa oraz urządzenia i instalacje automatycznej regulacji, sterowania i zabezpieczeń urządzeń i instalacji wymienionych w pkt 1–12' },
          'W starym rozporządzeniu z 2003 r. był to **punkt 10** – stąd „pomiary z pkt 10" na wielu kursach i w starszych świadectwach. **Dziś pkt 10 to elektryczna sieć trakcyjna.** Wypełniając wniosek, czytaj opis punktu, a nie sam numer.',
          'Osobna sprawa to **okresowa kontrola z art. 62 Prawa budowlanego**: instalację elektryczną może kontrolować osoba z kwalifikacjami **dozoru (D)** (art. 62 ust. 5) albo osoba z **uprawnieniami budowlanymi** w specjalności instalacyjnej elektrycznej (ust. 4).',
        ],
        box: { type: 'remember', text: '**Pomiary = zakres kontrolno-pomiarowy.** Aparatura pomiarowa i automatyka = **pkt 13** (w starej numeracji pkt 10). **Kontrola okresowa z art. 62 = kwalifikacje D albo uprawnienia budowlane.**' },
      },
      {
        heading: 'Prawo budowlane art. 62 – kiedy pomiary są obowiązkowe?',
        paragraphs: [
          'Prawo budowlane nakłada obowiązek kontroli instalacji elektrycznej na **właściciela lub zarządcę** obiektu. Pomiary wykonuje elektryk z **zakresem kontrolno-pomiarowym**, a kontrolę okresową – osoba z kwalifikacjami **D** albo z uprawnieniami budowlanymi.',
          'Art. 62 wymaga kontroli instalacji elektrycznej **co najmniej raz na 5 lat**. Częstsze kontrole ustala **pracodawca**. W strefach zagrożenia wybuchem robi to w **dokumencie zabezpieczenia przed wybuchem** (§ 7 rozporządzenia z 8 lipca 2010 r. o atmosferze wybuchowej) i w instrukcji eksploatacji, na podstawie oceny ryzyka. Często przyjmuje się **co rok**, ale żaden przepis nie podaje tej liczby wprost. Norma PN-HD 60364-6 też każe dobrać odstępy do rodzaju instalacji i warunków pracy.',
        ],
        values: [
          { value: 'co 5 lat', label: 'kontrola instalacji elektrycznej – art. 62 Prawa budowlanego' },
          { value: 'częściej', label: 'strefy zagrożenia wybuchem – wg dokumentu zabezpieczenia przed wybuchem (typowo co rok)' },
        ],
        box: { type: 'warning', text: 'Brak kontroli = naruszenie prawa budowlanego (grozi grzywna). Właściciel odpowiada też **cywilnie** za skutki, nawet jeśli „instalacja działała".' },
      },
      {
        heading: 'Norma PN-HD 60364 – co reguluje?',
        paragraphs: [
          'PN-HD 60364 to polska wersja europejskiej normy **instalacji elektrycznych niskiego napięcia**. Dla pomiarów najważniejsze są dwie części:',
          { list: [
            '**PN-HD 60364-4-41** – ochrona przed porażeniem prądem elektrycznym (czasy zadziałania zabezpieczeń, typy systemów TN/TT/IT)',
            '**PN-HD 60364-6** – sprawdzanie instalacji (co mierzyć, w jakiej kolejności, jakie wartości są dopuszczalne)',
          ] },
        ],
        box: { type: 'remember', text: 'Na egzaminie nie musisz znać numeru normy na pamięć. Wystarczy powiedzieć **„zgodnie z normą instalacji elektrycznych PN-HD 60364"**. Komisja ocenia rozumienie, nie numerację.' },
      },
    ],
  },
  {
    id: 'rezystancja-izolacji',
    num: 2,
    short: 'Izolacja',
    title: 'Rezystancja izolacji',
    lead: 'Najważniejszy pomiar – jak, czym i kiedy',
    sections: [
      {
        heading: 'Co to jest rezystancja izolacji i po co ją mierzyć?',
        paragraphs: [
          'Izolacja to warstwa materiału (PVC, guma, XLPE), która otacza przewód i uniemożliwia prądowi „ucieczkę" na zewnątrz. Z czasem izolacja **starzeje się, pęka, zawilgaca**, uszkadza mechanicznie. Pomiar rezystancji izolacji sprawdza, czy ta warstwa wciąż skutecznie izoluje.',
          'Mierzy się opór elektryczny między: **przewodem fazowym (L) a PE** oraz **L a N**. Im wyższy wynik – tym lepsza izolacja.',
        ],
        values: [
          { value: '≥ 1 MΩ', label: 'wynik dopuszczalny (instalacja 230/400 V)' },
          { value: '500 V DC', label: 'napięcie pomiarowe megaomomierza' },
        ],
      },
      {
        heading: 'Megaomomierz – dlaczego nie zwykły multimetr?',
        paragraphs: [
          'Zwykły multimetr mierzy rezystancję przy napięciu zaledwie **kilku woltów**. To za mało – mikrouszkodzenia izolacji, które pojawią się pod napięciem roboczym 230 V, pozostają niewidoczne.',
          'Megaomomierz (miernik izolacji) przykłada **500 V DC** – więcej niż napięcie robocze (230 V, w szczycie ok. 325 V). Dzięki temu **„stresuje" izolację** i ujawnia słabe miejsca. Wynik w megaomach (MΩ).',
        ],
        box: { type: 'warning', title: 'Uwaga – zniszczy elektronikę', text: '500 V DC uszkadza trwale urządzenia elektroniczne (komputery, zasilacze, sterowniki PLC, falowniki). Przed pomiarem **odłącz WSZYSTKIE urządzenia końcowe**.' },
      },
      {
        heading: 'Kolejność czynności przy pomiarze izolacji',
        steps: [
          '**Wyłącz napięcie** w obwodzie i sprawdź jego brak wskaźnikiem napięcia',
          '**Odłącz wszystkie urządzenia końcowe**, wyjmij żarówki i odłącz **ograniczniki przepięć (SPD)** – ich warystory przy 500 V zaczynają przewodzić i zaniżają wynik. Łączniki w obwodzie (np. światła) ustaw w pozycji **załączonej** – żeby pomiar objął cały obwód',
          'Podłącz megaomomierz i zmierz kolejno **L–PE, N–PE i L–N** (norma dopuszcza też zwarcie L i N razem i pomiar do PE)',
          'Odczytaj wynik dopiero po **ustabilizowaniu wskazania** – w praktyce po **60 sekundach**; izolacja ładuje się jak kondensator i odczyt rośnie z czasem',
          '**Rozładuj obwód** po pomiarze – nowoczesny miernik robi to sam: nie odpinaj przewodów, dopóki nie pokaże 0 V. Obwód naładowany do 500 V może razić!',
          'Zapisz wynik w protokole z jednostką (MΩ) i oceną (OK / NIEZGODNE)',
        ],
        box: { type: 'mistake', text: 'Pominięcie **rozładowania obwodu** po pomiarze. Przewód trzyma ładunek – można dostać przy dotknięciu.' },
      },
    ],
  },
  {
    id: 'ciaglosc-pe',
    num: 3,
    short: 'Ciągłość PE',
    title: 'Ciągłość przewodów ochronnych PE',
    lead: 'Czy droga powrotu prądu zwarciowego jest sprawna',
    sections: [
      {
        heading: 'Po co mierzyć ciągłość PE?',
        paragraphs: [
          'Przewód ochronny PE to **„droga ewakuacyjna" dla prądu zwarciowego** – gdy dotkniesz obudowy uszkodzonego urządzenia, prąd powinien natychmiast odpłynąć przez PE do szyny PE w rozdzielnicy, zadziałać zabezpieczenie i odciąć napięcie.',
          'Jeśli PE jest przerwany (korozja, luźny zacisk, uszkodzenie mechaniczne) – **obudowa urządzenia pozostaje pod napięciem**. Użytkownik dotknie i dostanie porażenie.',
          'Pomiar ciągłości PE sprawdza, czy ten przewód jest **nieprzerwany i dobrze podłączony** na całej długości od gniazda do szyny PE.',
        ],
        box: { type: 'remember', text: '**Brak ciągłości PE = brak ochrony przeciwporażeniowej.** Urządzenie klasy I bez PE = pułapka na użytkownika.' },
      },
      {
        heading: 'Dlaczego prąd pomiarowy musi być co najmniej 200 mA?',
        paragraphs: [
          'Mierzysz ułamki oma, więc liczy się każde słabe połączenie. Multimetr się do tego nie nadaje z dwóch powodów. **Brzęczyk** piszczy przy każdej rezystancji poniżej kilkudziesięciu omów – „ciągłość jest" także przy luźnym, przegrzanym zacisku (**fałszywie dobry wynik**). A przy prądzie rzędu **1 mA** cienka warstwa tlenku na dobrym zacisku działa jak izolator – odczyt skacze i jest zawyżony (**fałszywie zły wynik**).',
          'Dlatego norma **PN-HD 60364-6** wymaga przyrządu (wg PN-EN 61557-4) o napięciu **4–24 V** i prądzie **co najmniej 200 mA**. Taki prąd przebija cienkie warstwy tlenków – tak jak zrobiłby to prąd zwarciowy – i daje **stabilny wynik w miliomach**, w którym luźny zacisk widać jako konkretną, za dużą wartość.',
        ],
        values: [
          { value: '≥ 200 mA', label: 'minimalny prąd pomiarowy ciągłości PE' },
          { value: 'mΩ .. Ω', label: 'spodziewany zakres wyników' },
        ],
        table: {
          caption: 'Różnica między ciągłością PE a rezystancją izolacji',
          head: ['Pomiar', 'Napięcie', 'Zakres wyników', 'Cel'],
          rows: [
            ['Ciągłość PE', 'niskie DC', 'mΩ .. Ω', 'czy przewód jest nieprzerwany'],
            ['Rezystancja izolacji', '500 V DC', 'MΩ', 'czy izolacja skutecznie uszczelnia'],
          ],
        },
      },
      {
        heading: 'Jak wykonuje się pomiar ciągłości PE – krok po kroku',
        paragraphs: [
          'Pomiar wykonuje się miernikiem z funkcją ciągłości wg PN-HD 60364-6 (**prąd ≥ 200 mA**) – zwykle miernikiem wielofunkcyjnym z **długim przewodem pomiarowym na szpuli**, bo mierzysz między rozdzielnicą a każdym gniazdem w obiekcie.',
        ],
        steps: [
          '**Wyłącz zasilanie** obwodu i sprawdź brak napięcia wskaźnikiem – pomiar wykonuje się na instalacji bez napięcia',
          'Zewrzyj końcówki przewodów pomiarowych i **wyzeruj miernik (kompensacja)** – inaczej do wyniku doliczysz rezystancję własnych kabli pomiarowych',
          'Podłącz jeden przewód miernika do **szyny PE w rozdzielnicy**, drugi do **bolca PE badanego gniazda** (lub zacisku PE obudowy urządzenia)',
          'Wykonaj pomiar prądem **≥ 200 mA** i odczytaj wynik – spodziewany rząd wielkości to **mΩ do pojedynczych Ω**',
          'Oceń wynik względem długości i przekroju przewodu – np. żyła Cu 1,5 mm² ma ok. **12 mΩ na metr**; kilka Ω na krótkim obwodzie = podejrzane połączenie',
          'Powtórz dla **KAŻDEGO gniazda** i punktu PE, zapisz wyniki w protokole z jednostką i oceną',
        ],
        box: { type: 'mistake', text: 'Brak **kompensacji (wyzerowania)** przewodów pomiarowych – miernik doliczy ich rezystancję i krótki, zdrowy obwód wygląda jak wadliwy. Zeruj po każdej zmianie przewodów pomiarowych.' },
        box2: { type: 'remember', text: 'Na egzaminie: miernik z prądem **≥ 200 mA**, pomiar od szyny PE do każdego gniazda, instalacja **bez napięcia**, wynik w mΩ..Ω. Brak ciągłości = obwód nie może być oddany do użytku.' },
      },
    ],
  },
  {
    id: 'petla-zwarcia',
    num: 4,
    short: 'Pętla zwarcia',
    title: 'Impedancja pętli zwarcia',
    lead: 'Czy zabezpieczenie zadziała wystarczająco szybko',
    sections: [
      {
        heading: 'Co to jest pętla zwarcia i dlaczego ją mierzymy?',
        paragraphs: [
          'Wyobraź sobie zwarcie fazy z obudową urządzenia. Prąd zwarciowy musi pokonać drogę: **transformator → kabel fazowy → gniazdo → urządzenie → PE → szyna PE → transformator**.',
          'Cała ta droga ma opór – nazywamy go **impedancją pętli zwarcia (Zs)**. Im wyższy Zs, tym niższy prąd zwarciowy, tym **wolniej** zadziała zabezpieczenie nadprądowe.',
          { formula: 'Ik = U₀ / Zs        (U₀ = 230 V)' },
          { list: [
            '**Przykład A:** Zs = 0,5 Ω → Ik = **460 A** → wyłącznik B16 zadziała błyskawicznie ✓',
            '**Przykład B:** Zs = 10 Ω → Ik = **23 A** → wyłącznik B16 może nie zadziałać w czasie ✗',
          ] },
        ],
        values: [
          { value: '≤ 0,4 s', label: 'TN 230 V: obwody odbiorcze do 32 A (z gniazdami – do 63 A), także oświetlenie' },
          { value: '≤ 5 s', label: 'TN: obwody rozdzielcze (np. WLZ) i obwody odbiorcze powyżej tych prądów' },
        ],
        box: { type: 'trap', title: 'Pułapka ze starych materiałów', text: 'Dawna norma dawała 5 s „obwodom stałym" (np. oświetleniu). Według aktualnej **PN-HD 60364-4-41** obwód oświetlenia B10 to zwykły obwód odbiorczy do 32 A – obowiązuje go **0,4 s**. 5 s dotyczy obwodów rozdzielczych i dużych obwodów odbiorczych.' },
      },
      {
        heading: 'Systemy uziemienia TN, TT, IT – co musisz wiedzieć',
        table: {
          head: ['System', 'Charakterystyka', 'Ochrona'],
          rows: [
            ['TN', 'Punkt neutralny transformatora uziemiony, przewód PE w instalacji. Najpopularniejszy w Polsce.', 'Impedancja pętli zwarcia. Czasy 0,4 s / 5 s.'],
            ['TT', 'Punkt neutralny uziemiony, urządzenia mają własne uziemienie niezależne od sieci.', 'Wymagany RCD – impedancja pętli zwykle za duża, by zadziałało zabezpieczenie nadprądowe.'],
            ['IT', 'Brak uziemienia punktu neutralnego. Pierwsze zwarcie nie powoduje wyłączenia.', 'Monitory izolacji (IMD). Stosowany w szpitalach, przemyśle.'],
          ],
        },
        box: { type: 'remember', text: '**TN** = standard polski, ochrona przez impedancję pętli. **TT** = wymagany RCD. **IT** = szpitale/przemysł, monitor izolacji.' },
      },
      {
        heading: 'Jak wykonuje się pomiar impedancji pętli – krok po kroku',
        paragraphs: [
          'To **jedyny pomiar odbiorczy wykonywany POD NAPIĘCIEM** – miernik potrzebuje działającej sieci, bo na ułamek sekundy ją obciąża i wylicza Zs ze spadku napięcia.',
        ],
        steps: [
          'Sprawdź napięcie w badanym gnieździe – miernik po wpięciu pokazuje **U i częstotliwość** sieci',
          'Wepnij miernik **wtyczką pomiarową w gniazdo** (L, N, PE) lub podłącz sondy do badanego punktu',
          'Wybierz pomiar pętli **L-PE** – czyli drogi, którą popłynie prąd zwarciowy przez przewód ochronny',
          'Uruchom pomiar – miernik na chwilę obciąża sieć i wylicza **Zs oraz spodziewany prąd zwarciowy Ik**',
          'Porównaj wynik z wartością **maksymalną Zs dla zabezpieczenia** obwodu (czyli: czy Ik wystarczy do wyłączenia w 0,4 s / 5 s)',
          'Powtórz dla **każdego obwodu** i zapisz wyniki w protokole',
        ],
        box: { type: 'warning', text: 'W obwodach z RCD klasyczny pomiar pętli L-PE może **wyzwolić różnicówkę** (prąd pomiarowy płynie przez PE jak prąd upływu). Używaj trybu **„bez wyzwalania RCD"** (mały prąd pomiarowy, pomiar trwa dłużej). Nie mierz pętli „przed RCD" w rozdzielnicy – to nie jest impedancja na końcu badanego obwodu.' },
        box2: { type: 'remember', text: '**Pętla zwarcia = pomiar POD napięciem** (wyjątek wśród pomiarów). Izolacja i ciągłość PE = zawsze bez napięcia.' },
      },
    ],
  },
  {
    id: 'rcd',
    num: 5,
    short: 'RCD',
    title: 'Wyłączniki RCD – pomiar i typy',
    lead: 'Ochrona przeciwporażeniowa – jak sprawdzić, czy działa naprawdę',
    sections: [
      {
        heading: 'Jak działa RCD i czym różni się od wyłącznika nadprądowego?',
        paragraphs: [
          'Wyłącznik nadprądowy chroni przewody przed przeciążeniem i zwarciem. Przed porażeniem chroni tylko w jednym przypadku: przy **zwarciu fazy z obudową** płynie prąd zwarciowy setek amperów i wyłącznik wyłącza obwód (samoczynne wyłączenie zasilania – rozdział o pętli zwarcia). Ale gdy człowiek dotknie fazy, przez ciało płyną **dziesiątki–setki mA** – a już **50 mA AC może zabić**. Wyłącznik nadprądowy tego nie czuje.',
          'RCD mierzy **różnicę prądów** między L (wpływa) a N (wypływa). W normalnych warunkach różnica = 0. Gdy prąd „ucieka" przez ciało człowieka – różnica rośnie. Przy **30 mA** RCD wyłącza obwód w czasie **≤ 300 ms**.',
          { quote: 'Zwarcie na obudowę wyłączy wyłącznik nadprądowy (jeśli pętla jest dobra). Dotknięcie fazy przez człowieka wyłączy tylko RCD 30 mA. Jedno nie zastępuje drugiego.' },
        ],
        values: [
          { value: '30 mA', label: 'prąd różnicowy RCD typ ogólny' },
          { value: '≤ 300 ms', label: 'maks. czas zadziałania przy 1×IΔn' },
          { value: '300 mA', label: 'RCD przeciwpożarowy' },
          { value: '≤ 40 ms', label: 'czas zadziałania przy 5×IΔn' },
        ],
      },
      {
        heading: 'Typy RCD: AC, A, B, F – kiedy który?',
        paragraphs: [
          'Typ rozróżnia, na jaki **kształt prądu różnicowego** wyłącznik reaguje (to litera w symbolu). Osobno występuje **zwłoka czasowa** – oznaczenie **S** (selektywny) i **G** (krótkozwłoczny):',
        ],
        table: {
          head: ['Typ', 'Reaguje na / cecha', 'Zastosowanie'],
          rows: [
            ['AC', 'Sinusoidalny prąd AC', 'Najprostszy, ale dziś wypierany – w nowej instalacji minimum to typ A'],
            ['A', 'AC + pulsujący DC', 'Obwody z elektroniką jednofazową: zasilacze, AGD, oświetlenie LED. Dziś podstawowy typ w mieszkaniu.'],
            ['F', 'Jak A + prądy o mieszanej częstotliwości, odporny na udary', 'Urządzenia z falownikiem jednofazowym: pralki, zmywarki, pompy ciepła, klimatyzatory'],
            ['B', 'AC + pulsujący DC + gładki DC', 'Falowniki trójfazowe, napędy, PV (gdy wymaga tego falownik), ładowanie EV – typ B albo typ A z detekcją DC 6 mA'],
            ['G', 'Krótka zwłoka (~10 ms), odporny na zakłócenia', 'Ogranicza zbędne wyłączenia od chwilowych udarów i zakłóceń'],
            ['S', 'Selektywny – zwłoka ~40 ms', 'Montowany „przed" zwykłym RCD; przy usterce wyłącza tylko ten bliżej odbiornika'],
          ],
        },
        box: { type: 'trap', title: 'Kluczowa pułapka egzaminacyjna', text: 'Typ AC **NIE zadziała przy prądzie pulsującym DC** – czyli może nie ochronić przy sprzęcie z elektroniką. Wymagany **typ A lub wyższy** (przy falownikach – F, przy ładowaniu EV – B albo A + detekcja DC 6 mA).' },
        box2: { type: 'remember', title: 'Selektywność (typ S)', text: 'Gdy w instalacji są dwa RCD jeden za drugim, przy upływie powinien zadziałać tylko ten **bliżej usterki**, a nie główny – inaczej gaśnie cały obiekt. Zapewnia to **RCD typu S** (zwłoczny, ~40 ms) montowany jako nadrzędny, nad zwykłymi (bezzwłocznymi) RCD przy obwodach.' },
      },
      {
        heading: 'Pomiar miernikiem RCD vs przycisk TEST',
        paragraphs: [
          '**Przycisk TEST** na obudowie RCD: sprawdza wyłącznie, czy mechanizm wyzwalający jest sprawny – czy RCD w ogóle zadziała. **Nie mierzy czasu ani dokładnego prądu** zadziałania. Wystarczy do comiesięcznej kontroli przez użytkownika.',
          '**Miernik RCD**: przykłada wzrastający prąd różnicowy i mierzy dokładny prąd zadziałania (mA) oraz czas zadziałania (ms). Trzy punkty pomiarowe:',
        ],
        table: {
          head: ['Prąd', 'Oczekiwany wynik'],
          rows: [
            ['0,5 × IΔn (15 mA)', 'RCD nie zadziała'],
            ['1 × IΔn (30 mA)', 'RCD zadziała w czasie ≤ 300 ms'],
            ['5 × IΔn (150 mA)', 'RCD zadziała w czasie ≤ 40 ms'],
          ],
        },
        box: { type: 'remember', text: '**TEST** = mechaniczne sprawdzenie, wystarczy do eksploatacji co miesiąc. **Miernik RCD** = wymagany do protokołu odbiorczego instalacji. Jedno nie zastępuje drugiego.' },
      },
      {
        heading: 'Jak wykonuje się pomiar RCD – krok po kroku',
        steps: [
          '**Uprzedź użytkowników** obiektu – pomiar kilka razy wyłączy zasilanie obwodu (RCD ma zadziałać przy każdym teście)',
          'Wepnij miernik w **gniazdo chronione przez badany RCD** (pomiar pod napięciem)',
          'Ustaw na mierniku **znamionowy prąd różnicowy** badanego wyłącznika (np. IΔn = 30 mA) i jego **typ** (AC / A)',
          'Wykonaj sekwencję: **0,5×IΔn** – nie może zadziałać → **1×IΔn** – musi wyłączyć w ≤ 300 ms → **5×IΔn** – w ≤ 40 ms',
          'Powtórz testy przy **odwróconej polaryzacji** (ujemna połówka prądu) – RCD musi działać w obu',
          'Po każdym zadziałaniu **załącz RCD z powrotem**; na końcu zapisz prądy i czasy w protokole',
        ],
        box: { type: 'mistake', text: 'Zostawienie **wyłączonego RCD** po ostatnim teście – wychodzisz, a połowa obiektu bez prądu (i bez ochrony). Zawsze załącz i sprawdź przyciskiem TEST na koniec.' },
      },
    ],
  },
  {
    id: 'uziemienie',
    num: 6,
    short: 'Uziemienie',
    title: 'Rezystancja uziemienia',
    lead: 'Jak skutecznie odprowadzamy prąd do ziemi',
    sections: [
      {
        heading: 'Co to jest rezystancja uziemienia i jakie są wartości dopuszczalne?',
        paragraphs: [
          'Rezystancja uziemienia (**RE**) to opór elektryczny między elektrodą uziemiającą (pręt, taśma w ziemi) a „nieskończoną ziemią". **Im mniejsza RE, tym łatwiej prąd odpływa do ziemi** i tym skuteczniejsza ochrona.',
        ],
        table: {
          head: ['Zastosowanie', 'Dopuszczalna RE'],
          rows: [
            ['Uziemienie odgromowe', 'poniżej 10 Ω (zalecenie PN-EN 62305-3)'],
            ['Układ TT z RCD', 'RA × IΔn ≤ 50 V – przy RCD 30 mA: RA ≤ 1666 Ω, przy 300 mA: RA ≤ 166 Ω'],
            ['Układ TN (ochrona przez pętlę)', 'brak jednej wartości RE – liczy się impedancja pętli zwarcia'],
            ['Stacja SN/nn', 'wymaganie operatora (np. ≤ 5 Ω) – urządzenie powyżej 1 kV, poza zakresem G1 pkt 2'],
          ],
        },
        box: { type: 'remember', text: '**Odgrom: poniżej 10 Ω. TT z RCD: RA × IΔn ≤ 50 V.** W instalacjach TN liczy się impedancja pętli zwarcia, nie sama RE. Uziemienia stacji SN/nn to zakres operatora sieci.' },
      },
      {
        heading: 'Metoda trójzaciskowa (spadku potencjału) – jak mierzymy uziemienie?',
        paragraphs: [
          'Zwykły omomierz **nie nadaje się** do pomiaru uziemienia – elektroda jest z definicji połączona z ziemią i omomierz pokazałby zwarcie lub wynik bezsensowny.',
          'Metoda trójzaciskowa używa trzech elektrod:',
          { list: [
            '**E** – badana elektroda uziemiająca',
            '**C** – pomocnicza elektroda prądowa (wbita ~20 m dalej)',
            '**P** – pomocnicza elektroda napięciowa (wbita między E i C)',
          ] },
          'Miernik przepuszcza prąd przez E i C, mierzy spadek napięcia na P i oblicza **RE = U/I**.',
        ],
        box: { type: 'warning', text: 'Przed pomiarem **odłącz badaną elektrodę od instalacji** – inaczej mierzysz rezystancję całej sieci uziemiającej, nie pojedynczej elektrody.' },
        box2: { type: 'remember', title: 'Nazewnictwo', text: 'Na kursach ta metoda bywa nazywana „metodą Wernera". Ściśle: metoda Wennera to 4-elektrodowy pomiar **rezystywności gruntu**, a pomiar RE pojedynczego uziomu to **metoda spadku potencjału** (trójzaciskowa). Komisja zaakceptuje obie nazwy – ważne, żebyś umiał opisać układ E-P-C.' },
      },
      {
        heading: 'Jak wykonuje się pomiar uziemienia – krok po kroku',
        steps: [
          '**Odłącz badany uziom** od instalacji – rozkręć zacisk probierczy (złącze kontrolne) na przewodzie uziemiającym',
          'Wbij elektrodę prądową **C** w grunt ok. **20–40 m** od badanego uziomu, a elektrodę napięciową **P** mniej więcej w połowie tej odległości',
          'Podłącz przewody miernika: **E** do badanego uziomu, **P** i **C** do elektrod pomocniczych',
          'Wykonaj pomiar – miernik przepuszcza prąd E→C, mierzy napięcie na P i liczy **RE = U/I**',
          'Przesuń elektrodę P o kilka metrów i zmierz ponownie – wyniki powinny być **zbliżone** (duża różnica = złe rozstawienie elektrod)',
          'Porównaj z wartością dopuszczalną (**poniżej 10 Ω** odgrom, **RA × IΔn ≤ 50 V** w układzie TT), zapisz w protokole i **SKRĘĆ zacisk probierczy z powrotem**',
        ],
        box: { type: 'mistake', text: '**Niezłożenie zacisku probierczego** po pomiarze – obiekt zostaje bez uziemienia do następnego przeglądu. Ostatni krok pomiaru to zawsze przywrócenie połączenia.' },
        box2: { type: 'remember', text: '**Wilgotność gruntu** mocno wpływa na wynik: mokry grunt zaniża RE (wynik „za dobry"), suchy lub zamarznięty – zawyża. **Nie mierz tuż po deszczu.** Najbardziej miarodajny jest pomiar przy suchym gruncie (najgorszy przypadek), a w innych warunkach wynik mnoży się przez **współczynnik poprawkowy**.' },
      },
    ],
  },
  {
    id: 'protokol',
    num: 7,
    short: 'Protokół',
    title: 'Protokół pomiarowy i odbiór instalacji',
    lead: 'Dokumentacja – co musi być, żeby protokół był ważny',
    sections: [
      {
        heading: 'Kolejność pomiarów przy odbiorze instalacji (PN-HD 60364-6)',
        paragraphs: ['Norma podaje kolejność prób jako zalecaną („najlepiej w następującej kolejności") – ale ma ona twardą logikę: każdy pomiar opiera się na poprzednim, a po naprawie powtarzasz próby, na które usterka mogła wpłynąć. **Na egzaminie trzymaj się tej kolejności:**'],
        steps: [
          '**Oględziny** – wzrokowe sprawdzenie instalacji (przekroje kabli, oznakowania, prawidłowość montażu)',
          '**Ciągłość PE** – przewody ochronne i połączenia wyrównawcze',
          '**Rezystancja izolacji** – każdy obwód osobno',
          '**Ochrona przez separację / SELV/PELV** – jeśli zastosowane (a przy izolowaniu stanowiska – rezystancja podłóg i ścian)',
          '**Samoczynne wyłączenie zasilania** – impedancja pętli zwarcia każdego obwodu',
          '**Sprawdzenie RCD** – prąd i czas zadziałania miernikiem',
          '**Kolejność faz** – instalacje 3-fazowe (dalej: próby funkcjonalne)',
        ],
        box: { type: 'remember', text: 'Na egzaminie wystarczy: **oględziny → ciągłość PE → izolacja → impedancja pętli → RCD**. Pięć kroków w kolejności.' },
      },
      {
        heading: 'Co musi zawierać protokół pomiarowy?',
        paragraphs: ['**Brak któregokolwiek elementu = protokół do zakwestionowania** (i do powtórki na twój koszt):'],
        steps: [
          '**Dane identyfikacyjne obiektu** – adres, właściciel, nr działki/lokalu',
          '**Schemat lub opis badanej instalacji** – które obwody były mierzone',
          '**Wykaz przyrządów pomiarowych** – model, nr seryjny, data ważności świadectwa wzorcowania',
          '**Wyniki pomiarów dla każdego obwodu** – z jednostkami i wartościami dopuszczalnymi',
          '**Ocena wyników** – „zgodne z normą" lub „niezgodne – wymagana naprawa"',
          '**Data wykonania pomiaru**',
          '**Imię, nazwisko i podpis** osoby wykonującej pomiary – ze świadectwem kwalifikacyjnym obejmującym **zakres kontrolno-pomiarowy** (kontrolę okresową z art. 62 podpisuje osoba z kwalifikacjami D albo z uprawnieniami budowlanymi)',
        ],
        box: { type: 'mistake', text: '**Przeterminowane świadectwo wzorcowania** miernika w dniu pomiaru = protokół nieważny. Sprawdź daty wzorcowania przed wyjazdem do klienta.' },
      },
    ],
  },
]
