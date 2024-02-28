---
thumbnailImage: ../media/EventHandler.png
featureId: eventhandlerleaks
description: 이벤트 처리기 누수 및 메모리 낭비를 발견하여 메모리 분석을 쉽게 수행할 수 있습니다.
title: 이벤트 처리기 누수 빠르게 식별

---


이제 "메모리 인사이트 관리" 탭에서 유용한 추가 정보를 제공합니다. 한 개체가 다른 개체의 이벤트를 구독할 때 발생할 수 있는 "이벤트 처리기 누수"를 검색할 수 있습니다. 이벤트 게시자가 구독자보다 오래 지속되는 경우 구독자는 다른 참조가 없더라도 계속 작동하고 있습니다. 이로 인해 사용되지 않은 메모리가 제대로 해제되지 않아 애플리케이션이 시간이 지남에 따라 점점 더 많은 메모리를 사용하게 되는 메모리 누출이 발생할 수 있습니다.

새로운 "이벤트 처리기 누출" 자동 인사이트 덕분에 이제 이벤트 처리기 메모리 관련 문제 및 낭비되는 메모리를 식별하는 것이 훨씬 쉬워졌습니다.

![이벤트 처리기 누출](../media/EventHandler.png "이벤트 처리기 누출")

![이벤트 처리기 누출 세부 정보](../media/EventHandlerDetails.png "이벤트 처리기 누출 세부 정보")

개발자 커뮤니티[를 통해 ](https://developercommunity.visualstudio.com/VisualStudio)전반적인 노출, 개선 방법 및 이 환경에 대한 추가 피드백을 공유하세요.