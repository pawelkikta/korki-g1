# Audyt: user flow, dydaktyka i czytelność

Wersja aplikacji: 0.12.2 · branch `audyt-ux-dydaktyka` · listopad 2026

Perspektywa: uczę się do egzaminu SEP G1 i chcę z apki wyciągnąć jak najwięcej wiedzy w jak najkrótszym czasie.

Jak sprawdzałem: przeczytałem kod wszystkich paneli i przeszedłem apkę w przeglądarce
(desktop 1440×900 i telefon 375×812). Fakty z kodu i przeglądarki są oznaczone **[fakt]**,
moje wnioski i propozycje **[wniosek]**.

---

## Najważniejsze wnioski

1. **Start w obecnej formie nie jest potrzebny.** Powtarza menu, które jest obok.
   Potrzebny jest za to ekran „Co dalej?”: jeden przycisk „Kontynuuj” i gotowość do egzaminu per obszar.
2. **Treść i mechanizmy nauki są dobre**, ale ścieżka jest rozjechana. Teoria jest w jednym miejscu,
   pytania w innym, a postęp w czterech osobnych licznikach. Uczeń sam musi łączyć kropki.
3. **Wizualnie wszystko ma tę samą wagę.** Ramka w ramce, ścięte rogi na każdym elemencie,
   dużo wersalików i drobnego tekstu. Oko nie wie, gdzie patrzeć, więc ważne rzeczy giną.
4. **Kierunek wizualny: „papier techniczny”** (wg referencji z suwakiem logarytmicznym):
   jasne tło jak papier milimetrowy, kartki z miękkim cieniem, czytelna typografia, zakładki jak w segregatorze.

---

## A. User flow – błędy

| # | Problem | Dowód |
|---|---------|-------|
| A1 | Zmiana sekcji lub rozdziału nie przewija strony na górę. Po „Następny rozdział” uczeń ląduje w środku nowego rozdziału (często przy quizie). | **[fakt]** Po kliknięciu na dole rozdziału 1 strona została na `scrollY = 2600`, a treść to już rozdział 2. `TrainingPanel.jsx`, `App.jsx` |
| A2 | Na telefonie pierwszy ekran to sam nagłówek i siatka 10 przycisków. Treść zaczyna się poniżej ekranu. Po kliknięciu sekcji treść też pojawia się pod siatką. | **[fakt]** 375×812: pierwszy nagłówek treści na `y = 1021`. |
| A3 | Sekcje nie mają adresów. Odświeżenie zawsze wraca na Start. Przycisk „Wstecz” przeglądarki wychodzi z apki. Nie da się zapisać rozdziału w zakładkach. | **[fakt]** `App.jsx`: `useState('start')`, brak routingu. |
| A4 | Numeracja się nie zgadza. Menu: 01–10. Start: 1–7 i dwa bez numeru. Nagłówki paneli: „Tryb 02 – szkolenie” i „Tryb 02 – fundament” (dwa razy 02), Fiszki to „Tryb 03”, a w menu 06. | **[fakt]** `App.jsx`, `StartPanel.jsx`, nagłówki paneli. |
| A5 | Nagłówek apki zajmuje ok. 1/3 ekranu na każdej podstronie i za każdym razem opisuje zakres w 3 kartach. | **[fakt]** desktop 1440×900: treść zaczyna się na ok. 340 px. |
| A6 | Pod każdą sekcją jest 9 linijek zastrzeżeń prawnych. | **[fakt]** `AppFooter` w `App.jsx`. |

## B. Czy ekran Start jest potrzebny?

**[fakt]** Start pokazuje 9 kafelków. To ta sama lista co menu obok (10 pozycji), tylko z dłuższym opisem.
Postęp jest pod listą, poniżej linii przewijania. Przy pierwszym wejściu postęp pokazuje czerwone „0/9”.
„Strategia na egzamin” (najważniejsza rada) jest na samym dole.

**[wniosek]** Start jako katalog trybów usuwamy. Na jego miejsce wchodzi ekran **„Plan”**
(otwiera się przy wejściu i po kliknięciu logo):

