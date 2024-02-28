---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: 32비트 어셈블리를 참조하는 .NET Framework 프로젝트를 위해 WinForms Out-of-Process 디자이너를 사용합니다.
restartRequired: true
title: WinForms 디자이너 개선 사항

---

이제 32비트 어셈블리를 참조하는 .NET Framework 프로젝트를 위해 Windows Forms(WinForms) Out-of-Process 디자이너를 사용할 수 있습니다.

WinForms 디자이너는 32비트 어셈블리 로드 오류를 자동으로 검색하고 해당 프로젝트를 위해 Out-of-Process 디자이너를 사용할 수 있는 옵션을 제공합니다.

![.NET Framework 프로젝트를 위한 Windows Forms 디자이너 선택 대화 상자](../media/winforms-designer-selection.png ".NET Framework 프로젝트를 위한 Windows Forms 디자이너 선택 대화 상자")

WinForms Out-of-Process 디자이너는 32비트 어셈블리를 로드할 수 있는 프로세스를 생성합니다. Visual Studio는 해당 프로세스와 통신하여 디자이너를 표시합니다.
[여기](https://aka.ms/winforms/designer/WhatsNewDesignerSelection)에서 이 기능에 대해 자세히 알아봅니다.

![.NET Framework 프로젝트를 위한 Windows Forms 디자이너 선택](../media/winforms-designer-selection.mp4 ".NET Framework 프로젝트를 위한 Windows Forms 디자이너 선택")

이 기능은 기본적으로 켜져 있습니다. "Windows Forms .NET Framework 프로젝트를 위해 32비트 어셈블리 로드 오류 검색" 옵션을 통해 **도구** > **옵션** > **환경** > **미리 보기 기능**으로 이동하여 사용하거나 사용하지 않도록 설정할 수 있습니다.

이 기능에 대해 공유할 피드백이 있는 경우 [개발자 커뮤니티](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210)에서 토론에 참여하세요.

