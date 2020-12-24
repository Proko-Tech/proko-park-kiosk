const express = require('express');
const router = express.Router();
const spotsModel = require('../../database/models/spotsModel');
const tokenUtil = require('../auth/tokenUtil');

/* /api/route this is where all the ESP8266 will make request at */
router.get('/', function(req, res, next) {
    res.send('success');
});

router.post('/occupiedOrLeft', async function(req, res, next) {
    const postResponse = await spotsModel.updateSpotById(req.body);
    console.log(postResponse);
    res.send(postResponse);
});

router.post('/authenticate', async function(req, res, next){
    const secret = req.body.secret;
    const rows = await spotsModel.getSpotBySecret(secret);
    if (rows.length>0){
        const spotAUTHData = {secret};
        const token = await tokenUtil.generateToken(spotAUTHData);
        res.clearCookie('spotInfo');
        res.cookie("spotInfo", token);
        res.status(202).json({status:'success', data:token});
    } else {
        res.status(401).json({status:'unauthorized', data:'secret not found'});
    }
});

module.exports = router;
