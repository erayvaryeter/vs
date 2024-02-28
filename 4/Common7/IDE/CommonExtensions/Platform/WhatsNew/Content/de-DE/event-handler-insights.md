---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: Die Speicheranalyse wurde durch erkennen von Ereignishandlerlecks und verschwendeten Speicher leicht gemacht.
title: Schnelles Identifizieren von Ereignishandlerlecks

---


Die Registerkarte „Speichererkenntnisse verwalten“ bietet jetzt zusätzliche hilfreiche Informationen. Er kann "Ereignishandlerlecks" erkennen, die möglicherweise auftreten können, wenn ein Objekt das Ereignis eines anderen Objekts abonniert. Wenn der Herausgeber des Ereignisses den Abonnenten überdauert, bleibt der Abonnent bestehen, auch wenn es keine weiteren Verweise auf ihn gibt. Dies kann zu Speicherverlusten führen, bei denen nicht verwendeter Arbeitsspeicher nicht ordnungsgemäß freigegeben wird, was dazu führt, dass die Anwendung im Laufe der Zeit mehr und mehr Arbeitsspeicher verwendet.

Dank der neuen automatischen Erkenntnis „Ereignishandlerverluste“ ist die Identifizierung von Problemen im Zusammenhang mit dem Ereignishandlerspeicher und dem verschwendeten Speicher jetzt viel einfacher.

![Ereignishandlerverluste](../media/EventHandler.png "Ereignishandlerverluste")

![Details zu Ereignishandlerverlusten](../media/EventHandlerDetails.png "Details zu Ereignishandlerverlusten")

Bitte teilen Sie Ihre Gesamteindrücke, wie wir sie verbessern können, und jedes zusätzliche Feedback, das Sie über Entwicklercommunity [](https://developercommunity.visualstudio.com/VisualStudio)haben können.
