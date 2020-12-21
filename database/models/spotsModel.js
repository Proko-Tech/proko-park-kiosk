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
 * update parking spots by id. Status can only accept the following
 *['UNOCCUPIED','RESERVED','OCCUPIED','OFF_LINE']
 * @param id,spot_status,updated_time
 * @returns {Promise<{status: string}>}
 */
async function postSpotStatus(id,spot_status,updated_time){
    try {
        await db('spots')
            .where({id})
            .update({spot_status});
        return {status:"success"};
    } catch (err){
        return err;
    }

}

module.exports={getSpotsById,postSpotStatus};
