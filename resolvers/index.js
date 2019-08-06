"use strict";
const env = registry.get("env");
const GraphQLJSON = require("graphql-type-json");
//const Datetime = require("./scalars/datetime");
//const Date = require("./scalars/date");
const ObjectID = require("./scalars/objectID");
const smartContract = require("./smartContract/index");

const resolvers = {
  //------------------------------------------------------------------------------------------------------------------

  ObjectID,
  JSON: GraphQLJSON,
  //------------------------------------------------------------------------------------------------------------------

  Query: {
    ali: () => 'veli'
  },

  //------------------------------------------------------------------------------------------------------------------

  Mutation: {
    performSmartContract: smartContract.performSmartContract
  }

  //------------------------------------------------------------------------------------------------------------------
};

module.exports = resolvers;
