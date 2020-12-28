const express = require('express');
const router = express.Router();
const spotsModel = require('../../database/models/spotsModel');
const tokenUtil = require('../auth/tokenUtil');
const provider = require('../../provider/index')
const axios = require('axios');
/* /api/route this is where all the ESP8266 will make request at */
router.get('/', function(req, res, next) {
    res.send('success');
});

router.post('/occupied_status', async function(req, res, next) {
    const spotInfo = {
        ...req.body,
        secret:req.spotInfo.secret,
        lot_id: process.env.PARKINGLOT_ID,
        alive_status: true,
    };
    const requestBody = {spotInfo};
    const output = await provider.putParkingLotSpotRequest(requestBody);
    if (output.data.status === 'success'){
        const {status} = await spotsModel.updateSpotBySecret(req.spotInfo.secret, req.body);
        if (status === 'success'){
            res.status(202)
                .json({status: 'success', message: "update in process"});
        } else {
            res.status(404)
                .json({status: 'failed', message: "update in local database failed"});
        }
    } else {
        res.status(404)
            .json({status: 'failed', message: "update to cloud api failed"});
    }
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
