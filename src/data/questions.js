// 55 pytań egzaminacyjnych SEP G1 – 4 rundy (treść: Claude (AI) pod kierunkiem autora, sprawdzona z przepisami)
// trap: opis pułapki (pytania podchwytliwe), wrongAnswer: typowa błędna odpowiedź na egzaminie
// category: obszar egzaminu (areas.js), topic: gdzie doczytać teorię (topics.js)
// sources: przepis lub norma, na której opiera się odpowiedź (klucze z sources.js)

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
      '„Uprawnienia SEP" to potoczna nazwa świadectwa kwalifikacyjnego. Grupa 1 to urządzenia, instalacje i sieci elektroenergetyczne. Świadectwo określa trzy rzeczy: rodzaj urządzeń, zakres czynności i stanowisko. Rodzaj urządzeń to punkt grupy – rozporządzenie z 2022 r. dzieli grupę 1 na 16 punktów, np. pkt 2 – urządzenia, instalacje i sieci do 1 kV, pkt 9 – sieci elektrycznego oświetlenia ulicznego, pkt 13 – aparatura kontrolno-pomiarowa i automatyka. Zakres czynności to obsługa, konserwacja, remont lub naprawa, montaż lub demontaż oraz czynności kontrolno-pomiarowe. Stanowisko to eksploatacja (E) albo dozór (D).',
    keyPoints: 'Grupa 1 = elektroenergetyczne. Świadectwo określa punkt (np. pkt 2 – do 1 kV), zakres czynności (w tym kontrolno-pomiarowy) i stanowisko E albo D. Numeracja punktów wg rozporządzenia z 2022 r.',
    sources: [{ act: 'kwal', at: '§ 3, § 4 i załącznik nr 1' }],
  },
  {
    id: 'r1q2', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Czym różni się eksploatacja (E) od dozoru (D) w uprawnieniach SEP?',
    answer:
      'Eksploatacja (E) to świadectwo do wykonywania prac przy urządzeniach: obsługi, konserwacji, remontu, montażu i pomiarów. Dozór (D) to świadectwo do kierowania pracą innych i nadzoru nad eksploatacją – planowania prac i organizowania ich tak, żeby były bezpieczne. To dwa osobne świadectwa, zdawane osobno.',
    keyPoints: 'E = fizyczna praca, D = nadzór nad innymi.',
    sources: [{ act: 'kwal', at: '§ 4 ust. 1' }],
  },
  {
    id: 'r1q3', round: 1, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Jakie środki gaśnicze wolno stosować przy gaszeniu urządzeń elektrycznych pod napięciem?',
    answer:
      'Używa się gaśnic dopuszczonych do gaszenia urządzeń pod napięciem – w praktyce proszkowych (ABC) albo śniegowych (CO₂). Na gaśnicy jest oznaczenie, do jakiego napięcia i z jakiej odległości wolno nią gasić, np. „do 1000 V z odległości 1 m". Nie gasi się wodą z hydrantu ani zwykłą pianą – prąd może popłynąć strumieniem do ratownika. Gaśnica wodna lub mgłowa nadaje się tylko wtedy, gdy ma takie oznaczenie (przeszła badanie dielektryczne).',
    keyPoints: 'Proszek ABC i CO₂ – TAK (sprawdź oznaczenie, np. do 1000 V, 1 m). Woda i zwykła piana – NIE.',
    sources: [{ act: 'pn-en-3-7' }],
  },
  {
    id: 'r1q4', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Czym są strefa prac pod napięciem i strefa prac w pobliżu napięcia? Jakie odległości obowiązują do 1 kV?',
    answer:
      'Rozporządzenie BHP przy urządzeniach energetycznych (2019) wyznacza wokół nieosłoniętych części pod napięciem dwie strefy: strefę prac pod napięciem (jej granica to DL) i strefę prac w pobliżu napięcia (jej granica to DV). Dla urządzeń do 1 kV: DL – „bez dotyku", czyli każde dotknięcie części czynnej to już praca pod napięciem; DV – 0,3 m. Przy pracy w pobliżu napięcia nie wolno wejść w strefę prac pod napięciem żadną częścią ciała, narzędziem ani przedmiotem. Do 1 kV oznacza to: nie dotykać części czynnych, chyba że zostały osłonięte.',
    keyPoints: 'Do 1 kV: DL = bez dotyku, DV = 0,3 m. Dwie strefy: prac pod napięciem i prac w pobliżu napięcia.',
    sources: [{ act: 'bhp', at: '§ 23 ust. 3 i 6' }],
    trap: 'Stare materiały podają „0,5 m" i „strefę niebezpieczną" – to nie są pojęcia z obecnego rozporządzenia.',
    wrongAnswer: '„Do 1 kV bezpieczna odległość to 0,5 m" – obecnie granica strefy prac w pobliżu napięcia to 0,3 m.',
  },
  {
    id: 'r1q5', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Na kim spoczywa obowiązek wyposażenia stanowisk pracy w instrukcje eksploatacyjne?',
    answer:
      'Na pracodawcy. Rozporządzenie BHP (§ 4) mówi, że instrukcję eksploatacji opracowuje pracodawca i on też zapewnia jej bieżącą aktualizację. Pracodawca musi też udostępnić instrukcje pracownikom na stanowiskach pracy przy urządzeniach elektrycznych.',
    keyPoints: 'Pracodawca – nie pracownik, nie SEP.',
    sources: [{ act: 'bhp', at: '§ 4' }, { act: 'kp', at: 'art. 237⁴ § 2' }],
  },
  {
    id: 'r1q6', round: 1, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Co to jest polecenie pisemne i kiedy jest wymagane przy pracach eksploatacyjnych?',
    answer:
      'Polecenie pisemne to dokument, na podstawie którego wykonuje się prace stwarzające możliwość wystąpienia szczególnego zagrożenia dla zdrowia lub życia. Wydaje je poleceniodawca – osoba upoważniona przez pracodawcę, ze świadectwem D. Polecenie określa zakres prac i strefę pracy, środki ochronne, terminy oraz osoby funkcyjne: dopuszczającego, kierującego zespołem, a w razie potrzeby koordynującego. Pracodawca przechowuje je co najmniej 90 dni od zakończenia pracy. Szczegółowy wykaz prac na polecenie pisemne ustala pracodawca po ocenie ryzyka – zwykle w instrukcji organizacji bezpiecznej pracy (IOBP). Bez polecenia wolno tylko prace określone w instrukcji eksploatacji oraz ratowanie życia, zdrowia, środowiska i mienia.',
    keyPoints: 'Polecenie pisemne = prace w warunkach szczególnego zagrożenia. Wydaje poleceniodawca (D). Wykaz prac ustala pracodawca (zwykle w IOBP). Przechowywanie – min. 90 dni.',
    sources: [{ act: 'bhp', at: '§ 2 pkt 8 i § 27–29' }],
  },
  {
    id: 'r1q7', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Jakie dokumenty powinien posiadać elektryk przystępujący do pracy?',
    answer:
      'Ważne świadectwo kwalifikacyjne (E, z właściwą grupą, punktem i zakresem czynności), aktualne badania lekarskie, aktualne szkolenie BHP oraz upoważnienie pracodawcy. Do prac w warunkach szczególnego zagrożenia dodatkowo polecenie pisemne i dopuszczenie do pracy.',
    keyPoints: 'Świadectwo kwalifikacyjne + badania lekarskie + BHP + upoważnienie pracodawcy; przy pracach szczególnie niebezpiecznych – polecenie i dopuszczenie.',
    sources: [{ act: 'pe', at: 'art. 54 ust. 1' }, { act: 'kp', at: 'art. 229 § 4 i art. 237³ § 2' }, { act: 'bhp', at: '§ 6 ust. 1, § 27 i § 30' }],
  },
  {
    id: 'r1q8', round: 1, category: 'Eksploatacja', topic: 'podstawy-prawne',
    question: 'Co to jest napięcie znamionowe i jaką wartość przyjmuje się za granicę w grupie G1?',
    answer:
      'Napięcie znamionowe to napięcie, na które zaprojektowano urządzenie, instalację lub sieć (np. 230/400 V). Sama grupa G1 obejmuje wszystkie napięcia, ale ważną granicą jest 1 kV (1000 V): do 1 kV to pkt 2 (większość instalacji w budynkach i zakładach, sieci nn), powyżej 1 kV – pkt 3–5.',
    keyPoints: '1 kV = granica pkt 2 w G1. Sieć domowa 230/400 V = pkt 2.',
    sources: [{ act: 'kwal', at: 'załącznik nr 1 pkt 2–5' }],
  },
  {
    id: 'r1q9', round: 1, category: 'Pierwsza pomoc', topic: 'pierwsza-pomoc',
    question: 'Jak udzielić pierwszej pomocy osobie porażonej prądem elektrycznym?',
    answer:
      '1. Odłącz napięcie lub odsuń poszkodowanego od źródła prądu izolowanym przedmiotem – nigdy gołymi rękami. 2. Sprawdź reakcję. Jeśli nie reaguje – od razu wezwij 112 (najlepiej na głośniku telefonu) i poproś o AED. 3. W trakcie połączenia udrożnij drogi oddechowe i oceń oddech (do 10 s). 4. Jeśli nie oddycha prawidłowo albo masz wątpliwości – natychmiast zacznij RKO: 30 uciśnięć klatki piersiowej + 2 oddechy. 5. Gdy dotrze AED – włącz go i wykonuj polecenia; porażenie prądem często wywołuje migotanie komór, które może przerwać tylko defibrylacja. 6. Jeśli oddycha prawidłowo, ale nie reaguje – pozycja bezpieczna i stała kontrola oddechu. Nie przekładaj poszkodowanego, jeśli ma oznaki urazu (np. po upadku z wysokości).',
    keyPoints: 'Najpierw odłącz prąd. Nie reaguje → od razu 112, potem oddech. Nie oddycha prawidłowo → RKO 30:2 i AED (migotanie komór).',
    sources: [{ act: 'erc-bls' }, { act: 'erc-fa' }],
    trap: 'Starsze materiały (ERC 2021) każą najpierw ocenić oddech, a dopiero potem dzwonić. Od wytycznych ERC 2025 dzwonisz na 112 od razu, gdy poszkodowany nie reaguje.',
  },
  {
    id: 'r1q10', round: 1, category: 'Pierwsza pomoc', topic: 'pierwsza-pomoc',
    question: 'Jakie czynniki wpływają na skutki porażenia prądem elektrycznym?',
    answer:
      'Najważniejsze jest natężenie prądu płynącego przez ciało. Liczą się też: napięcie, rodzaj prądu (AC jest groźniejszy niż DC), częstotliwość (50 Hz jest szczególnie groźne), czas przepływu, droga prądu przez ciało i rezystancja ciała (mokra skóra ma mniejszą niż sucha). Już 50 mA AC może zabić.',
    keyPoints: 'Natężenie > napięcie. 50 mA AC = zagrożenie życia. Mokra skóra = mniejszy opór = większe niebezpieczeństwo.',
    sources: [{ act: 'iec-60479-1' }],
  },
  {
    id: 'r1q11', round: 1, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie są obowiązki osoby sprawującej dozór nad pracami przy urządzeniach elektrycznych?',
    answer:
      'Osoba dozorująca musi: zapewnić warunki BHP przed rozpoczęciem prac, sprawdzić kwalifikacje pracowników, nadzorować przebieg prac, wydawać polecenia, kontrolować środki ochrony indywidualnej, dopilnować bezpiecznego zakończenia pracy i przywrócenia urządzeń do stanu normalnego.',
    keyPoints: 'Dozór = odpowiedzialność za bezpieczeństwo całego zespołu.',
    sources: [{ act: 'kp', at: 'art. 212 i art. 237³ § 1' }, { act: 'kwal', at: '§ 4 ust. 1 pkt 2' }],
  },
  {
    id: 'r1q12', round: 1, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Na jak długo wydawane są świadectwa kwalifikacyjne SEP i kiedy można je odnowić?',
    answer:
      'Świadectwo kwalifikacyjne jest ważne 5 lat od daty wydania (art. 54 Prawa energetycznego). „Odnowienie" to ponowne zdanie egzaminu – warto zaplanować je z wyprzedzeniem. Dawne świadectwa „bezterminowe" straciły ważność 3 lipca 2026 r. Po wygaśnięciu świadectwa nie wolno wykonywać prac, do których jest wymagane.',
    keyPoints: '5 lat od daty wydania. Odnowienie = egzamin. Bezterminowe świadectwa wygasły 3.07.2026.',
    sources: [{ act: 'pe', at: 'art. 54 ust. 1aa i ust. 2' }, { act: 'pe2021', at: 'art. 25' }],
  },

  // ───────────────────────────── RUNDA 2 ─────────────────────────────
  {
    id: 'r2q1', round: 2, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Co to jest pomiar rezystancji izolacji i kiedy się go wykonuje?',
    answer:
      'To pomiar, który sprawdza, czy izolacja przewodów i urządzeń nie jest uszkodzona. Megaomomierz mierzy rezystancję między przewodami czynnymi (L, N) a przewodem ochronnym PE oraz między przewodami czynnymi. Pomiar wykonuje się przy odbiorze nowej instalacji, po remoncie, po zalaniu lub pożarze oraz podczas kontroli okresowych.',
    keyPoints: 'Megaomomierz, 500 V DC dla instalacji 230/400 V, wynik min. 1 MΩ.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r2q2', round: 2, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jaki przyrząd i jakie napięcie pomiarowe stosuje się do pomiaru rezystancji izolacji instalacji 230/400 V?',
    answer:
      'Megaomomierz (miernik rezystancji izolacji). Napięcie pomiarowe: 500 V DC. Minimalna dopuszczalna wartość rezystancji izolacji: 1 MΩ. Poniżej 1 MΩ – instalacja wymaga naprawy przed oddaniem do użytku.',
    keyPoints: 'Megaomomierz + 500 V DC + wynik ≥ 1 MΩ. Trzy liczby do zapamiętania.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r2q3', round: 2, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Na czym polega pomiar impedancji pętli zwarcia i jaki jest jego cel?',
    answer:
      'Miernik mierzy impedancję drogi, którą popłynie prąd przy zwarciu fazy z obudową: źródło → przewód fazowy → miejsce zwarcia → przewód ochronny PE → z powrotem do źródła. Z wyniku oblicza się prąd zwarciowy i sprawdza, czy zabezpieczenie wyłączy zasilanie w wymaganym czasie. Im mniejsza impedancja, tym większy prąd zwarciowy i tym pewniej zabezpieczenie zadziała.',
    keyPoints: 'Mała impedancja = dobra ochrona. TN 230 V: ≤ 0,4 s dla obwodów odbiorczych do 32 A (z gniazdami do 63 A), ≤ 5 s dla obwodów rozdzielczych.',
    sources: [{ act: 'pn-hd-60364-4-41' }, { act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r2q4', round: 2, category: 'Pomiary', topic: 'rcd',
    question: 'Co to jest wyłącznik różnicowoprądowy (RCD) i jak sprawdzić jego poprawne działanie?',
    answer:
      'To wyłącznik, który porównuje prąd płynący do odbiornika z prądem, który z niego wraca (L i N). Jeśli różnica – prąd różnicowy – przekroczy próg zadziałania, RCD wyłącza obwód. Taka różnica oznacza upływ prądu, np. przez ciało człowieka do ziemi. RCD o IΔn 30 mA daje ochronę uzupełniającą przy dotyku części czynnej. Działanie sprawdza się przyciskiem TEST na obudowie (zwykle raz w miesiącu, wg zalecenia producenta) oraz miernikiem RCD, który mierzy czas i prąd zadziałania.',
    keyPoints: 'IΔn 30 mA = ochrona uzupełniająca. Czas zadziałania przy 1×IΔn ≤ 300 ms. TEST – zwykle co miesiąc, wg zalecenia producenta.',
    sources: [{ act: 'pn-hd-60364-4-41' }, { act: 'pn-en-61008-1' }],
  },
  {
    id: 'r2q5', round: 2, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Czym różni się pomiar ciągłości przewodów ochronnych PE od pomiaru rezystancji izolacji?',
    answer:
      'Pomiar ciągłości PE sprawdza, czy przewód ochronny nie jest nigdzie przerwany. Mierzy się małą rezystancję (od miliomów do kilku omów) przy niskim napięciu (4–24 V). Pomiar rezystancji izolacji sprawdza, czy izolacja jest sprawna. Mierzy się bardzo dużą rezystancję (megaomy) przy wysokim napięciu stałym (500 V DC). Oba pomiary są obowiązkowe przy odbiorze instalacji.',
    keyPoints: 'PE ciągłość = małe R, izolacja = duże R. Różne przyrządy, różne napięcia, różny cel.',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'części 2 i 4' }],
  },
  {
    id: 'r2q6', round: 2, category: 'Pomiary', topic: 'podstawy-prawne',
    question: 'Co musisz mieć w świadectwie kwalifikacyjnym, żeby wykonywać pomiary instalacji elektrycznej? Czym jest punkt 13 (dawniej 10)?',
    answer:
      'Potrzebujesz zakresu kontrolno-pomiarowego dla urządzeń, które mierzysz. Dla instalacji w budynkach to G1 pkt 2 (do 1 kV). Punkt 13 grupy G1 to nie „pomiary", tylko rodzaj urządzeń: aparatura kontrolno-pomiarowa oraz urządzenia i instalacje automatycznej regulacji, sterowania i zabezpieczeń. W rozporządzeniu z 2003 r. był to pkt 10. Kontrolę okresową instalacji z art. 62 Prawa budowlanego może przeprowadzić osoba z kwalifikacjami dozoru (D) albo z uprawnieniami budowlanymi.',
    keyPoints: 'Pomiary = zakres kontrolno-pomiarowy. Pkt 13 (dawniej 10) = aparatura pomiarowa i automatyka. Dziś pkt 10 = sieć trakcyjna.',
    sources: [{ act: 'kwal', at: '§ 4 ust. 2 pkt 5 i załącznik nr 1 pkt 13' }, { act: 'pb', at: 'art. 62 ust. 4 i 5' }],
    trap: 'Na kursach wciąż mówi się „pomiary z pkt 10" – to stara numeracja i skrót myślowy.',
    wrongAnswer: '„Pkt 10 = pomiary" – od 2022 r. pkt 10 grupy G1 to elektryczna sieć trakcyjna.',
  },
  {
    id: 'r2q7', round: 2, category: 'Pomiary', topic: 'protokol',
    question: 'Jakie elementy musi zawierać protokół pomiarowy?',
    answer:
      'Protokół musi zawierać: dane obiektu, opis lub schemat badanej instalacji, typ i numer seryjny przyrządów pomiarowych z datą ich ostatniego wzorcowania, wyniki pomiarów dla każdego obwodu z jednostkami i wartościami dopuszczalnymi, ocenę zgodności z normą, datę wykonania oraz imię, nazwisko i podpis osoby wykonującej pomiary – ze świadectwem kwalifikacyjnym obejmującym zakres kontrolno-pomiarowy.',
    keyPoints: 'Przyrządy z datą wzorcowania + wyniki każdego obwodu + podpis osoby z zakresem kontrolno-pomiarowym.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r2q8', round: 2, category: 'Eksploatacja', topic: 'klasy',
    question: 'Co oznaczają klasy ochronności urządzeń elektrycznych I, II i III?',
    answer:
      'Klasa I: izolacja podstawowa i przewód ochronny PE, do którego przyłącza się metalową obudowę. Klasa II: izolacja podwójna lub wzmocniona, bez przewodu PE – symbol to kwadrat w kwadracie. Klasa III: zasilanie bardzo niskim napięciem SELV lub PELV (≤ 50 V AC albo ≤ 120 V DC). Urządzeń klasy II i III nie przyłącza się do przewodu PE.',
    keyPoints: 'I = PE wymagany, II = bez PE (kwadrat w kwadracie), III = ≤ 50 V AC.',
    sources: [{ act: 'pn-en-61140' }, { act: 'pn-hd-60364-4-41' }],
  },
  {
    id: 'r2q9', round: 2, category: 'Eksploatacja', topic: 'klasy',
    question: 'Co oznacza oznaczenie IP (np. IP44) na urządzeniu elektrycznym?',
    answer:
      'IP (International Protection – tak nazywa to norma; potocznie Ingress Protection) to stopień ochrony, jaki daje obudowa. Pierwsza cyfra (0–6) to ochrona przed ciałami stałymi i pyłem, np. 4 – przed cząstkami większymi niż 1 mm. Druga cyfra (0–9) to ochrona przed wodą, np. 4 – przed bryzgami z każdego kierunku. IP44 to typowe minimum dla urządzeń na zewnątrz i w pomieszczeniach wilgotnych.',
    keyPoints: '1. cyfra = pył, 2. cyfra = woda. IP44 = minimum zewnętrze. IP67 = zanurzenie do 1 m.',
    sources: [{ act: 'pn-en-60529' }],
  },
  {
    id: 'r2q10', round: 2, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Jakie są obowiązki elektryka bezpośrednio przed przystąpieniem do pracy przy urządzeniu wyłączonym spod napięcia?',
    answer:
      'Elektryk musi: 1) sprawdzić, czy ma ważne świadectwo kwalifikacyjne, 2) jeśli praca tego wymaga – mieć polecenie pisemne i zostać dopuszczonym do pracy, 3) osobiście sprawdzić brak napięcia wskaźnikiem – nigdy nie zakładać, że napięcie jest wyłączone, 4) sprawdzić, czy wywieszono tablice ostrzegawcze i czy założono uziemiacze, jeśli są wymagane. Dopiero wtedy może zacząć pracę.',
    keyPoints: 'Zawsze sprawdź napięcie wskaźnikiem osobiście. „Założył, że jest wyłączone" = typowa przyczyna wypadków.',
    sources: [{ act: 'bhp', at: '§ 24 i § 25' }, { act: 'pn-en-50110-1' }],
  },
  {
    id: 'r2q11', round: 2, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie osoby funkcyjne występują przy pracy na polecenie pisemne i jakie muszą mieć kwalifikacje?',
    answer:
      'Poleceniodawca – wydaje polecenie pisemne; świadectwo D. Koordynujący – koordynuje prace z ruchem urządzeń (kolejność łączeń, zezwolenie na przygotowanie i likwidację strefy, zgoda na uruchomienie urządzenia); świadectwo D. Dopuszczający – przygotowuje strefę pracy (czynności łączeniowe) i dopuszcza zespół; świadectwo E. Kierujący zespołem – sprawdza i przyjmuje strefę pracy, kieruje pracą na miejscu; świadectwo E. Każda z tych osób musi być upoważniona przez pracodawcę. Członkowie zespołu – wykonują pracę. Przy poleceniu pisemnym nie łączy się więcej niż dwóch funkcji, a funkcji dopuszczającego i kierującego zespołem nie łączy się wcale (wyjątek: prace pod napięciem). Osoby bez świadectwa (np. serwis specjalistyczny) pracują wyłącznie pod nadzorem osoby upoważnionej – w wielu IOBP to „nadzorujący", ale rozporządzenie nie definiuje takiej funkcji.',
    keyPoints: 'Poleceniodawca (D), koordynujący (D), dopuszczający (E), kierujący zespołem (E) – wszyscy upoważnieni przez pracodawcę. Najwyżej dwie funkcje na osobę. Dopuszczający ≠ kierujący.',
    sources: [{ act: 'bhp', at: '§ 2 pkt 8–11, § 6 ust. 2 i § 30 ust. 3' }],
  },
  {
    id: 'r2q12', round: 2, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Jakie czynności musi wykonać dopuszczający przed dopuszczeniem zespołu do pracy?',
    answer:
      'Po uzyskaniu zezwolenia od koordynującego lub poleceniodawcy: 1) wyłączyć napięcie ze wszystkich stron tak, by uzyskać przerwę izolacyjną, 2) zabezpieczyć przed przypadkowym załączeniem (do 1 kV: wyjęte wkładki albo zablokowany napęd) i wywiesić tablice „Nie załączać – pracują ludzie", 3) sprawdzić brak napięcia sprawnym wskaźnikiem na wszystkich fazach i N, 4) uziemić i zewrzeć, jeżeli wymaga tego technologia prac – ze wszystkich stron, co najmniej jeden uziemiacz widoczny z miejsca pracy, 5) ogrodzić i oznaczyć strefę, osłonić sąsiednie części pod napięciem, 6) dopuścić zespół: sprawdzić przygotowanie strefy, wskazać ją, przeprowadzić instruktaż o zagrożeniach, potwierdzić dopuszczenie na piśmie i zgłosić je koordynującemu.',
    keyPoints: 'Wyłącz → zabezpiecz → sprawdź brak napięcia → uziem → oznacz strefę → dopuść. Uziemienie zakłada się po sprawdzeniu braku napięcia, nie przed.',
    sources: [{ act: 'bhp', at: '§ 25 i § 30 ust. 1 pkt 2–3' }, { act: 'pn-en-50110-1' }],
  },
  {
    id: 'r2q13', round: 2, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Jak często należy wykonywać przeglądy i pomiary instalacji elektrycznych w budynkach?',
    answer:
      'Co najmniej raz na 5 lat – tak wymaga art. 62 Prawa budowlanego. Kontrolę może przeprowadzić osoba z kwalifikacjami dozoru (D) albo z uprawnieniami budowlanymi, a pomiary wykonuje elektryk z zakresem kontrolno-pomiarowym. Tam, gdzie ryzyko jest większe, kontroluje się częściej – np. w strefach zagrożenia wybuchem częstotliwość ustala pracodawca w dokumencie zabezpieczenia przed wybuchem, zwykle co rok.',
    keyPoints: 'Co 5 lat = art. 62 (kontroluje osoba z D albo z uprawnieniami budowlanymi). Strefy Ex = częściej, wg dokumentu zabezpieczenia przed wybuchem (typowo co rok).',
    sources: [{ act: 'pb', at: 'art. 62 ust. 1 pkt 2, ust. 4 i 5' }],
  },
  {
    id: 'r2q14', round: 2, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Jakie środki ochrony indywidualnej są wymagane przy pracach przy urządzeniach elektrycznych?',
    answer:
      'Sprzęt ochronny izolacyjny dobrany do napięcia: rękawice elektroizolacyjne, obuwie lub dywanik izolacyjny, drążki izolacyjne. Sprzęt do zabezpieczenia strefy: wskaźnik napięcia, uziemiacze lub zwieracze przenośne, tablice. Przy ryzyku łuku elektrycznego: hełm z przeciwłukową osłoną twarzy i odzież trudnopalna. Sprzęt ogląda się przed każdym użyciem i musi mieć aktualne badania okresowe.',
    keyPoints: 'Sprzęt izolacyjny dobrany do napięcia + wskaźnik + uziemiacze. Łuk = hełm z osłoną twarzy. Oględziny przed użyciem i aktualne badania okresowe.',
    sources: [{ act: 'bhp', at: '§ 26' }, { act: 'kp', at: 'art. 237⁶ § 1' }],
  },

  // ───────────────────────────── RUNDA 3 ─────────────────────────────
  {
    id: 'r3q1', round: 3, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Czy elektryk z uprawnieniami E może sam wyłączyć napięcie i przystąpić do pracy bez polecenia?',
    answer:
      'To zależy od rodzaju pracy – a samo wyłączenie napięcia niczego tu nie zmienia. Prace stwarzające możliwość szczególnego zagrożenia wykonuje się wyłącznie na polecenie pisemne, z przygotowaniem strefy pracy i dopuszczeniem. Bez polecenia wolno wykonywać tylko prace wskazane przez pracodawcę – typowo rutynowe czynności opisane w instrukcji eksploatacji – oraz działania ratujące życie lub zdrowie ludzi albo środowisko i zabezpieczające mienie przed zniszczeniem (z niezwłocznym powiadomieniem przełożonego).',
    keyPoints: 'Szczególne zagrożenie → polecenie pisemne. Bez polecenia: prace określone w instrukcji eksploatacji i ratowanie życia/mienia. Uprawnienia E same nie wystarczą.',
    sources: [{ act: 'bhp', at: '§ 27 ust. 1, § 29 i § 30 ust. 1 pkt 2–3' }, { act: 'kp', at: 'art. 211 pkt 6' }],
    trap: 'Brzmi logicznie – sam wyłączył, sam sprawdził. Komisja sprawdza, czy wiesz, kiedy potrzebne jest polecenie.',
    wrongAnswer: '„Tak, bo mam E i sam wyłączyłem napięcie." – uprawnienia nie zastępują polecenia ani dopuszczenia.',
  },
  {
    id: 'r3q2', round: 3, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Kolega mówi ci, że sprawdził napięcie i jest wyłączone – czy możesz zacząć pracę?',
    answer:
      'Nie. Przed pracą przy urządzeniu odłączonym od napięcia trzeba sprawdzić, że napięcia nie ma – wskaźnikiem napięcia, w miejscu pracy, bezpośrednio przed rozpoczęciem pracy. Ustna informacja kolegi tego nie zastępuje. W praktyce każdy, kto ma dotknąć urządzenia, sprawdza brak napięcia sam, sprawnym wskaźnikiem. Zasada: „Nie zakładaj, zawsze sprawdź."',
    keyPoints: 'Brak napięcia sprawdzasz wskaźnikiem, sam – nie na słowo kolegi.',
    sources: [{ act: 'bhp', at: '§ 25 ust. 1 pkt 3' }, { act: 'pn-en-50110-1' }],
    trap: 'Komisja sprawdza czy wiesz że zaufanie = śmierć w elektryce.',
    wrongAnswer: '„Tak, ufam koledze." – komisja przerwie i obleje.',
  },
  {
    id: 'r3q3', round: 3, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Instalacja ma rezystancję izolacji 0,8 MΩ – czy można ją oddać do użytku?',
    answer:
      'Nie. Minimalna dopuszczalna rezystancja izolacji dla instalacji 230/400 V to 1 MΩ. Wynik 0,8 MΩ jest za niski, więc instalacji nie wolno oddać do użytku. Trzeba znaleźć i usunąć uszkodzenie izolacji, a potem powtórzyć pomiar.',
    keyPoints: '< 1 MΩ = instalacja do naprawy. Nie ma „prawie dobrze".',
    sources: [{ act: 'pn-hd-60364-6' }],
    trap: '0,8 MΩ to dużo – brzmi jak dobry wynik. Ale próg to 1 MΩ.',
    wrongAnswer: '„Tak, to dużo omów." – wartości poniżej 1 MΩ dyskwalifikują instalację.',
  },
  {
    id: 'r3q4', round: 3, category: 'Eksploatacja', topic: 'urzadzenia',
    question: 'Czy wyłącznik nadprądowy (np. B16) chroni człowieka przed porażeniem prądem?',
    answer:
      'Częściowo – i trzeba umieć powiedzieć kiedy. W układzie TN wyłącznik nadprądowy realizuje ochronę przy uszkodzeniu (dotyk pośredni) przez samoczynne wyłączenie zasilania: gdy faza zewrze się z obudową, prąd zwarciowy płynie przez PE i wyłącznik wyłącza obwód – pod warunkiem, że impedancja pętli zwarcia jest dostatecznie mała (B16: ≥ 80 A, czyli Zs ≤ 2,88 Ω). Nie chroni natomiast przy dotyku części czynnej (np. fazy) – prąd płynący przez ciało (dziesiątki–setki mA) jest dla niego niezauważalny. Tu działa ochrona uzupełniająca: RCD 30 mA.',
    keyPoints: 'Zwarcie na obudowę (dotyk pośredni) → wyłącznik nadprądowy, jeśli Zs jest mała. Dotyk fazy przez człowieka → tylko RCD 30 mA. Podstawowa funkcja MCB to ochrona przewodów przed przeciążeniem i zwarciem.',
    sources: [{ act: 'pn-hd-60364-4-41' }],
    trap: 'Slogan „bezpiecznik chroni kable, RCD chroni ludzi" jest za prosty – komisja dopyta o samoczynne wyłączenie zasilania w TN.',
    wrongAnswer: '„Nie, wyłącznik nadprądowy w ogóle nie chroni przed porażeniem" – a pomiar pętli zwarcia sprawdza właśnie tę ochronę.',
  },
  {
    id: 'r3q5', round: 3, category: 'Eksploatacja', topic: 'klasy',
    question: 'Czy urządzenie klasy II (podwójna izolacja) musi być podłączone do przewodu ochronnego PE?',
    answer:
      'Nie. Urządzenie klasy II ma podwójną lub wzmocnioną izolację i jest zaprojektowane do pracy bez przewodu ochronnego PE. Symbol klasy II to kwadrat w kwadracie na tabliczce znamionowej.',
    keyPoints: 'Klasa II = bezpieczna bez PE. Symbol kwadrat w kwadracie.',
    sources: [{ act: 'pn-en-61140' }, { act: 'pn-hd-60364-4-41' }],
    trap: 'PE kojarzony z bezpieczeństwem – intuicja mówi „tak".',
    wrongAnswer: '„Tak, dla bezpieczeństwa zawsze PE." – klasa II jest bezpieczna bez PE z założenia.',
  },
  {
    id: 'r3q6', round: 3, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Kierujący zespołem musi na chwilę opuścić miejsce pracy zespołu – co robi, zanim odejdzie?',
    answer:
      'Przerywa pracę i wyprowadza zespół ze strefy pracy. Rozporządzenie BHP mówi wprost: gdy kierujący zespołem opuszcza strefę pracy, praca zostaje przerwana, a zespół – wyprowadzony ze strefy. Nie zostawia zespołu „na chwilę" samego. Zmiana kierującego zespołem to zmiana polecenia pisemnego – możliwa tylko w trybie, który przewiduje IOBP pracodawcy. Pracę na polecenie pisemne wznawia się po ponownym dopuszczeniu. Nie jest ono potrzebne, jeśli w czasie przerwy nie stwierdzono pogorszenia zabezpieczenia strefy ani warunków pracy. Przed każdym wznowieniem kierujący zespołem sprawdza zabezpieczenia strefy.',
    keyPoints: 'Kierujący zespołem (E) opuszcza strefę → praca przerwana, zespół wychodzi ze strefy. Przed wznowieniem kierujący sprawdza zabezpieczenia strefy.',
    sources: [{ act: 'bhp', at: '§ 31 ust. 2–4 i § 33 pkt 10' }],
  },
  {
    id: 'r3q7', round: 3, category: 'Dozór', topic: 'organizacja-pracy',
    question: 'Poleceniodawca wydał polecenie pisemne. Czy może je cofnąć w trakcie pracy?',
    answer:
      'Tak. Poleceniodawca może w każdej chwili cofnąć polecenie pisemne, jeżeli zmieniły się warunki pracy albo pojawiło się zagrożenie. Informuje o tym dopuszczającego i kierującego zespołem, a pracę trzeba natychmiast przerwać. Cofnięcie odnotowuje się w poleceniu. Rozporządzenie BHP nie opisuje cofnięcia polecenia wprost – zmiany w poleceniu pisemnym i tryb ich wprowadzania określa IOBP pracodawcy.',
    keyPoints: 'Tak – cofnięcie jest zawsze możliwe. Bezpieczeństwo ponad wszystko.',
    sources: [{ act: 'bhp', at: '§ 28 ust. 1 i § 33 pkt 10' }],
  },
  {
    id: 'r3q8', round: 3, category: 'Eksploatacja', topic: 'organizacja-pracy',
    question: 'Elektryk pracuje przy tablicy rozdzielczej. Nieoczekiwanie wraca napięcie – co robi?',
    answer:
      'Natychmiast przerywa pracę i oddala się od urządzenia bez dotykania jakichkolwiek elementów. Nie próbuje dokończyć czynności ani wyłączyć napięcia gołymi rękami. Powiadamia kierującego zespołem lub dopuszczającego. Praca może być wznowiona dopiero po ustaleniu przyczyny i ponownym przygotowaniu strefy pracy.',
    keyPoints: 'Odejdź natychmiast, nic nie dotykaj, zgłoś kierującemu zespołem lub dopuszczającemu.',
    sources: [{ act: 'kp', at: 'art. 210 § 1 i 2' }, { act: 'bhp', at: '§ 24, § 25 ust. 1 i § 31 ust. 4–5' }],
  },
  {
    id: 'r3q9', round: 3, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Poszkodowany po porażeniu prądem jest przytomny i mówi, że czuje się dobrze. Czy można zrezygnować z wezwania pomocy?',
    answer:
      'Nie. Porażenie może powodować opóźnione skutki – arytmię serca, uszkodzenia wewnętrzne, oparzenia niewidoczne z zewnątrz. Nawet jeśli poszkodowany czuje się dobrze, należy wezwać pogotowie (112) lub niezwłocznie przetransportować do szpitala na obserwację.',
    keyPoints: 'Zawsze 112 po porażeniu prądem. Objawy mogą pojawić się z opóźnieniem godzin.',
    trap: 'Czuje się dobrze = jest dobrze. To błędne założenie.',
    wrongAnswer: '„Skoro chodzi to wszystko OK." – objawy mogą pojawić się z opóźnieniem.',
  },
  {
    id: 'r3q10', round: 3, category: 'BHP', topic: 'pierwsza-pomoc',
    question: 'Jak prawidłowo odciągnąć osobę porażoną prądem, gdy nie można wyłączyć napięcia?',
    answer:
      'Używamy wyłącznie suchych, nieprzewodzących przedmiotów – drewniana deska, plastikowy fotel, sucha lina, złożona sucha odzież. Nigdy gołymi rękami – ratownik staje się kolejną ofiarą. Stajemy na suchym, izolującym podłożu. Dotyczy to tylko napięcia do 1 kV – przy wyższym nie podchodzimy, tylko wzywamy pomoc i czekamy na wyłączenie napięcia. Po odciągnięciu: sprawdzamy reakcję, a jeśli jej nie ma – od razu wzywamy 112, oceniamy oddech i przy braku prawidłowego oddechu zaczynamy RKO.',
    keyPoints: 'Suchy nieprzewodzący przedmiot. Nigdy gołymi rękami. Tylko do 1 kV.',
    sources: [{ act: 'erc-bls', at: 'reakcja, 112, oddech, RKO' }],
  },
  {
    id: 'r3q11', round: 3, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Czy osoba z uprawnieniami D (dozór) może samodzielnie wykonywać prace fizyczne przy urządzeniach elektrycznych?',
    answer:
      'Tylko jeśli ma też świadectwo E. Samo D uprawnia do kierowania pracą innych i nadzoru – nie do wykonywania prac. Dlatego zwykle zdaje się na oba świadectwa: E i D.',
    keyPoints: 'D bez E = tylko nadzór. Aby pracować fizycznie potrzeba E.',
    sources: [{ act: 'kwal', at: '§ 4 ust. 1' }],
    trap: 'D wydaje się „wyższą" kategorią niż E – więc logicznie może więcej.',
    wrongAnswer: '„Tak, D to wyższe uprawnienia." – D bez E = tylko nadzór, zero pracy fizycznej.',
  },
  {
    id: 'r3q12', round: 3, category: 'Dozór', topic: 'podstawy-prawne',
    question: 'Świadectwo kwalifikacyjne SEP wygasło tydzień temu. Czy można pracować do końca miesiąca?',
    answer:
      'Nie. Po upływie daty ważności świadectwo traci moc prawną natychmiast – nie ma okresu karencji. Praca bez ważnego świadectwa to naruszenie przepisów: pracodawcy grozi kara za dopuszczenie do pracy osoby bez wymaganych kwalifikacji, a w razie wypadku obaj mogą odpowiadać także karnie i cywilnie.',
    keyPoints: 'Natychmiastowa utrata ważności. Brak okresu karencji.',
    sources: [{ act: 'pe', at: 'art. 54 ust. 1, 1aa i 2 oraz art. 56 ust. 1 pkt 9' }, { act: 'kp', at: 'art. 237³ § 1 i art. 283 § 1' }],
    trap: 'Tydzień to nic – „prawie ważne".',
    wrongAnswer: '„Kilka dni to drobiazg." – dla inspektora PIP nie jest.',
  },
  {
    id: 'r3q13', round: 3, category: 'BHP', topic: 'organizacja-pracy',
    question: 'Miernik nie wskazuje napięcia przy urządzeniu. Czy to znaczy, że napięcia nie ma?',
    answer:
      'Niekoniecznie. Miernik może być uszkodzony, mieć rozładowaną baterię albo przerwany przewód pomiarowy. Dlatego przed pomiarem sprawdź miernik na znanym źródle napięcia (np. w gniazdku 230 V), a po pomiarze sprawdź go jeszcze raz. Wynik „brak napięcia" jest wiarygodny dopiero wtedy, gdy miernik działał przed pomiarem i po nim.',
    keyPoints: 'Zawsze testuj miernik przed i po pomiarze. Uszkodzony miernik = fałszywe bezpieczeństwo.',
    sources: [{ act: 'bhp', at: '§ 25 ust. 1 pkt 3 i § 26' }, { act: 'pn-en-50110-1' }],
    trap: 'Brak wskazania = brak napięcia. Niekoniecznie.',
    wrongAnswer: '„Nie wskazuje = nie ma napięcia." – uszkodzony miernik zabił niejednego elektryka.',
  },

  // ───────────────────────────── RUNDA 4 ─────────────────────────────
  {
    id: 'r4q1', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jakie jest minimalne napięcie pomiarowe przy pomiarze rezystancji izolacji instalacji 230/400 V i dlaczego nie stosuje się zwykłego multimetru?',
    answer:
      'Stosuje się megaomomierz i napięcie pomiarowe 500 V DC. Zwykły multimetr mierzy rezystancję przy kilku woltach. Tak niskie napięcie nie wykryje drobnych uszkodzeń izolacji, które ujawniają się dopiero pod napięciem roboczym. Megaomomierz sprawdza izolację napięciem wyższym niż robocze.',
    keyPoints: '500 V DC, megaomomierz. Multimetr = za niskie napięcie = fałszywie dobry wynik.',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'część 2' }],
  },
  {
    id: 'r4q2', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Ile wynosi minimalna rezystancja izolacji dla instalacji 230/400 V i co oznacza wynik 0,5 MΩ?',
    answer:
      'Minimum to 1 MΩ (PN-HD 60364-6). Wynik 0,5 MΩ oznacza, że izolacja jest uszkodzona lub zawilgocona – instalacji nie wolno oddać do użytku ani dalej eksploatować. Trzeba znaleźć uszkodzenie, naprawić je i zmierzyć ponownie.',
    keyPoints: '< 1 MΩ = instalacja do naprawy, zakaz oddania do użytku.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r4q3', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Czy przed pomiarem rezystancji izolacji należy odłączyć urządzenia końcowe (np. komputery)? Dlaczego?',
    answer:
      'Tak. Megaomomierz przykłada 500 V DC, a takie napięcie może trwale uszkodzić elektronikę: komputery, zasilacze, sterowniki, falowniki. Przed pomiarem odłączamy wszystkie urządzenia, wyjmujemy żarówki i odłączamy ograniczniki przepięć (SPD) – ich warystory zaniżyłyby wynik. Gdy SPD nie da się odłączyć (np. gniazdo z wbudowanym SPD), norma pozwala zmierzyć ten obwód napięciem 250 V DC – wynik nadal musi wynosić co najmniej 1 MΩ. Łączniki w obwodzie ustawiamy w pozycji załączonej, żeby pomiar objął cały obwód.',
    keyPoints: '500 V DC niszczy elektronikę. Odbiorniki i SPD odłączasz przed pomiarem. Gdy SPD nie da się odłączyć: 250 V DC, nadal ≥ 1 MΩ.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r4q4', round: 4, category: 'Pomiary', topic: 'rezystancja-izolacji',
    question: 'Jak prawidłowo przeprowadzić pomiar rezystancji izolacji – podaj kolejność czynności?',
    answer:
      '1. Wyłącz napięcie i sprawdź jego brak wskaźnikiem. 2. Odłącz wszystkie urządzenia końcowe. 3. Podłącz megaomomierz i zmierz L–PE, N–PE i L–N (albo zwarte L+N do PE). 4. Odczytaj wynik po ustabilizowaniu wskazania – w praktyce po 60 sekundach. 5. Rozładuj obwód – nie odpinaj przewodów, dopóki miernik nie pokaże 0 V; obwód trzyma ładunek i może razić! 6. Zapisz wynik w protokole.',
    keyPoints: 'Odczyt po ustabilizowaniu (praktyka: 60 s). Rozładowanie po pomiarze – obowiązkowe!',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'bhp', at: '§ 25 ust. 1' }],
  },
  {
    id: 'r4q5', round: 4, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Co mierzy się podczas pomiaru ciągłości przewodów ochronnych PE i jakie narzędzie stosujemy?',
    answer:
      'Sprawdzamy, czy przewód ochronny PE jest ciągły od gniazda aż do szyny PE w rozdzielnicy. Mierzy się małą rezystancję (omy lub miliomy) przy niskim napięciu (4–24 V) i prądzie co najmniej 200 mA. Stosuje się miernik małych rezystancji wg PN-EN 61557-4 – zwykle funkcję ciągłości w mierniku wielofunkcyjnym instalacji.',
    keyPoints: 'PE ciągłość = małe R. Brak ciągłości = brak ochrony przeciwporażeniowej.',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'część 4' }],
  },
  {
    id: 'r4q6', round: 4, category: 'Pomiary', topic: 'ciaglosc-pe',
    question: 'Dlaczego pomiar ciągłości PE wykonuje się prądem o wartości co najmniej 200 mA?',
    answer:
      'Bo mierzy się ułamki oma, a luźny zacisk musi dać wyraźnie za duży wynik. Norma PN-HD 60364-6 wymaga przyrządu wg PN-EN 61557-4 o napięciu 4–24 V i prądzie co najmniej 200 mA. Taki prąd przebija cienkie warstwy tlenków na zaciskach (podobnie jak prąd zwarciowy), więc wynik w miliomach jest stabilny i powtarzalny. Multimetr mierzy prądem ok. 1 mA, więc przez tlenki jego wynik bywa zawyżony i niestabilny. Jego brzęczyk piszczy nawet przy kilku omach – nie odróżni dobrego połączenia od złego.',
    keyPoints: '≥ 200 mA przy 4–24 V (PN-EN 61557-4) = wynik miarodajny i powtarzalny. Brzęczyk multimetru mówi tylko „jest przewód", nie „połączenie jest dobre".',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'część 4' }],
  },
  {
    id: 'r4q7', round: 4, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Co to jest impedancja pętli zwarcia i jak na jej podstawie sprawdzić, czy zabezpieczenie zadziała?',
    answer:
      'Impedancja pętli zwarcia (Zs) to całkowita impedancja drogi, którą płynie prąd zwarciowy: źródło → przewód fazowy → miejsce zwarcia → przewód PE → z powrotem do źródła. Prąd zwarciowy oblicza się ze wzoru Ik = U₀ / Zs (U₀ = 230 V). Zabezpieczenie zadziała w wymaganym czasie, jeśli Ik jest co najmniej równy prądowi wyłączającemu Ia – dla B16 to 5 × 16 A = 80 A. W praktyce zmierzoną Zs porównuje się z tabelą maksymalnych impedancji dla danego zabezpieczenia (B16: Zs ≤ 2,88 Ω).',
    keyPoints: 'Ik = 230 / Zs. Im mniejsze Zs, tym wyższy prąd zwarciowy, tym pewniejsza ochrona.',
    sources: [{ act: 'pn-hd-60364-4-41' }, { act: 'pn-en-61557', at: 'część 3' }],
  },
  {
    id: 'r4q8', round: 4, category: 'Pomiary', topic: 'petla-zwarcia',
    question: 'Jakie są maksymalne czasy samoczynnego wyłączenia zasilania w układzie TN 230 V?',
    answer:
      'Wg PN-HD 60364-4-41: obwody odbiorcze do 32 A (a z gniazdami – do 63 A) – maksymalnie 0,4 s. Dotyczy to gniazd, ale też np. obwodu oświetlenia czy ogrzewania. Obwody rozdzielcze (np. WLZ) oraz obwody odbiorcze powyżej tych prądów – maksymalnie 5 s.',
    keyPoints: 'TN 230 V: obwody odbiorcze do 32 A = 0,4 s (także oświetlenie). Obwody rozdzielcze = 5 s.',
    sources: [{ act: 'pn-hd-60364-4-41' }],
    trap: 'Stare materiały: „obwody stałe = 5 s". Według aktualnej normy obwód oświetlenia B10 też musi wyłączyć w 0,4 s.',
    wrongAnswer: '„Oświetlenie wbudowane – 5 s" – to zapis ze starej normy.',
  },
  {
    id: 'r4q9', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Jakie rodzaje wyłączników RCD stosuje się w instalacjach i czym się różnią?',
    answer:
      'Typ AC: reaguje wyłącznie na sinusoidalny prąd AC – najprostszy, ale dziś wypierany (w nowej instalacji producenci zalecają co najmniej typ A). Typ A: reaguje na AC i pulsujący DC – dziś podstawowy domowy, do obwodów z elektroniką. Typ F: jak A, plus prądy o mieszanej częstotliwości i większa odporność na udary – urządzenia z falownikiem jednofazowym (pralki, pompy ciepła, klimatyzatory). Typ B: reaguje na wszystkie rodzaje prądów, też gładki DC – falowniki trójfazowe, napędy, PV; przy ładowaniu EV stosuje się typ B albo typ A z detekcją DC 6 mA.',
    keyPoints: 'Dziś minimum to typ A (AC – wypierany). A = elektronika. F = falowniki 1-fazowe. B = gładki DC: napędy, PV, EV. Typ AC nie zadziała przy prądzie pulsującym DC.',
    sources: [{ act: 'pn-en-61008-1' }, { act: 'pn-en-62423' }, { act: 'pn-hd-60364-7-722' }],
  },
  {
    id: 'r4q10', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Jak wykonuje się pomiar czasu i prądu zadziałania wyłącznika RCD miernikiem?',
    answer:
      'Miernik RCD wykonuje dwie próby. Pomiar prądu zadziałania: prąd różnicowy rośnie stopniowo, a miernik zapisuje, przy jakiej wartości RCD wyłączył (dla prądu sinusoidalnego: między 0,5 a 1 × IΔn). Pomiar czasu zadziałania przy stałym prądzie: przy 0,5×IΔn RCD nie może zadziałać, przy 1×IΔn musi zadziałać w czasie ≤ 300 ms, a przy 5×IΔn – w czasie ≤ 40 ms. Próby wykonuje się dla obu biegunowości prądu (0° i 180°).',
    keyPoints: '0,5×IΔn = nie działa, 1×IΔn = działa ≤ 300 ms, 5×IΔn = działa ≤ 40 ms.',
    sources: [{ act: 'pn-en-61008-1' }, { act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'część 6' }],
  },
  {
    id: 'r4q11', round: 4, category: 'Pomiary', topic: 'rcd',
    question: 'Czy przycisk TEST na RCD zastępuje pomiar miernikiem RCD?',
    answer:
      'Nie. Przycisk TEST przepuszcza przez wyłącznik sztuczny prąd różnicowy i sprawdza tylko, czy sam RCD w ogóle zadziała. Nie mierzy czasu zadziałania ani dokładnego prądu zadziałania i nie sprawdza przewodu PE w instalacji. Do odbioru instalacji i protokołu pomiarowego wymagany jest pomiar miernikiem RCD z udokumentowanymi wynikami.',
    keyPoints: 'TEST = czy RCD w ogóle zadziała; użytkownik naciska go okresowo (zwykle co miesiąc). Miernik RCD = wymagany do protokołu odbiorczego.',
    sources: [{ act: 'pn-hd-60364-6' }, { act: 'pn-en-61557', at: 'część 6' }],
    trap: 'Przycisk TEST wystarczy, przecież działa.',
    wrongAnswer: '„TEST wystarczy." Na odbiór instalacji – nie wystarczy.',
  },
  {
    id: 'r4q12', round: 4, category: 'Pomiary', topic: 'uziemienie',
    question: 'Co to jest rezystancja uziemienia i jakie są dopuszczalne wartości?',
    answer:
      'Rezystancja uziemienia (RE) to opór między elektrodą uziemiającą a ziemią odniesienia. Wymaganie zależy od funkcji uziomu: uziemienie odgromowe – zalecane poniżej 10 Ω (PN-EN 62305-3); układ TT z RCD – RA × IΔn ≤ 50 V (przy RCD 30 mA: RA ≤ 1666 Ω); w układzie TN nie ma jednej wartości RE – o ochronie decyduje impedancja pętli zwarcia. Uziemienia stacji SN/nn ocenia operator sieci.',
    keyPoints: 'Odgrom: poniżej 10 Ω. TT z RCD: RA × IΔn ≤ 50 V. TN: liczy się pętla zwarcia.',
    sources: [{ act: 'pn-en-62305-3' }, { act: 'pn-hd-60364-4-41' }],
  },
  {
    id: 'r4q13', round: 4, category: 'Pomiary', topic: 'uziemienie',
    question: 'Jaką metodą mierzy się rezystancję uziemienia i dlaczego nie można użyć zwykłego omomierza?',
    answer:
      'Stosuje się metodę trójzaciskową (spadku potencjału): trzy elektrody – badana, pomocnicza prądowa i pomocnicza napięciowa. Na kursach bywa nazywana „metodą Wernera" (ściśle: Wenner to 4-elektrodowy pomiar rezystywności gruntu). Zwykły omomierz się nie nada: ma tylko dwa zaciski, a rezystancję uziemienia mierzy się względem odległej „ziemi odniesienia", do której nie da się go podłączyć. Dlatego potrzebne są elektrody pomocnicze i miernik uziemień.',
    keyPoints: 'Metoda trójzaciskowa / spadku potencjału, dedykowany miernik uziemienia. Zwykły omomierz = błędny wynik.',
    sources: [{ act: 'pn-en-61557', at: 'część 5' }, { act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r4q14', round: 4, category: 'Pomiary', topic: 'protokol',
    question: 'Jakie pomiary są obowiązkowe przy odbiorze nowej instalacji elektrycznej wg PN-HD 60364-6?',
    answer:
      'Norma podaje zalecaną kolejność: 1) Oględziny, 2) Pomiar ciągłości przewodów ochronnych PE, 3) Pomiar rezystancji izolacji, 4) Ochrona przez separację / SELV / PELV (jeśli zastosowana; przy izolowaniu stanowiska – rezystancja podłóg i ścian), 5) Samoczynne wyłączenie zasilania – w TN impedancja pętli zwarcia, w TT rezystancja uziemienia, 6) Sprawdzenie działania RCD, 7) Sprawdzenie biegunowości (łączniki jednobiegunowe tylko w przewodzie fazowym), kolejności faz (instalacje 3-fazowe) i próby funkcjonalne.',
    keyPoints: 'Na egzaminie wystarczy: oględziny → ciągłość PE → izolacja → impedancja pętli → RCD. Pięć kroków w kolejności.',
    sources: [{ act: 'pn-hd-60364-6' }],
  },
  {
    id: 'r4q17', round: 4, category: 'Pomiary', topic: 'klasy',
    question: 'Co oznaczają litery w nazwie układu sieci (np. TN-C-S, TT) i co od układu zależy przy pomiarach?',
    answer:
      'Pierwsza litera mówi, jak z ziemią połączony jest punkt neutralny źródła: T – uziemiony bezpośrednio, I – odizolowany od ziemi albo uziemiony przez impedancję. Druga litera mówi, jak uziemione są części przewodzące dostępne odbiorników: T – przez własny uziom, niezależny od uziemienia sieci, N – przewodem ochronnym połączonym z uziemionym punktem neutralnym sieci. W układzie TN kolejne litery opisują przewody N i PE: S – osobne, C – wspólny przewód PEN, C-S – PEN rozdzielony dalej na N i PE. Od układu zależy, co sprawdzasz: w TN samoczynne wyłączenie potwierdza pomiar impedancji pętli zwarcia, w TT – sprawdzenie RCD i warunku RA × IΔn ≤ 50 V.',
    keyPoints: '1. litera – źródło (T/I), 2. litera – odbiorniki (T/N). Typowy dom: TN-C-S. TN → pętla zwarcia, TT → RCD i RA × IΔn ≤ 50 V.',
    sources: [{ act: 'pn-hd-60364-1' }, { act: 'pn-hd-60364-4-41' }],
  },
  {
    id: 'r4q16', round: 4, category: 'Pomiary', topic: 'podstawy-prawne',
    question: 'Instalacja ma 8 lat, działa bez zarzutu, nikt nie zgłaszał problemów. Czy przegląd i pomiary są wymagane?',
    answer:
      'Tak – bezwzględnie. Art. 62 Prawa budowlanego wymaga kontroli instalacji elektrycznej co najmniej raz na 5 lat, niezależnie od tego, czy instalacja „działa". Osiem lat bez kontroli to naruszenie prawa. Izolacja starzeje się niewidocznie – jej rzeczywisty stan pokazuje dopiero pomiar.',
    keyPoints: '5 lat = obowiązek ustawowy, nie opcja. Za jego niedopełnienie właścicielowi grozi grzywna – bez względu na stan instalacji.',
    sources: [{ act: 'pb', at: 'art. 62 ust. 1 pkt 2 i art. 93 pkt 8' }],
    trap: 'Instalacja działa – po co sprawdzać? Bo izolacja i połączenia psują się bez widocznych objawów – usterkę pokazuje dopiero pomiar.',
    wrongAnswer: '„Działa dobrze, nie trzeba." – degradacja izolacji jest niewidoczna gołym okiem.',
  },
]

export const questionsByRound = (roundId) => questions.filter((q) => q.round === roundId)
