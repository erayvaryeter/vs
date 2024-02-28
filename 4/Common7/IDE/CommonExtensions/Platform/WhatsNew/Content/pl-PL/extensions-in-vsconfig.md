---
title: Plik VSConfig obsługuje teraz rozszerzenia
featureId: Extensions-in-vsconfig
description: Instalator programu Visual Studio załaduje rozszerzenia określone w pliku VSConfig.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Począwszy od programu Visual Studio 2022 w wersji 17.9, możesz teraz uwzględniać rozszerzenia [witryny Visual Studio Marketplace](https://marketplace.visualstudio.com/), lokalne, sieciowe, niestandardowego adresu URL lub [galerii prywatnej](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) w swoim [pliku vsconfig](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions), a instalator programu Visual Studio załaduje je i udostępni do użycia. Ta funkcja dotyczy jednego z naszych [żądań funkcji społeczności Developer Community z największą liczbą oddanych głosów: „Plik vsconfig powinien automatycznie monitować o zainstalowanie rozszerzeń”](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Instalacja wszystkich rozszerzeń zainstalowanych przez instalatora programu VS obejmuje całą maszynę, co oznacza, że są dostępne dla wszystkich użytkowników. Ponieważ te rozszerzenia są instalowane w pełnym zakresie maszyny, każda osoba, która je instaluje, musi mieć uprawnienia administratora bezpośrednio lub musi mieć nadaną kontrolę za pośrednictwem [zasad AllowStandardUserControl](https://aka.ms/vs/setup/policies). Pamiętaj, że większość rozszerzeń instalowanych przez istniejącego Menedżera rozszerzeń można instalować dla konkretnego użytkownika (instalacja nie obejmuje całej maszyny), więc użytkownik, który je instaluje, nie musi mieć uprawnień administratora.

Istnieją trzy główne sposoby importowania pliku *.vsconfig do programu Visual Studio:

### 1. Używanie interfejsu użytkownika instalatora programu VS do dodawania rozszerzeń w zakresie instalacji

Możesz uruchomić instalatora programu VS i zaimportować [plik konfiguracji instalacji (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) do istniejącej instalacji wymienionej na karcie Zainstalowane lub użyć go do wstępnego skonfigurowania nowej instalacji za pomocą karty Dostępne. W obu przypadkach należy wybrać pozycję Więcej/Importowanie konfiguracji z karty produktu instalatora, aby zaimportować rozszerzenia do żądanej instalacji.   

![Obraz instalatora programu Visual Studio przedstawiający pozycję Więcej, a następnie pozycję Importowanie konfiguracji](../media/installer-import-config-into-available-tab.png)

### 2. Programowe dodawanie rozszerzeń do instalacji programu Visual Studio przy użyciu parametru --config

Aby przeprowadzić **nową instalację** programu Visual Studio i zainicjować go za pomocą pliku konfiguracji zawierającego rozszerzenia, uruchom następujące polecenie przy użyciu programu uruchamiającego:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Aby **zmodyfikować** istniejącą instalację i dodać rozszerzenia przez przekazanie ich w pliku *.vsconfig zawierającym rozszerzenia, możesz użyć polecenia modyfikującego, które używa instalatora programu VS istniejącego już na maszynie:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Kliknij tutaj, aby uzyskać [więcej informacji na temat parametrów wiersza polecenia instalatora programu VS](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. Otworzenie rozwiązania lub repozytorium zawierającego plik vsconfig

Gdy użytkownik otworzy rozwiązanie lub repozytorium, program Visual Studio przeanalizuje dołączony plik *.vsconfig i automatycznie wykryje, czy jakiekolwiek określone składniki, a *teraz rozszerzenia platformy handlowej*, są obecne lub ich brakuje. Jeśli ich brakuje, użytkownik zostanie poproszony o zainstalowanie ich. Ze względu na wydajność rozszerzenia hostowane lokalnie lub w sieci nie są jeszcze częścią radaru wykrywania brakujących elementów. W dokumentacji online opisano tę możliwość [automatycznego wykrywania i instalowania brakujących składników](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components). 

### Zastrzeżenia

Od tej pory możliwość dołączania rozszerzeń do pliku *.vsconfig i instalowania ich tylko dla programu VS działa tylko w przypadku programu Visual Studio 2022 i nowszych wersji, przy założeniu, że masz instalatora programu Visual Studio w wersji 17.9 lub nowszej. Ponadto instalator programu Visual Studio nie obsługuje jeszcze możliwości _eksportowania_ rozszerzeń do pliku konfiguracji. Aktualizacje rozszerzeń będą wykonywane przy użyciu istniejącej [metody aktualizacji rozszerzeń opisanej tutaj](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Niektóre własne rozszerzenia, takie jak funkcja Copilot lub Liveshare, są bezpośrednio zawarte w instalatorze programu Visual Studio i zachowują się jak zwykłe składniki. 

Wypróbuj tę funkcję i [przekaż nam swoją opinię](https://developercommunity.visualstudio.com)!

