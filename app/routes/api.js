const express = require('express');
const router = express.Router();

/* /api/route this is where all the ESP8266 will make request at */
router.get('/', function(req, res, next) {
    res.send('success');
});

module.exports = router;
