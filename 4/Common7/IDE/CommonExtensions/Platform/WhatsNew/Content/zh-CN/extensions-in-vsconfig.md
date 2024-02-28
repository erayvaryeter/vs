---
title: VSConfig 现在支持扩展
featureId: Extensions-in-vsconfig
description: Visual Studio 安装程序将加载 VSConfig 文件中指定的扩展。
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

从 Visual Studio 2022 版本 17.9 开始，现在可以在 [vsconfig 文件](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions)中包含 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)、本地、网络、自定义 URL 或[专用库](https://learn.microsoft.com/visualstudio/extensibility/private-galleries)扩展，并且 Visual Studio 安装程序将加载它们供用户使用。 此功能解决了用户呼声较高的[开发者社区功能请求：“.vsconfig 文件应自动提示安装扩展”。](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364)

VS 安装程序安装的所有扩展都将在“计算机范围”内安装，这意味着它们可供所有用户使用。 由于这些扩展是在计算机范围内安装的，因此安装这些扩展的用户必须直接拥有管理员权限，或者必须通过 [allowStandardUserControl](https://aka.ms/vs/setup/policies) 策略授予其控制权限。 请注意，现有的扩展管理器安装的大多数扩展都能够按用户（而不是在计算机范围内）进行安装，因此安装它们的用户不需要具有管理员权限。

将 *.vsconfig 文件导入 Visual Studio 有三种主要方法：

### 1. 使用 VS 安装程序 UI 将扩展添加到安装

可以启动 VS 安装程序并将[安装配置文件 (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) 导入到“已安装”选项卡上列出的现有安装中，或使用该文件通过“可用”选项卡预配置新安装。无论哪种情况，你都需要从安装程序的产品卡中选择“更多/导入配置”，将扩展导入到所需的安装中。   

![显示“更多”和“导入配置”的 Visual Studio 安装程序的图像](../media/installer-import-config-into-available-tab.png)

### 2. 使用 --config 参数以编程方式将扩展添加到 Visual Studio 安装

若要**全新安装** Visual Studio 并使用包含扩展的配置文件初始化它，请使用引导程序执行以下命令：

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

若要**修改**现有安装并通过传入包含扩展的 *.vsconfig 文件添加扩展，可以使用利用计算机上已有的 VS 安装程序的 modify 命令：

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

单击此处了解[有关 VS 安装程序命令行参数的详细信息](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio)。

### 3.打开包含 vsconfig 文件的解决方案或存储库

当用户打开解决方案或存储库时，Visual Studio 将分析包含的 *.vsconfig 文件，并自动检测任何指定的组件以及*当前的市场扩展*是存在还是缺失。 如果缺失，系统会提示用户安装它们。 由于性能原因，本地或网络托管扩展尚不在缺失检测雷达范围内。 联机文档进一步介绍了[自动检测和安装缺失组件的功能](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components)。 

### 注意事项

到目前为止，在 *.vsconfig 文件中包含扩展并让 VS 安装程序安装这些扩展的功能仅适用于 Visual Studio 2022 及更高版本，前提是 Visual Studio 安装程序的版本是 17.9 或更高版本。 此外，Visual Studio 安装程序尚不支持将扩展_导出_到配置文件的功能。 扩展更新将通过[此处所述的现有扩展更新方法](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates)完成。  

某些第一方扩展（如 Copilot 或 Liveshare）直接包含在 Visual Studio 安装程序中，并会作为常规组件运行。 

请试用此功能，[让我们了解你的想法](https://developercommunity.visualstudio.com)！

