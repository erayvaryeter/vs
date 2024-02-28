---
title: VSConfig ahora admite extensiones
featureId: Extensions-in-vsconfig
description: El instalador de Visual Studio cargará extensiones especificadas en el archivo VSConfig.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

A partir de la versión 17.9 de Visual Studio 2022, ahora puede incluir [Visual Studio Marketplace](https://marketplace.visualstudio.com/), local, red, dirección URL personalizada o extensiones de [galería privada](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) en el [archivo vsconfig](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions), y el instalador de Visual Studio los cargará y los pondrá a disposición de su uso. Esta característica aborda una de las solicitudes de características de la [Comunidad de desarrolladores más votadas: "Un archivo .vsconfig debería preguntar automáticamente para instalar extensiones"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Todas las extensiones instaladas por el instalador de VS se instalarán "machine wide", lo que significa que están disponibles para todos los usuarios. Dado que estas extensiones están instaladas en toda la máquina, quien las instale debe tener privilegios de administrador directamente, o se le debe haber concedido el control a través de la directiva [AllowStandardUserControl](https://aka.ms/vs/setup/policies). Tenga en cuenta que la mayoría de las extensiones instaladas por el Administrador de extensiones existentes tienen la capacidad de instalarse por usuario, no de toda la máquina, por lo que el usuario que los instaló no necesita tener permisos de administrador.

Hay tres formas principales de importar un archivo *.vsconfig en Visual Studio:

### 1. Uso de la interfaz de usuario del instalador de VS para agregar extensiones a una instalación

Puede iniciar el instalador de VS e importar un archivo de configuración de instalación de [(*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) en una instalación existente que aparece en la pestaña Instalado o usarlo para configurar previamente una nueva instalación a través de la pestaña Disponible. En cualquier caso, elegiría la configuración más/importar fuera de la tarjeta de producto del instalador para importar las extensiones en la instalación deseada.   

![Una imagen del instalador de Visual Studio que muestra Más y, a continuación, Importar configuración](../media/installer-import-config-into-available-tab.png)

### 2. Agregar extensiones a una instalación de Visual Studio mediante programación mediante el parámetro --config

Para realizar una **instalación nueva** de Visual Studio e inicializarla con un archivo de configuración que contenga extensiones, ejecute el siguiente comando mediante el programa previo:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Para **modificar** una instalación existente y agregar extensiones pasando un archivo *.vsconfig que contiene extensiones, puede usar el comando modify que usa el instalador de VS ya en la máquina:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Haga clic aquí para obtener [más información sobre los parámetros de la línea de comandos del instalador de VS](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. 3. Abra una solución o un repositorio que contenga un archivo vsconfig

Cuando un usuario abre una solución o repositorio, Visual Studio analizará un archivo *.vsconfig incluido y detectará automáticamente si hay componentes especificados y *ahora las extensiones de Marketplace* están presentes o faltan. Si falta, se le pedirá al usuario que los instale. Debido a motivos de rendimiento, las extensiones hospedadas en red o local aún no forman parte del radar de detección que falta. Los documentos en línea describen aún más esta capacidad para [detectar e instalar automáticamente componentes que faltan](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components). 

### Advertencias

A partir de ahora, la capacidad de incluir extensiones en un archivo *.vsconfig y hacer que el instalador de VS las instale solo funciona para Visual Studio 2022 y versiones posteriores, suponiendo que tenga un instalador de Visual Studio que sea la versión 17.9 o superior. Además, el instalador de Visual Studio aún no admite la capacidad de _exportar extensiones_ a un archivo de configuración. Las actualizaciones de extensión se realizarán a través del [método de actualización de extensión existente que se describe aquí](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Algunas extensiones de terceros como Copilot o Liveshare se incluyen directamente en el instalador de Visual Studio y se comportan como componentes normales. 

Pruebe esta característica y [háganos saber lo que piensa](https://developercommunity.visualstudio.com)

