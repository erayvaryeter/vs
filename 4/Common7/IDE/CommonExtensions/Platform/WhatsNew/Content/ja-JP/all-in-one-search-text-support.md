---
featureFlagName: VS.AllInOneSearchPlainTextSearch17.9GA
thumbnailImage: ../media/aios-plain-text-search-highlighted-thumbnail.png
featureId: AllInOneSearchPlainTextSearch
description: Code Search の更新されたエクスペリエンスでは、ファイルやシンボルに加えて、テキストを検索できるようになりました。
restartRequired: true
title: オールインワン コード検索で任意のテキストを検索する
optionPageId: FCA50351-5E03-4E31-9CC0-AB59A9C6B829

---


オールインワン Code Search (`Ctrl+T` または `Ctrl+,`) では、ソリューション全体で任意の単語や文字列を検索できるため、コードベースからのファイルやシンボルの結果を補完できます。 コードベース全体で、ローカル変数名、コメント内の単語、パラメータ名、その他の文字列を検索できるようになりました。

![オールインワン検索](../media/aios-plain-text-search-highlighted.png "オールインワン検索") 

テキストのみのビューでは、以下のいずれかの操作を行って、テキスト結果のみに絞り込むことができます。

- 検索バーの下にある "[テキスト (x:)]" ボタンをクリックする、
- 検索クエリの先頭に "x:" を付ける、
- キーボード ショートカット `Shift+Alt+F` を使用する、または
- メニュー オプション "[編集] > [移動] > [Go To Text] (テキストに移動)" に移動する。.

テキストのみのエクスペリエンスでは、検索バーの右端にあるボタンで [大文字と小文字を区別する]、[単語単位で探す]、[正規表現を使用する] を切り替えるオプションもあります。

Code Search のフルテキスト サポートの詳細については、[こちら](https://devblogs.microsoft.com/visualstudio/17-9-preview-3-brings-exciting-changes-to-code-search)をご覧ください。 

Code Search ウィンドウにテキスト フィルター ボタンが表示されない場合は、プレビュー機能の "[ツール] > [オプション] > [環境] > [プレビュー機能] > [Plain text search in All-In-One Search (requires restart)] (オールインワン検索でのプレーン テキスト検索 (再起動が必要))" をオンにすることで、手動で有効にできます。 

このエクスペリエンスは繰りし続けるため、[Developer Community](https://developercommunity.visualstudio.com/t/Improve-Visual-Studio-All-In-One-Search/10333885?space=8&entry=suggestion) にこの新しい検索エクスペリエンスについてのご意見をお寄せください。
