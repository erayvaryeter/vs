---
title: Analyze and track "include" directives
featureId: IncludeDiagnostics
description: Gain insight into the usage and build time of your include directives.
thumbnailImage: ../media/include_diagnostics_referencet_thumbnail.png

---


This feature enables you to conveniently track both the frequency and locations where your #include directives have been utilized. 

It provides a count of how many times each of your \#include directives has been referenced within your codebase. You can click on the reference count to access a list of specific references. From there, a double-click on the desired reference will take you directly to its location.

Upon executing Build Insights, this feature will present the build time associated with each #include directive alongside their references.

By default, this feature is deactivated. When you need to analyze your #include directives, you can enable it by accessing the context menu through a right-click within your code editor. Subsequently, hover over the "#include Directives" option and select "Turn \#include Diagnostics On". 

![Include Diagnostics Context Menu](../media/include_diagnostics_context_menu.png "Include Diagnostics Context Menu")

Please share your overall impressions, how we can improve it, and any additional feedback you may have on this experience via [Developer Community](https://developercommunity.visualstudio.com/VisualStudio).
