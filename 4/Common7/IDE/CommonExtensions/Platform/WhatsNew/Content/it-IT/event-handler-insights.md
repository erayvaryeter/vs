---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: L'analisi della memoria è stata semplificata individuando perdite di gestori eventi e memoria sprecato.
title: Identificare rapidamente le perdite del gestore eventi

---


La scheda "Gestisci informazioni dettagliate sulla memoria" fornisce ora informazioni utili aggiuntive. Può rilevare "Event Handler Leaks" che può verificarsi potenzialmente quando un oggetto sottoscrive l'evento di un altro oggetto. Se il server di pubblicazione dell'evento scade nel sottoscrittore, il sottoscrittore rimane attivo, anche se non vi sono altri riferimenti. Ciò può causare perdite di memoria, in cui la memoria inutilizzata non viene liberata correttamente, causando l'uso di maggiore e maggiore memoria nell'applicazione nel corso del tempo.

Grazie alla nuova informazione automatica "Perdite del gestore dell'evento", l'identificazione dei problemi correlati alla memoria del gestore dell'evento e alla memoria sprecata è ora molto più semplice.

![Perdite del gestore dell'evento](../media/EventHandler.png "Perdite del gestore dell'evento")

![Dettagli delle perdite del gestore dell'evento](../media/EventHandlerDetails.png "Dettagli delle perdite del gestore dell'evento")

Condividi le tue impressioni generali, come possiamo migliorarla e qualsiasi feedback aggiuntivo che potresti avere su questa esperienza tramite [Developer Community](https://developercommunity.visualstudio.com/VisualStudio).
