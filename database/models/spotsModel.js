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
            .where({id:spotInfo.id})
            .update(spotInfo);
        return {status:"success"};
    } catch (err){
        return err;
    }
}

/**
 * update parking spot's vehicle presence by id. Status can only be 
 * TRUE / FALSE
 * @param spotInfo
 * @returns {Promise<{status: string}>}
 */
async function updateLeftStatus(spotInfo){
    try {
        await db('spots')
            .where({id:spotInfo.id})
            .update(spotInfo);
        return {status:"success"};
    } catch (err){
        return err;
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


module.exports={getSpotsById,updateSpotById,updateLeftStatus, getSpotBySecret};
