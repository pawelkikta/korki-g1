// Słowniczek pojęć i urządzeń – instalacja, zabezpieczenia, systemy sieci, przyrządy pomiarowe.
// Każde hasło: co to jest, do czego służy + przykład z życia ("W praktyce").

export const glossaryGroups = ['Przewody i instalacja', 'Zabezpieczenia', 'Systemy i klasy', 'Przyrządy pomiarowe']

export const glossary = [
  // ───────────── Przewody i instalacja ─────────────
  {
    id: 'l', group: 'Przewody i instalacja', term: 'Przewód fazowy (L)',
    what: 'Przewód doprowadzający energię – w instalacji 230 V to na nim jest napięcie względem ziemi. Kolor izolacji: brązowy lub czarny (w starych instalacjach bywa różnie!).',
    use: 'Zasila odbiorniki. To jego dotknięcie powoduje porażenie.',
    example: 'Wskaźnik napięcia świeci po przyłożeniu do L. Zasada: kolor NIGDY nie jest gwarancją – zawsze sprawdzaj wskaźnikiem, w starym budownictwie fazowy bywał niebieski.',
  },
  {
    id: 'n', group: 'Przewody i instalacja', term: 'Przewód neutralny (N)',
    what: 'Przewód roboczy zamykający obwód – prąd wraca nim ze sprzętu do sieci. Kolor: niebieski.',
    use: 'Razem z L tworzy obwód roboczy 230 V.',
    example: 'W lampie prąd płynie: L → żarówka → N. Mimo że N „nie powinien kopać", przy przerwanym N lub zamienionych żyłach potrafi – dlatego traktujemy go z takim samym szacunkiem jak L.',
  },
  {
    id: 'pe', group: 'Przewody i instalacja', term: 'Przewód ochronny (PE)',
    what: 'Żółto-zielony przewód, który w normalnej pracy NIE prowadzi prądu. To „droga ewakuacyjna" dla prądu zwarciowego.',
    use: 'Łączy metalowe obudowy urządzeń z szyną PE w rozdzielnicy. Przy zwarciu fazy z obudową prąd ucieka przez PE i zabezpieczenie wyłącza obwód.',
    example: 'Pralka (klasa I) ma metalową obudowę podłączoną do PE przez bolec w gnieździe. Gdy grzałka przebije na obudowę – RCD/bezpiecznik wyłącza, zanim ktoś dotknie. Bez PE obudowa po prostu czeka na czyjąś rękę.',
  },
  {
    id: 'pen', group: 'Przewody i instalacja', term: 'Przewód PEN',
    what: 'Połączony przewód ochronno-neutralny (PE + N w jednej żyle) – występuje w starszych instalacjach TN-C.',
    use: 'Pełni obie funkcje naraz. We współczesnych instalacjach rozdziela się go na osobne PE i N (system TN-C-S).',
    example: 'Stare bloki z aluminiową instalacją 2-żyłową: w gnieździe tylko L i PEN („zerowanie"). Przerwa w PEN to bardzo groźna awaria – na obudowach może pojawić się pełne napięcie fazowe.',
  },
  {
    id: 'rozdzielnica', group: 'Przewody i instalacja', term: 'Rozdzielnica',
    what: 'Skrzynka, w której schodzą się wszystkie obwody instalacji – z zabezpieczeniami, szynami PE i N.',
    use: 'Rozdziela energię na obwody (gniazda, oświetlenie, kuchenka...) i mieści aparaty: wyłączniki nadprądowe, RCD, ograniczniki przepięć.',
    example: 'Domowa „skrzynka z korkami" w przedpokoju. Przy pomiarach odbiorczych to tu podpinasz miernik do szyny PE i tu wyłączasz obwody.',
  },
  {
    id: 'szyna-pe', group: 'Przewody i instalacja', term: 'Szyna PE / szyna wyrównawcza',
    what: 'Metalowa listwa zaciskowa w rozdzielnicy, do której schodzą się wszystkie przewody ochronne.',
    use: 'Wspólny punkt ochrony – z niej PE rozchodzi się do każdego gniazda, do niej podłącza się uziemienie.',
    example: 'Pomiar ciągłości PE wykonujesz właśnie między bolcem gniazda a tą szyną – sprawdzasz, czy „droga ewakuacyjna" jest nieprzerwana.',
  },
  {
    id: 'wyrownawcze', group: 'Przewody i instalacja', term: 'Połączenia wyrównawcze',
    what: 'Przewody łączące metalowe elementy budynku (rury wodne, gazowe, wanna, konstrukcje) z szyną PE.',
    use: 'Wyrównują potencjały – żeby między rurą a obudową urządzenia nigdy nie było niebezpiecznej różnicy napięć.',
    example: 'Łazienka: stoisz mokry między wanną a pralką. Dzięki połączeniom wyrównawczym wszystko, czego możesz dotknąć, ma ten sam potencjał – różnica 0 V = brak przepływu prądu przez ciebie.',
  },
  {
    id: 'uziom', group: 'Przewody i instalacja', term: 'Uziom (elektroda uziemiająca)',
    what: 'Metalowy element zakopany w gruncie: pręt, taśma otokowa wokół budynku albo zbrojenie fundamentu (uziom fundamentowy).',
    use: 'Odprowadza prąd do ziemi – pioruny (odgrom), prądy zwarciowe (system TT), przepięcia.',
    example: 'Przy budowie domu elektryk zatapia bednarkę (płaskownik stalowy) w fundamencie – to najtańszy i najtrwalszy uziom. Po latach mierzysz jego RE miernikiem uziemienia.',
  },
  {
    id: 'wlz', group: 'Przewody i instalacja', term: 'WLZ (wewnętrzna linia zasilająca)',
    what: 'Kabel od złącza/licznika do rozdzielnicy mieszkania lub domu.',
    use: 'Główna „arteria" instalacji – wszystkie obwody zasilane są z jej końca.',
    example: 'W bloku: piony w klatce schodowej to WLZ-ty. Za ich stan odpowiada zwykle administracja, za instalację za licznikiem – właściciel mieszkania.',
  },

  // ───────────── Zabezpieczenia ─────────────
  {
    id: 'mcb', group: 'Zabezpieczenia', term: 'Wyłącznik nadprądowy (MCB, „eska")',
    what: 'Automatyczny wyłącznik reagujący na za duży prąd. Charakterystyki: B (wyzwala przy 3–5×In – mieszkania), C (5–10×In – silniki, rozruch), D (10–20×In – przemysł).',
    use: 'Chroni PRZEWODY przed przeciążeniem i zwarciem. W układzie TN realizuje też ochronę przy uszkodzeniu – wyłącza zwarcie fazy z obudową, jeśli impedancja pętli jest mała. Przy dotknięciu fazy przez człowieka nie zadziała – to zadanie RCD.',
    example: 'B16 na obwodzie gniazd kuchennych: włączasz czajnik + piekarnik + zmywarkę i „wybija korek" – to przeciążenie, eska robi swoje. Po zwarciu w uszkodzonym przedłużaczu wyłącza w ułamku sekundy.',
  },
  {
    id: 'rcd', group: 'Zabezpieczenia', term: 'Wyłącznik różnicowoprądowy (RCD, „różnicówka")',
    what: 'Porównuje prąd wpływający (L) i wypływający (N). Różnica = prąd ucieka poza obwód, np. przez człowieka. Przy 30 mA wyłącza w ≤ 300 ms.',
    use: 'Chroni LUDZI przed porażeniem i (wersja 300 mA) budynki przed pożarem od prądów upływu.',
    example: 'Suszarka do włosów wpada do umywalki z wodą – prąd ucieka do ziemi przez wodę i armaturę, różnicówka strzela w kilkadziesiąt milisekund. Bezpiecznik by tego w ogóle nie zauważył.',
  },
  {
    id: 'rcbo', group: 'Zabezpieczenia', term: 'RCBO (wyłącznik kombinowany)',
    what: 'Wyłącznik nadprądowy + różnicowoprądowy w jednym module.',
    use: 'Chroni jednocześnie kable (nadprąd) i ludzi (różnicówka) – a awaria jednego obwodu nie wyłącza pozostałych.',
    example: 'Nowoczesna rozdzielnica: osobne RCBO na pralkę, zmywarkę, lodówkę. Gdy pralka przebije, lodówka dalej działa – z jedną wspólną różnicówką zgasłoby pół mieszkania (i jedzenie by się rozmroziło).',
  },
  {
    id: 'spd', group: 'Zabezpieczenia', term: 'Ogranicznik przepięć (SPD)',
    what: 'Aparat „upuszczający" przepięcia do ziemi. Typy: T1 (prądy piorunowe), T2 (przepięcia łączeniowe i pośrednie), T3 (dobezpieczenie przy urządzeniu).',
    use: 'Chroni elektronikę przed przepięciami – od burzy po skoki sieciowe.',
    example: 'Burza, piorun trafia w linię dwie ulice dalej. Bez SPD: telewizor, router i płyta indukcyjna do wymiany. Z SPD T1+T2 w rozdzielnicy przepięcie spływa do uziemienia.',
  },
  {
    id: 'topikowy', group: 'Zabezpieczenia', term: 'Bezpiecznik topikowy',
    what: 'Najprostsze zabezpieczenie – drucik, który topi się od za dużego prądu. Jednorazowy.',
    use: 'Zabezpiecza WLZ-ty i obwody w starszych i przemysłowych instalacjach. Po zadziałaniu wymienia się wkładkę.',
    example: 'Szare „korki" w starych mieszkaniach i wkładki mocy przy liczniku. Uwaga egzaminacyjna: naprawianie przepalonej wkładki drucikiem to proszenie się o pożar – wkładkę się WYMIENIA.',
  },
  {
    id: 'nh', group: 'Zabezpieczenia', term: 'Bezpiecznik mocy (NH)',
    what: 'Duży bezpiecznik topikowy w obudowie nożowej (NH). Działa jak „korek", ale na znacznie większe prądy i z wysoką zdolnością zwarciową (np. 120 kA). Ma blaszkę sygnalizacyjną pokazującą zadziałanie.',
    use: 'Zabezpieczenie przedlicznikowe w złączach kablowych i u dużych odbiorców – tam, gdzie prądy są za duże na domową „eskę". Wymienia się go specjalnym uchwytem z osłoną przedramienia. W złączu robi to operator sieci lub osoba przez niego upoważniona – wymiana pod napięciem to praca w warunkach szczególnego zagrożenia (polecenie pisemne, ŚOI z osłoną twarzy).',
    example: 'Szara skrzynka złącza kablowego na ścianie bloku albo zasilanie hali/galerii. Charakterystyka zwykle gG (ogólnego przeznaczenia). Na tabliczce: prąd znamionowy (np. 160 A), napięcie (500 V), zdolność zwarciowa.',
  },
  {
    id: 'pwp', group: 'Zabezpieczenia', term: 'Przeciwpożarowy wyłącznik prądu (PWP)',
    what: 'Wyłącznik główny odcinający zasilanie całego budynku, umieszczony przy wejściu.',
    use: 'Pozwala strażakom odciąć prąd przed akcją gaśniczą – żeby lać wodę bez ryzyka porażenia.',
    example: 'Czerwony przycisk za szybką przy wejściu do bloku lub hali. Wymagany w budynkach o kubaturze > 1000 m³.',
  },

  // ───────────── Systemy i klasy ─────────────
  {
    id: 'tns', group: 'Systemy i klasy', term: 'System TN-S / TN-C / TN-C-S',
    what: 'Rodziny systemu TN (punkt neutralny transformatora uziemiony). TN-S: osobne N i PE od źródła. TN-C: wspólny PEN. TN-C-S: PEN rozdzielony na N i PE w budynku – dziś standard.',
    use: 'Określa, jak zorganizowana jest ochrona przeciwporażeniowa – w TN chroni niska impedancja pętli zwarcia.',
    example: 'Typowy polski dom: od słupa przychodzi PEN (TN-C), w rozdzielnicy rozdzielasz go na N i PE (dalej TN-S). Punkt rozdziału się uziemia.',
  },
  {
    id: 'tt', group: 'Systemy i klasy', term: 'System TT',
    what: 'Urządzenia mają własny uziom, niezależny od uziemienia sieci.',
    use: 'Stosowany tam, gdzie pętla zwarcia przez sieć byłaby za słaba. Impedancja pętli jest duża – dlatego RCD jest OBOWIĄZKOWY.',
    example: 'Wiejskie gospodarstwa zasilane długą linią napowietrzną: własny uziom przy budynku + różnicówka. Bez RCD zabezpieczenie nadprądowe mogłoby w ogóle nie wyłączyć zwarcia na obudowę – prąd przez dwa uziomy jest za mały.',
  },
  {
    id: 'it', group: 'Systemy i klasy', term: 'System IT',
    what: 'Punkt neutralny izolowany od ziemi. Pierwsze zwarcie z ziemią nie powoduje wyłączenia – sygnalizuje je monitor stanu izolacji (IMD).',
    use: 'Tam, gdzie nagłe wyłączenie jest groźniejsze niż samo zwarcie.',
    example: 'Sala operacyjna: pacjent na stole, pierwsze doziemienie w lampie – alarm dla obsługi, ale operacja trwa dalej. Wyłączenie światła w trakcie zabiegu byłoby gorsze.',
  },
  {
    id: 'selv', group: 'Systemy i klasy', term: 'SELV / PELV (napięcie bezpieczne)',
    what: 'Obwody o napięciu ≤ 50 V AC (≤ 120 V DC), separowane od sieci transformatorem bezpieczeństwa. SELV – nieuziemione, PELV – mogą być uziemione.',
    use: 'Napięcie tak niskie, że dotknięcie nie jest groźne – ochrona „z natury".',
    example: 'Oczko halogenowe 12 V przy wannie, dzwonek 8 V, taśmy LED. Dlatego w strefie 0 łazienki (wewnątrz wanny) wolno montować tylko SELV 12 V.',
  },
  {
    id: 'klasy', group: 'Systemy i klasy', term: 'Klasy ochronności I / II / III',
    what: 'Klasa I: izolacja podstawowa + obowiązkowy PE. Klasa II: podwójna izolacja, bez PE (symbol: kwadrat w kwadracie). Klasa III: zasilanie SELV/PELV.',
    use: 'Mówi, jak urządzenie chroni użytkownika przed dotykiem pośrednim.',
    example: 'Pralka = klasa I (metalowa obudowa, wtyczka z bolcem). Wiertarka z plastikową obudową = klasa II (wtyczka płaska, bez bolca – i to jest OK!). Latarka ładowana przez USB = klasa III.',
  },
  {
    id: 'ip', group: 'Systemy i klasy', term: 'Stopień ochrony IP',
    what: 'Dwucyfrowy kod obudowy: pierwsza cyfra (0–6) – pyły i ciała stałe, druga (0–9) – woda.',
    use: 'Dobór osprzętu do warunków: łazienka, zewnętrze, kurz w warsztacie.',
    example: 'Gniazdo ogrodowe = min. IP44 (bryzgi), oprawa nad prysznicem = IP65, oczko w podjeździe najeżdżane autem i zalewane = IP67 (chwilowe zanurzenie).',
  },

  // ───────────── Przyrządy pomiarowe ─────────────
  {
    id: 'wskaznik', group: 'Przyrządy pomiarowe', term: 'Wskaźnik napięcia (dwubiegunowy)',
    what: 'Podstawowe narzędzie BHP – dwie sondy i wyświetlacz/diody pokazujące obecność i przybliżoną wartość napięcia.',
    use: 'Sprawdzenie braku napięcia przed dotknięciem czegokolwiek. Jedyne akceptowane narzędzie do tej czynności.',
    example: 'Procedura: sprawdź wskaźnik na działającym gnieździe → sprawdź wyłączony obwód → sprawdź wskaźnik ponownie. Popularna „neonówka-śrubokręt" NIE jest wskaźnikiem napięcia – potrafi nie zaświecić mimo napięcia.',
  },
  {
    id: 'multimetr', group: 'Przyrządy pomiarowe', term: 'Multimetr',
    what: 'Uniwersalny miernik: napięcie, prąd, rezystancja, często ciągłość z brzęczykiem.',
    use: 'Diagnostyka i serwis: szukanie przerwy, pomiar napięcia zasilania, sprawdzenie diody.',
    example: 'Nie działa gniazdo? Multimetrem sprawdzasz 230 V między L i N. Ale do pomiarów OCHRONNYCH (izolacja, pętla, RCD) multimetr się NIE nadaje – za niskie napięcie i prąd pomiarowy.',
  },
  {
    id: 'megaomomierz', group: 'Przyrządy pomiarowe', term: 'Megaomomierz (miernik izolacji)',
    what: 'Miernik przykładający wysokie napięcie DC (250/500/1000 V) i mierzący rezystancję izolacji w MΩ.',
    use: 'Pomiar rezystancji izolacji – czy izolacja przewodów wciąż „trzyma". Minimum 1 MΩ przy 500 V DC dla instalacji 230/400 V.',
    example: 'Mieszkanie po zalaniu przez sąsiada: zanim włączysz prąd, mierzysz izolację. Zawilgocona ściana z przewodem potrafi pokazać 0,2 MΩ – czekasz, aż wyschnie, i mierzysz ponownie.',
  },
  {
    id: 'mzc', group: 'Przyrządy pomiarowe', term: 'Miernik impedancji pętli zwarcia',
    what: 'Wpinany w gniazdo miernik, który na chwilę obciąża sieć i z spadku napięcia wylicza impedancję pętli Zs (i prąd zwarciowy Ik).',
    use: 'Sprawdzenie, czy przy zwarciu zabezpieczenie wyłączy obwód w wymaganym czasie (0,4 s / 5 s).',
    example: 'Daleka stodoła zasilana cienkim kablem: miernik pokazuje Zs = 3 Ω → Ik = 77 A → B16 może nie wyzwolić magnetycznie. Werdykt: gruba linia albo RCD.',
  },
  {
    id: 'miernik-rcd', group: 'Przyrządy pomiarowe', term: 'Miernik RCD',
    what: 'Wymusza kontrolowany prąd upływu i mierzy, przy jakim prądzie i po jakim czasie różnicówka zadziałała.',
    use: 'Pomiar odbiorczy RCD: 0,5×IΔn (nie działa), 1×IΔn (≤ 300 ms), 5×IΔn (≤ 40 ms). Wyniki do protokołu.',
    example: 'Przycisk TEST mówi tylko „mechanizm żyje". Miernik RCD mówi „zadziałał przy 24 mA po 187 ms" – i dopiero to wpisujesz do protokołu odbiorczego.',
  },
  {
    id: 'miernik-uziemien', group: 'Przyrządy pomiarowe', term: 'Miernik rezystancji uziemienia',
    what: 'Miernik z kompletem elektrod pomocniczych do metody trójzaciskowej (spadku potencjału); wersje cęgowe mierzą bez wbijania elektrod.',
    use: 'Pomiar RE uziomów: odgromowych (zalecane poniżej 10 Ω) i ochronnych w układzie TT (RA × IΔn ≤ 50 V).',
    example: 'Coroczny przegląd odgromówki na hali: wbijasz elektrody P i C w trawnik 20–40 m od badanego uziomu, miernik liczy RE = U/I. Nie mierzysz tuż po deszczu (wynik wyjdzie za dobry) – najbardziej miarodajny jest suchy grunt, a w innych warunkach wynik mnożysz przez współczynnik poprawkowy.',
  },
  {
    id: 'cegowy', group: 'Przyrządy pomiarowe', term: 'Miernik cęgowy',
    what: 'Cęgi obejmujące przewód i mierzące prąd bez rozłączania obwodu (z pola magnetycznego).',
    use: 'Szybki pomiar obciążenia, szukanie asymetrii faz, prądów upływu.',
    example: '„Różnicówka wybija raz na kilka dni" – cęgami upływowymi obejmujesz L+N razem i widzisz 18 mA stałego upływu (stara pralka + bojler). Suma blisko progu 30 mA = każdy dodatkowy odbiornik wywala RCD.',
  },
  {
    id: 'fazomierz', group: 'Przyrządy pomiarowe', term: 'Tester kolejności faz',
    what: 'Trzy krokodylki (L1, L2, L3) i wskaźnik kierunku wirowania pola.',
    use: 'Sprawdzenie kolejności faz w instalacjach 3-fazowych – ostatni punkt pomiarów odbiorczych.',
    example: 'Po wymianie kabla silnik pompy kręci się wstecz i nie pompuje. Tester pokazuje złą kolejność – zamieniasz dwie fazy miejscami i po sprawie.',
  },
  {
    id: 'mpi', group: 'Przyrządy pomiarowe', term: 'Miernik wielofunkcyjny instalacji',
    what: '„Kombajn pomiarowy" łączący wszystko: izolacja, ciągłość PE 200 mA, pętla zwarcia, RCD, rezystancja uziemienia.',
    use: 'Standardowe narzędzie elektryka wykonującego pomiary – całe pomiary odbiorcze jednym przyrządem, z pamięcią wyników do protokołu.',
    example: 'Odbiór nowego mieszkania: jeden miernik, kolejno wszystkie pomiary normowe obwód po obwodzie, eksport wyników do programu generującego protokół.',
  },
  {
    id: 'wzorcowanie', group: 'Przyrządy pomiarowe', term: 'Świadectwo wzorcowania',
    what: 'Dokument z laboratorium potwierdzający, że miernik mierzy poprawnie (z określoną niepewnością). Wystawiany na konkretny egzemplarz, na ograniczony czas.',
    use: 'Bez ważnego świadectwa wyniki nie mają mocy prawnej – protokół jest nieważny.',
    example: 'Przed wyjazdem do klienta sprawdzasz datę na świadectwie. Pomiar wykonany dzień po jej upływie = cały protokół do kosza i powtórka na własny koszt.',
  },
  {
    id: 'kamera', group: 'Przyrządy pomiarowe', term: 'Kamera termowizyjna',
    what: 'Pokazuje rozkład temperatur – gorące miejsca świecą na obrazie.',
    use: 'Przeglądy rozdzielnic i połączeń: luźny zacisk grzeje się pod obciążeniem na długo przed awarią.',
    example: 'Przegląd hali: jedna śruba na szynie świeci 85 °C przy sąsiadach po 30 °C. Dokręcenie zacisku kosztuje minutę – pożar rozdzielnicy kosztuje halę.',
  },
]