1. **Jeden duży przycisk „Kontynuuj”** z konkretnym następnym krokiem, np.
   „Rozdział 3 · Ciągłość PE” albo „Fiszki: 6 pytań do powtórki”.
2. **Gotowość per obszar egzaminu**: BHP, pierwsza pomoc, dozór i organizacja pracy, eksploatacja, pomiary.
   Jeden pasek na obszar, liczony z fiszek, „Sprawdź się” i egzaminu próbnego.
3. **Ścieżka jako lista kroków ze statusem** (zrobione / w toku / nie zaczęte), krótko, bez długich opisów.

Przy pierwszym wejściu zamiast zer: 3 zdania o tym, jak wygląda egzamin, i przycisk „Zacznij od: Skąd prąd”.

## C. Nawigacja

**[wniosek]** Menu grupujemy według etapu nauki. Numery znikają.

- **Zrozum**: Skąd prąd · Pomiary (7 rozdziałów) · Urządzenia · Organizacja pracy
- **Utrwal**: Fiszki · Test ABCD · Ściąga
- **Sprawdź**: Egzamin próbny
- **Słowniczek**: wyszukiwarka dostępna z każdego miejsca (pole w górnym pasku), a nie osobny „tryb nauki”.

Desktop: wąski pasek boczny z grupami, bez opisów pod nazwami.
Telefon: dolny pasek z 4 ikonami (Plan · Zrozum · Utrwal · Egzamin) i cienki górny pasek z nazwą sekcji.
Każda zmiana sekcji przewija na górę i zmienia adres (np. `#/pomiary/3`), więc działa „Wstecz” i odświeżenie.

## D. Dydaktyka

### Co działa dobrze – zostawiamy

- Fiszki: odpowiedź na głos, potem odsłonięcie, potem lista kluczowych elementów do odhaczenia.
  To aktywne przypominanie i uczciwa samoocena, a nie bierne czytanie.
- „Komisja dopytuje” – realny format egzaminu ustnego.
- Egzamin próbny: pytanie z każdego obszaru, częściej te „do powtórki”, niezaliczone wracają do fiszek.
- „Sprawdź się” po rozdziale, tryb drill w ściądze, symulacje przyrządów.

### Problemy

| # | Problem | Propozycja |
|---|---------|------------|
| D1 | **Teoria i pytania nie są połączone.** Rozdziały (7 o pomiarach) i rundy fiszek (Podstawy / Pomiary + dozór / Podchwytliwe / Pomiary – pełny zakres) mają inny podział. Instrukcja „przeczytaj przed rundami 2 i 4” każe uczniowi samemu to łączyć. **[fakt]** | Po „Sprawdź się” przycisk „Fiszki z tego tematu (N)”. Wymaga przypisania pytań do rozdziałów w danych. |
| D2 | **„Podchwytliwe” to runda i kategoria, a nie temat egzaminu.** 7 pytań z tą kategorią nie należy do żadnego obszaru w egzaminie próbnym (`AREAS` w `ExamPanel.jsx`). Losują się tylko jako dopełnienie. **[fakt]** | Każde pytanie ma temat; „podchwytliwe” to tylko znacznik (pole `trap` już istnieje). |
| D3 | **Nierówne pokrycie.** Pomiary: 23 z 55 pytań. Pierwsza pomoc: 2 z 55 i brak teorii. Eksploatacja nie ma własnego rozdziału. Nagłówek apki tłumaczy to w 3 kartach – to objaw problemu. **[fakt]** | Krótki moduł „Pierwsza pomoc” i więcej pytań z eksploatacji. Treść do sprawdzenia z przepisami, tak jak reszta. |
| D4 | **Cztery osobne liczniki postępu**: zaliczone rozdziały, fiszki (opanowane / do powtórki), rekord testu, historia egzaminu. Żaden nie odpowiada na pytanie „czy jestem gotowy?”. **[fakt]** | Gotowość per obszar egzaminu na ekranie Plan (pkt B). |
| D5 | **Test ABCD zapomina błędy.** Po „Nowa partia” błędne odpowiedzi znikają i nie trafiają do „do powtórki”. Losowe 10 z 50 nie gwarantuje, że zobaczysz wszystkie 50. **[fakt]** `QuizPanel.jsx` zapisuje tylko rekord. | Zapis wyniku per pytanie. Najpierw losuj pytania niewidziane i błędne. |
| D6 | **Fiszki: dwa przyciski „do przodu”.** „Dalej” pomija pytanie bez oceny, „Zatwierdź” ocenia. Po odsłonięciu przycisk od razu jest czerwony: „do powtórki – brakuje 4”, zanim uczeń cokolwiek zaznaczy. **[fakt]** | **[wniosek]** Jeden główny przycisk. Lista kluczowych elementów nad wzorcową odpowiedzią (najpierw oceniasz siebie, potem czytasz wzór). Neutralny kolor, dopóki uczeń nie skończy zaznaczać. |
| D7 | **Rozdziały są długie**, a symulacja i quiz są na samym dole. Rozdział 1 to ok. 3500 px strony bez spisu treści. **[fakt]** | Rozdział w 3 krokach: Teoria → Symulacja → Sprawdź się (zakładki). Liczby „do zapamiętania” na górze rozdziału. |
| D8 | **Ściąga nie łączy się z resztą.** Liczba (np. 200 mA) nie prowadzi do rozdziału ani do pytania. **[fakt]** | Przy każdej liczbie link „skąd to” do rozdziału. |

