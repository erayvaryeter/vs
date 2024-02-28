---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: Memory analysis made easy by spotting event handler leaks and wasted memory.
title: Quickly identify event handler Leaks

---


The "Manage Memory Insights" tab now provides additional helpful information. It can detect "Event Handler Leaks" that can potentially occur when one object subscribes to another object's event. If the publisher of the event outlives the subscriber, the subscriber remains alive, even if there are no other references to it. 
This can lead to memory leaks, where unused memory isn't properly freed, causing the application to use more and more memory over time.

Thanks to the new "Event Handler Leaks" auto insight, identifying Event Handler memory related issues and wasted memory is now much easier.

![Event Handler Leaks](../media/EventHandler.png "Event Handler Leaks")

![Event Handler Leaks details](../media/EventHandlerDetails.png "Event Handler Leaks Details")

Please share your overall impressions, how we can improve it, and any additional feedback you may have on this experience via [Developer Community](https://developercommunity.visualstudio.com/VisualStudio).
