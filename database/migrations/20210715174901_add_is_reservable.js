
exports.up = function(knex) {
    return knex.schema.table('spots', (tbl)=>{
        tbl.boolean('is_reservable').defaultTo(true);// creates created_at column and updated_at column

    });
};

exports.down = function(knex) {
    return knex.schema.table('spots', (tbl)=>{
        tbl.dropColumn('is_reservable');
    });
};
