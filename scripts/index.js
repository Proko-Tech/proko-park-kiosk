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
        } catch (err){
            console.log(err);
        }
    });
}

module.exports = {startScript};
