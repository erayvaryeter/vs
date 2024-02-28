---
title: VSConfig 現在支持延伸模組
featureId: Extensions-in-vsconfig
description: Visual Studio 安裝程式將會載入 VSConfig 檔案中指定的延伸模組。
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

從 Visual Studio 2022 17.9 版開始，您現在可以在 [vsconfig 檔案](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions)中包含 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)、本機、網路、自訂 URL 或[私人資源庫](https://learn.microsoft.com/visualstudio/extensibility/private-galleries)延伸模組，而 Visual Studio 安裝程式將會載入它們，並使其可供使用。 此功能解決了使用者呼聲較高的[開發人員社群功能請求：「.vsconfig 檔案應自動提示安裝延伸模組」](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364)。

VS 安裝程式所安裝的所有延伸模組都將在「機器範圍內」安裝，這意味著所有使用者都可以使用它們。 由於這些延伸模組是在機器範圍內安裝的，因此安裝這些延伸模組的使用者必須直接擁有管理員權限，或者必須通過 [AllowStandardUserControl](https://aka.ms/vs/setup/policies) 原則授與其控制權限。 請注意，現有延伸模組管理員所安裝的大多數延伸模組都具有按使用者安裝的功能，而不是整個機器，因此安裝它們的使用者不需要具有系統管理員權限。

將 *.vsconfig 檔案匯入 Visual Studio 有三個主要方式：

### 1.使用 VS 安裝程式 UI 將延伸模組新增至安裝中

您可以啟動 VS 安裝程式，並將[安裝設定檔 (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) 匯入 [已安裝] 索引標籤上所列的現有安裝，或透過 [可用] 索引標籤預先設定新的安裝。不論是哪一種情況，您都可以從安裝程式的產品卡片中選擇 [更多/匯入設定]，以將延伸模組匯入所需的安裝。   

![顯示 [更多] 和 [匯入設定] 的 Visual Studio 安裝程式影像](../media/installer-import-config-into-available-tab.png)

### 2.使用 --config 參數以程式設計方式將延伸模組功能新增至 Visual Studio 安裝

若要**重新安裝** Visual Studio 並使用包含延伸模組的延伸模組初始化它，請使用啟動程序執行以下命令：

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

若要藉由傳入包含延伸模組的 *.vsconfig 檔案來**修改**現有的安裝和新增延伸模組，您可以使用已在機器上使用 VS 安裝程式的 modify 命令：

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

點擊此處以取得 [VS 安裝程式命令列參數的詳細資訊](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio)。

### 3.開啟包含 vsconfig 檔案的解決方案或存放庫

當使用者開啟方案或存放庫時，Visual Studio 會剖析包含的 *.vsconfig 檔案，並自動偵測是否有任何指定的元件，以及*現有市集延伸模組*是否存在或遺失。 如果遺失，系統會提示使用者安裝。 由於效能原因，本機或網路裝載的延伸模組尚不屬於遺漏的偵測雷達。 線上文件進一步說明[自動偵測和安裝遺失組件](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components)的功能。 

### 警示

目前，在 *.vsconfig 檔案中包含延伸模組的功能，並讓 VS 安裝程式安裝延伸模組的功能僅適用於 Visual Studio 2022 及以上版本，前提是您的 Visual Studio 安裝程式為 17.9 版或以上版本。 此外，Visual Studio 安裝程式尚不支援將延伸模組_匯出_至設定檔的功能。 延伸模組更新將透過[此處所述的現有延伸模組更新方法](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates)進行。  

某些第一方延伸模組，例如 Copilot 或 Liveshare，會直接包含在 Visual Studio 安裝程式中，其行為與一般元件無異。 

請嘗試這項功能，並[讓我們知道您的想法](https://developercommunity.visualstudio.com)！

