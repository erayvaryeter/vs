---
title: VSConfig で拡張機能がサポートされるようになりました
featureId: Extensions-in-vsconfig
description: Visual Studio インストーラは、VSConfig ファイルで指定された拡張機能を読み込みます。
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Visual Studio 2022 バージョン 17.9 以降、[Visual Studio Marketplace](https://marketplace.visualstudio.com/)、ローカル URL、ネットワーク URL、カスタム URL、または[非公開ギャラリー](https://learn.microsoft.com/visualstudio/extensibility/private-galleries)拡張機能のいずれかを [vsconfig ファイル](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions)に含めることができるようになりました。Visual Studio インストーラによって拡張機能が読み込まれ、使用できるようになります。 この機能は、投票数が多い [Developer Community 機能要求の 1 つ: ".vsconfig ファイルにより拡張機能のインストールを自動的に求める"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364) に対処したものです。

VS インストーラによってインストールされるすべての拡張機能は、"コンピューター全体" にインストールされます。つまり、すべてのユーザーが使用できます。 これらの拡張機能はコンピューター全体にインストールされるため、インストールするユーザーは管理特権を直接付与されているか、[AllowStandardUserControl](https://aka.ms/vs/setup/policies) ポリシーを介して制御が許可されている必要があります。 既存の拡張機能マネージャーでインストールされていた拡張機能のほとんどは、コンピューター全体ではなくユーザーごとにインストールできるため、拡張機能をインストールしたユーザーには管理者権限が不要でした。

*.vsconfig ファイルを Visual Studio にインポートするには、主に次の 3 つの方法があります。

### 1.VS インストーラ UI を使用して拡張機能をインストールに追加する

VS インストーラを起動し、[インストール構成ファイル (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) を [インストール済み] タブに一覧表示されている既存のインストールにインポートするか、インストーラを使用して [使用可能] タブで新しいインストールを事前に構成することもできます。どちらの場合も、インストーラの製品カードから [その他]/[構成のインポート] を選択して、目的のインストールに拡張機能をインポートします。   

![[その他] と [構成のインポート] を示す Visual Studio インストーラの画像](../media/installer-import-config-into-available-tab.png)

### 2.--config パラメータを使用して Visual Studio のインストールに拡張機能をプログラムによって追加する

Visual Studio の**新規インストール**を実行し、拡張機能を含む構成ファイルで初期化するには、ブートストラップを使用して次のコマンドを実行します。

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

既存のインストールを**変更**し、拡張機能を含む *.vsconfig ファイルを渡して拡張機能を追加するには、コンピューター上に既にある VS インストーラを使用する modify コマンドを使用できます。

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

[VS インストーラのコマンド ライン パラメータの詳細](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio)については、ここをクリックしてください。

### 3.vsconfig ファイルを含むソリューションまたはリポジトリを開く

ユーザーがソリューションまたはリポジトリを開くと、Visual Studio によって、組み込まれている *.vsconfig ファイルが解析され、指定されたコンポーネントと *Marketplace 拡張機能*が存在するか欠落しているかが自動的に検出されます。 欠落している場合、インストールを促すメッセージがユーザーに表示されます。 パフォーマンス上の理由から、ローカルまたはネットワークでホストされる拡張機能は、まだ見つかっていない検出レーダーの一部ではありません。 オンライン ドキュメントでは、[欠落しているコンポーネントを自動的に検出してインストールする](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components)この機能についてさらに説明しています。 

### 注意事項

バージョン 17.9 以降である Visual Studio インストーラを使用していることを前提とすると、現時点では、拡張機能を *.vsconfig ファイルに含めて VS インストーラでインストールする機能は、Visual Studio 2022 以降でのみ機能します。 また、Visual Studio インストーラでは、拡張機能を構成ファイルに_エクスポート_する機能がまだサポートされていません。 拡張機能の更新は、[ここで説明されている既存の拡張機能更新方法](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates)を使用して行われます。  

Copilot や Liveshare などの一部のファースト パーティ拡張機能は、Visual Studio インストーラに直接含まれており、通常のコンポーネントとして動作します。 

この機能をぜひお試しいただき、[ご意見をお聞かせください](https://developercommunity.visualstudio.com)。

