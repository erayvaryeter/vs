---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Utilisez le concepteur WinForms hors processus pour les projets .NET Framework référençant des assemblys 32 bits.
restartRequired: true
title: Améliorations apportées au Concepteur WinForms

---

Vous pouvez désormais utiliser le concepteur de processus obsolète Windows Forms (WinForms) pour les projets .NET Framework référençant des assemblys 32 bits.

Le concepteur WinForms détecte automatiquement les échecs de chargement d’assemblys 32 bits et fournit une option permettant d’utiliser le concepteur hors processus pour ce projet.

![Boîte de dialogue Sélection du concepteur Windows Forms pour les projets .NET Framework](../media/winforms-designer-selection.png "Boîte de dialogue Sélection du concepteur Windows Forms pour les projets .NET Framework")

Le concepteur WinForms hors processus génère un processus qui peut charger des assemblys 32 bits. Visual Studio communique avec ce processus pour afficher le concepteur.
En savoir plus sur cette fonctionnalité [ici](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Sélection du concepteur Windows Forms pour les projets .NET Framework](../media/winforms-designer-selection.mp4 "Sélection du concepteur Windows Forms pour les projets .NET Framework")

Par défaut, cette fonctionnalité est activée. Vous pouvez l’activer ou la désactiver en accédant à **Outils** > **Options** > **Environnement** > **Fonctionnalités d’évaluation** via l’option « Détecter les échecs de chargement d’assemblys 32 bits pour les projets .NET Framework Windows Forms ».

Partagez vos commentaires concernant cette fonctionnalité en contribuant à la discussion sur [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

