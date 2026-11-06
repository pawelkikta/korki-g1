// Organizacja bezpiecznej pracy przy urządzeniach elektroenergetycznych.
// Podstawa: rozporządzenie Ministra Energii z 28.08.2019 r. w sprawie bhp przy urządzeniach energetycznych
// (tekst jedn. Dz.U. 2021 poz. 1210) oraz typowa instrukcja organizacji bezpiecznej pracy (IOBP), która je wdraża.
// Format sekcji jak w chapters.js (ChapterSection).

export const orgSections = [
  {
    heading: 'Trzy rodzaje prac i dwie strefy',
    paragraphs: [
      'Prace eksploatacyjne przy urządzeniach elektroenergetycznych wykonuje się na trzy sposoby: **pod napięciem**, **w pobliżu napięcia** albo **przy wyłączonym napięciu**. To, który sposób wybierasz, decyduje o środkach ochrony i o tym, jak przygotowuje się strefę pracy.',
      'Granice stref wyznaczają odstępy od nieosłoniętych części pod napięciem: **DL** – zewnętrzna granica strefy prac pod napięciem, **DV** – zewnętrzna granica strefy prac w pobliżu napięcia. Odstępu nie może naruszyć żadna część ciała, narzędzie ani przedmiot.',
    ],
    table: {
      caption: 'Urządzenia o napięciu do 1 kV',
      head: ['Rodzaj pracy', 'Co to znaczy', 'Odstęp'],
      rows: [
        ['Pod napięciem', 'Dotykasz części czynnej albo naruszasz strefę prac pod napięciem', 'DL = bez dotyku'],
        ['W pobliżu napięcia', 'Jesteś w strefie DV, ale nie dotykasz części czynnych', 'DV = 0,3 m'],
        ['Przy wyłączonym napięciu', 'Pracujesz na urządzeniu wyłączonym i zabezpieczonym, nie naruszasz stref innych urządzeń pod napięciem', '–'],
      ],
    },
    box: { type: 'warning', title: 'Prace pod napięciem to osobna specjalizacja', text: 'Prace pod napięciem (PPN) wykonuje się specjalną technologią, przez przeszkolonych i upoważnionych pracowników. Zwykły elektryk z G1 pkt 2 pracuje **przy wyłączonym napięciu** – a gdy obok zostają części pod napięciem, osłania je lub wygradza.' },
  },
  {
    heading: 'Polecenie pisemne czy bez polecenia?',
    paragraphs: [
      'Pracodawca (prowadzący eksploatację) opracowuje **instrukcję organizacji bezpiecznej pracy (IOBP)** – określa w niej, które prace wykonuje się na polecenie pisemne, a które bez polecenia, oraz prowadzi wykaz osób upoważnionych do pełnienia funkcji.',
      'Na **polecenie pisemne** wykonuje się w szczególności:',
      { list: [
        'prace stwarzające możliwość wystąpienia **szczególnego zagrożenia** dla zdrowia lub życia,',
        'prace wykonywane przez **pracowników firm zewnętrznych** (chyba że dopuszczenie ustalono odrębnie na piśmie),',
        'prace, które prowadzący eksploatację lub poleceniodawca **uzna za wymagające polecenia** – np. mogące wywołać duże straty.',
      ] },
      '**Bez polecenia** wolno wykonywać tylko:',
      { list: [
        'prace eksploatacyjne opisane w **instrukcji eksploatacji**, wykonywane przez uprawnionych i upoważnionych pracowników (np. oględziny, odczyty),',
        'czynności związane z **ratowaniem życia, zdrowia** lub środowiska,',
        'czynności związane z **zabezpieczeniem mienia** przed zniszczeniem (np. pilne wyłączenie zalewanej rozdzielnicy) – z niezwłocznym powiadomieniem przełożonego.',
      ] },
      'Polecenie pisemne obejmuje co do zasady **jeden zespół w jednej strefie pracy** i jest ważne przez czas określony przez poleceniodawcę. Zmiana strefy pracy wymaga ponownego dopuszczenia.',
    ],
    box: { type: 'trap', title: 'Pułapka egzaminacyjna', text: '„Mam uprawnienia E i sam wyłączyłem napięcie, więc mogę pracować" – nie. Uprawnienia mówią, **co umiesz**, a polecenie i dopuszczenie – **czy wolno ci teraz pracować w tej strefie**.' },
  },
  {
    heading: 'Osoby funkcyjne – kto jest kim',
    table: {
      head: ['Funkcja', 'Kwalifikacje', 'Co robi'],
      rows: [
        ['Poleceniodawca', 'D + upoważnienie pracodawcy', 'Wydaje polecenie pisemne: zakres, strefa, środki bezpieczeństwa; wyznacza dopuszczającego i kierującego zespołem; prowadzi instruktaż'],
        ['Koordynujący', 'D', 'Koordynuje prace z ruchem urządzeń: kolejność łączeń, zezwolenie na przygotowanie i likwidację strefy, zgoda na uruchomienie urządzenia'],
        ['Dopuszczający', 'E + upoważnienie', 'Przygotowuje strefę pracy (czynności łączeniowe), dopuszcza zespół, po pracy likwiduje strefę'],
        ['Kierujący zespołem', 'E', 'Sprawdza i przyjmuje strefę, kieruje pracą, egzekwuje BHP, nie opuszcza samowolnie strefy, zgłasza zakończenie'],
        ['Nadzorujący', 'E lub D', 'Wyłącznie nadzór – nad osobami bez kwalifikacji lub pracownikami firm zewnętrznych; nie wykonuje innych prac'],
        ['Członek zespołu', 'E (do prac eksploatacyjnych)', 'Wykonuje pracę; przerywa ją przy zagrożeniu i zawiadamia kierującego'],
      ],
    },
    paragraphs: [
      '**Zespół** to co najmniej dwie osoby wykonujące pracę. W każdej strefie, w której pracuje zespół, wyznacza się kierującego zespołem.',
    ],
    box: { type: 'remember', title: 'Łączenie funkcji przy poleceniu pisemnym', text: 'Jedna osoba może łączyć **najwyżej dwie funkcje**. Funkcji **dopuszczającego i kierującego zespołem nie łączy się** (wyjątek: prace pod napięciem) – jeden przygotowuje strefę, drugi ją niezależnie sprawdza i przejmuje. Poleceniodawca może być koordynującym.' },
  },
  {
    heading: 'Przygotowanie strefy pracy przy wyłączonym napięciu',
    paragraphs: [
      'Strefę przygotowuje **dopuszczający**, po uzyskaniu zezwolenia od koordynującego lub poleceniodawcy. Kolejność ma sens fizyczny – każdy krok zabezpiecza następny:',
    ],
    steps: [
      '**Wyłącz** – tak, żeby uzyskać przerwę izolacyjną: otwarte zestyki łącznika, wyjęte wkładki bezpiecznikowe, zdemontowany fragment obwodu albo łącznik w obudowie z jednoznacznym wskaźnikiem położenia',
      '**Zabezpiecz przed załączeniem** – do 1 kV: wyjęcie wkładek albo zablokowanie napędu otwartego łącznika (kłódka); w miejscu wyłączenia tablica **„Nie załączać – pracują ludzie"**',
      '**Sprawdź brak napięcia** – sprawnym wskaźnikiem (sprawdzonym na znanym napięciu), na **wszystkich fazach**, a do 1 kV **także na przewodzie N**; nie na podstawie lampek ani przyrządów tablicowych',
      '**Uziem i zewrzyj** – bezpośrednio po sprawdzeniu braku napięcia; wszystkie fazy, ze wszystkich stron, z których może przyjść napięcie, a co najmniej jeden uziemiacz widoczny z miejsca pracy. Najpierw zacisk uziomowy, potem fazowe (drążkiem)',
      '**Ogrodź i oznacz strefę** – osłoń lub wygródź sąsiednie części pod napięciem, oznacz strefę tablicami',
      '**Dopuść zespół** – dopuszczający i kierujący sprawdzają strefę, dopuszczający wskazuje ją i udowadnia brak napięcia, obaj podpisują polecenie; ustala się drogę ewakuacyjną',
    ],
    box: { type: 'mistake', text: 'Uziemiacz założony **przed** sprawdzeniem braku napięcia, na obwód, który jednak jest pod napięciem = zwarcie i łuk elektryczny prosto w twarz i ręce. Dlatego: najpierw sprawdź, potem uziemiaj.' },
    box2: { type: 'remember', text: 'W instalacjach odbiorczych do 1 kV zamiast uziemiaczy dopuszcza się **zwieracze** (lekkie), jeśli przewód neutralny jest trwale uziemiony. Uziemiacza nie zakłada się przez łączniki ani bezpieczniki.' },
  },
  {
    heading: 'Przerwa w pracy i zakończenie pracy',
    paragraphs: [
      '**Przerwa.** Każdy pracownik musi przerwać pracę, gdy pojawi się zagrożenie, a osoby dozoru – wstrzymać ją, gdy nie są zachowane warunki bezpieczeństwa. Jeśli kierujący zespołem lub nadzorujący musi opuścić strefę, **praca zostaje przerwana**, zespół wyprowadzony, a strefa zabezpieczona przed osobami postronnymi.',
      'Po przerwie w pracy na polecenie pisemne wznowienie wymaga **ponownego dopuszczenia** – chyba że zespół nie opuścił strefy albo strefa była zabezpieczona. Nawet wtedy kierujący przed wznowieniem sprawdza zabezpieczenia; jeśli coś się zmieniło – wznowienie jest zabronione.',
      '**Zakończenie.** Kierujący zespołem usuwa narzędzia i materiały, wyprowadza zespół, powiadamia dopuszczającego (lub koordynującego) i podpisuje zakończenie w poleceniu. Dopuszczający robi oględziny, za zezwoleniem likwiduje strefę (zdejmuje uziemiacze: **najpierw fazowe, na końcu uziomowy**, potem tablice i blokady) i zgłasza gotowość urządzenia. Urządzenie uruchamia się dopiero za zgodą koordynującego lub poleceniodawcy.',
    ],
    box: { type: 'trap', text: 'Najgroźniejszy moment to **ponowne załączenie**. Zanim napięcie wróci: wszyscy poza strefą, uziemiacze zdjęte, polecenie zamknięte. Przy kilku zespołach koordynujący czeka na zgłoszenia od wszystkich dopuszczających.' },
  },
  {
    heading: 'Instrukcja eksploatacji – co w niej jest',
    paragraphs: [
      'Instrukcje eksploatacji zatwierdza **prowadzący eksploatację (pracodawca)**. Opisują konkretne urządzenia i są podstawą prac wykonywanych bez polecenia. Zawierają m.in.:',
      { list: [
        'charakterystykę urządzeń, rysunki i schematy,',
        'uruchomienie, obsługę w czasie pracy i zatrzymanie,',
        'postępowanie przy awariach i zakłóceniach,',
        'wymagania i terminy konserwacji, przeglądów, prób i pomiarów,',
        'wymagania BHP i ppoż., wymagania kwalifikacyjne, identyfikację zagrożeń, środki ochrony.',
      ] },
    ],
    box: { type: 'remember', text: '**Instrukcja eksploatacji** – jak obsługiwać i utrzymywać urządzenie. **IOBP** – jak organizuje się bezpieczną pracę: polecenia, osoby funkcyjne, strefa, dopuszczenie, przerwy, zakończenie.' },
  },
]

