---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: 将 WinForms 进程外设计器用于引用 32 位程序集的 .NET Framework 项目。
restartRequired: true
title: WinForms 设计器改进

---

现在可以将 Windows 窗体 (WinForms) 进程外设计器用于引用 32 位程序集的 .NET Framework 项目。

WinForms 设计器将自动检测 32 位程序集加载失败，并提供为该项目使用进程外设计器的选项。

![.NET Framework 项目的 Windows 窗体设计器选择对话框](../media/winforms-designer-selection.png ".NET Framework 项目的 Windows 窗体设计器选择对话框")

WinForms 进程外设计器将生成一个可以加载 32 位程序集的进程。 Visual Studio 将与该进程通信以显示该设计器。
可从[此处](https://aka.ms/winforms/designer/WhatsNewDesignerSelection)了解有关此功能的详细信息。

![.NET Framework 项目的 Windows 窗体设计器选择](../media/winforms-designer-selection.mp4 ".NET Framework 项目的 Windows 窗体设计器选择")

此功能默认情况下已打开。 可以通过“检测 Windows 窗体 .NET Framework 项目的 32 位程序集加载失败”选项转到“**工具**” > “**选项**” > “**环境**” > “**预览功能**”来启用或禁用此功能。

如果你有关于此功能的反馈要与我们分享，请在[开发者社区](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210)参与讨论。

