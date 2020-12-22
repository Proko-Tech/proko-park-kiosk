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
 * @param spotInfo
 * @returns {Promise<{status: string}>}
 */
async function updateSpotById(spotInfo){
    try {
        await db('spots')
            .where({id})
            .update(spotInfo);
        return {status:"success"};
    } catch (err){
        return err;
    }

}

module.exports={getSpotsById,updateSpotById};