// ── Symulacja: przygotowanie i likwidacja strefy pracy ──
export const strefaPrep = [
  { id: 1, label: 'Uzyskaj zezwolenie na przygotowanie strefy (od koordynującego lub poleceniodawcy)', whyNot: 'Zanim cokolwiek przełączysz, musisz mieć zezwolenie – koordynujący wie, co jeszcze dzieje się w sieci i czy wyłączenie nikomu nie zagraża.' },
  { id: 2, label: 'Wyłącz obwód tak, by uzyskać przerwę izolacyjną (otwarty rozłącznik, wyjęte wkładki)', whyNot: 'Najpierw trzeba wyłączyć – bez przerwy izolacyjnej nie ma czego zabezpieczać ani sprawdzać.' },
  { id: 3, label: 'Zabezpiecz przed załączeniem: kłódka na napędzie, tablica „Nie załączać – pracują ludzie"', whyNot: 'Blokadę zakłada się zaraz po wyłączeniu – zanim ktokolwiek dotknie obwodu, nikt nie może go przypadkiem załączyć.' },
  { id: 4, label: 'Sprawdź wskaźnik napięcia na znanym źródle napięcia', whyNot: 'Wskaźnik sprawdzasz bezpośrednio przed sprawdzeniem braku napięcia – wcześniej nie ma to sensu, a później jest za późno.' },
  { id: 5, label: 'Sprawdź brak napięcia na wszystkich fazach i na przewodzie N', whyNot: 'Brak napięcia sprawdzasz sprawnym wskaźnikiem na wyłączonym i zabezpieczonym obwodzie.' },
  { id: 6, label: 'Uziem i zewrzyj: najpierw zacisk uziomowy, potem zaciski fazowe', whyNot: 'Uziemiacz na niesprawdzony obwód? Jeśli jest pod napięciem – zwarcie i łuk elektryczny prosto w twarz. Najpierw sprawdź brak napięcia.' },
  { id: 7, label: 'Ogrodź i oznacz strefę, osłoń sąsiednie części pod napięciem', whyNot: 'Strefę oznacza się, gdy obwód jest już bezpieczny (wyłączony, sprawdzony, uziemiony).' },
  { id: 8, label: 'Dopuść zespół: wskaż strefę, udowodnij brak napięcia, podpisy w poleceniu', whyNot: 'Zespół wchodzi do strefy na samym końcu – dopiero gdy jest w pełni przygotowana.' },
]

