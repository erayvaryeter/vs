---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: 通过发现事件处理程序泄漏和浪费的内存，可以轻松进行内存分析。
title: 快速识别事件处理程序泄漏

---


“管理内存见解”选项卡现在提供了其他有用的信息。 它可以检测当一个对象订阅另一个对象的事件时可能发生的“事件处理程序泄漏”。 如果事件发布者的生存期超过了订阅者的生存期，即使没有对订阅者的其他引用，订阅者仍会保持活动状态。 这可能会导致内存泄漏，即未使用的内存未得到正确释放，从而导致应用程序随时间的推移使用越来越多的内存。

借助新的“事件处理程序泄漏”自动见解，识别事件处理程序内存相关问题和内存浪费现在要容易得多。

![事件处理程序泄漏](../media/EventHandler.png "事件处理程序泄漏")

![事件处理程序泄漏详细信息](../media/EventHandlerDetails.png "事件处理程序泄漏详细信息")

请分享你的总体印象、我们如何改进它，以及你通过[开发者社区](https://developercommunity.visualstudio.com/VisualStudio)对此体验提供的任何其他反馈。
