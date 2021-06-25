const db = require('../dbConfig');

/**
 * get all spots
 * @returns {Promise<void>}
 */
async function getAll(){
    const result = await db('spots')
        .select('*');
    return result;
}

/**
 * get spot from db by key id
 * @param id
 * @returns {Promise<void>}
 */
async function getSpotsById(id){
    const result = await db('spots')
        .where({id})
        .select('*');
    return result;
}

/**
 * update parking spots by id. spot_status can only accept the following
 *['UNOCCUPIED','RESERVED','OCCUPIED','OFF_LINE']
 * @returns {Promise<{status: string}>}
 * @param spotInfo
 */
async function updateSpotBySecret(secret, spot_status){
    try {
        await db('spots')
            .where({secret})
            .update(spot_status);
        return {status:"success"};
    } catch (err){
        return {status:'failed', err};
    }
}

/**
 * get spot from db by secret key
 * @param secret
 * @returns {Promise<void>}
 */
async function getSpotBySecret(secret){
    const result = await db('spots')
        .where({secret})
        .select('*');
    return result;
}

/**
 * updates all spots based on the parameter spot
 * @param spots - array from cloud api
 * @returns {Promise<{status: string}|{message: string, status: string}>}
 */
async function updateSpots(spots){
    try {
        await spots.map(async function(spot) {
            await db('spots')
                .where({secret: spot.secret})
                .update({spot_status: spot.spot_status, available_firmware_version: spot.available_firmware_version});
        });
        return {status:'success'};
    } catch (err) {
        return {status:'failed', message: 'spots update failed'};
    }
}

/**
 * update the live status of each spots
 * @returns {Promise<void>}
 */
async function updateLiveStatus(){
    const date_1_min_ago = new Date();
    date_1_min_ago.setMinutes(date_1_min_ago.getMinutes()-1);
    const offline_spot_ids = await db('spots')
        .where('updated_at', '<', date_1_min_ago)
        .select('id');
    await offline_spot_ids.map(async (id) => {
        const batch_body = {
            alive_status: false,
        };
        await db('spots')
            .update(batch_body)
            .where(id);
    });
}

module.exports={getSpotsById,updateSpotBySecret, getSpotBySecret, updateSpots, getAll, updateLiveStatus};
