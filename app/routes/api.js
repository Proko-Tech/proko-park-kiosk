const express = require('express');
const router = express.Router();
const spotsModel = require('../../database/models/spotsModel');
const tokenUtil = require('../auth/tokenUtil');
const provider = require('../../provider/index');
/* /api/route this is where all the ESP8266 will make request at */
router.get('/spot/:firmware_version/:last_distance/:cam_alive_status/:empty_distance_threshold', async function(req, res, next) {
    const {secret} = req.spotInfo;
    const {firmware_version, last_distance, cam_alive_status, empty_distance_threshold} = req.params;

    const update_body = {
        alive_status: true,
        updated_at: new Date(),
        firmware_version, last_distance, cam_alive_status, empty_distance_threshold
    };

    const rows = await spotsModel.getSpotBySecret(secret);
    const {status} = await spotsModel.updateSpotBySecret(secret, update_body);
    if (rows.size !== 0 && status === 'success'){
        const result = rows[0];
        res.status(202)
            .json({status:'success', result});
    } else {
        res.status(404)
            .json({status:'failed', message: 'Failed to look up spot info'});
    }
});

router.post('/occupied_status', async function(req, res, next) {
    const spotInfo = {
        ...req.body,
        secret:req.spotInfo.secret,
        lot_id: process.env.PARKINGLOT_ID,
        alive_status: true,
        updated_at: new Date(),
    };
    const requestBody = {spotInfo};
    console.log(requestBody);
    const output = await provider.putParkingLotSpotRequest(requestBody);
    console.log(output);
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

// TODO: remove after beta testing.
router.post('/v0_occupied_status', async function(req, res, next) {
    const spotInfo = {
        ...req.body,
        secret:req.spotInfo.secret,
        lot_id: process.env.PARKINGLOT_ID,
        alive_status: true,
        updated_at: new Date(),
    };
    const requestBody = {spotInfo};
    const output = await provider.putV0ParkingLotSpotRequest(requestBody);
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

router.get('/violation/:id', async function(req, res, next){
    const spotInfo = {
        spot_id: req.params.id,
        secret:req.spotInfo.secret,
        lot_id: process.env.PARKINGLOT_ID,
        alive_status: true,
        updated_at: new Date(),
    };
    const requestBody = {spotInfo};
    const output = await provider.postSpotViolationRequest(requestBody);
    if (output.data.status === 'success'){
        const {status} = await spotsModel.updateSpotBySecret(req.spotInfo.secret, {spot_status: 'ILLEGAL_PARKING'});
        if (status === 'success'){
            res.status(202)
                .json({status: 'success', message: "violation registered"});
        } else {
            res.status(404)
                .json({status: 'failed', message: "register violation failed"});
        }
    } else {
        res.status(404)
            .json({status: 'failed', message: "register violation to cloud api failed"});
    }
});

router.get('/reset_manual_capture', async function(req, res, next){
    const {status} = await spotsModel.updateSpotBySecret(req.spotInfo.secret, {manual_capture: '0'});
    if (status === 'success') {
        res.status(202)
            .json({status: 'success', message: "reset manual_capture succeeded"});
    } else {
        res.status(404)
            .json({status: 'failed', message: "reset manual_capture failed"});
    }
});

module.exports = router;