## E. Czytelność i UI

| # | Problem | Dowód | Propozycja |
|---|---------|-------|------------|
| E1 | **Ścięte rogi wszędzie.** Ramka w ramce: `Chamfer` → `SectionFrame` → `NoteBox` → `Button`. Każdy element ma tę samą obwódkę, więc nic się nie wyróżnia. | **[fakt]** 35 użyć klas `cham*`, 31 użyć `edge`. | Usunąć całkowicie. Karty to „kartki” z cieniem, bez obwódki. |
| E2 | **Dużo wersalików z rozstrzeleniem** (nagłówki w rozdziałach, przyciski, etykiety, filtry). Wersaliki czyta się wolniej. Trzeba było też dopisać `keepCase()`, żeby „mA” nie zmieniało się w „MA”. | **[fakt]** 80 użyć `uppercase`. | Wersaliki tylko w krótkich etykietach (1–3 słowa). Nagłówki i przyciski normalnie. |
| E3 | **Drobny tekst.** Opisy w menu, podpisy kafli, wyjaśnienia w quizie mają 9–12 px. Przy godzinie nauki to męczy oczy. | **[fakt]** 129 miejsc z `text-[9–11px]` lub `text-xs`. | Etykiety min. 13 px, treść do czytania 17 px, interlinia ok. 1,6. |
| E4 | **Jeden kolor akcentu do wszystkiego.** Zieleń oznacza: aktywny element, pogrubienie w tekście, etykietę, wartość, link i przycisk. | **[fakt]** `--c-14543e` / `--c-1a5c46` w prawie każdym komponencie. | Role kolorów: atrament = tekst, czerwony = „zapamiętaj / błąd / pułapka”, niebieski = akcja, zielony = zaliczone. |
| E5 | **Zakładki, filtry i przełączniki wyglądają tak samo.** Zgłoszone w Słowniczku („Pojęcia i urządzenia” / „Skróty”). Ten sam problem jest w Fiszkach: rundy, „Do powtórki” i „Losowo” stoją w jednym rzędzie w tym samym stylu. | **[fakt]** `GlossaryPanel.jsx`, `FlashcardsPanel.jsx`. | Trzy różne elementy: **zakładki** (jak w segregatorze, wystają nad kartką – zmieniają widok), **filtry** (małe „pigułki” – zawężają listę), **przełącznik** (włącz/wyłącz, np. „Losowo”). |

## F. Kierunek wizualny: „papier techniczny”

