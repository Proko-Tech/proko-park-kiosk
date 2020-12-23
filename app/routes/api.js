const express = require('express');
const router = express.Router();
const spotsModel = require('../../database/models/spotsModel');

/* /api/route this is where all the ESP8266 will make request at */
router.get('/', function(req, res, next) {
    res.send('success');
});

router.post('/occupied', function(req, res, next){
    const postResponse = spotsModel.updateSpotById(req.body);
    res.send(postResponse);
});

module.exports = router;
