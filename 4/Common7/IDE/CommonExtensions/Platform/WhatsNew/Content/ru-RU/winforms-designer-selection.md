---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Используйте внепроцессный конструктор WinForms для проектов .NET Framework, ссылающихся на 32-разрядные сборки.
restartRequired: true
title: Улучшения конструктора WinForms

---

Теперь вы можете использовать внепроцессный конструктор Windows Forms (WinForms) для проектов .NET Framework, ссылающихся на 32-разрядные сборки.

Конструктор WinForms автоматически обнаруживает сбои загрузки 32-разрядных сборок и предоставляет возможность использовать внепроцессный конструктор для такого проекта.

![Диалоговое окно выбора конструктора Windows Forms для проектов .NET Framework](../media/winforms-designer-selection.png "Диалоговое окно выбора конструктора Windows Forms для проектов .NET Framework")

Внепроцессный конструктор WinForms порождает процесс, который может загружать 32-разрядные сборки. Visual Studio будет взаимодействовать с этим процессом для отображения конструктора.
Узнайте больше об этом компоненте [здесь](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Выбор конструктора Windows Forms для проектов .NET Framework](../media/winforms-designer-selection.mp4 "Выбор конструктора Windows Forms для проектов .NET Framework")

По умолчанию эта функция включена. Вы можете включить или отключить его в разделе **Средства** > **Параметры** > **Окружение** > **Функции предварительной версии** с помощью параметра "Обнаружение сбоев загрузки 32-разрядных сборок для проектов .NET Framework Windows Forms".

Если вы хотите поделиться с нами отзывами об этой функции, примите участие в обсуждении в [Сообществе разработчиков](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

