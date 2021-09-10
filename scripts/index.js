const schedule = require('node-schedule');

const spotsModel = require('../database/models/spotsModel');

const provider = require('../provider');

/**
 * the script that runs every 10 seconds to update spot info
 * from cloud server
 * @returns {Promise<void>}
 */
function startScript() {
    schedule.scheduleJob('*/10 * * * * *', async function() {
        try {
            await spotsModel.updateLiveStatus();
            const lot_spots = await spotsModel.getAll();
            const response = await provider.postParkingLotRequest(lot_spots);
            const spots = response.data.parking_lot_info.spots;
            const result = await spotsModel.updateSpots(spots);
            if (result.status !== 'success'){
                console.log(result.message);
            }
        } catch (err){
            console.log(err);
        }
    });
}

module.exports = {startScript};