export const strefaClose = [
  { id: 1, label: 'Kierujący: usuwa narzędzia, wyprowadza zespół, zgłasza zakończenie i podpisuje polecenie', whyNot: 'Najpierw ludzie i narzędzia muszą opuścić strefę – dopiero wtedy można cokolwiek likwidować.' },
  { id: 2, label: 'Dopuszczający: oględziny urządzenia i strefy pracy', whyNot: 'Zanim zdejmiesz zabezpieczenia, sprawdź, czy w strefie nie zostali ludzie, narzędzia albo prowizoryczne połączenia.' },
  { id: 3, label: 'Uzyskaj zezwolenie koordynującego / poleceniodawcy na likwidację strefy', whyNot: 'Likwidacja strefy to czynność łączeniowa – wymaga zezwolenia, tak jak przygotowanie.' },
  { id: 4, label: 'Zdejmij uziemiacze: najpierw zaciski fazowe, na końcu uziomowy', whyNot: 'Uziemiacze zdejmuje się po oględzinach i za zezwoleniem – a dopiero potem usuwa blokady.' },
  { id: 5, label: 'Usuń ogrodzenia, osłony i tablice, zdejmij blokadę napędu', whyNot: 'Blokadę zdejmujesz dopiero, gdy uziemiacze są zdjęte – inaczej ktoś mógłby załączyć napięcie na uziemiony obwód.' },
  { id: 6, label: 'Zgłoś gotowość urządzenia do ruchu', whyNot: 'Gotowość zgłaszasz, gdy strefa jest w pełni zlikwidowana.' },
  { id: 7, label: 'Załącz zasilanie – dopiero za zgodą koordynującego / poleceniodawcy', whyNot: 'Załączenie to ostatni krok i zawsze za zgodą – przy kilku zespołach koordynujący czeka na zgłoszenia od wszystkich.' },
]

