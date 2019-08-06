# Monetrum Smart Contracts 

   ## What are "Monetrum Smart Contracts" and how they are created?
Crypto money can be created for projects in Monetrum network and funds can be collected for projects. With the Smart Contracts created, almost everything like token exchange, digital asset swap, data storage, license sale etc. can be made and recorded in the Monetrum blockchain network. Monetrum Smart Contracts can be created using the Javascript language and using some special objects and functions.

   ## Some objects you can use in Monetrum Smart Contracts
   ## `tx` object

>   _**`tx`**_ object is the object of the tx transaction that occurred during the transfer of money to the smart contract wallet. This object contains various fields as follows.
   


|Parameter|Description  |Data Type
|--|--|--|
|`_id`| ID of transfer transaction to smart contract wallet |`String`
|`from`| Wallet address transferring to smart contract wallet|`String`
|`to`| Address of smart contract wallet|`String`
|`hash`| The hash value of the transfer transaction to the smart contract wallet |`String`
|`amount`| Amount of transfer to smart contract wallet|`Float`
|`asset`| Which asset type is transferred to the smart contract wallet|`String`
|`forms`| `forms` are custom fields specified by the Smart Contract Owner. The user who transfers money to the smart contract wallet must complete these fields.|`Json Object`


   ## Some functions that you can use in Monetrum Smart Contracts
   

   ## smart.getBalance 

>   ***smart.getBalance*** command returns the balance information of the wallet passed as a parameter.

    smart.getBalance(address, asset)

|Parameter|Description  |Data Type|Obligation
|--|--|--|--|
|`address`   | Monetrum wallet address | `String`|required
|`asset`   | The asset type of the wallet to be questioned |`String`| required

> Example Usage:
> 

    >let assetBalance = await smart.getBalance("90x1HVAJRIZCWSLORDGUOPWHIM6TG62BQRWGX", "MNT");

## smart.send  

>  ***smart.send*** allows the contractor to transfer the amount specified in the wallet specified by the contractor.

    smart.send(to, public_key, amount, asset, desc, data, forms);

