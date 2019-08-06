# Monetrum Akıllı Sözleşmeler 

   ## Monetrum Akıllı Sözleşmeleri nedir ve nasıl oluşturulur?
Monetrum ağında projeler için token'lar(kripto para) oluşturulabilir, projelere fon toplanabilir. Oluşturulan Akıllı Sözleşmeler ile token değişimi, dijital varlık takası, veri depolama, lisans satışı vs gibi hemen hemen herşey yapılabilir ve Monetrum blockchain ağında kayıt altına alınabilir. Monetrum Akıllı Sözleşmeleri Javascript dili aracılığıyla, bazı özel objeler ve fonksiyonlar kullanılarak oluşturulabilir.

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

> _**smart.connect**_ komutu bilgileri belirtilen bir RestApi Endpoint web servisinden veri getirmeyi sağlar.
> 
     smart.connect (connectionParams, data)

|Parametre|Açıklama |Veri Tipi |Zorunluluk
|--|--|--|--|
| `data`   | RestApi Enpointe geçmek isteyeceğiniz veri | `Json Object`|isteğe bağlı
|`connectionParams`   | RestApi Enpoint bağlantı verisi | `Json Object`|zorunlu
|   | `host`:RestApi Enpoint adresi | `String`|zorunlu
|   | `method`:RestApi Enpoint HTTP Request method(`GET`,`POST`,`PUT`,`DELETE`) | `String`|zorunlu
|   | `port`:RestApi Enpoint port bilgisi| `String`|isteğe bağlı
|   | `path`:RestApi Enpoint path bilgisi | `String`|isteğe bağlı
|   | `headers`:RestApi Endpoint header bilgisi | `String`|zorunlu


> Örnek Kullanım:

    >let  data  = {name:"Name", surname:"Surname"};
    >let  connectionParams = {
				    host:"11.22.33.44", 
				    method: "POST", 
				    port:  3010, 
				    path:  "/getInfo",
				    headers:{}
    };
    >let fetchResult = await smart.connect(connectionParams, data);

  
   

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
    let contractPrice = 90; //Sözleşme miktarı
    let assetBalance = await smart.getBalance(tx.from, "MNT"); //Sözleşme cüzdanına bakiye gönderen cüzdanı MNT assetli bakiyesini sorgulama
    if (assetBalance >= tx.amount) {
        console.log("Gönderen cüzdan balance ı yeterli.");
        if (tx.amount >= contractPrice) {
            //RestApi Endpointine gönderebileceğiniz JSON formatında data
            let data = {
                name: "Name",
                surname: "Surname"
            };
            //RestApi Endpoint bağlantı bilgisi
            let params = {
                host: "11.22.33.44",
                method: "POST",
                port: 3010,
                path: "/getInfo",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            let fetchResult = await smart.connect(params, data); //RestApi Endpointine bağlantı ve fetch işlemi
            smart.setData(tx._id, fetchResult, true); //RestApi Endpointindengelen verinin ilgili tx ile ileşkilendirilmesi
            console.log("Fetch tamamlandı.");
        } else {
            smart.setError("Gönderilen miktar sözleşme bedelinden az.");
        }
    } else {
        smart.setError("Gönderen cüzdan bakiyesi yetersiz.");
    }
    return true;
   

 
 
