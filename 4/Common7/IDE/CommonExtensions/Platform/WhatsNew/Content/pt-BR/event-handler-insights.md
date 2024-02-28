---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: Análise de memória facilitada pela detecção de vazamentos do manipulador de eventos e perda de memória.
title: Identifique rapidamente vazamentos do manipulador de eventos

---


A guia “Gerenciar Insights de Memória” agora fornece informações úteis adicionais. Ele pode detectar "Vazamentos do manipulador de eventos" que podem ocorrer quando um objeto se inscreve no evento de outro objeto. Se o editor do evento sobreviver ao assinante, o assinante permanecerá vivo, mesmo que não haja outras referências a ele. Isso pode levar a perdas de memória, em que a memória não utilizada não é liberada adequadamente, fazendo com que o aplicativo use cada vez mais memória ao longo do tempo.

Graças ao novo insight automático “Perdas do Manipulador de Eventos”, agora é muito mais fácil identificar problemas relacionados à memória do Manipulador de Eventos e ao desperdício de memória.

![Perdas do Manipulador de Eventos](../media/EventHandler.png "Perdas do Manipulador de Eventos")

![Detalhes de Perdas do Manipulador de Eventos](../media/EventHandlerDetails.png "Detalhes de Perdas do Manipulador de Eventos")

Por favor, compartilhe suas impressões gerais, como podemos melhorá-lo e qualquer feedback adicional que você possa ter sobre essa experiência por meio da [Comunidade](https://developercommunity.visualstudio.com/VisualStudio) de desenvolvedores.
