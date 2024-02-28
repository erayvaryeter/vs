---
title: .NET 8 코드를 보다 효율적으로 디버그
featureId: automaticdeoptimization
description: .NET 8에서는 성능을 저하시키지 않고 정확한 디버깅을 위한 자동 디옵티미화를 도입했습니다.
thumbnailImage: ../media/automaticdeoptimization.png

---


.NET 8에서 디버거는 이제 디버깅할 때 릴리스 이진 파일 및 외부 코드를 자동으로 최적화하지 않습니다. 중단점과 코드 단계별 실행은 일시 중지하는 특정 부분에만 영향을 미치며 애플리케이션의 나머지 부분은 최적으로 실행됩니다. 이 기능을 활용하려면 디버거 설정에서 **'내 코드만'** 옵션을 사용하지 않도록 설정하면 됩니다. 

로컬, 조사식 및 직접 실행 창에서 오류가 줄어들고 응용 프로그램을 디버깅하는 동안 더 원활한 코드 탐색과 같은 이점을 누릴 수 있습니다.

개발자 커뮤니티[를 통해 ](https://developercommunity.visualstudio.com/VisualStudio)전반적인 노출, 개선 방법 및 이 환경에 대한 추가 피드백을 공유하세요.
