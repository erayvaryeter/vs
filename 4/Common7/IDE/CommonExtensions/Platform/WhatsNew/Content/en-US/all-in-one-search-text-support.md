---
featureFlagName: VS.AllInOneSearchPlainTextSearch17.9GA
thumbnailImage: ../media/aios-plain-text-search-highlighted-thumbnail.png
featureId: AllInOneSearchPlainTextSearch
description: You can now search text, in addition to files and symbols, in the updated Code Search experience.
restartRequired: true
title: Search for any text in all-in-one Code Search
optionPageId: FCA50351-5E03-4E31-9CC0-AB59A9C6B829

---


In the all-in-one Code Search (`Ctrl+T` or `Ctrl+,`), you can search for any word or string of characters across your solution, supplementing file and symbol results from your codebase. You can now search for local variable names, words in comments, parameter names, or any other string of characters across your codebase.

![All-In-One Search](../media/aios-plain-text-search-highlighted.png "All-In-One Search") 

For a text-only view, you can filter down to just text results by doing one of the following:

- Click the "text (x:)" button below the search bar,
- Prefix your search query with "x:",
- Use the keyboard shortcut `Shift+Alt+F`, or
- Go to the menu option "Edit > Go To > Go To Text".

In the text-only experience, there are also the options to toggle "Match case", "Match whole word", and "Use regular expressions" through the button at the far right of the search bar.

Read more about the full text support in Code Search [here](https://devblogs.microsoft.com/visualstudio/17-9-preview-3-brings-exciting-changes-to-code-search). 

If you don't get the text filter button in the Code Search window, then you can manually enable it by turning on the preview feature "Tools > Options > Environment > Preview Features > Plain text search in All-In-One Search (requires restart)". 

We're continuing to iterate on this experience, so let us know what you think about this new search experience on [Developer Community](https://developercommunity.visualstudio.com/t/Improve-Visual-Studio-All-In-One-Search/10333885?space=8&entry=suggestion).
