"use strict";

const masterNodeClient = registry.get("masterNodeClient");
const logger = registry.get("logger");
const Request = require('./request');
const { "smart-contract-queries": queries } = registry.get('consts');

class Send {

  constructor(tx, owner_wallet) {
    this.senderWallet = tx.from;
    this.receiverWallet = tx.to;
    this.contract_id = owner_wallet.contract_id;
    this.owner_id = owner_wallet.account_id;
    this.hash = tx.hash;
    this.arr = [];
  }

  async setData(id, data = {}) {
    let mapper = x => {
      if (x.tx_id === id) {
        x.data.push(data);
      }
      return x;
    };

    this.arr = this.arr.map(mapper);
  }

  async send(to, public_key, amount, asset, desc = null, data = {}, forms = {}) {
    try {

      let params = {
        contract_id: this.contract_id,
        from: this.receiverWallet,
        to:to,
        amount:amount,
        asset:asset,
        desc:desc,
        data:data,
        forms:forms,
        public_key:public_key
      };

      let resolved = await masterNodeClient.mutation(queries.send, params);
      let result = resolved.smartContractPerform.send;
      logger.info("Send işlemi başarılı. Sonuç : (" + result._id + ") : " + JSON.stringify(result));
      this.arr.push({ tx_id: result._id, data: [] });
      return result;
    } catch (error) {
      logger.error("Send işlemi başarısız tamamlandı." + error.message + "\nstack : " + error.stack);
      throw new Error(error);
    }
  }

  async getBalance(address, asset) {
    try {
      let result = await masterNodeClient.query(queries.getBalance, { address, assets: [asset]});
      let res = result.wallet.getBalanceByWallet.find(x => x.asset === asset);
      let balance = res ? res.balance : 0;
      logger.info("Balance inquiry operation completed successfully. Result:" + balance);
      return balance;
    } catch (error) {
      logger.info("Balance inquiry operation failed." + error.message);
      throw new Error(error);
    }
  }

  setError(errorMessage) {
    throw new Error(errorMessage);
  }

  async connect(url, method, data = { }, headers = { }){
    return await (new Request(url, method, data, headers )).connect();
  }

  async createAsset(supply, name, symbol, icon = null) {
    try {
      let params = {
        supply,
        name,
        symbol,
        owner: this.owner_id,
        contract_id: this.contract_id,
        hash: this.hash,
        wallet: this.receiverWallet,
        icon
      };

      let resolved = await masterNodeClient.mutation(queries.createAsset, params);
      return resolved.smartContractPerform.createAsset;
    } catch (error) {
      console.log(`Create asset failed.\n` + error);
      throw new Error(error);
    }
  }

  async burnAsset(public_key, symbol, amount) {
    try {
      let params = {
        public_key,
        symbol,
        amount,
        owner: this.owner_id
      };

      return await masterNodeClient.mutation(queries.burnAsset, params);
    } catch (error) {
      console.log(`Burn asset failed.`);
      throw new Error(error);
    }
  }
}

module.exports = Send;