Na podstawie referencji (*The Slide Rule*):

- **Tło**: papier milimetrowy – jasna, delikatna siatka.
- **Karty**: kremowa kartka, miękki cień, proste rogi, bez obwódek.
- **Tekst do czytania**: szeryfowy, 17 px, interlinia ok. 1,6.
- **Nagłówki**: slab serif (krój z szeryfami „klockowymi”, jak w starych instrukcjach technicznych).
- **Etykiety**: krótkie, kapitaliki.
- **Liczby, wzory, jednostki**: mono.
- **Kolory**: czerwony (wartości do zapamiętania, pułapki), niebieski (akcje), zielony (zaliczone). Reszta w odcieniach atramentu.
- **Zakładki segregatora** do przełączania widoków.
- Opcjonalnie: odręczne adnotacje w symulacjach.

Fonty dołączamy z paczek `@fontsource` (tak jak teraz), żeby apka działała offline.

Technicznie zmiana jest wykonalna etapami:

- Wszystkie kolory idą przez tokeny w `src/theme.css`, więc paletę zmieniamy w jednym pliku.
- Ścięte rogi to klasy `.cham*` i `.edge` w `src/index.css` oraz komponent `Chamfer` w `ui.jsx`.
  Najpierw wyłączamy je centralnie, potem sprzątamy klasy w komponentach.

**Do decyzji:** referencja ma tylko jasny motyw. Teraz domyślny jest ciemny.

## G. Plan wdrożenia

**Etap 1 – flow** (niezależny od stylu)

- przewijanie na górę przy każdej zmianie sekcji i rozdziału,
- adresy sekcji (`#/…`), działające „Wstecz” i odświeżenie,
- ekran „Plan” zamiast Start,
- menu w grupach Zrozum / Utrwal / Sprawdź, bez numerów,
- mały nagłówek apki, zastrzeżenia zwinięte w stopce,
- telefon: dolny pasek nawigacji.

**Etap 2 – styl „papier techniczny”**

- tokeny kolorów i fonty,
- usunięcie ściętych rogów i ramek w ramkach,
- komponenty: zakładki, filtry, przełącznik,
- typografia: mniej wersalików, większy tekst.

**Etap 3 – dydaktyka** (zmiany w danych)

- przypisanie pytań do rozdziałów i „Fiszki z tego tematu”,
- „Podchwytliwe” jako znacznik zamiast tematu,
- Test ABCD zapisuje błędy i zasila „do powtórki”,
- gotowość per obszar egzaminu,
- fiszki: lista elementów nad wzorcową odpowiedzią, jeden główny przycisk,
- moduł „Pierwsza pomoc” (treść do sprawdzenia).

Każdy etap sprawdzam w przeglądarce (desktop i telefon) i przez `npm run build`.

---

## H. Co zrobione na tym branchu (etap 1 + 2)

Decyzje: tylko jasny motyw; etap 1 i 2 razem; dane i treść bez zmian.
Kierunek wizualny z dwóch referencji („suwak logarytmiczny” i „ploter”): stół z papierem milimetrowym,
kartki z cieniem, jeden kolor atramentu.

**Flow**

- Ekran **Plan** zamiast Start: przycisk „Kontynuuj” z następnym krokiem, ścieżka ze statusami,
  gotowość per obszar egzaminu, przypomnienie o fiszkach do powtórki.
- Menu w grupach **Zrozum / Utrwal / Sprawdź / Pod ręką**, bez numerów, z postępem przy pozycjach.
- Adresy sekcji (`#/pomiary/3`, `#/urzadzenia/rcd`): działa „Wstecz”, odświeżenie i zakładki przeglądarki.
- Każda zmiana ekranu, rozdziału i pytania na egzaminie przewija na górę.
- Telefon: dolny pasek (Plan · Zrozum · Utrwal · Egzamin · Słowniczek), treść od razu na pierwszym ekranie.
- Mały nagłówek zamiast dużego bloku; pełne zastrzeżenie zwinięte w stopce.

**Wygląd**

