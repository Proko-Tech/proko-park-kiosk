const express = require('express');
const router = express.Router();

const spotsModel = require('../../database/models/spotsModel');

const tokenUtil = require('../auth/tokenUtil');

const provider = require('../../provider/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/authenticate_spot', async function(req, res, next){
    const secret = req.body.secret;
    const rows = await spotsModel.getSpotBySecret(secret);
    if (rows.length>0){
        const spotAUTHData = {secret};
        const token = await tokenUtil.generateToken(spotAUTHData);
        res.clearCookie('spotToken');
        res.cookie("spotToken", token);
        res.status(202).json({status:'success', data:token});
    } else {
        res.status(401).json({status:'unauthorized', data:'secret not found'});
    }
});

router.post('/scanned', async function(req, res, next){
    const {content} = req.body;
    const requestBody = {
        email: content,
    };
    try {
        const response = await provider.postParkingLotScannedRequest(requestBody);
        // TODO: open arduino
        res.send(response.data);
    } catch (err){
        console.log(err);
        res.send('failed');
    }
});

module.exports = router;
