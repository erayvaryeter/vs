---
title: VSConfig ora supporta le estensioni
featureId: Extensions-in-vsconfig
description: Il programma di installazione di Visual Studio caricherà le estensioni specificate nel file VSConfig.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

A partire dalla versione 17.9 di Visual Studio 2022, è ora possibile includere estensioni di [Visual Studio Marketplace](https://marketplace.visualstudio.com/), locali, rete, URL personalizzato o [galleria privata](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) nel [file vsconfig](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions) e il programma di installazione di Visual Studio li caricherà e li renderà disponibili per l'uso. Questa funzionalità risolve una delle richieste di funzionalità della [Community degli sviluppatori più votate: "Un file .vsconfig dovrebbe richiedere automaticamente di installare le estensioni"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Tutte le estensioni installate dal programma di installazione di Visual Studio, verranno installate a livello di computer, quindi saranno disponibili per tutti gli utenti. Dato che queste estensioni sono installate a livello di computer, gli utenti che le installano dovranno disporre direttamente di privilegi da amministratore, oppure dovrà essere stato concesso loro il controllo tramite il criterio [AllowStandardUserControl](https://aka.ms/vs/setup/policies). Si noti che la maggior parte delle estensioni installate da Gestore estensioni esistente hanno la possibilità di essere installate e venivano installate per utente, non a livello di computer, quindi l'utente che le ha installate non ha bisogno di autorizzazioni da amministratore.

Sono disponibili tre modi principali per importare un file *.vsconfig in Visual Studio:

### 1. Uso dell'interfaccia utente del programma di installazione di Visual Studio per aggiungere estensioni a un'installazione

È possibile avviare il programma di installazione di Visual Studio e importare un [file di configurazione dell'installazione (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) in un'installazione esistente elencata alla scheda Installate, o usarlo per preconfigurare una nuova installazione tramite la scheda Disponibili. In qualsiasi caso, sarà necessario scegliere Altro/Importa configurazione dalla scheda del prodotto del programma di installazione per importare le estensioni nell'installazione desiderata.   

![Immagine del programma di installazione di Visual Studio che mostra Altro e quindi Importa configurazione](../media/installer-import-config-into-available-tab.png)

### 2. Aggiungere estensioni a livello di codice a un'installazione di Visual Studio usando il parametro --config

Per eseguire una **nuova installazione** di Visual Studio e inizializzarla con un file di configurazione contenente le estensioni, eseguire il comando seguente usando il programma di avvio automatico:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Per **modificare** un'installazione esistente e aggiungere estensioni trasmettere un file *.vsconfig che contiene estensioni, è possibile usare il comando modifica che usa il programma di installazione di Visual Studio già nel computer:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Fare clic qui per [altre informazioni sui parametri della riga di comando del programma di installazione di Visual Studio](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. Aprire una soluzione o un repository che contenga un file vsconfig

Quando un utente apre una soluzione o un repository, Visual Studio analizzerà un file *.vsconfig incluso e rileverà automaticamente se i componenti specificati e *le estensioni del Marketplace* ora sono presenti o mancanti. Se mancanti, all'utente verrà richiesto di installarle. A causa di motivi di prestazioni, le estensioni ospitate in rete o locali non fanno ancora parte del radar di rilevamento mancante. La documentazione online descrive ulteriormente questa possibilità di [rilevare e installare automaticamente i componenti mancanti](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components). 

### Precisazioni

D'ora in avanti, la possibilità di includere le estensioni in un file *.vsconfig e di fare in modo che il programma di installazione di Visual Studio le installi funziona solo per Visual Studio 2022 e versioni successive, partendo dal presupposto che si disponga della versione 17.9 o versioni successive del programma di installazione di Visual Studio. Inoltre, il programma di installazione di Visual Studio non supporta ancora la possibilità di _esportare_ estensioni in un file di configurazione. Gli aggiornamenti delle estensioni si verificheranno tramite il [metodo di aggiornamento delle estensioni esistenti descritto qui](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Alcune estensioni proprietarie come Copilot o Liveshare sono incluse direttamente nel programma di installazione di Visual Studio e si comportano come componenti normali. 

È possibile provare questa funzionalità e [condividere eventuali commenti](https://developercommunity.visualstudio.com)!

