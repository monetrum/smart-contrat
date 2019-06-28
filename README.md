
# Monetrum Akıllı Sözleşmeler 

   ## Monetrum Akıllı Sözleşmeleri nedir ve nasıl oluşturulur?
Monetrum ağında projeler için token'lar(kripto para) oluşturulabilir, projelere fon toplanabilir. Oluşturulan Akıllı Sözleşmeler ile token değişimi, dijital varlık takası, veri depolama, lisans satışı vs gibi hemen hemen herşey yapılabilir ve Monetrum blockchain ağında kayıt altına alınabilir. Monetrum Akıllı Sözleşmeleri Javascript dili aracılığıyla, bazı özel objeler ve fonksiyonlar kullanılarak oluşturulabilir.

Akıllı sözleşmenizi oluşturmak için [wallet.monetrum.org](https://wallet.monetrum.org) adresine girip kayıt olmanız ve ardından **Akıllı Sözleşmelerim >  Yeni Akıllı Sözleşme Oluştur** menüsüne tıklamanız gerekmektedir.

**İstenilen Bilgiler**

 - Sözleşme Adı ( Diğer sözleşmelerinizden ayırmanızı sağlayan bir isim)
 - Sözleşme durumu ( Herkese açık sözleşme listesinde görünme durumu )
 - Sözleşme Açıklaması (Kısa sözleşme bilgisi)
 - Sözleşme Bilgisi ( Detaylı sözleşme açıklaması )
 - Sözleşme Görseli (Sözleşmenize ait bir logo yada simge)
 - Sözleşme İçeriği ( Sözleşmenizin javascript kodları )

   ## Monetrum Akıllı Sözleşmeleri'ndeki objeler
   ## `tx` objesi 

>   _**`tx`**_  objesi, akıllı sözleşme cüzdanına herhangi bir para transfer işlemi sırasında oluşan tx işleminin objesidir. Bu obje aşağıdaki gibi çeşitli alanlar içermektedir.
   


|Parametre|Açıklama  |Veri Tipi
|--|--|--|
|`_id`| Akıllı sözleşmeyi cüzdanına yapılan transfer işleminin id si |`String`
|`from`| Akıllı sözleşme cüzdanına transfer yapan cüzdan  |`String`
|`to`| Akıllı sözleşme cüzdanının adresi|`String`
|`hash`| Akıllı sözleşmeyi cüzdanına yapılan transfer işleminin hash değeri |`String`
|`amount`| Akıllı sözleşme cüzdanına yapılan transfer işleminin miktarı|`Float`
|`asset`| Akıllı sözleşme cüzdanına hangi asset tipinde transfer yapıldığı|`String`
|`forms`| Akıllı sözleşme sahibi tarafından belirlenmiş özel alanlardır. Akıllı sözleşme cüzdanına para transferi yapan kullanıcının bu alanları doldurması gerekir.|`Json Object`
   
   ## Monetrum Akıllı Sözleşmeleri'ndeki fonksiyonlar
   

   ## smart.getBalance 

>   _**smart.getBalance**_  komutu parametre olarak geçilen cüzdanın bakiye bilgisini döner.
>   

    smart.getBalance(address, asset)

|Parametre|Açıklama  |Veri Tipi|Zorunluluk
|--|--|--|--|
|`address`   | Monetrum cüzdan adresi |`String`| zorunlu
|`asset`   | Cüzdanın sorgulanmak istenen asset tipi |`String`| zorunlu

> Örnek Kullanım:
> 

    >let assetBalance = await smart.getBalance("90x1HVAJRIZCWSLORDGUOPWHIM6TG62BQRWGX", "MNT");

## smart.send  

>  _**smart.send**_ komutu kontrat sahibinin belirlediği cüzdana belirlediği miktarda transfer işlemi yapmasını sağlar.


    smart.send(to, public_key, amount, asset, desc, data, forms);

|Parametre|Açıklama  |Veri Tipi|Zorunluluk
|--|--|--|--|
|`to`   | Transfer işleminin yapılacağı cüzdan adresi |`String`| zorunlu
|`public_key`   | Gönderen cüzdanın(kontrat sahibi) public key'i |`String`| zorunlu
|`amount`   | Transfer işleminin miktarı | `Float`|zorunlu
|`asset`   | Transfer işleminin hangi asset tipinde yapılacağı |`String`| zorunlu
|`desc`   | Transfer işleminin açıklaması | `String`|isteğe bağlı
|`data`   | Transfer işleminin data bilgisi | `Json Object`|isteğe bağlı
|`forms`   | Transfer işleminin forms bilgisi |`Json Object` | isteğe bağlı

> Örnek Kullanım:

    >let result = await smart.send("90x1EJBNIBNOHD73AQ2QBDM1TEAWJZXZ7NSWO", "4Vg6bv378RN4pRSbVvzKJ5hAmbC7etp8jR7M7zyX3NDuvgRUqg2FBTayW5SGdkdNrAHfUkdMhjg2GM6CDQVxi88a", 100, "MNT",null,{},{});


## smart.connect 
> ***smart.connect*** komutu belirtilen bir RestApi Endpoint web servisinden veri almanıza olanak sağlar
> 
 smart.connect(url, method, data, headers)
|Parameter|Description |Data Type |Obligation
|--|--|--|--|
| `url`   | request atılacak url | `string`|zorunlu
| `method`   | request tipi | `string`|zorunlu
| `data`   | gönderilecek form verileri | `object`|opsiyonel
| `headers`   | request işleminde gönderilecek header bilgileri | `object`|opsiyonel
> Örnek Kullanım:
 >let fetchResult = await smart.connect('http://example.com/api/get-licance', 'POST', { user: 'jhon' });


## smart.createAsset
   >    ***smart.createAsset***  komutu asset oluşturmayı sağlar.
  
     createAsset(supply, name, symbol, icon)

|Parametre|Açıklama  |Veri Tipi|Zorunluluk
|--|--|--|--|
|`supply`   | Oluşturulacak asset'in arz miktarı |`Float`| zorunlu
|`name`   | Oluşturulacak asset'in adı |`String`| zorunlu
|`symbol`| Oluşturulacak asset'in sembolü |`String`| zorunlu
|`icon`   | Oluşturulacak asset'in Base64 formatında iconu |`String`| isteğe bağlı

> Örnek Kullanım:

    >let createAssetResult = await smart.createAsset(1000000, "Yeni Asset", "ASD", "");

   


## smart.burnAsset
   >***smart.burnAsset*** komutu daha önce yaratılan asset'in yakılmasını sağlar.
  
     burnAsset(public_key, symbol, amount)

|Parametre|Açıklama  |Veri Tipi|Zorunluluk
|--|--|--|--|
|`public_key`   | Yakılacak assset in genesis wallet public_key i|`String`| zorunlu
|`symbol`   | Yakılacak asset in sembolü|`String`| zorunlu
|`amount`| Yakılacak asset in miktarı|`Float`| zorunlu

> Örnek Kullanım:

    >let burnAssetResult = await smart.burnAsset("1000000, "Yeni Asset", "ASD", "");

## smart.setData
   >***smart.setData*** komutu ile bir tx işlemine veri eklenir. Bu veri JSON formatında olmalıdır. **smart.connect** komutunu kullanarak kendinize ait olan Restful Endpoint'inden fetch ederek ilgili tx işlemine iliştirebilirsiniz.
   >
     smart.setData(tx_id, data, public)

|Parametre|Açıklama  |Zorunluluk
|--|--|--|
|`tx_id`   | Verinin hangi tx işlemine iliştirileceği | zorunlu
|`data`   | İliştirilecek JSON formatında veri| zorunlu
|`public`| İliştirilecek olan verinin nasıl saklanacağı. Eğer şifreli saklanmasını istiyorsanız **`true`**, şifresiz halde saklanmasını istiyorsanız **`false`** olarak belirleyiniz.  | zorunlu

> Örnek Kullanım:

    >smart.setData("5c7d7b27a4274e1d0fb9e849", {}, true);
   
 

## smart.setError
   >***smart.setError*** komutunu hata verilmek istenilen durumlarda kullanabilirsiniz. ***Bu komut çağrıldığında akıllı sözleşme işlemine devam edilmez, işlem iptal edilir***.
   >
     smart.setError(Value)

|Parametre|Açıklama  |Veri Tipi|Zorunluluk
|--|--|--|--|
|Value   | Verilecek hata mesajı. |`String`| zorunlu

> Örnek Kullanım:
    >smart.setError("Bakiye Yetersiz");

## Monetrum Akıllı Sözleşmeleri'nde dikkat edilmesi gerekenler

 -  `smart.getBalance`, `smart.getBalance`, `smart.connect`, `smart.createAsset`, `smart.burnAsset` fonksiyonlarını başında `await` anahtar sözcüğü ile kullanılması **gerekmektedir** !

## Monetrum Akıllı Sözleşmeleri'nde neler kullanılmaz

 Monetrum Akıllı Sözleşme Javascript kodunda; 

 - fonksiyon tanımlayamazsınız(yerine arrow fonksiyon kullanabilirsiniz.)
 - `while`, `for`, `do-while`,`foreach`  gibi döngü oluşturabilecek kod kullanamazsınız.  
 - `try`, `catch`, `finally` blokları kullanamazsınız.
 - `var` anahtar kelimesi kullanamazsınız(yerine `let` kullanılmalıdır.)
 - `console`, `require`, `import`, `registry`, `module` gibi anahtar kelimeler kullanılamaz.

## Monetrum Akıllı Sözleşme Örneği

	//tx:Özel tanımlı objedir.Akıllı sözleşme tanımlı olan cüzdana yapılan tx işleminin objesidir.

	let contractPrice = 90; //sözleşmeye gönderilmesi gereken müktar. Aksi halde sözleşme iptal edilir
	let contractAsset = 'MNT' // sözleşmenin kabul ettiği asset
	let selfBalance = await smart.getBalance(tx.to, "MNT"); //kendi cüzdanının MNT assetli bakiyesini sorgulama
	if (selfBalance >= 50) {
	    if (tx.amount >= contractPrice && tx.asset === contractAsset) {
	        let fetchResult = await smart.connect('http://example.com/api/fetch?ex=ok','GET'); //RestApi Endpointine bağlantı ve fetch işlemi
	        await smart.setData(tx._id, fetchResult, true); //RestApi Endpointindengelen verinin ilgili tx ile ileşkilendirilmesi
	        smart.send('90x1EJBNIBNOHD73AQ2QBDM1TEAWJZXZ7NSWO', '4Vg6bv378RN4pRSbVvzKJ5hAmbC7etp8jR7M7zyX3NDuvgRUqg2FBTayW5SGdkdNrAHfUkdMhjg2GM6CDQVxi88a', 50, 'MNT'); // Farklı bir cüzdana para gönderiliyor
	    } else {
	        smart.setError('Gönderilen miktar sözleşme bedelinden az');
	    }
	} else {
	    smart.setError(tx.to + ' cüzdan bakiyesi yetersiz.');
	}
