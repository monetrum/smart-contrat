'use strict';
const express = require('express');
const router = express.Router();

router.get('/deneme', (req, res) => {
    console.log(req.useragent);
    res.json({ok:'ok'});
});


module.exports = () => {
    return router;
};