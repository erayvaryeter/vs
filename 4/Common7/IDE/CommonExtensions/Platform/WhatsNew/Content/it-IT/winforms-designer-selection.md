---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Usare la finestra di progettazione out-of-process winForms per i progetti .NET Framework che fanno riferimento ad assembly a 32 bit.
restartRequired: true
title: Miglioramenti di WinForms Designer

---

È ora possibile usare La finestra di progettazione out-of-process winForms per i progetti .NET Framework che fanno riferimento ad assembly a 32 bit.

La finestra di progettazione WinForms rileverà automaticamente gli errori di caricamento degli assembly a 32 bit e fornirà un'opzione per usare la finestra di progettazione out-of-process per il progetto.

![Finestra di dialogo Selezione di Progettazione Windows Form per i progetti .NET Framework](../media/winforms-designer-selection.png "Finestra di dialogo Selezione di Progettazione Windows Form per i progetti .NET Framework")

La finestra di progettazione out-of-process winForms genera un processo che può caricare assembly a 32 bit. Visual Studio comunicherà con tale processo per visualizzare la finestra di progettazione.
Scopri di più su questa funzionalità [qui](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Selezione di Progettazione Windows Form per i progetti .NET Framework](../media/winforms-designer-selection.mp4 "Selezione di Progettazione Windows Form per i progetti .NET Framework")

Per impostazione predefinita, questa funzionalità è attivata. Puoi abilitarla o disabilitarla passando all'opzione **Strumenti** > **Opzioni** > **Ambiente** > **Funzionalità di anteprima** tramite l'opzione "Rileva errori di caricamento degli assembly a 32 bit per i progetti .NET Framework di Windows Form".

Per condividere commenti e suggerimenti per questa funzionalità con Microsoft, partecipare alla discussione su [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

