const schedule = require('node-schedule');

/**
 * the script that runs every 10 seconds to update spot info
 * from cloud server
 * @returns {Promise<void>}
 */
function startScript() {
    schedule.scheduleJob('*/10 * * * * *', async function() {
        try {
            const response = await provider.getParkingLotRequest();
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
