const express = require('express');
const router = express.Router();
const spotsModel = require('../../database/models/spotsModel');

/* /api/route this is where all the ESP8266 will make request at */
router.get('/spot', async function(req, res, next) {
    const {secret} = req.spotInfo;
    const rows = await spotsModel.getSpotBySecret(secret);
    if (rows.size !== 0){
        const result = rows[0];
        res.status(202)
            .json({status:'success', result});
    } else {
        res.status(404)
            .json({status:'failed', message: 'Failed to look up spot info'});
    }
});

module.exports = router;
