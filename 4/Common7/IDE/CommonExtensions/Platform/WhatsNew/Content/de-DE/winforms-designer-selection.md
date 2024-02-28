---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Verwenden Sie den Out-of-Process-Designer für WinForms für .NET Framework-Projekte, die auf 32-Bit-Assemblys verweisen.
restartRequired: true
title: Verbesserungen am WinForms-Designer

---

Sie können jetzt den Out-of-Process-Designer für Windows Forms (WinForms) für .NET Framework-Projekte verwenden, die auf 32-Bit-Assemblys verweisen.

Der WinForms-Designer erkennt automatisch Ladefehler bei 32-Bit-Assemblys und bietet die Möglichkeit, den Out-of-Process-Designer für dieses Projekt zu verwenden.

![Dialogfeld „Auswahl“ für .NET Framework-Projekte im Windows Forms-Designer](../media/winforms-designer-selection.png "Dialogfeld „Auswahl“ für .NET Framework-Projekte im Windows Forms-Designer")

Der Out-of-Process-Designer für WinForms erstellt einen Prozess, der 32-Bit-Assemblys laden kann. Visual Studio kommuniziert mit diesem Prozess, um den Designer anzuzeigen.
[Hier](https://aka.ms/winforms/designer/WhatsNewDesignerSelection) erfahren Sie mehr über dieses Feature.

![Auswahl für .NET Framework-Projekte im Windows Forms-Designer](../media/winforms-designer-selection.mp4 "Auswahl für .NET Framework-Projekte im Windows Forms-Designer")

Diese Funktion ist standardmäßig aktiviert. Sie können es aktivieren oder deaktivieren, indem Sie über die Option „Ladefehler bei 32-Bit-Assemblys für .NET Framework-Projekte in Windows Forms erkennen“ zu **Extras** > **Optionen** > **Umgebung** > **Previewfunktionen** navigieren.

Wenn Sie Feedback zu diesem Feature haben, können Sie sich an der Diskussion in der [Entwicklercommunity](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210) beteiligen.

