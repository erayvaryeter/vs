---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: Analýza paměti je snadná díky odhalení nevracení obslužné rutiny událostí a plýtvání paměti.
title: Rychlá identifikace úniku obslužné rutiny události

---


Karta Spravovat přehledy paměti teď poskytuje další užitečné informace. Dokáže rozpoznat nevracení obslužné rutiny události, která může nastat, když se jeden objekt přihlásí k odběru události jiného objektu. Pokud vydavatel události přežije odběratele, zůstane odběratel naživu, i když na něj nejsou žádné další odkazy. To může vést k nevracení paměti, kdy není správně uvolněna nevyužitá paměť, což způsobí, že aplikace bude v průběhu času používat více a více paměti.

Díky novému automatickému přehledu „Nevrácené obslužné rutiny událostí“ je teď identifikace problémů souvisejících s pamětí obslužné rutiny událostí a plýtvání pamětí mnohem jednodušší.

![Úniky obslužné rutiny události](../media/EventHandler.png "Úniky obslužné rutiny události")

![Podrobnosti úniků obslužné rutiny události](../media/EventHandlerDetails.png "Podrobnosti úniků obslužné rutiny události")

Podělte se o své celkové imprese, o tom, jak ho můžeme vylepšit, a všechny další názory, které můžete mít k tomuto prostředí prostřednictvím [komunity](https://developercommunity.visualstudio.com/VisualStudio) vývojářů.
