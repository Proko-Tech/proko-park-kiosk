
exports.up = function(knex) {
    return knex.schema.table('spots', (tbl)=>{
        tbl.timestamps(true,true);// creates created_at column and updated_at column

    });
};

exports.down = function(knex) {
    return knex.schema.table('spots', (tbl)=>{
        tbl.dropColumn('created_at');
        tbl.dropColumn('updated_at');

    });
};
