// Mini-quiz „Sprawdź się" po każdym rozdziale szkolenia – 3 pytania ABCD na rozdział.
// correct = indeks poprawnej odpowiedzi w options (kolejność tasowana przy wyświetlaniu).

export const chapterQuiz = {
  'organizacja-pracy': [
    {
      question: 'Co dopuszczający robi bezpośrednio po sprawdzeniu braku napięcia?',
      options: [
        'Uziemia i zwiera wyłączone urządzenie',
        'Dopuszcza zespół – strefa jest już bezpieczna',
        'Zakłada blokadę na napędzie łącznika',
        'Zgłasza gotowość urządzenia do ruchu',
      ],
      correct: 0,
      explain: 'Kolejność: wyłącz → zabezpiecz przed załączeniem → sprawdź brak napięcia → uziem i zewrzyj → oznacz strefę → dopuść. Blokadę zakłada się przed sprawdzeniem.',
    },
    {
      question: 'Kierujący zespołem musi pilnie opuścić strefę pracy. Co robi?',
      options: [
        'Przerywa pracę, wyprowadza zespół i zabezpiecza strefę przed osobami postronnymi',
        'Przekazuje kierowanie członkowi zespołu z najdłuższym stażem i odchodzi',
        'Prosi dopuszczającego, żeby na chwilę przejął kierowanie zespołem',
        'Odchodzi na chwilę – zespół zna zakres pracy z polecenia',
      ],
      correct: 0,
      explain: 'Kierujący nie opuszcza samowolnie strefy. Dopuszczający nie może być kierującym zespołem, a „najstarszy stażem" nie jest wyznaczony w poleceniu.',
    },
    {
      question: 'Którą czynność wolno wykonać bez polecenia?',
      options: [
        'Oględziny rozdzielni opisane w instrukcji eksploatacji, bez zdejmowania osłon',
        'Wymianę przewodów w rozdzielnicy przez firmę zewnętrzną',
        'Wymianę aparatu obok nieosłoniętych szyn pod napięciem',
        'Pracę przy wyłączonej linii wymagającą założenia uziemiaczy',
      ],
      correct: 0,
      explain: 'Bez polecenia: czynności z instrukcji eksploatacji oraz ratowanie życia, zdrowia lub mienia. Firma zewnętrzna, praca w pobliżu napięcia i praca wymagająca przygotowania strefy – na polecenie pisemne.',
    },
  ],
  'podstawy-obwodu': [
    {
      question: 'Skąd bierze się przewód N (neutralny)?',
      options: [
        'Ze wspólnego punktu, w którym połączone są końce trzech uzwojeń transformatora (punkt gwiazdowy)',
        'Z osobnego, czwartego uzwojenia w transformatorze',
        'Z uziomu przy budynku',
        'Z rozdzielnicy – powstaje dopiero w mieszkaniu',
      ],
      correct: 0,
      explain: 'Trzy uzwojenia wtórne są jednym końcem skręcone razem – to punkt gwiazdowy. Z niego wychodzi N i jest on uziemiony w stacji.',
    },
    {
      question: 'Dlaczego dotknięcie fazy przy kaloryferze grozi porażeniem, choć nie dotykasz przewodu N?',
      options: [
        'Bo punkt gwiazdowy jest uziemiony – ziemia i kaloryfer są drogą powrotną do transformatora',
        'Bo kaloryfer sam wytwarza napięcie',
        'Bo prąd potrzebuje tylko jednego przewodu, żeby popłynąć',
        'Bo kaloryfer jest zawsze podłączony do przewodu N',
      ],
      correct: 0,
      explain: 'Uziemienie punktu gwiazdowego czyni z ziemi część obwodu: kaloryfer → ziemia → uziom stacji → punkt gwiazdowy. Obwód zamyka się przez twoje ciało.',
    },
    {
      question: 'Przez wyłącznik RCD przechodzą przewody:',
      options: ['L i N (PE go omija)', 'L, N i PE', 'tylko L', 'tylko PE'],
      correct: 0,
      explain: 'RCD porównuje prąd w L i N. Gdyby PE też przez niego przechodził, prąd upływu wracałby przez przekładnik i różnica by zniknęła – RCD nigdy by nie zadziałał.',
    },
  ],
  'podstawy-prawne': [
    {
      question: 'Co w świadectwie kwalifikacyjnym daje prawo do wykonywania pomiarów instalacji?',
      options: ['Zakres kontrolno-pomiarowy', 'Sam punkt 10 grupy G1', 'Stanowisko dozoru bez zakresu pomiarów', 'Każde świadectwo G1'],
      correct: 0,
      explain: 'Pomiary = zakres kontrolno-pomiarowy. Aparatura pomiarowa i automatyka to pkt 13 (w starej numeracji pkt 10), a dziś pkt 10 to sieć trakcyjna.',
    },
    {
      question: 'Jak często kontroluje się instalację elektryczną w budynku mieszkalnym?',
      options: ['Co 5 lat', 'Co 1 rok', 'Co 10 lat', 'Tylko przy sprzedaży'],
      correct: 0,
      explain: 'Art. 62 Prawa budowlanego: co najmniej raz na 5 lat. Kontrolę może przeprowadzić osoba z kwalifikacjami D (ust. 5) albo z uprawnieniami budowlanymi (ust. 4). Częściej – np. w strefach zagrożenia wybuchem – gdy tak ustali pracodawca w dokumencie zabezpieczenia przed wybuchem.',
    },
    {
      question: 'Która część normy PN-HD 60364 mówi, CO i JAK mierzyć przy sprawdzaniu instalacji?',
      options: ['Część 6 (sprawdzanie)', 'Część 4-41 (ochrona przeciwporażeniowa)', 'Żadna – to reguluje Prawo budowlane', 'Część 1 (zakres)'],
      correct: 0,
      explain: 'PN-HD 60364-6 = sprawdzanie instalacji (kolejność, wartości). 4-41 = ochrona przeciwporażeniowa (czasy, systemy).',
    },
  ],
  'rezystancja-izolacji': [
    {
      question: 'Napięcie pomiarowe izolacji dla instalacji 230/400 V:',
      options: ['500 V DC', '230 V AC', '250 V DC', '1000 V AC'],
      correct: 0,
      explain: 'Megaomomierz „stresuje" izolację napięciem 500 V DC – wyższym od roboczego.',
    },
    {
      question: 'Wynik 0,8 MΩ oznacza:',
      options: ['Instalację do naprawy – minimum to 1 MΩ', 'Wynik dobry – to dużo omów', 'Wynik graniczny – można oddać warunkowo', 'Wynik dobry, jeśli mierzono napięciem 250 V'],
      correct: 0,
      explain: 'Poniżej 1 MΩ nie ma „prawie dobrze" – instalacja nie może być oddana do użytku.',
    },
    {
      question: 'Co trzeba zrobić bezpośrednio PO pomiarze izolacji?',
      options: ['Rozładować obwód – nie odpinać przewodów, aż miernik pokaże 0 V', 'Natychmiast załączyć zasilanie', 'Podłączyć odbiorniki z powrotem', 'Nic – pomiar nie zostawia śladu'],
      correct: 0,
      explain: 'Obwód trzyma ładunek po 500 V DC jak kondensator – może razić. Najczęściej pomijany krok.',
    },
  ],
  'ciaglosc-pe': [
    {
      question: 'Minimalny prąd pomiarowy ciągłości PE:',
      options: ['200 mA', '30 mA', '16 A', '1 mA'],
      correct: 0,
      explain: '≥ 200 mA przy 4–24 V (PN-EN 61557-4) – taki prąd przebija cienkie tlenki i daje stabilny wynik w miliomach. Brzęczyk multimetru piszczy nawet przy kilku omach.',
    },
    {
      question: 'Spodziewany rząd wielkości wyniku ciągłości PE:',
      options: ['Miliomy do pojedynczych omów', 'Megaomy', 'Kiloomy', 'Zawsze dokładnie 0 Ω'],
      correct: 0,
      explain: 'PE ciągłość = małe R (mΩ..Ω). Megaomy to zakres pomiaru izolacji – odwrotność.',
    },
    {
      question: 'Co zrobić z przewodami pomiarowymi przed pomiarem?',
      options: ['Zewrzeć i wyzerować miernik (kompensacja)', 'Odjąć od wyniku 0,1 Ω na każdy przewód – tyle zwykle mają', 'Nic – przewody pomiarowe mają zerową rezystancję', 'Wykonać pomiar dwa razy i wziąć mniejszy wynik'],
      correct: 0,
      explain: 'Bez kompensacji miernik doliczy rezystancję własnych kabli i zdrowy obwód wygląda jak wadliwy.',
    },
  ],
  'petla-zwarcia': [
    {
      question: 'Wzór na prąd zwarciowy z impedancji pętli:',
      options: ['Ik = 230 / Zs', 'Ik = 230 × Zs', 'Ik = Zs / 230', 'Ik = 400 / Zs'],
      correct: 0,
      explain: 'Ik = U₀/Zs. Im mniejsza impedancja, tym większy prąd zwarciowy i pewniejsze wyłączenie.',
    },
    {
      question: 'Maksymalny czas wyłączenia dla obwodów gniazd w TN:',
      options: ['0,4 s', '5 s', '300 ms', '40 ms'],
      correct: 0,
      explain: 'Obwody odbiorcze do 32 A (z gniazdami do 63 A) = 0,4 s – także oświetlenie. 5 s = obwody rozdzielcze. 300/40 ms to limity RCD, nie pętli.',
    },
    {
      question: 'Który pomiar odbiorczy wykonuje się POD napięciem?',
      options: ['Impedancję pętli zwarcia', 'Rezystancję izolacji', 'Ciągłość PE', 'Wszystkie pomiary'],
      correct: 0,
      explain: 'Pętla to wyjątek – miernik potrzebuje działającej sieci. Izolacja i PE zawsze bez napięcia.',
    },
  ],
  'rcd': [
    {
      question: 'Maksymalny czas zadziałania RCD przy 1×IΔn (30 mA):',
      options: ['≤ 300 ms', '≤ 40 ms', '≤ 0,4 s', '≤ 5 s'],
      correct: 0,
      explain: '1×IΔn → ≤ 300 ms, 5×IΔn → ≤ 40 ms, 0,5×IΔn → nie może zadziałać.',
    },
    {
      question: 'Jaki typ RCD do pralki z falownikiem?',
      options: ['Typ A (lub wyższy)', 'Typ AC', 'Dowolny – byle 30 mA', 'Typ S – bo jest zwłoczny i nie wybija przy wirowaniu'],
      correct: 0,
      explain: 'Prąd upływu z elektroniki ma składowe, na które typ AC jest „ślepy". Dziś minimum to typ A, a przy falowniku jednofazowym najlepiej typ F.',
    },
    {
      question: 'Co sprawdza przycisk TEST na RCD?',
      options: ['Tylko sprawność mechanizmu wyzwalającego', 'Czas i prąd zadziałania', 'Rezystancję izolacji obwodu', 'Poprawność podłączenia PE'],
      correct: 0,
      explain: 'TEST nie mierzy niczego – do protokołu odbiorczego potrzebny pomiar miernikiem RCD.',
    },
  ],
  'uziemienie': [
    {
      question: 'Dopuszczalna rezystancja uziemienia odgromowego:',
      options: ['Poniżej 10 Ω', 'Poniżej 1666 Ω', 'Powyżej 1 MΩ', 'Poniżej 0,4 Ω'],
      correct: 0,
      explain: 'Odgrom: zalecane poniżej 10 Ω. 1666 Ω to granica dla układu TT z RCD 30 mA (RA × IΔn ≤ 50 V).',
    },
    {
      question: 'Jak nazywa się metoda pomiaru RE trzema elektrodami?',
      options: ['Metoda spadku potencjału (trójzaciskowa)', 'Metoda pętli zwarcia', 'Metoda megaomomierza 500 V', 'Metoda dwuprzewodowa omomierzem'],
      correct: 0,
      explain: 'Elektrody E-P-C, miernik liczy RE = U/I. Na kursach bywa nazywana „metodą Wernera".',
    },
    {
      question: 'Co zrobić z badanym uziomem przed pomiarem?',
      options: ['Odłączyć od instalacji (zacisk probierczy)', 'Podlać grunt wodą dla lepszego kontaktu', 'Nic – mierzy się w stanie normalnej pracy', 'Wyłączyć zasilanie budynku'],
      correct: 0,
      explain: 'Bez odłączenia mierzysz całą sieć uziemiającą. I pamiętaj: po pomiarze SKRĘĆ zacisk z powrotem!',
    },
  ],
  'protokol': [
    {
      question: 'Pierwszy krok przy odbiorze instalacji wg normy:',
      options: ['Oględziny', 'Pomiar izolacji', 'Sprawdzenie RCD', 'Impedancja pętli'],
      correct: 0,
      explain: 'Zalecana kolejność: oględziny → ciągłość PE → izolacja → pętla → RCD. Najpierw patrzysz, potem mierzysz.',
    },
    {
      question: 'Świadectwo wzorcowania miernika wygasło dzień przed pomiarem. Protokół jest:',
      options: ['Nieważny', 'Ważny – dzień to margines', 'Ważny po adnotacji', 'Ważny przez 30 dni'],
      correct: 0,
      explain: 'Świadectwa muszą być ważne W DNIU pomiaru. Nieważne wzorcowanie = wyniki bez wartości, pomiary do powtórki.',
    },
    {
      question: 'Kto podpisuje protokół pomiarowy?',
      options: ['Wykonujący pomiary – z zakresem kontrolno-pomiarowym', 'Właściciel obiektu – bo zleca pomiary', 'Dowolny elektryk z G1 – nawet bez pomiarów', 'Kierownik budowy – odbiera instalację'],
      correct: 0,
      explain: 'Podpisuje wykonujący pomiary z zakresem kontrolno-pomiarowym. Kontrolę okresową z art. 62 może przeprowadzić osoba z kwalifikacjami D albo z uprawnieniami budowlanymi.',
    },
  ],
}
