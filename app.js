"use strict";

/*
 *root klasörü globale atıyoruz böylece her modülden erişilebilir
 *registry set edilen değişkenlere erişimi sağlar
 */

global.appDir = __dirname;
global.registry = require("./core/registry");

//--------------------------------------------------------------------------------------------------------------------//

const env = require("dotenv").config().parsed;
const requireDir = require("require-dir");
const config = require(appDir + "/config/config");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, prettyPrint } = format;
const express = require("express");
const app = express();
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const GraphQLError = require("./library/graphQLError");
//const tsFormat = () => moment().format("YYYY-MM-DD hh:mm:ss").trim();
const myFormat = printf(
  ({ level, message, label, timestamp }) => `${timestamp} ${level}: ${message}`
);
const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: __dirname + "/logs/smartContractLog.log"
    })
  ]
});

//----------------------------------------------------------------------------------------------------------------------
/*
 * formatError ürün canlıya alındığında hataların stacklerini siler
 */

function formatError(error) {
  if (env.NODE_ENV === "production") {
    delete error.extensions.exception;
    return error;
  }

  return error;
}

function GraphQLErrorCallback(e) {
  if (e.networkError) {
    e.networkError.result.errors.forEach(element => {
      throw new GraphQLError(element.message);
    });
  }

  if (e.graphQLErrors.length > 0) {
    e.graphQLErrors.forEach(element => {
      throw new GraphQLError(element.message);
    });
  }
}

//----------------------------------------------------------------------------------------------------------------------
/*
 * init fonksiyonu başlatıcı fonksiyondur
 */

async function init() {
  //------------------------------------------------------------------------------------------------------------------
  const GraphQLClient = require(__dirname + "/library/GraphQLClient");
  const masterNodeClient = new GraphQLClient(
    env.MONETRUM_MASTER_NODE_URL,
    false,
    {
      "X-CONTRACT-TOKEN": env.MONETRUM_MASTER_NODE_SERVER_TOKEN
    }
  );
  masterNodeClient.setErrorCallback(GraphQLErrorCallback);
  registry.set("masterNodeClient", masterNodeClient);
  //------------------------------------------------------------------------------------------------------------------
  registry.set("logger", logger);
  registry.set("config", config);
  registry.set("app", app);
  registry.set("env", env);
  registry.set("consts", requireDir(appDir + "/consts", { recurse: true }));
  registry.set("helpers", requireDir(appDir + "/helpers", { recurse: true }));
  //------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------
  const { loader, stc, sleep } = registry.get("helpers");
  new loader(app, appDir + "/middlewares/app-level").middlewares();
  new loader(app, appDir + "/middlewares/router-level").routers();
  new loader(app, appDir + "/routes").routers();
  //------------------------------------------------------------------------------------------------------------------

  const typeDefs = importSchema(__dirname + "/schemes/typeDefs.graphql");
  const resolvers = require(__dirname + "/resolvers/index");
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: require(__dirname + "/context/context")
  });
  const httpServer = http.createServer(app);
  //------------------------------------------------------------------------------------------------------------------
  apollo.applyMiddleware({ app, path: "/graphql" });
  apollo.installSubscriptionHandlers(httpServer);
  app.set("trust proxy", 1);
  //------------------------------------------------------------------------------------------------------------------
  httpServer.listen(env.LISTEN_PORT, env.LISTEN_HOST);
  //------------------------------------------------------------------------------------------------------------------
  await masterNodeClient.connect(100);
  //------------------------------------------------------------------------------------------------------------------
  return true;
}

init().then(() =>
  logger.info(`${env.LISTEN_HOST}:${env.LISTEN_PORT} ip adresini dinliyor`)
);
