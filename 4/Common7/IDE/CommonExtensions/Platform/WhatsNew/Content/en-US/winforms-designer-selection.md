---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Use WinForms out-of-process designer for .NET Framework projects referencing 32-bit assemblies.
restartRequired: true
title: WinForms Designer improvements

---

You can now use Windows Forms (WinForms) out-of-process designer for .NET Framework projects referencing 32-bit assemblies.

The WinForms designer will automatically detect 32-bit assembly load failures and will provide an option to use the out-of-process designer for that project.

![Windows Forms Designer Selection dialog for .NET Framework projects](../media/winforms-designer-selection.png "Windows Forms Designer Selection dialog for .NET Framework projects")

The WinForms out-of-process designer will spawn a process which can load 32-bit assemblies. Visual Studio will communicate with that process to display the designer.
Learn more about this feature [here](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Windows Forms Designer Selection for .NET Framework projects](../media/winforms-designer-selection.mp4 "Windows Forms Designer Selection for .NET Framework projects")

This feature is turned on by default. You can enable or disable it by going to **Tools** > **Options** > **Environment** > **Preview Features** via "Detect 32-bit assembly load failures for Windows Forms .NET Framework projects" option.

If you have feedback to share with us about this feature, please contribute to the discussion on [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

