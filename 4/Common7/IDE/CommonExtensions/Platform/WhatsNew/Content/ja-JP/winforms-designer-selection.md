---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: 32 ビット アセンブリを参照する .NET Framework プロジェクトには、WinForms アウトプロセス デザイナーを使用します。
restartRequired: true
title: WinForms デザイナーの機能強化

---

32 ビット アセンブリを参照する .NET Framework プロジェクトに対して、Windows フォーム (WinForms) アウトプロセス デザイナーを使用できるようになりました。

WinForms デザイナーでは、32 ビットアセンブリの読み込みエラーを自動的に検出し、そのプロジェクトにアウトプロセス デザイナーを使用するオプションを提供します。

![.NET Framework プロジェクトの Windows フォーム デザイナーの選択ダイアログ](../media/winforms-designer-selection.png ".NET Framework プロジェクトの Windows フォーム デザイナーの選択ダイアログ")

WinForms アウトプロセス デザイナーでは、32 ビット アセンブリを読み込むことができるプロセスを生成します。 Visual Studio では、そのプロセスと通信してデザイナーを表示します。
この機能についての詳細情報は、[こちら](https://aka.ms/winforms/designer/WhatsNewDesignerSelection)を参照してください。

![.NET Framework プロジェクトの Windows フォーム デザイナーの選択](../media/winforms-designer-selection.mp4 ".NET Framework プロジェクトの Windows フォーム デザイナーの選択")

既定では、この機能は有効になっています。 これを有効または無効にするには、**[ツール]** > **[オプション]** > **[環境]** > **[プレビュー機能]** の [Windows フォーム .NET Framework プロジェクトの 32 ビット アセンブリの読み込みエラーを検出する] オプションに移動します。

この機能に関するフィードバックがありましたら、[Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210) でのディスカッションに投稿してください。

