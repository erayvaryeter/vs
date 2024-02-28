---
title: VSConfig now supports extensions
featureId: Extensions-in-vsconfig
description: The Visual Studio installer will load extensions specified in the VSConfig file.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Starting in Visual Studio 2022 version 17.9, you can now include [Visual Studio Marketplace](https://marketplace.visualstudio.com/), local, network, custom URL, or [private gallery](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) extensions in your [vsconfig file](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions), and the Visual Studio installer will load them and make them available to use. This feature addresses one of our top voted [Developer Community feature requests: "A .vsconfig file should automatically prompt to install extensions"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

All extensions installed by the VS installer will be installed "machine wide", meaning they are available for all users. Because these extensions are installed machine wide, whoever installs them must have admin privileges directly, or they must have been granted control via the [AllowStandardUserControl](https://aka.ms/vs/setup/policies) policy. Note that most of the extensions installed by the existing Extension Manager have the capability of being installed per user, not machine wide, so the user that installed them doesn't need to have admin permissions.

There are three main ways to import a *.vsconfig file into Visual Studio:

### 1. Using the VS installer UI to add extensions to an installation

You can launch the VS installer and import an [installation configuration file (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) into an existing installation listed on the Installed tab, or use it to pre-configure a new installation via the Available tab. In either case, you'd choose the More/Import Configuration off of the installer's product card to import the extensions into the desired installation.   

![An image of the Visual Studio installer showing More and then Import Configuration](../media/installer-import-config-into-available-tab.png)

### 2. Programmatically adding extensions to a Visual Studio installation by using the --config parameter

To do a **fresh installation** of Visual Studio and initialize it with a configuration file that contains extensions, execute the following command using the bootstrapper:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

To **modify** an existing installation and add extensions by passing in a *.vsconfig file that contains extensions, you can use the modify command which uses the VS installer already on the machine:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Click here for [more information about VS installer command line parameters](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. Open a solution or a repo that contains a vsconfig file

When a user opens a solution or repo, Visual Studio will parse an included *.vsconfig file and automatically detect if any specified components and *now marketplace extensions* are either present or missing. If missing, the user will be prompted to install them. Due to performance reasons, local or network hosted extensions are not yet part of the is-missing detection radar. The online docs further describe this ability to [automatically detect and install missing components](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components). 

### Caveats

As of now, the ability to include extensions in a *.vsconfig file and have the VS installer install them only works for Visual Studio 2022 and above, assuming you have a Visual Studio installer that is version 17.9 or above. Also, the Visual Studio installer does not support the ability to _export_ extensions to a configuration file yet. Extension updates will happen via the existing [extension update method described here](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Some first party extensions like Copilot or Liveshare are directly included in the Visual Studio installer and behave as regular components. 

Please try out this feature and [let us know what you think](https://developercommunity.visualstudio.com)!

