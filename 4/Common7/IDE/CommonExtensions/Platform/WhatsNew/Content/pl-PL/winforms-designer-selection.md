---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Użyj projektanta formularzy systemu Windows poza procesem na potrzeby platformy .NET Framework odwołującego się do zestawów 32-bitowych.
restartRequired: true
title: Ulepszenia projektanta formularzy systemu Windows

---

Teraz możesz używać projektanta formularzy systemu Windows (WinForms) na potrzeby platformy .NET Framework odwołującego się do zestawów 32-bitowych.

Projektant formularzy systemu Windows automatycznie wykryje błędy ładowania zestawów 32-bitowych i udostępni opcję użycia projektanta poza procesem dla tego projektu.

![Okno dialogowe Wybór projektanta formularzy systemu Windows na potrzeby projektów .NET Framework](../media/winforms-designer-selection.png "Okno dialogowe Wybór projektanta formularzy systemu Windows na potrzeby projektów .NET Framework")

Projektant formularzy systemu Windows poza procesem zduplikuje proces, który może ładować zestawy 32-bitowe. Program Visual Studio komunikuje się z tym procesem, aby wyświetlić projektanta.
Dowiedz się więcej o tej funkcji [tutaj](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Wybór projektanta formularzy systemu Windows na potrzeby projektów .NET Framework](../media/winforms-designer-selection.mp4 "Wybór projektanta formularzy systemu Windows na potrzeby projektów .NET Framework")

Domyślnie ta opcja jest włączona. Możesz go włączyć lub wyłączyć, przechodząc do obszaru **Narzędzia** > **Opcje** > **Środowisko** > **Funkcje w wersji zapoznawczej** za pomocą opcji „Wykryj błędy ładowania zestawów 32-bitowych dla projektów Windows Forms .NET Framework”.

Jeśli masz opinię na temat tej funkcji, którą chcesz nam udostępnić, dołącz do dyskusji na forum [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

