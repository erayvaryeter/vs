---
title: VSConfig unterstützt jetzt Erweiterungen
featureId: Extensions-in-vsconfig
description: Das Visual Studio-Installationsprogramm wird Erweiterungen laden, die in der VSConfig-Datei angegeben sind.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Ab Visual Studio 2022, Version 17.9, können Sie jetzt [Visual Studio Marketplace](https://marketplace.visualstudio.com/), lokale, Netzwerk- und kundenspezifische URLs oder [private Katalogerweiterungen](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) in Ihre [vsconfig-Datei](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions)einschließen, und das Visual Studio-Installationsprogramm wird sie laden und zur Verfügung stellen. Dieses Feature erfüllt eine unserer am häufigsten gewählten [Entwicklercommunity-Featureanforderungen: „Eine .vscongig-Datei sollte automatisch zur Installation von Erweiterungen auffordern“](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Alle vom VS-Installationsprogramm installierten Erweiterungen werden „Computer-weit“ installiert, was bedeutet, dass sie für alle Benutzer verfügbar sind. Da diese Erweiterungen auf einem computerweiten Computer installiert werden, muss jeder, der sie installiert, über Administratorrechte verfügen oder über die [AllowStandardUserControl-Richtlinie](https://aka.ms/vs/setup/policies) die Kontrolle erhalten haben. Beachten Sie, dass die meisten Erweiterungen, die vom bestehenden Erweiterungsmanager installiert wurden, pro Benutzer und nicht auf dem gesamten Computer installiert wurden, sodass der Benutzer, der sie installierte, keine Administratorberechtigungen erforderte.

Es gibt drei Hauptmethoden zum Importieren einer *.vsconfig-Datei in Visual Studio:

### 1. Verwenden der Benutzeroberfläche des VS-Installationsprogramms zum Hinzufügen von Erweiterungen zu einer Installation

Sie können das VS-Installationsprogramm starten und eine [Installationskonfigurationsdatei (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) in eine vorhandene Installation importieren, die auf der Registerkarte „Installiert“ aufgeführt ist, oder Sie können sie verwenden, um eine neue Installation über die Registerkarte „Verfügbar“ vorab zu konfigurieren. In beiden Fällen wählen Sie „Mehr/Importieren der Konfiguration“ der Produktkarte des Installationsprogramms aus, um die Erweiterungen in die gewünschte Installation zu importieren.   

![Abbildung des Visual Studio-Installationsprogramm zeigt „Mehr“ und dann „Konfiguration importieren“](../media/installer-import-config-into-available-tab.png)

### 2. Programmgesteuertes Hinzufügen von Erweiterungen zu einer Visual Studio-Installation mithilfe des Parameters „--config“

Um eine **Neuinstallation** von Visual Studio auszuführen und mit einer Konfigurationsdatei zu initialisieren, die Erweiterungen enthält, führen Sie den folgenden Befehl mit dem Bootstrapper aus:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Um eine vorhandene Installation zu **ändern** und Erweiterungen durch Übergeben einer *.vsconfig-Datei hinzuzufügen, die Erweiterungen enthält, können Sie den Befehl „ändern“ verwenden, der das VS-Installationsprogramm verwendet, das sich bereits auf dem Computer befindet:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Klicken Sie hier, um [weitere Informationen zu Befehlszeilenparametern des VS-Installationsprogramms](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio) zu finden.

### 3. Öffnen einer Lösung oder eines Repositorys, das eine vsconfig-Datei enthält

Wenn ein Benutzer eine Lösung oder ein Repository öffnet, parst Visual Studio eine enthaltene *.vsconfig-Datei und erkennt automatisch, ob bestimmte Komponenten sowie *jetzt auch Marketplace-Erweiterungen* vorhanden sind oder fehlen. Fehlen sie, werden Benutzer*innen aufgefordert, sie zu installieren. Aus Leistungsgründen werden lokale oder vom Netzwerk gehostete Erweiterungen noch nicht als fehlend ermittelt. In den Onlinedokumenten wird diese Fähigkeit, [fehlende Komponenten automatisch zu erkennen und zu installieren](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components), näher beschrieben. 

### Vorbehalte

Zum jetzigen Zeitpunkt funktioniert die Möglichkeit, Erweiterungen in eine *.vsconfig-Datei einzuschließen und vom VS-Installationsprogramm installieren zu lassen, nur für Visual Studio 2022 und höher, vorausgesetzt, Sie haben ein Visual Studio-Installationsprogramm der Version 17.9 oder höher. Außerdem unterstützt das Visual Studio-Installationsprogramm nicht die Möglichkeit, Erweiterungen in eine Konfigurationsdatei zu _exportieren_. Erweiterungsupdates erfolgen über [die hier beschriebene bestehende Methode zum Erweiterungsupdate](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Einige Erweiterungen von Erstanbietern wie Copilot oder Liveshare sind direkt im Visual Studio-Installationsprogramm enthalten und verhalten sich als reguläre Komponenten. 

Bitte probieren Sie dieses Feature aus, und [teilen Sie uns Ihre Meinung mit](https://developercommunity.visualstudio.com)!

