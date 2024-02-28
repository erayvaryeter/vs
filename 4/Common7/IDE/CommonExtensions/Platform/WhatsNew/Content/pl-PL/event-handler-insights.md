---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: Analiza pamięci jest łatwa dzięki wykryciu przecieków programu obsługi zdarzeń i marnowaniu pamięci.
title: Szybkie identyfikowanie przecieków obsługi zdarzeń

---


Karta „Zarządzanie szczegółowymi informacjami o pamięci” zawiera teraz dodatkowe przydatne informacje. Może wykryć "Przecieki programu obsługi zdarzeń", które mogą wystąpić, gdy jeden obiekt subskrybuje zdarzenie innego obiektu. Jeśli wydawca zdarzenia przeżyje subskrybenta, subskrybent pozostaje żywy, nawet jeśli nie ma do niego żadnych innych odwołań. Może to prowadzić do przecieków pamięci, w których nieużywana pamięć nie jest prawidłowo zwalniana, co powoduje, że aplikacja będzie używać coraz większej ilości pamięci wraz z upływem czasu.

Dzięki nowej automatycznej analizie „Przecieków obsługi zdarzeń” identyfikowanie problemów związanych z pamięcią obsługi zdarzeń i marnowaniem pamięci jest teraz znacznie łatwiejsze.

![Przecieki obsługi zdarzeń](../media/EventHandler.png "Przecieki obsługi zdarzeń")

![Szczegóły dotyczące Przecieków obsługi zdarzeń](../media/EventHandlerDetails.png "Szczegóły dotyczące Przecieków obsługi zdarzeń")

Podziel się swoimi ogólnymi wrażeniami, sposobami ich ulepszania i wszelkimi dodatkowymi opiniami, które możesz podzielić na to środowisko za pośrednictwem [społeczności](https://developercommunity.visualstudio.com/VisualStudio) deweloperów.
