// Trener egzaminu ustnego – dla każdego pytania z questions.js:
//   checklist – elementy, które komisja chce usłyszeć (ocena fiszek i egzaminu próbnego),
//   followUps – dopytania komisji z krótką wzorcową odpowiedzią.

export const coach = {
  // ───────────────────────────── RUNDA 1 ─────────────────────────────
  r1q1: {
    checklist: [
      'Grupa 1 = urządzenia, instalacje i sieci elektroenergetyczne',
      'Punkty = rodzaje urządzeń (instalacje w budynkach: pkt 2, do 1 kV)',
      'Zakres czynności: obsługa, konserwacja, remont, montaż, kontrolno-pomiarowy',
      'Stanowisko: eksploatacja (E) albo dozór (D)',
    ],
    followUps: [
      { q: 'Jakie są inne grupy świadectw poza G1?', a: 'G2 – urządzenia cieplne (wytwarzające, przesyłające i zużywające ciepło) i inne urządzenia energetyczne, G3 – urządzenia, instalacje i sieci gazowe. Elektryk potrzebuje G1.' },
      { q: 'Co oznacza punkt 13 grupy G1?', a: 'Aparaturę kontrolno-pomiarową oraz urządzenia i instalacje automatycznej regulacji, sterowania i zabezpieczeń urządzeń z pkt 1–12. W starej numeracji (2003 r.) był to pkt 10.' },
    ],
  },
  r1q2: {
    checklist: [
      'E – bezpośrednie wykonywanie prac: obsługa, konserwacja, remont, montaż, pomiary',
      'D – kierowanie pracą innych i nadzór nad eksploatacją',
      'To osobne świadectwa, zdawane osobno',
      'Funkcje dozoru: np. poleceniodawca, koordynujący',
    ],
    followUps: [
      { q: 'Czy osoba z samym D może wykonywać pomiary?', a: 'Nie. Pomiary to praca eksploatacyjna (zakres kontrolno-pomiarowy) – wymaga świadectwa E. Samo D pozwala kierować pracą innych i nadzorować eksploatację.' },
      { q: 'Kto przeprowadza kontrolę okresową instalacji elektrycznej z art. 62 Prawa budowlanego?', a: 'Osoba z kwalifikacjami dozoru (D) dla instalacji elektrycznych (art. 62 ust. 5) albo osoba z uprawnieniami budowlanymi w odpowiedniej specjalności.' },
    ],
  },
  r1q3: {
    checklist: [
      'Gaśnica proszkowa lub śniegowa (CO₂)',
      'Woda i piana – nie, przewodzą prąd',
      'Jeśli się da – najpierw wyłączyć napięcie',
      'Zachować odległość podaną na gaśnicy (typowo 1 m przy urządzeniach do 1 kV)',
    ],
    followUps: [
      { q: 'Co robisz najpierw, gdy pali się rozdzielnica?', a: 'Jeśli to możliwe i bezpieczne – wyłączam zasilanie (np. wyłącznikiem głównym albo przeciwpożarowym wyłącznikiem prądu), alarmuję i wzywam straż pożarną, a dopiero potem gaszę gaśnicą proszkową lub CO₂ z bezpiecznej odległości.' },
      { q: 'Na co uważać przy gaśnicy śniegowej CO₂?', a: 'Śnieg CO₂ ma ok. −78 °C – nie kieruje się go na ludzi i trzyma gaśnicę za uchwyt, bo dysza mocno się wychładza. W małym pomieszczeniu CO₂ wypiera tlen – po gaszeniu trzeba je przewietrzyć.' },
    ],
  },
  r1q4: {
    checklist: [
      'Dwie strefy: prac pod napięciem (DL) i prac w pobliżu napięcia (DV)',
      'Do 1 kV: DL = bez dotyku',
      'Do 1 kV: DV = 0,3 m',
      'Odstępu nie narusza ciało, narzędzie ani przedmiot – albo osłonić części czynne',
    ],
    followUps: [
      { q: 'Czym różni się praca w pobliżu napięcia od pracy pod napięciem?', a: 'Pod napięciem – masz kontakt z częścią czynną albo naruszasz strefę prac pod napięciem (do 1 kV: dotyk). W pobliżu napięcia – jesteś w strefie DV (do 1 kV: bliżej niż 0,3 m), ale części czynnych nie dotykasz.' },
      { q: 'Kiedy praca przy wyłączonym urządzeniu jest też pracą w pobliżu napięcia?', a: 'Gdy obok są nieosłonięte części pod napięciem i ciało albo narzędzie może naruszyć ich strefę DV – np. wymiana aparatu w rozdzielnicy, której sąsiednie pola są pod napięciem. Wtedy części czynne osłania się lub wygradza.' },
    ],
  },
  r1q5: {
    checklist: [
      'Pracodawca – prowadzący eksploatację',
      'Instrukcje opracowuje się dla urządzeń i zatwierdza je pracodawca',
      'Zawierają obsługę, postępowanie przy awarii, terminy przeglądów i pomiarów, BHP',
      'Muszą być aktualne i dostępne dla pracowników',
    ],
    followUps: [
      { q: 'Co powinna zawierać instrukcja eksploatacji?', a: 'M.in. charakterystykę urządzeń, uruchomienie, obsługę i zatrzymanie, postępowanie przy awariach, wymagania i terminy konserwacji, przeglądów, prób i pomiarów, wymagania BHP i ppoż., wymagania kwalifikacyjne, identyfikację zagrożeń oraz rysunki i schematy.' },
      { q: 'Czym różni się instrukcja eksploatacji od IOBP?', a: 'Instrukcja eksploatacji opisuje konkretne urządzenie: jak je obsługiwać, konserwować i sprawdzać. IOBP (instrukcja organizacji bezpiecznej pracy) opisuje organizację pracy: polecenia, osoby funkcyjne, przygotowanie strefy, dopuszczenie, przerwy i zakończenie.' },
    ],
  },
  r1q6: {
    checklist: [
      'Wydaje poleceniodawca (świadectwo D, upoważnienie pracodawcy)',
      'Określa zakres, strefę pracy, środki bezpieczeństwa i osoby funkcyjne',
      'Wymagane przy pracach stwarzających szczególne zagrożenie',
      'Wykaz prac na polecenie i bez polecenia – w IOBP pracodawcy',
    ],
    followUps: [
      { q: 'Jakie prace, poza szczególnym zagrożeniem, wykonuje się zwykle na polecenie pisemne?', a: 'Prace pracowników firm zewnętrznych (chyba że dopuszczenie ustalono odrębnie na piśmie) oraz prace, które prowadzący eksploatację lub poleceniodawca uzna za wymagające polecenia – np. mogące wywołać duże straty.' },
      { q: 'Ile zespołów i stref obejmuje jedno polecenie pisemne?', a: 'Co do zasady jeden zespół w jednej strefie pracy. Wyjątkowo – takie same prace tego samego zespołu kolejno w kilku strefach, ale zmiana strefy wymaga ponownego dopuszczenia.' },
    ],
  },
  r1q7: {
    checklist: [
      'Ważne świadectwo kwalifikacyjne (E, właściwa grupa, punkt i zakres)',
      'Aktualne badania lekarskie',
      'Aktualne szkolenie BHP',
      'Upoważnienie pracodawcy, a do prac tego wymagających – polecenie i dopuszczenie',
    ],
    followUps: [
      { q: 'Czy samo świadectwo kwalifikacyjne wystarczy, żeby przystąpić do pracy?', a: 'Nie. Potrzebne jest też upoważnienie pracodawcy (prowadzącego eksploatację), aktualne badania lekarskie i szkolenie BHP, a do prac w warunkach szczególnego zagrożenia – polecenie i dopuszczenie do pracy.' },
      { q: 'Kto może wykonywać prace pomocnicze przy urządzeniach bez świadectwa?', a: 'Osoba bez kwalifikacji – tylko prace pomocnicze z wykazu pracodawcy i pod nadzorem osoby upoważnionej. Samodzielnie nie może wykonywać prac eksploatacyjnych.' },
    ],
  },
  r1q8: {
    checklist: [
      'Napięcie, na które urządzenie zaprojektowano',
      'Granica 1 kV oddziela pkt 2 od pkt 3–5',
      'Sieć 230/400 V = pkt 2',
      'Grupa G1 obejmuje wszystkie napięcia – zależnie od punktu',
    ],
    followUps: [
      { q: 'Co oznacza zapis 230/400 V?', a: '230 V to napięcie fazowe (faza–N), 400 V – międzyfazowe (faza–faza). 400 ≈ 230 × √3, bo napięcia faz są przesunięte o 120°.' },
      { q: 'Jakie napięcie uznaje się za bardzo niskie (bezpieczne)?', a: 'Napięcie bardzo niskie (ELV): do 50 V AC lub 120 V DC – w obwodach SELV i PELV. W szczególnych miejscach jeszcze niżej, np. w strefie 0 łazienki – do 12 V AC.' },
    ],
  },
  r1q9: {
    checklist: [
      'Najpierw uwolnić spod napięcia – wyłączyć albo odsunąć izolującym przedmiotem',
      'Ocena: reakcja, drożność dróg oddechowych, oddech do 10 s',
      'Brak oddechu: 112 + AED + RKO 30:2',
      'Oddycha, nieprzytomny: pozycja bezpieczna i kontrola oddechu',
    ],
    followUps: [
      { q: 'Jak głęboko i jak szybko uciskasz klatkę piersiową dorosłego?', a: 'Na głębokość 5–6 cm, w tempie 100–120 uciśnięć na minutę, na środku klatki piersiowej, pozwalając jej w pełni się unieść po każdym uciśnięciu.' },
      { q: 'Czy można użyć AED, gdy poszkodowany leży na mokrej posadzce?', a: 'Tak, ale najpierw przenieś go w suche miejsce albo osusz klatkę piersiową. Podczas analizy rytmu i wyładowania nikt nie może dotykać poszkodowanego – AED poda polecenia głosowe.' },
    ],
  },
  r1q10: {
    checklist: [
      'Natężenie prądu przez ciało – najważniejsze',
      'Czas przepływu',
      'Droga prądu (przez serce – najgroźniejsza)',
      'Rodzaj i częstotliwość prądu, rezystancja ciała (mokra skóra)',
    ],
    followUps: [
      { q: 'Dlaczego mokre ręce są tak niebezpieczne?', a: 'Mokra skóra ma znacznie mniejszą rezystancję – przy tym samym napięciu płynie kilka razy większy prąd. Np. 230 V przez 500 Ω to ok. 460 mA, a przez 2000 Ω – ok. 115 mA.' },
      { q: 'Od jakiego prądu człowiek nie jest w stanie puścić przewodu?', a: 'Od ok. 10 mA prądu przemiennego (próg samouwolnienia) – mięśnie kurczą się tak, że dłoń zaciska się na przewodzie. Dlatego RCD przeciwporażeniowy ma 30 mA i wyłącza w ułamku sekundy.' },
    ],
  },
  r1q11: {
    checklist: [
      'Organizacja bezpiecznej pracy i wydawanie poleceń',
      'Sprawdzenie kwalifikacji i przygotowania pracowników',
      'Kontrola przestrzegania BHP, sprzętu ochronnego i ŚOI',
      'Wstrzymanie pracy przy zagrożeniu, bezpieczne zakończenie',
    ],
    followUps: [
      { q: 'Co robi osoba dozoru, gdy widzi zespół pracujący bez uziemiaczy?', a: 'Natychmiast wstrzymuje pracę – osoby dozoru mają taki obowiązek, gdy nie są zachowane warunki bezpieczeństwa. Wznowienie dopiero po przywróceniu zabezpieczeń.' },
      { q: 'Kiedy kierujący zespołem wyłącza pracownika z pracy?', a: 'Gdy pracownik nie zapewnia bezpiecznego wykonania pracy – np. jest niedysponowany fizycznie lub psychicznie albo nie stosuje środków ochrony. Powiadamia o tym poleceniodawcę.' },
    ],
  },
  r1q12: {
    checklist: [
      '5 lat',
      'Liczone od daty wydania świadectwa',
      'Odnowienie = ponowny egzamin, bez okresu karencji',
      'Świadectwa „bezterminowe" wygasły 3.07.2026',
    ],
    followUps: [
      { q: 'Kto wydaje świadectwa kwalifikacyjne?', a: 'Komisje kwalifikacyjne działające na podstawie Prawa energetycznego – m.in. przy SEP, ale też przy innych organizacjach. „Uprawnienia SEP" to skrót myślowy.' },
      { q: 'Co grozi, gdy pracujesz z nieważnym świadectwem?', a: 'To praca bez wymaganych kwalifikacji – pracodawca odpowiada za dopuszczenie do niej, a w razie wypadku obaj ponoszą odpowiedzialność, także karną i cywilną.' },
    ],
  },

  // ───────────────────────────── RUNDA 2 ─────────────────────────────
  r2q1: {
    checklist: [
      'Sprawdza stan izolacji – między przewodami czynnymi i między nimi a PE',
      'Megaomomierz 500 V DC (instalacja 230/400 V)',
      'Wynik co najmniej 1 MΩ',
      'Przy odbiorze, po remoncie lub zalaniu, przy kontroli okresowej',
    ],
    followUps: [
      { q: 'Jakie napięcie probiercze i jakie minimum obowiązuje w obwodzie SELV?', a: 'Dla SELV i PELV: 250 V DC i co najmniej 0,5 MΩ. Dla obwodów do 500 V: 500 V DC i ≥ 1 MΩ, powyżej 500 V: 1000 V DC i ≥ 1 MΩ.' },
      { q: 'Między którymi przewodami mierzysz izolację?', a: 'Między przewodami czynnymi (L–N, w 3F także między fazami) oraz między każdym przewodem czynnym a PE. Norma dopuszcza zwarcie L i N i pomiar do PE.' },
    ],
  },
  r2q2: {
    checklist: [
      'Megaomomierz (miernik rezystancji izolacji)',
      '500 V DC',
      'Minimum 1 MΩ',
      'Obwód bez napięcia, odbiorniki i SPD odłączone',
    ],
    followUps: [
      { q: 'Dlaczego mierzy się napięciem stałym, a nie przemiennym?', a: 'Przy napięciu stałym, po naładowaniu pojemności przewodów, płynie już tylko prąd upływu przez izolację – z niego miernik liczy rezystancję. Przy AC płynąłby prąd pojemnościowy, który zafałszowałby wynik.' },
      { q: 'Miernik pokazuje „> 999 MΩ". Co wpisujesz do protokołu?', a: 'Wynik powyżej zakresu – wpisuje się go w tej postaci (np. > 999 MΩ) z oceną pozytywną. Nie wpisuje się zera ani „nieskończoności".' },
    ],
  },
  r2q3: {
    checklist: [
      'Pętla: źródło → L → miejsce zwarcia → PE → źródło',
      'Ik = U₀ / Zs',
      'Sprawdza samoczynne wyłączenie zasilania w wymaganym czasie',
      'Pomiar pod napięciem, miernikiem impedancji pętli',
    ],
    followUps: [
      { q: 'Ile maksymalnie może wynosić Zs dla wyłącznika B16?', a: 'Zs ≤ U₀ / Ia = 230 V / 80 A ≈ 2,88 Ω (Ia = 5 × In dla charakterystyki B). Dla C16: 230 / 160 ≈ 1,44 Ω.' },
      { q: 'Co zrobisz, gdy zmierzona Zs jest za duża?', a: 'Szukam przyczyny (luźne połączenia, za mały przekrój, długi obwód). Rozwiązania: poprawa połączeń, większy przekrój, mniejszy prąd znamionowy zabezpieczenia albo RCD jako środek samoczynnego wyłączenia.' },
    ],
  },
  r2q4: {
    checklist: [
      'Porównuje prąd w L i N – różnica oznacza upływ',
      'IΔn 30 mA – ochrona uzupełniająca przy dotyku',
      'Przycisk TEST okresowo (zwykle co miesiąc) – przez użytkownika',
      'Do protokołu: pomiar miernikiem – prąd i czas zadziałania',
    ],
    followUps: [
      { q: 'Czy RCD zadziała przy zwarciu L–N?', a: 'Nie – prąd zwarciowy wypływa przewodem L i wraca N, różnica wynosi zero. Zwarcie L–N wyłącza wyłącznik nadprądowy.' },
      { q: 'Czy RCD 30 mA ogranicza prąd rażenia do 30 mA?', a: 'Nie. Przez ciało płynie prąd wynikający z napięcia i rezystancji ciała – często setki mA. RCD skraca czas przepływu do kilkudziesięciu milisekund i to on ratuje życie.' },
    ],
  },
  r2q5: {
    checklist: [
      'Ciągłość PE – czy przewód ochronny jest połączony, wynik mΩ..Ω',
      'Ciągłość: przyrząd 4–24 V, prąd ≥ 200 mA',
      'Izolacja – czy izolacja nie przepuszcza prądu, wynik w MΩ',
      'Izolacja: 500 V DC, minimum 1 MΩ',
    ],
    followUps: [
      { q: 'Który z tych pomiarów wykonujesz najpierw i dlaczego?', a: 'Ciągłość PE przed izolacją – przy pomiarze izolacji do PE musisz mieć pewność, że PE jest ciągły. Przy przerwanym PE wynik L–PE wyszedłby fałszywie dobry.' },
      { q: 'Co oznacza wynik 0,05 Ω przy pomiarze izolacji?', a: 'Praktycznie zwarcie – izolacja przebita albo przewody połączone (np. przez podłączony odbiornik). Obwodu nie wolno załączyć, trzeba znaleźć przyczynę.' },
    ],
  },
  r2q6: {
    checklist: [
      'Do pomiarów potrzebny zakres kontrolno-pomiarowy',
      'Dla instalacji w budynku: G1 pkt 2 (do 1 kV)',
      'Pkt 13 (dawniej 10) = aparatura kontrolno-pomiarowa i automatyka',
      'Kontrola okresowa z art. 62 – kwalifikacje D albo uprawnienia budowlane',
    ],
    followUps: [
      { q: 'Co oznacza dziś pkt 10 grupy G1?', a: 'Elektryczną sieć trakcyjną (wg rozporządzenia z 2022 r.). „Pkt 10 = pomiary" to numeracja z rozporządzenia z 2003 r.' },
      { q: 'Kto podpisuje protokół z pomiarów, a kto z kontroli okresowej?', a: 'Protokół pomiarów – osoba, która je wykonała (E z zakresem kontrolno-pomiarowym). Kontrolę okresową z art. 62 przeprowadza i podpisuje osoba z kwalifikacjami D (albo z uprawnieniami budowlanymi w specjalności instalacyjnej).' },
    ],
  },
  r2q7: {
    checklist: [
      'Dane obiektu i opis lub schemat instalacji',
      'Przyrządy z ważnym świadectwem wzorcowania',
      'Wyniki każdego obwodu z jednostkami, wartościami dopuszczalnymi i oceną',
      'Data, podpis osoby z zakresem kontrolno-pomiarowym',
    ],
    followUps: [
      { q: 'Co robisz, gdy jeden obwód nie spełnia wymagań?', a: 'Wpisuję wynik z oceną negatywną, opisuję usterkę i zalecenie naprawy. Obwód nie może pracować do naprawy i ponownego pomiaru. Wyników w protokole się nie „poprawia".' },
      { q: 'Po co w protokole wartości dopuszczalne?', a: 'Żeby ocena była sprawdzalna – przy każdym wyniku widać, z jaką granicą go porównano (np. Zs ≤ 2,88 Ω dla B16, izolacja ≥ 1 MΩ).' },
    ],
  },
  r2q8: {
    checklist: [
      'Klasa I – izolacja podstawowa + przyłączenie do PE',
      'Klasa II – izolacja podwójna lub wzmocniona, bez PE (kwadrat w kwadracie)',
      'Klasa III – zasilanie bardzo niskim napięciem SELV/PELV',
      'Klasy II i III nie przyłącza się do PE',
    ],
    followUps: [
      { q: 'Co to jest klasa 0 i czy wolno ją stosować?', a: 'Urządzenie z samą izolacją podstawową, bez zacisku PE. W zwykłych instalacjach się jej nie stosuje – dopuszczalna jest tylko przy szczególnych środkach ochrony (izolowanie stanowiska, separacja elektryczna).' },
      { q: 'Wiertarka klasy II ma wtyczkę bez bolca. Czy to usterka?', a: 'Nie – urządzenie klasy II nie ma przewodu PE i wtyczka płaska jest prawidłowa. Do takiego urządzenia nie dorabia się przewodu PE.' },
    ],
  },
  r2q9: {
    checklist: [
      'IP = stopień ochrony zapewniany przez obudowę',
      '1. cyfra (0–6): ciała stałe i pył; 6 = pyłoszczelna',
      '2. cyfra (0–9): woda; 4 = bryzgi z każdej strony, 7 = chwilowe zanurzenie',
      'Dobór do warunków: łazienka, zewnątrz, zapylenie',
    ],
    followUps: [
      { q: 'Co oznacza IP2X?', a: 'Ochronę przed dotykiem palcem (obiekty ≥ 12,5 mm); X oznacza, że ochrona przed wodą nie jest określona. To typowe wymaganie dla osłon części czynnych w rozdzielnicach.' },
      { q: 'Jaki stopień ochrony obowiązuje w strefie 0 łazienki?', a: 'Co najmniej IPX7, a urządzenia mogą być zasilane tylko z SELV do 12 V AC (30 V DC). W strefach 1 i 2 – co najmniej IPX4.' },
    ],
  },
  r2q10: {
    checklist: [
      'Polecenie i dopuszczenie (jeśli wymagane), przyjęcie strefy od dopuszczającego',
      'Osobiste sprawdzenie braku napięcia sprawnym wskaźnikiem',
      'Sprawdzenie uziemiaczy lub zwieraczy, blokad i tablic',
      'Sprawny sprzęt ochronny i środki ochrony indywidualnej',
    ],
    followUps: [
      { q: 'Gdzie powinien być uziemiacz, żeby praca była bezpieczna?', a: 'Strefa pracy musi być uziemiona ze wszystkich stron, z których może pojawić się napięcie, a co najmniej jeden uziemiacz powinien być widoczny z miejsca pracy.' },
      { q: 'Na których przewodach sprawdzasz brak napięcia w instalacji 400 V?', a: 'Na wszystkich fazach, a w urządzeniach do 1 kV także na przewodzie N – może mieć napięcie, np. przy przerwie w N albo zamianie przewodów.' },
    ],
  },
  r2q11: {
    checklist: [
      'Poleceniodawca (D) – wydaje polecenie pisemne',
      'Dopuszczający (E) – przygotowuje strefę i dopuszcza zespół',
      'Kierujący zespołem (E) – przyjmuje strefę i kieruje pracą',
      'Koordynujący (D), nadzorujący (E lub D); dopuszczającego i kierującego się nie łączy',
    ],
    followUps: [
      { q: 'Dlaczego dopuszczający nie może być jednocześnie kierującym zespołem?', a: 'To zasada dwóch par oczu: jeden przygotowuje strefę, drugi niezależnie ją sprawdza i przyjmuje. Połączenie usuwa tę kontrolę (wyjątek: prace pod napięciem).' },
      { q: 'Kiedy wyznacza się nadzorującego?', a: 'Gdy pracę wykonują osoby bez wymaganych kwalifikacji lub pracownicy firmy zewnętrznej, albo gdy poleceniodawca uzna to za konieczne. Nadzorujący wykonuje wyłącznie nadzór.' },
    ],
  },
  r2q12: {
    checklist: [
      'Wyłączenie z przerwą izolacyjną i zabezpieczenie przed załączeniem (blokada, tablica)',
      'Sprawdzenie braku napięcia na wszystkich fazach i N',
      'Uziemienie i zwarcie – po sprawdzeniu, ze wszystkich stron',
      'Oznaczenie strefy i dopuszczenie z podpisami w poleceniu',
    ],
    followUps: [
      { q: 'Co uważa się za przerwę izolacyjną?', a: 'Otwarte zestyki łącznika na pełną odległość, wyjęte wkładki bezpiecznikowe, zdemontowany fragment obwodu albo łącznik w obudowie, którego otwarcie jednoznacznie pokazuje wskaźnik położenia.' },
      { q: 'W jakiej kolejności zakładasz i zdejmujesz uziemiacz przenośny?', a: 'Zakładanie: najpierw zacisk uziomowy (do oczyszczonego uziemienia), potem zaciski fazowe – drążkiem. Zdejmowanie odwrotnie: najpierw fazowe, na końcu uziomowy.' },
    ],
  },
  r2q13: {
    checklist: [
      'Art. 62 Prawa budowlanego – co najmniej raz na 5 lat',
      'Kontrolę może przeprowadzić osoba z D albo z uprawnieniami budowlanymi',
      'Strefy zagrożenia wybuchem – częściej, wg dokumentu zabezpieczenia przed wybuchem (typowo co rok)',
      'Obowiązek ciąży na właścicielu lub zarządcy obiektu',
    ],
    followUps: [
      { q: 'Czy kontrola okresowa to to samo co pomiary?', a: 'Nie. Kontrola okresowa (art. 62) to ocena stanu technicznego – oględziny plus wyniki pomiarów. Pomiary wykonuje osoba z zakresem kontrolno-pomiarowym (E), kontrolę – osoba z D albo z uprawnieniami budowlanymi.' },
      { q: 'Gdzie dokumentuje się kontrolę okresową?', a: 'Protokół wpisuje się do książki obiektu budowlanego – tam, gdzie jej prowadzenie jest wymagane (nie dotyczy to np. domów jednorodzinnych).' },
    ],
  },
  r2q14: {
    checklist: [
      'Sprzęt izolacyjny dobrany do napięcia: rękawice elektroizolacyjne, obuwie lub dywanik, drążki',
      'Wskaźnik napięcia i uziemiacze lub zwieracze przenośne',
      'Przy ryzyku łuku: hełm z osłoną twarzy, odzież trudnopalna',
      'Oględziny przed użyciem i aktualne badania okresowe sprzętu',
    ],
    followUps: [
      { q: 'Co sprawdzasz w rękawicach elektroizolacyjnych przed użyciem?', a: 'Datę ważności badania okresowego, klasę napięciową oraz brak uszkodzeń i szczelność – np. zwijając mankiet i sprawdzając, czy rękawica trzyma powietrze.' },
      { q: 'Jakie środki ochrony stosujesz przy zakładaniu uziemiaczy w urządzeniach do 1 kV?', a: 'Rękawice (do 1 kV mogą być skórzane, powyżej 1 kV – elektroizolacyjne) i hełm z przeciwłukową osłoną twarzy; zaciski fazowe zakłada się drążkiem, nie gołymi rękami.' },
    ],
  },

  // ───────────────────────────── RUNDA 3 ─────────────────────────────
  r3q1: {
    checklist: [
      'Zależy od rodzaju pracy – samo wyłączenie napięcia niczego nie zmienia',
      'Szczególne zagrożenie → polecenie pisemne i dopuszczenie',
      'Bez polecenia: prace z instrukcji eksploatacji wskazane w IOBP',
      'Bez polecenia: ratowanie życia, zdrowia, mienia – z powiadomieniem przełożonego',
    ],
    followUps: [
      { q: 'Podaj przykład pracy, którą wolno wykonać bez polecenia.', a: 'Np. oględziny rozdzielni lub odczyt wskazań zgodnie z instrukcją eksploatacji przez upoważnionego pracownika, albo natychmiastowe wyłączenie zasilania, gdy ktoś jest porażony lub woda zalewa rozdzielnicę.' },
      { q: 'Czy pracownik firmy zewnętrznej może pracować bez polecenia?', a: 'Co do zasady nie – prace pracowników spoza zakładu prowadzącego eksploatację wykonuje się na polecenie pisemne (chyba że dopuszczenie ustalono odrębnie na piśmie), zwykle z nadzorującym.' },
    ],
  },
  r3q2: {
    checklist: [
      'Nie',
      'Każdy osobiście sprawdza brak napięcia',
      'Własnym, sprawdzonym wskaźnikiem',
      'Bezpośrednio przed rozpoczęciem pracy',
    ],
    followUps: [
      { q: 'Jak upewniasz się, że wskaźnik napięcia jest sprawny?', a: 'Sprawdzam go na znanym źródle napięcia bezpośrednio przed sprawdzeniem braku napięcia, a najlepiej także zaraz po nim.' },
      { q: 'Czy lampka sygnalizacyjna albo woltomierz w rozdzielnicy wystarczą jako dowód braku napięcia?', a: 'Nie. Brak napięcia sprawdza się przenośnym wskaźnikiem – wskaźniki zamontowane na stałe i przyrządy tablicowe nie mogą być jedyną podstawą.' },
    ],
  },
  r3q3: {
    checklist: [
      'Nie',
      'Minimum 1 MΩ (500 V DC, instalacja 230/400 V)',
      'Znaleźć przyczynę – podzielić obwód, sprawdzić puszki, zawilgocenie, odbiorniki',
      'Po naprawie – pomiar ponownie',
    ],
    followUps: [
      { q: 'Jak zlokalizujesz miejsce uszkodzenia izolacji?', a: 'Dzielę obwód na odcinki (w puszkach, przy gniazdach) i mierzę każdy osobno, aż znajdę odcinek z niską rezystancją. Sprawdzam też, czy nie został podłączony odbiornik albo SPD.' },
      { q: 'Po zalaniu mieszkania wynik to 0,3 MΩ. Co robisz?', a: 'Nie załączam obwodu. Instalacja musi wyschnąć (często kilka dni, z osuszaniem), potem mierzę ponownie. Jeśli wynik nie wraca do ≥ 1 MΩ – wymiana uszkodzonych odcinków.' },
    ],
  },
  r3q4: {
    checklist: [
      'Przy zwarciu na obudowę w układzie TN – tak (samoczynne wyłączenie zasilania)',
      'Warunek: mała impedancja pętli (B16: Ik ≥ 80 A, Zs ≤ 2,88 Ω)',
      'Przy dotyku fazy przez człowieka – nie, prąd za mały',
      'Dotyk fazy → RCD 30 mA (ochrona uzupełniająca)',
    ],
    followUps: [
      { q: 'Jak nazywa się ochrona realizowana przez wyłącznik nadprądowy przy zwarciu na obudowę?', a: 'Ochrona przy uszkodzeniu przez samoczynne wyłączenie zasilania (dawniej: ochrona przed dotykiem pośrednim).' },
      { q: 'Jakie trzy poziomy ochrony przeciwporażeniowej rozróżnia norma?', a: 'Ochronę podstawową (izolacja, obudowy, przegrody – przed dotykiem części czynnych), ochronę przy uszkodzeniu (np. samoczynne wyłączenie, izolacja podwójna, separacja) i ochronę uzupełniającą (RCD 30 mA, połączenia wyrównawcze miejscowe).' },
    ],
  },
  r3q5: {
    checklist: [
      'Nie',
      'Izolacja podwójna lub wzmocniona chroni bez PE',
      'Symbol: kwadrat w kwadracie',
      'Do urządzenia klasy II nie dorabia się przewodu PE',
    ],
    followUps: [
      { q: 'Urządzenie klasy I ma wtyczkę bez styku ochronnego (ktoś ją wymienił). Co robisz?', a: 'Wycofuję je z użycia do naprawy – urządzenie klasy I bez przyłączonego PE nie ma ochrony przy uszkodzeniu. Wtyczkę wymienia się na właściwą, ze stykiem ochronnym.' },
      { q: 'Jak rozpoznasz klasę ochronności na urządzeniu?', a: 'Klasa II – kwadrat w kwadracie; klasa III – romb z cyfrą III; urządzenie klasy I ma zacisk ochronny oznaczony symbolem uziemienia ochronnego i wtyczkę ze stykiem ochronnym.' },
    ],
  },
  r3q6: {
    checklist: [
      'Kierujący nie opuszcza samowolnie strefy pracy',
      'Przerywa pracę i wyprowadza zespół',
      'Zabezpiecza strefę przed osobami postronnymi',
      'Wznowienie po sprawdzeniu zabezpieczeń albo ponownym dopuszczeniu',
    ],
    followUps: [
      { q: 'Kiedy po przerwie nie trzeba ponownego dopuszczenia?', a: 'Gdy zespół nie opuścił strefy pracy albo strefa była zabezpieczona przed dostępem osób postronnych. Kierujący i tak sprawdza przed wznowieniem zabezpieczenia – jeśli coś się zmieniło, wznowienie jest zabronione.' },
      { q: 'Kto i kiedy może przerwać pracę zespołu?', a: 'Każdy pracownik musi przerwać pracę, gdy pojawi się zagrożenie (i zawiadomić kierującego). Osoby dozoru muszą ją wstrzymać, gdy nie są zachowane warunki bezpieczeństwa.' },
    ],
  },
  r3q7: {
    checklist: [
      'Tak – poleceniodawca może cofnąć polecenie',
      'Praca natychmiast wstrzymana, zespół wyprowadzony ze strefy',
      'Poinformowanie dopuszczającego i kierującego zespołem',
      'Odnotowanie w poleceniu',
    ],
    followUps: [
      { q: 'Jak długo ważne jest polecenie pisemne?', a: 'Przez czas określony przez poleceniodawcę. Poleceniodawca może w nim zmienić termin wykonania pracy lub liczbę pracowników – zmiany odnotowuje się w poleceniu.' },
      { q: 'Kto zamyka polecenie po zakończeniu pracy?', a: 'Kierujący zespołem po wyprowadzeniu zespołu i usunięciu narzędzi podpisuje zakończenie i powiadamia dopuszczającego; dopuszczający po oględzinach likwiduje strefę i potwierdza zakończenie w poleceniu.' },
    ],
  },
  r3q8: {
    checklist: [
      'Natychmiast przerwać pracę',
      'Odsunąć się i niczego nie dotykać',
      'Powiadomić kierującego zespołem lub dopuszczającego',
      'Wznowienie dopiero po ustaleniu przyczyny i ponownym przygotowaniu strefy',
    ],
    followUps: [
      { q: 'Jak mogło dojść do powrotu napięcia mimo wyłączenia?', a: 'Np. brak blokady i ktoś załączył łącznik, zasilanie z innej strony (drugie źródło, agregat, fotowoltaika), pomyłka obwodu. Dlatego blokuje się napędy, wywiesza tablice, sprawdza brak napięcia i uziemia ze wszystkich stron.' },
      { q: 'Dlaczego uziemiacz chroni nawet przy przypadkowym załączeniu?', a: 'Uziemiacz zwiera fazy ze sobą i z ziemią – przy załączeniu powstaje zwarcie, które wyłączy zabezpieczenie, a w strefie pracy napięcie pozostaje bliskie zeru.' },
    ],
  },
  r3q9: {
    checklist: [
      'Nie – zawsze 112 lub lekarz',
      'Opóźnione skutki: zaburzenia rytmu serca',
      'Oparzenia i uszkodzenia wewnętrzne niewidoczne z zewnątrz',
      'Obserwacja poszkodowanego do przyjazdu pomocy',
    ],
    followUps: [
      { q: 'Jakie skutki porażenia mogą ujawnić się później?', a: 'Zaburzenia rytmu serca (zwykle w ciągu kilku godzin), uszkodzenia mięśni i nerek, oparzenia wewnętrzne wzdłuż drogi przepływu prądu. Dlatego obowiązuje ocena lekarska.' },
      { q: 'Gdzie szukasz obrażeń na ciele po porażeniu?', a: 'W miejscach wejścia i wyjścia prądu – najczęściej dłonie i stopy. Oparzenia elektryczne bywają małe na skórze, ale głębokie w środku.' },
    ],
  },
  r3q10: {
    checklist: [
      'Własna izolacja: suche, nieprzewodzące podłoże',
      'Suchy przedmiot izolujący: deska, lina, ubranie',
      'Nigdy gołymi rękami ani przedmiotem przewodzącym',
      'Po uwolnieniu: ocena oddechu, 112, RKO i AED',
    ],
    followUps: [
      { q: 'Czy tak samo uwolnisz porażonego przy linii 15 kV?', a: 'Nie. Przy napięciu powyżej 1 kV się nie podchodzi – trzeba doprowadzić do wyłączenia napięcia przez operatora sieci. Niebezpieczne jest już samo zbliżenie, m.in. przez napięcie krokowe.' },
      { q: 'Co to jest napięcie krokowe?', a: 'Napięcie między stopami człowieka stojącego w pobliżu miejsca, w którym prąd spływa do ziemi (np. zerwany przewód). Odchodzi się drobnymi krokami albo skacząc na złączonych nogach.' },
    ],
  },
  r3q11: {
    checklist: [
      'Nie – samo D nie daje prawa do pracy fizycznej',
      'D = kierowanie pracą i nadzór nad eksploatacją',
      'Praca fizyczna wymaga świadectwa E',
      'Dlatego zwykle zdaje się E i D',
    ],
    followUps: [
      { q: 'Jakie funkcje przy pracy na polecenie może pełnić osoba z samym D?', a: 'Funkcje dozoru – poleceniodawcy, koordynującego albo nadzorującego. Nie może być dopuszczającym ani kierującym zespołem, bo te funkcje wymagają świadectwa E.' },
      { q: 'Czy świadectwa E i D muszą obejmować te same urządzenia?', a: 'Nie – każde świadectwo ma swój zakres (punkty i czynności). Liczy się to, co jest w nim wpisane, i to musi odpowiadać wykonywanej pracy.' },
    ],
  },
  r3q12: {
    checklist: [
      'Nie',
      'Ważność kończy się po 5 latach od wydania – bez karencji',
      'Praca bez wymaganych kwalifikacji to naruszenie przepisów',
      'Egzamin planuje się z wyprzedzeniem',
    ],
    followUps: [
      { q: 'Kto odpowiada za to, że pracownik pracuje z nieważnym świadectwem?', a: 'Pracodawca – nie może dopuścić do prac osoby bez wymaganych kwalifikacji. Pracownik też łamie przepisy – w razie wypadku odpowiadają obaj.' },
      { q: 'Czy bez ważnego świadectwa możesz pomagać przy pracach?', a: 'Tylko jak osoba bez kwalifikacji – przy pracach pomocniczych z wykazu pracodawcy, pod nadzorem osoby upoważnionej. Samodzielnych prac eksploatacyjnych – nie.' },
    ],
  },
  r3q13: {
    checklist: [
      'Niekoniecznie – brak wskazania nie dowodzi braku napięcia',
      'Sprawdzić wskaźnik na znanym napięciu przed i po',
      'Sprawdzić wszystkie fazy i N',
      'Używać wskaźnika dobranego do napięcia – nie neonówki',
    ],
    followUps: [
      { q: 'Dlaczego neonówka-śrubokręt nie jest wskaźnikiem napięcia?', a: 'Świeci dzięki prądowi płynącemu przez ciało do ziemi – stojąc na izolującym podłożu możesz nic nie zobaczyć mimo napięcia. Nie służy do sprawdzania braku napięcia.' },
      { q: 'Jakim przyrządem sprawdzasz brak napięcia w instalacji do 1 kV?', a: 'Dwubiegunowym wskaźnikiem niskiego napięcia (najlepiej akustyczno-optycznym), dobranym do napięcia urządzenia i sprawdzonym przed użyciem i po nim.' },
    ],
  },

  // ───────────────────────────── RUNDA 4 ─────────────────────────────
  r4q1: {
    checklist: [
      'Megaomomierz, 500 V DC dla instalacji 230/400 V',
      'Multimetr mierzy przy kilku woltach – nie obciąży izolacji',
      'Słabe miejsca izolacji ujawniają się dopiero przy napięciu wyższym od roboczego',
      'Wynik w MΩ, minimum 1 MΩ',
    ],
    followUps: [
      { q: 'Jakim napięciem mierzysz izolację obwodu SELV?', a: '250 V DC – wymagane co najmniej 0,5 MΩ.' },
      { q: 'Czy 500 V DC może coś uszkodzić?', a: 'Tak – elektronikę: zasilacze, sterowniki, ściemniacze, oprawy LED, falowniki. Dlatego przed pomiarem odłącza się odbiorniki i SPD.' },
    ],
  },
  r4q2: {
    checklist: [
      'Minimum 1 MΩ',
      '0,5 MΩ – za mało, instalacja niezgodna',
      'Zlokalizować i usunąć uszkodzenie',
      'Po naprawie pomiar ponownie',
    ],
    followUps: [
      { q: 'Wynik 1,2 MΩ w nowej instalacji – wszystko w porządku?', a: 'Formalnie spełnia minimum, ale w nowej instalacji typowe wyniki to setki MΩ. Tak niski wynik to sygnał ostrzegawczy – szukam przyczyny (wilgoć, uszkodzony przewód, podłączony odbiornik).' },
      { q: 'Od czego poza stanem przewodów zależy wynik pomiaru izolacji?', a: 'Od wilgotności i temperatury, długości obwodu (dłuższy = niższy wynik) i od tego, czy nie zostały podłączone odbiorniki lub SPD.' },
    ],
  },
  r4q3: {
    checklist: [
      'Tak – bezwzględnie',
      '500 V DC niszczy elektronikę',
      'Odłączyć też SPD – warystory zaniżą wynik',
      'Łączniki w obwodzie załączone, żeby zmierzyć cały obwód',
    ],
    followUps: [
      { q: 'Co zrobisz, gdy odbiornika nie da się odłączyć?', a: 'Mierzę ze zwartymi L i N do PE – elektronika między L i N nie dostaje wtedy napięcia probierczego. Gdy przeszkadzają SPD, norma pozwala obniżyć napięcie probiercze do 250 V DC, ale wynik nadal musi wynosić co najmniej 1 MΩ.' },
      { q: 'Po co ustawiać łączniki w pozycji załączonej?', a: 'Żeby pomiar objął cały obwód – za otwartym łącznikiem (np. światła) część przewodów zostałaby niezmierzona.' },
    ],
  },
  r4q4: {
    checklist: [
      'Wyłączenie i sprawdzenie braku napięcia',
      'Odłączenie odbiorników i SPD',
      'Pomiar L–PE, N–PE, L–N, odczyt po ustabilizowaniu',
      'Rozładowanie (przez miernik) i zapis w protokole',
    ],
    followUps: [
      { q: 'Dlaczego obwód po pomiarze trzeba rozładować?', a: 'Przewody tworzą kondensator – po pomiarze 500 V DC mogą trzymać ładunek. Nowoczesny miernik rozładowuje obwód sam, dlatego nie odpina się przewodów, dopóki nie pokaże 0 V.' },
      { q: 'Dlaczego wynik rośnie w czasie pomiaru?', a: 'Izolacja ładuje się jak kondensator i prąd upływu maleje. To normalne – dlatego wynik odczytuje się po ustabilizowaniu (w praktyce ok. 60 s).' },
    ],
  },
  r4q5: {
    checklist: [
      'Czy PE jest ciągły od gniazda lub obudowy do szyny PE',
      'Wynik w mΩ..Ω',
      'Przyrząd wg PN-EN 61557-4: 4–24 V, ≥ 200 mA',
      'Kompensacja przewodów pomiarowych przed pomiarem',
    ],
    followUps: [
      { q: 'Jakiego wyniku spodziewasz się dla 20 m przewodu 2,5 mm²?', a: 'Miedź 2,5 mm² to ok. 0,007 Ω na metr, więc 20 m daje ok. 0,14 Ω, plus zaciski – rząd dziesiątych części oma.' },
      { q: 'Co jeszcze, poza przewodami PE w obwodach, sprawdzasz pomiarem ciągłości?', a: 'Połączenia wyrównawcze – główne (rury, konstrukcje do szyny wyrównawczej) i miejscowe (np. w łazience).' },
    ],
  },
  r4q6: {
    checklist: [
      'Wymaganie PN-HD 60364-6 – przyrząd wg PN-EN 61557-4',
      'Napięcie 4–24 V, prąd ≥ 200 mA',
      'Miarodajny wynik w mΩ – prąd przebija cienkie tlenki',
      'Brzęczyk multimetru nie odróżni dobrego połączenia od złego',
    ],
    followUps: [
      { q: 'Czy multimetr wykryje przerwany przewód PE?', a: 'Przerwę – tak. Ale nie oceni jakości połączenia: luźny zacisk o 2–3 Ω da piśnięcie brzęczyka, a tlenki przy małym prądzie potrafią zawyżyć odczyt. Do protokołu potrzebny jest przyrząd 200 mA.' },
      { q: 'Co może sfałszować pomiar ciągłości niezależnie od przyrządu?', a: 'Równoległe drogi – np. rury lub konstrukcje metalowe połączone z PE. Przyrząd pokaże małą rezystancję mimo przerwanego przewodu PE.' },
    ],
  },
  r4q7: {
    checklist: [
      'Zs – impedancja całej drogi prądu zwarciowego (źródło, L, PE)',
      'Ik = U₀ / Zs',
      'Porównanie z Ia zabezpieczenia: B16 → 80 A, Zs ≤ 2,88 Ω',
      'Wymagany czas: 0,4 s (obwody odbiorcze do 32 A)',
    ],
    followUps: [
      { q: 'Ile wynosi Ia dla C16 i jakie jest dopuszczalne Zs?', a: 'Dla charakterystyki C Ia = 10 × In = 160 A, więc Zs ≤ 230 / 160 ≈ 1,44 Ω.' },
      { q: 'Dlaczego zmierzona Zs powinna mieć zapas względem wartości granicznej?', a: 'Mierzysz na zimnych przewodach, a przy zwarciu się nagrzewają i ich rezystancja rośnie. Norma w załączniku informacyjnym podpowiada porównanie z ok. 2/3 wartości granicznej.' },
    ],
  },
  r4q8: {
    checklist: [
      'TN 230 V: 0,4 s – obwody odbiorcze do 32 A (z gniazdami do 63 A)',
      'Dotyczy też oświetlenia i ogrzewania',
      '5 s – obwody rozdzielcze (np. WLZ)',
      'Źródło: PN-HD 60364-4-41',
    ],
    followUps: [
      { q: 'Jaki czas obowiązuje w układzie TT dla obwodu do 32 A przy 230 V?', a: '0,2 s – w układzie TT czasy są krótsze niż w TN. W praktyce zapewnia je RCD.' },
      { q: 'Co zrobisz, jeśli wyłącznik nadprądowy nie zapewni 0,4 s?', a: 'Mogę zastosować RCD jako środek samoczynnego wyłączenia (norma dopuszcza go w TN), zmniejszyć Zs (większy przekrój, poprawa połączeń) albo zmniejszyć prąd znamionowy zabezpieczenia.' },
    ],
  },
  r4q9: {
    checklist: [
      'AC – tylko prąd sinusoidalny, dziś wypierany',
      'A – AC + pulsujący DC (elektronika), dziś minimum',
      'F – urządzenia z falownikiem jednofazowym',
      'B – też gładki DC: falowniki trójfazowe, PV, ładowanie EV',
    ],
    followUps: [
      { q: 'Co oznacza RCD selektywny (S)?', a: 'Wyłącznik ze zwłoką czasową, montowany wyżej w instalacji (przed zwykłymi RCD). Przy upływie najpierw działa RCD bliżej usterki, a S – dopiero gdy ten zawiedzie. Dzięki temu nie gaśnie cały obiekt.' },
      { q: 'Czy RCD 300 mA chroni ludzi?', a: 'Nie jako ochrona uzupełniająca – 300 mA to RCD przeciwpożarowy, chroniący przed pożarem od prądów upływu. Do ochrony ludzi przy dotyku służy RCD o IΔn ≤ 30 mA.' },
    ],
  },
  r4q10: {
    checklist: [
      '0,5×IΔn – RCD nie może zadziałać',
      '1×IΔn – zadziałanie w ≤ 300 ms (RCD ogólny)',
      '5×IΔn – zadziałanie w ≤ 40 ms',
      'Pomiar przy obu polaryzacjach, wynik do protokołu',
    ],
    followUps: [
      { q: 'Co miernik RCD sprawdza, zanim wymusi prąd zadziałania?', a: 'Napięcie dotykowe UB przy małym prądzie – czy przy pełnym IΔn napięcie na częściach przewodzących nie przekroczy 50 V. Przy okazji wykrywa brak PE.' },
      { q: 'RCD wyłączył przy 1×IΔn po 280 ms. Wynik jest dobry?', a: 'Formalnie tak (≤ 300 ms), ale sprawny wyłącznik działa zwykle w 15–40 ms. Wynik blisko limitu to sygnał zużycia mechanizmu – warto to odnotować i zalecić obserwację lub wymianę.' },
    ],
  },
  r4q11: {
    checklist: [
      'Nie zastępuje',
      'TEST sprawdza tylko mechanizm wyzwalający',
      'Nie mierzy czasu ani prądu zadziałania i nie sprawdza PE',
      'Do protokołu odbiorczego – pomiar miernikiem RCD',
    ],
    followUps: [
      { q: 'Jak często użytkownik powinien naciskać TEST?', a: 'Zgodnie z zaleceniem producenta – zwykle raz w miesiącu. Wyłącznik, który długo nie działał, może się „zastać".' },
      { q: 'TEST działa, ale miernik nie wywołuje zadziałania przy 1×IΔn. Co to znaczy?', a: 'RCD lub obwód jest niesprawny mimo działającego mechanizmu – np. za mała czułość wyłącznika albo błąd połączeń (N połączony z PE za wyłącznikiem, część prądu wraca przez przekładnik). Obwód wymaga sprawdzenia i naprawy.' },
    ],
  },
  r4q12: {
    checklist: [
      'RE – rezystancja między uziomem a ziemią odniesienia',
      'Uziemienie odgromowe: zalecane poniżej 10 Ω',
      'Układ TT z RCD: RA × IΔn ≤ 50 V',
      'Układ TN: decyduje impedancja pętli, nie sama RE',
    ],
    followUps: [
      { q: 'Dlaczego wynik pomiaru uziemienia zależy od pory roku?', a: 'Rezystywność gruntu zmienia się z wilgotnością i temperaturą: mokry grunt zaniża wynik, suchy lub zamarznięty zawyża. Nie mierzy się tuż po deszczu, a w warunkach innych niż suche stosuje się współczynnik poprawkowy.' },
      { q: 'Ile może wynosić RA w układzie TT z RCD 30 mA?', a: 'RA ≤ 50 V / 0,03 A ≈ 1666 Ω – wymaganie łagodne. Przy RCD 300 mA tylko ok. 166 Ω.' },
    ],
  },
  r4q13: {
    checklist: [
      'Metoda trójzaciskowa (spadku potencjału)',
      'Elektrody: E – badana, P – napięciowa, C – prądowa',
      'RE = U / I',
      'Badany uziom odłączony; przesunięcie P sprawdza powtarzalność wyniku',
    ],
    followUps: [
      { q: 'Co się stanie, gdy elektroda P będzie za blisko uziomu E?', a: 'Znajdzie się w jego lejku potencjału – zmierzone napięcie będzie za małe i wynik zaniżony. Za blisko C – zawyżony. Dlatego przesuwa się P o kilka metrów i sprawdza, czy wynik się nie zmienia.' },
      { q: 'Kiedy można zmierzyć uziemienie bez rozkręcania zacisku kontrolnego?', a: 'Metodą cęgową (dwucęgową) albo trójzaciskową z cęgami – miernik mierzy prąd tylko w badanym przewodzie uziemiającym. Wymaga to istnienia równoległych dróg przez inne uziomy.' },
    ],
  },
  r4q14: {
    checklist: [
      'Oględziny – przed pomiarami',
      'Ciągłość przewodów ochronnych i połączeń wyrównawczych',
      'Rezystancja izolacji',
      'Samoczynne wyłączenie (pętla zwarcia), RCD, kolejność faz',
    ],
    followUps: [
      { q: 'Co sprawdzasz podczas oględzin?', a: 'M.in. dobór i oznaczenie przewodów (kolory, przekroje), dobór zabezpieczeń, stan osłon i obudów, połączenia wyrównawcze, opisy obwodów w rozdzielnicy, schematy, dostęp do aparatów i dobór IP do warunków.' },
      { q: 'W trakcie pomiarów wykryłeś usterkę i ją naprawiłeś. Co dalej?', a: 'Powtarzam pomiar, przy którym wykryto usterkę, oraz wszystkie wcześniejsze pomiary, na które naprawa mogła mieć wpływ.' },
    ],
  },
  r4q15: {
    checklist: [
      'Dane obiektu, opis lub schemat instalacji',
      'Przyrządy z ważnym w dniu pomiaru świadectwem wzorcowania',
      'Wyniki każdego obwodu, wartości dopuszczalne i ocena',
      'Data, imię, nazwisko i podpis osoby z zakresem kontrolno-pomiarowym',
    ],
    followUps: [
      { q: 'Kto wystawia świadectwo wzorcowania miernika?', a: 'Laboratorium wzorcujące (najlepiej akredytowane). Świadectwo dotyczy konkretnego egzemplarza (numer seryjny) – sprawdza się je przed wyjazdem na pomiary.' },
      { q: 'Czy protokół można spisać z pamięci po kilku dniach?', a: 'Nie – wyniki zapisuje się w trakcie pomiarów albo w pamięci miernika. Protokół musi odzwierciedlać rzeczywiście zmierzone wartości z datą pomiaru.' },
    ],
  },
  r4q16: {
    checklist: [
      'Tak – wymagane',
      'Art. 62: kontrola co najmniej raz na 5 lat',
      'Niezależnie od tego, czy instalacja „działa"',
      'Obowiązek właściciela lub zarządcy; degradacja izolacji jest niewidoczna',
    ],
    followUps: [
      { q: 'Kto ponosi konsekwencje braku kontroli okresowej?', a: 'Właściciel lub zarządca obiektu – grozi mu grzywna, a w razie wypadku lub pożaru także odpowiedzialność cywilna.' },
      { q: 'Co oceniasz w instalacji, która „działa"?', a: 'Stan izolacji, ciągłość PE, skuteczność samoczynnego wyłączenia (pętla zwarcia), działanie RCD, stan osprzętu i połączeń (np. przegrzane zaciski) – rzeczy niewidoczne dla użytkownika.' },
    ],
  },
}
