---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Use el diseñador fuera de proceso de WinForms para proyectos de .NET Framework que hacen referencia a ensamblados de 32 bits.
restartRequired: true
title: Mejoras en el Diseñador de WinForms

---

Ahora puede usar el diseñador fuera de proceso de Windows Forms (WinForms) para proyectos de .NET Framework que hacen referencia a ensamblados de 32 bits.

El diseñador de WinForms detectará automáticamente errores de carga de ensamblados de 32 bits y proporcionará una opción para usar el diseñador fuera de proceso para ese proyecto.

![Cuadro de diálogo Selección del Diseñador de Windows Forms para proyectos de .NET Framework](../media/winforms-designer-selection.png "Cuadro de diálogo Selección del Diseñador de Windows Forms para proyectos de .NET Framework")

El diseñador fuera de proceso de WinForms generará un proceso que puede cargar ensamblados de 32 bits. Visual Studio se comunicará con ese proceso para mostrar el diseñador.
Obtenga más información sobre esta característica [aquí](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Selección del Diseñador de Windows Forms para proyectos de .NET Framework](../media/winforms-designer-selection.mp4 "Selección del Diseñador de Windows Forms para proyectos de .NET Framework")

Esta función está activada de forma predeterminada. Para habilitarlo o deshabilitarlo, vaya a **Herramientas**** > Opciones** > **Entorno** > **Característica en vista previa (GB)** a través de la opción "Detectar errores de carga de ensamblados de 32 bits para proyectos de .NET Framework de Windows Forms".

Si tiene comentarios por compartir con nosotros sobre esta característica, contribuya al debate en [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

