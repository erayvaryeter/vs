---
title: O VSConfig agora dá suporte a extensões
featureId: Extensions-in-vsconfig
description: O instalador do Visual Studio carregará extensões especificadas no arquivo VSConfig.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

A partir do Visual Studio 2022 versão 17.9, agora você pode incluir [extensões do Visual Studio Marketplace](https://marketplace.visualstudio.com/) ou de [galeria privada](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) em seu [arquivo vsconfig](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions), e o instalador do Visual Studio irá carregá-las e disponibilizá-las para uso. Esse recurso aborda uma das nossas principais solicitações de recurso [ do Developer Community votados: "Um arquivo .vsconfig deve solicitar automaticamente a instalação de extensões"](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

Todas as extensões instaladas pelo instalador do VS serão instaladas em "todo o computador", o que significa que elas estão disponíveis para todos os usuários. Como essas extensões são instaladas em todo o computador, quem as instala deve ter privilégios de administrador diretamente ou deve ter recebido uma concessão de controle por meio da política [AllowStandardUserControl](https://aka.ms/vs/setup/policies). Observe que a maioria das extensões herdadas instaladas pelo Gerenciador de Extensões existente têm a capacidade de ser instaladas por usuário, não por todo o computador, portanto, o usuário que as instalou não precisa ter permissões de administrador.

Há três maneiras principais de importar um arquivo *.vsconfig para o Visual Studio:

### 1. Usando a interface do usuário do instalador do VS para adicionar extensões a uma instalação

Você pode iniciar o instalador do VS e importar um [arquivo de configuração de instalação (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) para uma instalação existente listada na guia Instalado ou usá-lo para pré-configurar uma nova instalação por meio da guia Disponível. Em ambos os casos, você escolheria a Configuração Mais/Importar do cartão do produto do instalador para importar as extensões para a instalação desejada.   

![Uma imagem do instalador do Visual Studio mostrando Mais e, em seguida, Importar Configuração](../media/installer-import-config-into-available-tab.png)

### 2. Adicionando programaticamente extensões a uma instalação do Visual Studio usando o parâmetro --config

Para fazer uma **nova instalação** do Visual Studio e inicializá-la com um arquivo de configuração que contenha extensões, execute o seguinte comando usando o bootstrapper:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Para **modificar** uma instalação existente e passar um arquivo *.vsconfig que contém extensões, você pode usar o comando modify que usa o instalador do VS já no computador:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

Clique aqui para obter [mais informações sobre os parâmetros de linha de comando do instalador do VS](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 3. Abrir uma solução ou um repositório que contém um arquivo vsconfig

Quando um usuário abre uma solução ou repositório, o Visual Studio analisará um arquivo *.vsconfig incluído e detectará automaticamente se algum componente especificado e *agora as extensões do marketplace* estão presentes ou ausentes. Se estiver ausente, o usuário será solicitado a instalá-los. Devido a razões de desempenho, extensões locais ou hospedadas em rede ainda não fazem parte do radar de detecção ausente. Os documentos online descrevem ainda mais essa capacidade de [detectar e instalar componentes ausentes automaticamente](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components). 

### Advertências

A partir de agora, a capacidade de incluir extensões em um arquivo *.vsconfig e fazer com que o instalador do VS as instale só funciona para o Visual Studio 2022 e superior, supondo que você tenha um instalador do Visual Studio que seja a versão 17.9 ou superior. Além disso, o instalador do Visual Studio ainda não dá suporte à capacidade de _exportar_ extensões para um arquivo de configuração. As atualizações de extensão ocorrerão por meio [do método de atualização de extensão existente descrito aqui](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates).  

Algumas extensões de primeira parte, como Copilot ou Liveshare, são incluídas diretamente no instalador do Visual Studio e se comportam como componentes regulares. 

Experimente este recurso e [informe-nos o que você pensa](https://developercommunity.visualstudio.com)!

