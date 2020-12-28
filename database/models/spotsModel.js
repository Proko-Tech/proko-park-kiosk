const db = require('../dbConfig');

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
                .update({spot_status: spot.spot_status});
        });
        return {status:'success'};
    } catch (err) {
        return {status:'failed', message: 'spots update failed'};
    }
}

module.exports={getSpotsById,updateSpotBySecret, getSpotBySecret, updateSpots};
