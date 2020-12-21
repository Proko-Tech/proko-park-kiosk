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

module.exports={getSpotsById};
