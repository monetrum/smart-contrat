"use strict";
const queries = {};
//----------------------------------------------------------------------------------------------------------------------
queries.approveSmartContract = `
  mutation($tx_ids: [ApproveTxIds!]!, $public_key: String!) {
    smartContractPerform {
      approve(tx_ids: $tx_ids, public_key: $public_key)
    }
  }
`;

queries.cancelSmartContract = `
    mutation($tx_ids: [CancelTxIds!]!) {
      smartContractPerform {
        cancel(tx_ids: $tx_ids)
      }
    }
`;

queries.send = `
      mutation(
        $contract_id: ObjectID!
        $public_key: String!
        $from: String!
        $to: String!
        $amount: Float!
        $asset: String!
        $desc: String
        $data: JSON
        $forms: JSON
      ) {
        smartContractPerform {
          send(
            parameters: {
              contract_id: $contract_id
              from: $from
              public_key: $public_key
              to: $to
              amount: $amount
              asset: $asset
              desc: $desc
              data: $data
              forms: $forms
            }
          ) {
            _id
            action_time
            amount
            asset
            confirm_rate
            desc
            data
            fee
            fee_asset
            fee_from
            hash
            nonce
            prev_hash
            seq
            type
            from
            to
            complete_time
            forms
          }
        }
      }
`;

queries.getBalance = `
    query($address: String!, $assets: [String!]) {
        wallet {
          getBalanceByWallet(address: $address, assets: $assets) {
            asset
            balance
          }
        }
      }
`;

queries.createAsset = `
      mutation(
        $supply: Float!
        $name: String!
        $symbol: String!
        $owner: ObjectID!
        $contract_id: ObjectID!
        $hash: String!
        $wallet: String!
        $icon: String
      ) {
        smartContractPerform {
          createAsset(
            info: {
              supply: $supply
              name: $name
              symbol: $symbol
              owner: $owner
              contract_id: $contract_id
              hash: $hash
              wallet: $wallet
              icon: $icon
            }
          )
        }
      }   
`;

queries.burnAsset = `
      mutation(
        $public_key: String!
        $amount: Float!
        $symbol: String!
        $owner: ObjectID!
      ) {
        smartContractPerform {
          burnAsset(
            public_key: $public_key
            amount: $amount
            symbol: $symbol
            owner: $owner
          )
        }
      }
`;

module.exports = queries;
