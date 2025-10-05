# Justee

Aplikacja do nauki czytania fragmentów słów dla telewizorów LG webOS.

## O aplikacji

Justee to edukacyjna aplikacja dla dzieci uczących się czytać po polsku.
Aplikacja wyświetla fragmenty wyrazów (sylaby i grupy spółgłosek) na ekranie
telewizora LG, pozwalając dzieciom ćwiczyć rozpoznawanie i czytanie polskich
sekwencji liter.

### Funkcje

- **Fragmenty 2, 3 i 4 literowe**: Możliwość wyboru długości wyświetlanych
  fragmentów słów
- **Duże i małe litery**: Przełączanie między wielkimi i małymi literami za
  pomocą centralnego przycisku pilota
- **Losowa kolejność z priorytetem**: Częściej występujące fragmenty pojawiają
  się wcześniej
- **Dane oparte na słowniku**: Wszystkie fragmenty pochodzą z prawdziwych
  polskich słów (słownik SJP.PL)
- **Sterowanie pilotem**: Prosta nawigacja przystosowana do pilota telewizora

## Sterowanie pilotem

- **Strzałka w górę/w dół**: Zmiana długości fragmentów (2, 3 lub 4 litery)
- **Strzałka w lewo/w prawo**: Poprzedni/następny fragment
- **Centralny przycisk (OK)**: Przełączanie między wielkimi i małymi literami

## Instalacja na telewizorze LG

### Wymagania

1.  Telewizor LG z systemem webOS
2.  Tryb deweloperski włączony na TV (aplikacja "Developer Mode" z LG Content
    Store)

### Kroki instalacji

1.  **Włącz Developer Mode na TV**

    - Zainstaluj aplikację "Developer Mode" z LG Content Store
    - Uruchom aplikację i zanotuj:
      - Adres IP telewizora
      - Hasło dostępu (passphrase)

2.  **Zainstaluj narzędzia webOS**

    - Pobierz i zainstaluj Node.js ze strony [nodejs.org]
    - Zainstaluj webOS CLI: `npm install -g @webos-tools/cli`

3.  **Skonfiguruj połączenie z TV**

    ``` bash
    # Dodaj urządzenie (zastąp IP_TELEWIZORA rzeczywistym adresem)
    ares-setup-device
    # Wybierz "Add a new device" i podaj nazwę, adres IP, port 9922

    # Autoryzuj połączenie (wpisz hasło z Developer Mode)
    ares-novacom --device NAZWA_URZADZENIA --getkey
    ```

4.  **Pobierz i zainstaluj aplikację**

    - Pobierz plik `.ipk` z [najnowszego wydania]
    - Zainstaluj aplikację:
      ``` bash
      ares-install --device NAZWA_URZADZENIA com.justee.app_1.0.0_all.ipk
      ```
    - Uruchom aplikację:
      ``` bash
      ares-launch --device NAZWA_URZADZENIA com.justee.app
      ```

Aplikacja pojawi się na liście aplikacji w TV. Możesz ją uruchamiać bezpośrednio
z menu telewizora.

**Uwaga:** Szczegółowe instrukcje dla programistów znajdują się w pliku
[AGENTS.md].

## Jak działa generator danych?

Aplikacja wykorzystuje słownik języka polskiego (SJP.PL) do generowania
naturalnych fragmentów wyrazów:

1.  **Tokenizacja grafemów**: Rozpoznaje wieloznakowe grafemy polskie (`sz`,
    `cz`, `rz`, `ch`, `dzi`, `ci`, `si`, `ni`, `zi`)
2.  **Ekstrakcja fragmentów**: Wydobywa sekwencje grafemów o określonej liczbie
    znaków
3.  **Filtrowanie**: Zachowuje tylko fragmenty zawierające wyłącznie polskie
    litery
4.  **Ważone losowanie**: Priorytetyzuje częściej występujące fragmenty

## Licencja

MIT

## Dla programistów

Informacje techniczne, instrukcje budowania i deployment znajdują się w
[AGENTS.md].

  [nodejs.org]: https://nodejs.org/
  [najnowszego wydania]: ../../releases
  [AGENTS.md]: AGENTS.md
