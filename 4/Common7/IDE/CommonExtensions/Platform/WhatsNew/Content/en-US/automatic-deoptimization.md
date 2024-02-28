---
title: Debug your .NET 8 code more efficiently
featureId: automaticdeoptimization
description: .NET 8 introduces automatic deoptimization for precise debugging without sacrificing performance.
thumbnailImage: ../media/automaticdeoptimization.png

---


In .NET 8, the Debugger now automatically deoptimizes release binaries and external code when debugging. Breakpoints and code stepping only affect the specific parts you pause in, 
keeping the rest of the application running optimally. To utilize this feature, simply disable the **'Just My Code'** option in the debugger settings. 

Enjoy benefits like fewer errors in locals, watch, and immediate windows, along with smoother code navigation while debugging your application.

Please share your overall impressions, how we can improve, and any additional feedback you may have on this experience via [Developer Community](https://developercommunity.visualstudio.com/VisualStudio).
