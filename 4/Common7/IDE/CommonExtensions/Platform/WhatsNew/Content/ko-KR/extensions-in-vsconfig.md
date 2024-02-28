---
title: 이제 VSConfig에서 확장을 지원합니다.
featureId: Extensions-in-vsconfig
description: Visual Studio 설치 관리자가 VSConfig 파일에 지정된 확장을 로드합니다.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Visual Studio 2022 버전 17.9 이상에서는 [vsconfig 파일](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions)에 [Visual Studio Marketplace](https://marketplace.visualstudio.com/), 로컬, 네트워크, 사용자 지정 URL 또는 [프라이빗 갤러리](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) 확장을 포함할 수 있으며, Visual Studio 설치 프로그램이 이를 로드하여 사용할 수 있게 됩니다. 이 기능은 가장 많이 응답된 [Developer Community 기능 요청: ".vsconfig 파일은 확장을 설치하라는 메시지를 자동으로 표시해야 함"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364)을 해결합니다.

VS 설치 프로그램에서 설치한 모든 확장은 "컴퓨터 전체"에 설치됩니다. 즉, 모든 사용자가 사용할 수 있습니다. 이러한 확장은 컴퓨터 전체에 설치되므로 이를 설치하는 사용자는 직접 관리자 권한을 가지고 있거나 [AllowStandardUserControl](https://aka.ms/vs/setup/policies) 정책을 통해 제어 권한을 부여받아야 합니다. 기존 확장 관리자가 설치한 확장 대부분은 컴퓨터 전체가 아닌 사용자별로 설치되는 기능이 있으므로 이를 설치한 사용자에게는 관리자 권한이 필요하지 않았습니다.

*.vsconfig 파일을 Visual Studio로 가져오는 세 가지 주요 방법이 있습니다.

### 1. VS 설치 관리자 UI를 사용하여 설치에 확장 추가

VS 설치 프로그램을 시작하고 [설치 구성 파일(*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations)을 설치됨 탭에 나열된 기존 설치로 가져오거나 이를 사용하여 사용 가능 탭을 통해 새 설치를 사전 구성할 수 있습니다. 두 경우 모두, 설치 관리자의 제품 카드에서 구성 추가/가져오기를 선택하여 원하는 설치로 확장을 가져옵니다.   

![구성 추가 및 가져오기를 보여 주는 Visual Studio 설치 관리자의 이미지](../media/installer-import-config-into-available-tab.png)

### 2. --config 매개 변수를 사용하여 프로그래밍 방식으로 Visual Studio 설치에 확장 추가

Visual Studio를 **새로 설치**하고 확장이 포함된 구성 파일로 초기화하려면 부트스트래퍼를 사용하여 다음 명령을 실행합니다.

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

기존 설치를 **수정**하고 확장이 포함된 *.vsconfig 파일을 전달하여 확장을 추가하기 위해 컴퓨터에 있는 VS 설치 프로그램을 사용하는 수정 명령을 사용할 수 있습니다.

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

여기를 클릭하여 [VS 설치 관리자 명령줄 매개 변수에 대한 자세한 내용](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio)을 봅니다.

### 3. vsconfig 파일이 포함된 솔루션 또는 리포지토리를 엽니다.

사용자가 솔루션이나 리포지토리를 열면 Visual Studio는 포함된 *.vsconfig 파일을 구문 분석하고 지정된 구성 요소와 *마켓플레이스 확장*이 있는지 여부를 자동으로 검색합니다. 누락된 경우 사용자에게 설치하라는 메시지가 표시됩니다. 성능상의 이유로 로컬 또는 네트워크 호스팅 확장은 아직 누락된 탐지 레이더의 일부가 아닙니다. 온라인 문서에서는 [누락된 구성 요소를 자동으로 검색하고 설치](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components)하는 기능에 대해 자세히 설명합니다. 

### 제한 사항

현재로서는 Visual Studio 설치 프로그램 버전 17.9 이상인 경우 *.vsconfig 파일에 확장을 포함하고 VS 설치 프로그램이 이를 설치하도록 하는 기능은 Visual Studio 2022 이상에서만 작동합니다. 또한 Visual Studio 설치 프로그램은 아직 확장을 구성 파일로 _내보내는_ 기능을 지원하지 않습니다. 확장 업데이트는 [여기에 설명된 기존 확장 업데이트 방법](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates)을 통해 이루어집니다.  

Copilot 또는 Liveshare와 같은 일부 자사 확장은 Visual Studio 설치 관리자에 직접 포함되어 있으며 일반 구성 요소처럼 작동합니다. 

이 기능을 사용해 보고 [의견을 공유해 주세요](https://developercommunity.visualstudio.com).

