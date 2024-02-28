---
title: VSConfig şimdi uzantıları destekliyor
featureId: Extensions-in-vsconfig
description: Visual Studio yükleyicisi VSConfig dosyasında belirtilen uzantıları yükler.
thumbnailImage: ../media/extensions-in-vsconfig-thumbnail.png

---

Visual Studio 2022 sürüm 17.9 'dan itibaren, artık [vsconfig dosyanıza](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#extensions) [Visual Studio Market](https://marketplace.visualstudio.com/), yerel, ağ, özel URL veya [özel galeri](https://learn.microsoft.com/visualstudio/extensibility/private-galleries) uzantıları ekleyebilirsiniz ve böylece Visual Studio yükleyicisi bunları yükler ve kullanıma hazır hale getirir. Bu özellik en çok oy alan [ Geliştirici Topluluğu özellik isteklerimizden birini karşılar: “Bir .vsconfig dosyası otomatik olarak uzantıları yükleme isteminde bulunmalıdır”](https://developercommunity.visualstudio.com/t/A-vsconfig-file-should-automatically-pr/518364).

VS yükleyicisi tarafından yüklenen tüm uzantılar “makine genelinde” yüklenir, yani bu uzantılar tüm kullanıcılara sunulur. Bu uzantılar makine genelinde yüklendiğinden, bu uzantıları yükleyen kişinin doğrudan yönetici ayrıcalıklarına sahip olması gerekir veya uzantıları yükleyen kişiye [AllowStandardUserControl](https://aka.ms/vs/setup/policies) ilkesi aracılığıyla denetim izni verilmesi gerekir. Mevcut Uzantı Yöneticisi tarafından yüklenen uzantıların çoğunun makine genelinde değil, kullanıcı başına yüklenme özelliğine sahip olduğunu unutmayın, bu nedenle bunları yükleyen kullanıcının yönetici izinlerine sahip olması gerekmez.

Bir *vsconfig dosyasını Visual Studio’ya aktarmanın üç ana yolu vardır:

### 1. Bir yükleme işlemine uzantı eklemek için VS yükleyicisi kullanıcı arabirimini kullanma

VS yükleyicisini başlatabilir ve bir [yükleme yapılandırma dosyasını (*.vsconfig)](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations) Yüklenen sekmesinde listelenen mevcut bir yükleme işlemine aktarabilirsiniz veya Kullanılabilir sekmesi aracılığıyla yeni bir yükleme işlemini önceden yapılandırmak üzere kullanabilirsiniz. Her iki durumda da, uzantıları istenen yükleme işlemine aktarmak için yükleyicinin ürün kartındaki Diğer/Yapılandırmayı İçeri Aktar seçeneğini kullanabilirsiniz.   

![Diğer ve Yapılandırmayı İçeri Aktar seçeneklerini gösteren Visual Studio yükleyicisi resmi](../media/installer-import-config-into-available-tab.png)

### 2. --config parametresini kullanarak Visual Studio yükleme işlemine program aracılığıyla uzantı ekleme

Visual Studio için **yeni bir yükleme işlemi** gerçekleştirmek ve yükleme işlemini uzantıları içeren bir yapılandırma dosyası ile başlatmak için, önyükleme yükleyicisini kullanarak aşağıdaki komutu yürütün:

`vs_enterprise.exe --config "C:\my.vsconfig" --installPath "C:\VS"`

Mevcut bir yükleme işlemini **değiştirmek** ve uzantıları içeren bir *.vsconfig dosyasına aktararak uzantıları eklemek için, zaten makinede bulunan VS yükleyicisini kullanan değiştirme komutunu kullanabilirsiniz:

`"C:\Program Files (x86)\Microsoft Visual Studio\Installer\setup.exe" modify --installPath "C:\VS" --config "C:\my.vsconfig"`

[VS yükleyicisi komut satırı parametreleri hakkında daha fazla bilgi](https://learn.microsoft.com/visualstudio/install/use-command-line-parameters-to-install-visual-studio) için buraya tıklayın.

### 3. Bir vsconfig dosyası içeren bir çözüm veya depo açma

Kullanıcı bir çözüm veya depo açtığında, Visual Studio eklenen *.vsconfig dosyasını ayrıştırır ve belirtilen bileşenlerin ve *güncel market uzantılarının* mevcut veya eksik olup olmadığını otomatik olarak algılar. Eksikse, kullanıcıdan bunları yüklemesi istenir. Performansla ilgili nedenlerle, yerel veya ağ tarafından barındırılan uzantılar henüz eksik algılama radarının parçası değildir. Çevrimiçi belgelerde bu [eksik bileşenleri otomatik olarak algılama ve yükleme](https://learn.microsoft.com/visualstudio/install/import-export-installation-configurations#automatically-install-missing-components) özelliği daha ayrıntılı açıklanmaktadır. 

### Uyarılar

Şu andan itibaren, uzantıları bir *.vsconfig dosyasına ekleme ve VS yükleyicisini kullanarak bu uzantıları yükleme özelliği, Visual Studio yükleyicisi sürüm 17.9 veya üstü sürümüne sahip olmanız koşuluyla yalnızca Visual Studio 2022 ve üstü sürümlerde kullanılabilir. Ayrıca Visual Studio yükleyicisi uzantıları bir yapılandırma dosyasına _aktarma_ özelliğini henüz desteklemiyor. Uzantı güncelleştirmeleri [burada açıklanan mevcut uzantı güncelleştirme yöntemi](https://learn.microsoft.com/visualstudio/ide/finding-and-using-visual-studio-extensions?#automatic-extension-updates) aracılığıyla gerçekleşir.  

Copilot veya Liveshare gibi bazı birinci taraf uzantıları doğrudan Visual Studio yükleyicisine eklenir ve normal bileşenler gibi davranır. 

Lütfen bu özelliği deneyin ve [düşüncelerinizi bize bildirin](https://developercommunity.visualstudio.com)!