|Parameter|Description  |Data Type|Obligation
|--|--|--|--|
|`to`   | The wallet address to be transferred. |`String`| required
|`public_key`   | Sender wallet(contract owner' public_key) public key |`String`| required
|`amount`   | Transfer amount | `Float`|required
|`asset`   |Asset type to be transferred |`String`| required
|`desc`   | Transfer description | `String`|optional
|`data`   | Transfer data | `Json Object`|optional
|`forms`   | Transfer forms information |`Json Object` | optional

> Example Usage:

    >let result = await smart.send("90x1EJBNIBNOHD73AQ2QBDM1TEAWJZXZ7NSWO", "4Vg6bv378RN4pRSbVvzKJ5hAmbC7etp8jR7M7zyX3NDuvgRUqg2FBTayW5SGdkdNrAHfUkdMhjg2GM6CDQVxi88a", 100, "MNT",null,{},{});

   

## smart.connect 

> ***smart.connect*** command allows you to retrieve data from a specified RestApi Endpoint web service.
> 
     smart.connect (connectionParams, data)

|Parameter|Description |Data Type |Obligation
|--|--|--|--|
| `data`   | Request data to be passed to RestApi Enpoint | `Json Object`|optional
|`connectionParams`   | Connection information of RestApi Enpoint | `Json Object`|required
|   | `host`:Host URL of RestApi Enpoint | `String`|required
|   | `method`:HTTP Request method of RestApi Enpoint(`GET`,`POST`,`PUT`,`DELETE`) | `String`|required
|   | `port`:Port information of RestApi Enpoint| `String`|optional
|   | `path`:Path information of RestApi Enpoint | `String`|optinal
|   | `headers`:Header information of RestApi Endpoint | `String`|required


> Example Usage:

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
   >    ***smart.createAsset*** command allows you to create crypto coins(tokens).
  
     createAsset(supply, name, symbol, icon)

|Parameter|Description  |Data Type|Obligation
|--|--|--|--|
|`supply`   | Supply amount of crypto money to be created |`String`| required
|`name`   | The name of the crypto money to be created | `String`|required
|`symbol`| The symbol of the crypto money to be created |`String`| required
|`icon`   | Base64 format icon of crypto coin to be created |`String`| optional

> Example Usage:

    >let createAssetResult = await smart.createAsset(1000000, "Yeni Asset", "ASD", "");

   


## smart.burnAsset
   >***smart.burnAsset*** command allows burning of the previously created asset.
  
     burnAsset(public_key, symbol, amount)

|Parameter|Description  |Obligation
|--|--|--|--|
|`public_key`   | Genesis wallet public_key of crypto money to be burned|`String`| required
|`symbol`   | Symbol of crypto money to be burned| `String`|required
|`amount`| The amount of crypto money to be burned| `Float`|required

> Example Usage:

    >let burnAssetResult = await smart.burnAsset("1000000, "Yeni Asset", "ASD", "");


## smart.setData
   >***smart.setData*** command allows you to add data to a tx process. This data must be in `JSON` format.  You can attach it to the corresponding tx process by fetching from your own Restful Endpoint using the `smart.connect` command.
   >
     smart.setData(tx_id, data, public)

|Parameter|Description  |Obligation
|--|--|--|
|`tx_id`   | ID of the tx process where the data will be attached | required
|`data`   | Data in `JSON` format to be attached| required
|`public`| How to store the data to be attached. If you want to be stored encrypted, set `true`, if you want to be stored in unencrypted, set `false`.  | required

> Example Usage:

    >smart.setData("5c7d7b27a4274e1d0fb9e849", {}, true);
   
 

## smart.setError
   >***smart.setError*** command is used when an error is requested. ***When this command is called, the transaction is canceled if the smart contract transaction is not resumed***.
   >
     smart.setError(Value)

|Parameter|Description |Data Type  |Obligation
|--|--|--|--|
|Value   | Error message to be given |`String`| required

> Example Usage:

    >smart.setError("Insufficient Balance");

## Considerations in Momentum Smart Contracts

 -  `smart.getBalance`, `smart.getBalance`, `smart.connect`, `smart.createAsset`, `smart.burnAsset` **must** be used `await` keyword!

## What is not used in Monetrum Smart Contracts

 In Javascript Code at Monetrum Smart Contract; 

 - You cannot define a function (you can use the arrow function instead.)
 - You cannot use code to create a loop like `while`, `for`, `foreach` `do-while`.
 -You cannot use `try`, `catch`, `finally` blocks.
 -You cannot use `var` keyword (instead of` let` should be used.)
 -`console`,` require`, `import`,` registry`, `module` keywords cannot be used.


## Monetrum Akıllı Sözleşme Örneği


    //tx: A custom-defined object.this object is the tx object of a transfer operation to a wallet in which a smart contract has been defined.
    let contractPrice = 90; //Contract amount
    let assetBalance = await smart.getBalance(tx.from, "MNT"); //Questioning the MNT asset balance of the wallet that sends the balance to the contract wallet.
    if (assetBalance >= tx.amount) {
        console.log("Gönderen cüzdan balance ı yeterli.");
        if (tx.amount >= contractPrice) {
            //Data of json format to be send to RestApi Endpoint
            let data = {
                name: "Name",
                surname: "Surname"
            };
            //RestApi Endpoint connection information
            let params = {
                host: "11.22.33.44",
                method: "POST",
                port: 3010,
                path: "/getInfo",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            let fetchResult = await smart.connect(params, data); //Connection RestApi Endpoint and fetching
            smart.setData(tx._id, fetchResult, true); //Associating data from RestApi endpoint with the corresponding tx.
            console.log("Fetching has been completed.");
        } else {
            smart.setError("The amount sent is less than the contract price.");
        }
    } else {
        smart.setError("The sending wallet balance is insufficient.");
    }
    return true;


 
 
