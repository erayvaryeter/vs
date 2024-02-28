---
title: '"include" ディレクティブを分析して追跡する'
featureId: IncludeDiagnostics
description: インクルード ディレクティブの使用状況とビルド時間に関する分析情報を取得します。
thumbnailImage: ../media/include_diagnostics_referencet_thumbnail.png

---


この機能を使うと、#include ディレクティブが利用された頻度と場所の両方を簡単に追跡できます。 

コードベース内で各 \#インクルード ディレクティブが参照された回数を示します。 参照カウントをクリックすると、特定の参照の一覧にアクセスできます。 そこから、目的の参照をダブルクリックすると、その場所に直接移動できます。

Build Insights を実行すると、この機能によって、各 #include ディレクティブに関連付けられたビルド時間がその参照とともに表示されます。

既定では、この機能は非アクティブです。 #include ディレクティブを分析する必要がある場合は、コード エディター内で右クリックしてコンテキスト メニューにアクセスして、有効にすることができます。 その後、[#include ディレクティブ] オプションをポイントし、[診断を有効にする \#] を選択します。 

![診断コンテキスト メニューを含める](../media/include_diagnostics_context_menu.png "診断コンテキスト メニューを含める")

全体的な印象、改善方法、開発者コミュニティ[を通じて](https://developercommunity.visualstudio.com/VisualStudio)このエクスペリエンスに関する追加のフィードバックをお寄せください。
