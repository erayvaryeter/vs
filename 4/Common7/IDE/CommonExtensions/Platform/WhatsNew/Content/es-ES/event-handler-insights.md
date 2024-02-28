---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: El análisis de memoria facilita la detección de pérdidas de controladores de eventos y memoria desperdiciada.
title: Identificación rápida de pérdidas del controlador de eventos

---


Ahora en la pestaña "Administrar conclusiones de memoria" se proporciona información útil adicional. Puede detectar "Fugas del controlador de eventos" que pueden producirse cuando un objeto se suscribe al evento de otro objeto. Si el publicador del evento sobrevive al suscriptor, el suscriptor permanece activo, incluso si no hay otras referencias a él. Esto puede provocar pérdidas de memoria, en las que la memoria no utilizada no se libera correctamente, lo que hace que la aplicación use más y más memoria a lo largo del tiempo.

Gracias a la nueva conclusión automática "Fugas del controlador de eventos", ahora es mucho más fácil identificar problemas relacionados con la memoria del controlador de eventos y la memoria desperdiciada.

![Fugas del controlador de eventos](../media/EventHandler.png "Fugas del controlador de eventos")

![Detalles de Fugas del controlador de eventos](../media/EventHandlerDetails.png "Detalles de Fugas del controlador de eventos")

Comparta sus impresiones generales, cómo podemos mejorarla y cualquier comentario adicional que pueda tener sobre esta experiencia a través [de la Comunidad](https://developercommunity.visualstudio.com/VisualStudio) de desarrolladores.
