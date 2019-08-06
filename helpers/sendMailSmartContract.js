"use strict";
const env = registry.get("env");
const sendMail = require("./sendMail");

async function sendMailSmartContract(to, title, content) {
  return await sendMail(
    env.MAIL_SENDER_NAME,
    env.MAIL_SENDER_EMAIL,
    to,
    title,
    content
  );
}

module.exports = sendMailSmartContract;
