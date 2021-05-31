const express = require('express');
const router = express.Router();
const SerialPort = require('serialport');
const port = new SerialPort(process.env.DRIVER_PORT, {baudRate: 9600});

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
        arrived_at: new Date(),
    };
    try {
        const response = await provider.postParkingLotScannedRequest(requestBody);
        // TODO: open arduino
        port.write('open', (err) => {
            if (err) {
                console.log('Error on write: ', err.message);
                res.send('failed');
            }
        });
        res.send(response.data);
    } catch (err){
        console.log(err);
        res.send('failed');
    }
});

module.exports = router;
