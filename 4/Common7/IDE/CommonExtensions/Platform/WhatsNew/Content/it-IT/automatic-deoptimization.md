---
title: Eseguire il debug del codice .NET 8 in modo più efficiente
featureId: automaticdeoptimization
description: .NET 8 introduce la deoptimizzazione automatica per il debug preciso senza sacrificare le prestazioni.
thumbnailImage: ../media/automaticdeoptimization.png

---


In .NET 8, il debugger ora disottimizza automaticamente i file binari di rilascio e il codice esterno durante il debug. I punti di interruzione e le istruzioni del codice influiscono solo sulle parti specifiche in cui ci si trova in pausa, mantenendo il resto dell'applicazione in modo ottimale. Per usare questa funzionalità, è sufficiente disabilitare l'opzione **"Just My Code"** nelle impostazioni del debugger. 

Offre vantaggi come un minor numero di errori in variabili locali, espressioni di controllo e finestre immediate, oltre alla navigazione più fluida del codice durante il debug dell'applicazione.

Condividi le tue impressioni generali, come possiamo migliorare e qualsiasi feedback aggiuntivo che potresti avere su questa esperienza tramite [Developer Community](https://developercommunity.visualstudio.com/VisualStudio).
