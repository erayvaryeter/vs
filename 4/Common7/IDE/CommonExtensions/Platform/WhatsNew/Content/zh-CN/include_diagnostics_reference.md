---
title: 分析和跟踪“include”指令
featureId: IncludeDiagnostics
description: 深入了解 include 指令的使用情况和生成时间。
thumbnailImage: ../media/include_diagnostics_referencet_thumbnail.png

---


借助此功能，可以方便地跟踪 #include 指令的使用频率和位置。 

它提供在代码库中引用每个 \#include 指令的次数的计数。 可以单击引用计数以访问特定引用的列表。 在此处，双击所需的引用将直接转到其位置。

执行 Build Insights 后，此功能将显示与每个 #include 指令及其引用关联的生成时间。

默认情况下，此功能已停用。 当需要分析 #include 指令时，可以在代码编辑器中右键单击访问上下文菜单来启用它。 随后，将鼠标悬停在“#include 指令”选项上，然后选择“启用包括 \#诊断”。 

![Include 诊断上下文菜单](../media/include_diagnostics_context_menu.png "Include 诊断上下文菜单")

请分享你的总体印象、我们如何改进它，以及你通过[开发者社区](https://developercommunity.visualstudio.com/VisualStudio)对此体验提供的任何其他反馈。