- Paleta „papier techniczny”, jeden jasny motyw (`src/theme.css`). Role kolorów: niebieski atrament = akcja,
  zielony = dobrze / zaliczone, czerwony = błąd, pułapka, liczba do zapamiętania.
- Usunięte ścięte rogi i ramki w ramkach. Kartki z cieniem, proste rogi.
- Fonty: Source Serif 4 (tekst do czytania, 17 px), Roboto Slab (nagłówki), Manrope (interfejs), JetBrains Mono (liczby).
- Trzy różne elementy: **zakładki segregatora** (rozdziały, aparaty, rundy fiszek, słowniczek),
  **filtry-pigułki** (grupy w słowniczku), **przełączniki** (losowo, tylko do powtórki, tryb drill).
- Kluczowe frazy w rozdziałach wyglądają jak zakreślone markerem. Liczby do zapamiętania – czerwone.
- Wersaliki tylko w krótkich etykietach.

**Drobne zmiany zachowania**

- Fiszki: „Dalej” nazywa się teraz „Pomiń”; przycisk zatwierdzenia nie jest czerwony, zanim zaznaczysz elementy.
  Zmiana rundy nie wyłącza filtra „Tylko do powtórki”.
- Urządzenia: obejrzane aparaty zapisują się w przeglądarce (`devicesSeen`) – liczy je ekran Plan.

**Zostaje na później**

- Symulacje: wewnętrzne etykiety nadal są drobnym mono z wersalikami. Można je przerobić na wygląd przyrządów
  (panel, wyświetlacz LCD), jak w referencji z ploterem.
- Stara paleta `--c-xxxxxx` w symulacjach – do zamiany na nazwy semantyczne.
- Nowy zrzut ekranu do README (`docs/screenshot.png` pokazuje stary wygląd).

## I. Etap 3 – dydaktyka (zrobione)

- **Tematy łączą teorię z pytaniami.** Każda fiszka i każde pytanie testu ma pole `topic` (`src/data/topics.js`).
  Pod każdym „Sprawdź się” jest „Utrwal ten temat”: fiszki i test ABCD z tego tematu (`#/fiszki/<temat>`, `#/test/<temat>`).
  Przy fiszce i przy błędnej odpowiedzi w teście jest link „Doczytaj” do rozdziału.
  Klasy ochronności, IP i układy sieci nie mają rozdziału – „Doczytaj” prowadzi do słowniczka.
- **„Podchwytliwe” to znacznik, nie temat.** 7 pytań dostało obszar egzaminu (BHP, Eksploatacja, Pomiary, Dozór).
  Obszary w Planie sumują się teraz do 55 pytań, a egzamin próbny losuje je jak wszystkie inne. Runda 3 „Podchwytliwe” została.
- **Test ABCD pamięta wyniki** (`quizStats` w przeglądarce). Odpowiedź zapisuje się od razu.
  Losowanie najpierw podaje pytania niewidziane i ostatnio błędne. Widać „Widziane x/50” i „Do poprawki”,
  a „Powtórz pytania do poprawki” zbiera błędy z całej historii. Plan pokazuje je razem z fiszkami do powtórki.
- **Najpierw samoocena, potem wzorzec.** W fiszkach i w egzaminie próbnym lista „Co padło w twojej odpowiedzi?” jest nad wzorcową odpowiedzią.
- **Moduł „Pierwsza pomoc”** (`#/pierwsza-pomoc`, `src/data/firstAid.js`): skutki porażenia, uwolnienie spod napięcia,
  ocena i RKO z AED, „przytomny i tak 112”, gaszenie urządzeń pod napięciem. Ćwiczenie „ułóż kolejność działań” i 3 pytania „Sprawdź się”.
  Treść pochodzi głównie z istniejących fiszek, dopytań i testu. Nowe są tylko podstawowe kroki oceny wg wytycznych resuscytacji
  (zawołaj i potrząśnij za ramiona, telefon na głośniku) oraz 3 nowe pytania „Sprawdź się”. **Do sprawdzenia przez autora.**
