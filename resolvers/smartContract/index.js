"use strict";

const { smartContractTx, smartContract } = registry.get("helpers");
const { NodeVM, VMScript } = require("vm2");
const logger = registry.get("logger");
const env = registry.get('env');

class Resolvers {
  static async performSmartContract( parent, { smart_contract }, context) {

    if (context.req.get("X-CONTRACT-TOKEN") !== env.MONETRUM_MASTER_NODE_SERVER_TOKEN) {
      throw new Error("Access denied.");
    }

    let tx = smart_contract.tx;
    let owner_wallet = smart_contract.owner_wallet;
    let smart_contract_code = owner_wallet.smart_contract_code;

    let smart = new smartContractTx(tx, owner_wallet);
    let smartTxOperation = smartContract;

    smart.arr.push({ tx_id: tx._id, data: [] });
    const vm = new NodeVM({
      console: "inherit",
      sandbox: {
        tx,
        owner_wallet,
        smart
      },
      require: {
        external: true,
        builtin: ["*"],
        root: "./",
        mock: {}
      }
    });

    try {
      await (vm.run(new VMScript(`module.exports = async() => { ${smart_contract_code} }`)))();
      let resultApprove = await smartTxOperation.approveSmartContract(smart.arr, tx.public_key);
      if (resultApprove === true) {
        logger.info("Smart contract operation completed successfully. Confirmation Result:" + resultApprove);
      }
    } catch (error) {
      smart.arr = [];
      smart.arr.push({ tx_id: tx._id, data: [] });
      smart.arr[0].data = { error: error.message };
      try {
        let resultCancel = await smartTxOperation.cancelSmartContract(smart.arr);
        if (resultCancel === true) {
          logger.info("Smart contract operation failed. Cancel Result:" + resultCancel);
        }
      } catch (error2) {
        logger.info("Smart contract cancel operation failed. Error :" + error2);
        throw new Error(error2);
      }
    }

    return true;
  }
}

module.exports = Resolvers;
