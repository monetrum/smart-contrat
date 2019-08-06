'use strict';

async function context({ req }) {
    return {
        req
    };
}

module.exports = context;