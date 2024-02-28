---
title: VSConfig teď podporuje rozšíření.
featureId: Extensions-in-vsconfig
description: Instalační program sady Visual Studio načte rozšíření zadaná v souboru VSConfig.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Od verze 17.9 sady Visual Studio 2022 můžete do [souboru vsconfig](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions) zahrnout místní, síťovou nebo vlastní adresu URL nebo adresu URL na [Visual Studio Marketplace](https://marketplace.visualstudio.com/), nebo rozšíření z [privátní galerie](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) a instalační program sady Visual Studio je načte a zpřístupní pro použití. Tato funkce řeší jeden z nejžádanějších návrhů nových funkcí v rámci komunitního fóra [Developer Community: „A .vsconfig file should automatically prompt to install extensions“ (Soubor .vsconfig by měl automaticky vyzvat k instalaci rozšíření)](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Všechna rozšíření nainstalovaná instalačním programem sady Visual Studio budou nainstalována pro celý počítač, což znamená, že budou k dispozici pro všechny uživatele. Vzhledem k tomu, že se tato rozšíření instalují pro celý počítač, musí mít uživatel, který je nainstaluje, přímo oprávnění správce nebo musí mít udělené řízení přístupu prostřednictvím zásady [AllowStandardUserControl](https://aka.ms/vs/setup/policies). Poznámka: Většina rozšíření instalovaných existujícím Správcem rozšíření lze instalovat pro konkrétní uživatele, nikoli pro celý počítač, takže uživatel, který je instaloval, nemusel mít oprávnění správce.

Soubor *.vsconfig lze do sady Visual Studio importovat třemi hlavními způsoby:

### 1. Přidání rozšíření do instalace pomocí uživatelského rozhraní instalačního programu sady Visual Studio

Můžete spustit instalační program sady Visual Studio a naimportovat [konfigurační soubor instalace (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) do existující instalace uvedené na kartě Nainstalované, nebo ho použít k předběžné konfiguraci nové instalace prostřednictvím karty K dispozici. V obou případech byste výběrem možnosti Více / Importovat konfiguraci z karty produktu instalačního programu naimportovali rozšíření do požadované instalace.   

![Obrázek instalačního programu sady Visual Studio s možností Více a následně možností Importovat konfiguraci](../media/installer-import-config-into-available-tab.png)

### 2. Programové přidání rozšíření do instalace sady Visual Studio pomocí parametru --config

Pokud chcete provést **novou instalaci** sady Visual Studio a inicializovat ji pomocí konfiguračního souboru, který obsahuje rozšíření, proveďte pomocí bootstrapperu následující příkaz:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Pokud chcete **upravit** existující instalaci a přidat rozšíření jejich předáním v souboru *.vsconfig, který obsahuje rozšíření, můžete použít příkaz modify, který používá instalační program sady Visual Studio již na počítači:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Kliknutím sem si zobrazíte [další informace o parametrech příkazového řádku instalačního programu sady Visual Studio](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. Otevření řešení nebo úložiště obsahujícího soubor vsconfig

Když uživatel otevře řešení nebo úložiště, Visual Studio parsováním zahrnutého souboru *.vsconfig automaticky zjistí, jestli nejsou zadány nějaké komponenty a jestli aktuálně nechybí nějaká *rozšíření z marketplace*. Pokud chybí, zobrazí se uživateli výzva k jejich instalaci. Z výkonnostních důvodů nejsou zatím místní rozšíření nebo rozšíření hostovaná v síti zahrnuta do systému zjišťování chybějících rozšíření. Tato schopnost [automatického zjišťování a instalace chybějících komponent](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components) je dále popsána v online dokumentaci. 

### Upozornění

Možnost zahrnout rozšíření do souboru *.vsconfig a nechat je nainstalovat instalačním programem sady Visual Studio funguje zatím pouze pro Visual Studio 2022 a vyšší verze, a to za předpokladu, že máte instalační program sady Visual Studio verze 17.9 nebo vyšší. Instalační program sady Visual Studio zatím navíc nepodporuje možnost _exportovat_ rozšíření do konfiguračního souboru. Aktualizace rozšíření budou probíhat prostřednictvím existující [metody aktualizace rozšíření popsané zde](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Některá rozšíření první strany, jako je Copilot nebo Liveshare, jsou přímo součástí instalačního programu sady Visual Studio a chovají se jako běžné komponenty. 

Vyzkoušejte si prosím tuto funkci a [dejte nám vědět, co na ni říkáte](https://developercommunity.visualstudio.com)!

