const schedule = require('node-schedule');
const {DateTime} = require('luxon');

const spotsModel = require('../database/models/spotsModel');

const provider = require('../provider');

function simpleMap(arr, new_min, new_max, index) {
    if (arr.length === 0) throw new Error("Array cannot be empty.");
    if (index < 0 || index >= arr.length) throw new Error("Index out of bounds.");

    const old_min = Math.min(...arr);
    const old_max = Math.max(...arr);

    if (old_min === old_max) return new_min; // Avoid division by zero if all values are the same

    const value = arr[index];

    // Min-max scaling formula
    return ((value - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;
}

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
    // Calculates suggested price every hour.
    // TODO: move the below logic to another service that can integrate many
    // other models in the future.
    schedule.scheduleJob('0 * * * * *', async function() {
        try {
            const response = await provider.getLotReservationsCountRequest();
            console.log(response.data);
            const hourly_reservation_count = response.data.hourly_reservation_count;
            console.log(hourly_reservation_count);
            const min_price = response.data.min_price;
            const max_price = response.data.max_price;
            const current_datetime = DateTime.local().toUTC();
            const current_hour = current_datetime.hour;
            const suggested_price = simpleMap(
                hourly_reservation_count, min_price, max_price, current_hour);
            console.log("Ran suggested price, min_price: ",
                min_price, "max_price: ", max_price, "suggested_price: ",
                suggested_price);
            await provider.postSuggestedPrice({suggested_price});
        } catch (err){
            console.log(err);
        }
    });
}

module.exports = {startScript};
