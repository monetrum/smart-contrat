"use strict";

function getNonce() {
  return String(new Date().getTime());
}

module.exports = getNonce;
