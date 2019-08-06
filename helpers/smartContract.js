"use strict";

const masterNodeClient = registry.get("masterNodeClient");
const logger = registry.get("logger");
const { "smart-contract-queries": queries } = registry.get('consts');

class SmartContract {
  static async approveSmartContract(txIds, public_key) {
    try {
      let result = await masterNodeClient.mutation(queries.approveSmartContract, { tx_ids: txIds, public_key });
      logger.info("Smart contract onay işlemi tamamlandı. Sonuç :  " + JSON.stringify(result));
      return result.smartContractPerform.approve;
    } catch (error) {
      logger.error(`Smart contract onay işlemi başarısız sonlandı.` + error);
      throw new Error(error);
    }
  }

  static async cancelSmartContract(txIds) {
    try {
      let result = await masterNodeClient.mutation(queries.cancelSmartContract, { tx_ids: txIds });
      logger.info("Smart contract iptal işlemi tamamlandı. Sonuç :  " + JSON.stringify(result));
      return result.smartContractPerform.cancel;
    } catch (error) {
      logger.error(
        `Smart contract iptal başarısız tamamlandı. : ` + error.message
      );
      throw new Error(error);
    }
  }
}
module.exports = SmartContract;
