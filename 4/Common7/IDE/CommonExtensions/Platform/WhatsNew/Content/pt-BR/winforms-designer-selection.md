---
featureFlagName: Winforms.DesignerSelectionForNetFrameworkProjects
thumbnailImage: ../media/winforms-designer-selection-thumbnail.png
featureId: WinFormsDesignerSelection
description: Use o designer fora de processo do WinForms para projetos do .NET Framework que fazem referência a assemblies de 32 bits.
restartRequired: true
title: Melhorias no Designer do WinForms

---

Agora você pode usar o designer fora de processo do WinForms (Windows Forms) para projetos do .NET Framework que fazem referência a assemblies de 32 bits.

O designer WinForms detectará automaticamente falhas de carga de assembly de 32 bits e fornecerá uma opção para usar o designer fora de processo para esse projeto.

![Caixa de diálogo de Seleção do Designer de Formulários do Windows para projetos do .NET Framework](../media/winforms-designer-selection.png "Caixa de diálogo de seleção do Designer de Formulários do Windows para projetos do .NET Framework")

O designer fora do processo do WinForms gerará um processo que poderá carregar assemblies de 32 bits. O Visual Studio se comunicará com esse processo para exibir o designer.
Saiba mais sobre esse recurso [aqui](https://aka.ms/winforms/designer/WhatsNewDesignerSelection).

![Seleção do Designer de Formulários do Windows para projetos do .NET Framework](../media/winforms-designer-selection.mp4 "Seleção do Designer de Formulários do Windows para projetos do .NET Framework")

Esse recurso está ativado por padrão. Você pode habilitá-lo ou desabilitá-lo acessando **Ferramentas** > **Opções** > **Ambiente** > **Versões prévias dos recursos** por meio da opção "Detectar falhas de carregamento de assembly de 32 bits para projetos do Windows Forms do .NET Framework".

Se você tiver comentários para compartilhar conosco sobre esse recurso, contribua com a discussão na [Developer Community](https://developercommunity.visualstudio.com/t/WinForms-NET-Framework-Projects-cant-d/1601210).