// ── Symulacja: kto jest kim ──
export const ROLES = [
  { id: 'pol', label: 'Poleceniodawca' },
  { id: 'koo', label: 'Koordynujący' },
  { id: 'dop', label: 'Dopuszczający' },
  { id: 'kie', label: 'Kierujący zespołem' },
  { id: 'nad', label: 'Nadzorujący' },
]

export const roleTasks = [
  { id: 't1', text: 'Wydaje polecenie pisemne, określa strefę pracy i środki bezpieczeństwa', role: 'pol', why: 'Polecenie pisemne wydaje poleceniodawca – osoba z D, upoważniona przez pracodawcę.' },
  { id: 't2', text: 'Wykonuje czynności łączeniowe i przygotowuje strefę pracy', role: 'dop', why: 'Przygotowanie strefy (wyłączenie, blokady, sprawdzenie, uziemienie) to zadanie dopuszczającego.' },
  { id: 't3', text: 'Sprawdza przygotowaną strefę i przyjmuje ją od dopuszczającego', role: 'kie', why: 'Kierujący zespołem niezależnie sprawdza strefę – to druga para oczu.' },
  { id: 't4', text: 'Ustala kolejność łączeń przy pracy kilku zespołów i zezwala na uruchomienie urządzenia', role: 'koo', why: 'Skoordynowanie prac z ruchem urządzeń to rola koordynującego (D).' },
  { id: 't5', text: 'Pilnuje pracowników firmy zewnętrznej i nie wykonuje innych prac', role: 'nad', why: 'Nadzorujący pełni wyłącznie nadzór – nad osobami bez kwalifikacji lub firmami zewnętrznymi.' },
  { id: 't6', text: 'Nie może samowolnie opuścić strefy, w której pracuje zespół', role: 'kie', why: 'Gdy kierujący musi odejść, praca jest przerywana, a zespół wyprowadzony.' },
  { id: 't7', text: 'Po zakończeniu pracy likwiduje strefę – zdejmuje uziemiacze i blokady', role: 'dop', why: 'Likwidacja strefy należy do dopuszczającego – po oględzinach i za zezwoleniem.' },
  { id: 't8', text: 'Wyznacza dopuszczającego i kierującego zespołem do konkretnej pracy', role: 'pol', why: 'Osoby funkcyjne do pracy wskazuje poleceniodawca w poleceniu.' },
]

