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

module.exports={getSpotsById, getSpotBySecret};
