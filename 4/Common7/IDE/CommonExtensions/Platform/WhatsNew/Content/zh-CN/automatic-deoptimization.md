---
title: 更有效地调试 .NET 8 代码
featureId: automaticdeoptimization
description: .NET 8 为精确调试引入了自动取消优化，而不会牺牲性能。
thumbnailImage: ../media/automaticdeoptimization.png

---


现在 .NET 8 中，调试器在调试时会自动取消对发布二进制文件和外部代码的优化。 断点和代码单步执行仅影响暂停处的特定部分，同时保持应用程序其余部分的最佳运行状态。 若要利用此功能，只需在调试器设置中禁用 **“仅我的代码”** 选项。 

拥有诸多好处，例如调试应用程序时局部变量、监视和即时窗口中的错误更少、代码导航更流畅。

请分享你的总体印象、我们如何改进，以及通过[开发者社区](https://developercommunity.visualstudio.com/VisualStudio)提供关于此体验的任何其他反馈。