export const roleCombos = [
  { id: 'c1', text: 'Poleceniodawca + koordynujący', ok: true, why: 'Wolno – poleceniodawca może pełnić funkcję koordynującego.' },
  { id: 'c2', text: 'Dopuszczający + kierujący zespołem', ok: false, why: 'Nie wolno (poza pracami pod napięciem) – jeden przygotowuje strefę, drugi ją sprawdza i przyjmuje.' },
  { id: 'c3', text: 'Dopuszczający + członek zespołu', ok: true, why: 'Wolno, jeśli przewiduje to polecenie – ale nadal łączy się najwyżej dwie funkcje.' },
]

// ── Symulacja: polecenie czy nie? ──
export const ORDER_KINDS = [
  { id: 'pis', label: 'Polecenie pisemne' },
  { id: 'ins', label: 'Bez polecenia – instrukcja eksploatacji' },
  { id: 'rat', label: 'Bez polecenia – ratowanie życia / mienia' },
]

export const orderCases = [
  { id: 'p1', text: 'Codzienne oględziny rozdzielni zgodnie z instrukcją eksploatacji, bez zdejmowania osłon', kind: 'ins', why: 'Rutynowa czynność opisana w instrukcji eksploatacji, wykonywana przez upoważnionego pracownika.' },
  { id: 'p2', text: 'Firma zewnętrzna wymienia przewody w rozdzielnicy zakładu', kind: 'pis', why: 'Prace pracowników spoza zakładu prowadzącego eksploatację – na polecenie pisemne, zwykle z nadzorującym.' },
  { id: 'p3', text: 'Wymiana aparatu w polu rozdzielnicy, gdy sąsiednie nieosłonięte szyny są pod napięciem', kind: 'pis', why: 'Praca w pobliżu napięcia – stwarza możliwość szczególnego zagrożenia.' },
  { id: 'p4', text: 'Pracownik został porażony w rozdzielni – trzeba natychmiast wyłączyć zasilanie', kind: 'rat', why: 'Ratowanie życia – działasz od razu, bez czekania na polecenie, potem powiadamiasz przełożonego.' },
  { id: 'p5', text: 'Z pękniętej rury leje się woda na rozdzielnicę – trzeba ją wyłączyć, zanim dojdzie do zwarcia', kind: 'rat', why: 'Zabezpieczenie mienia przed zniszczeniem – bez polecenia, z niezwłocznym powiadomieniem przełożonego.' },
  { id: 'p6', text: 'Odczyt wskazań liczników i kontrola lampek sygnalizacyjnych opisane w instrukcji eksploatacji', kind: 'ins', why: 'Czynność z instrukcji eksploatacji, bez ingerencji w części czynne.' },
  { id: 'p7', text: 'Prace przy wyłączonej linii kablowej nn wymagające uziemienia jej z obu stron', kind: 'pis', why: 'Praca przy wyłączonym napięciu wymagająca przygotowania strefy (wyłączenia, uziemienia) – szczególne zagrożenie.' },
]
