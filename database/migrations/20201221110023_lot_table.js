const spot_status_enum = [
    'UNOCCUPIED',
    'RESERVED',
    'OCCUPIED',
    'OFF_LINE',
];
exports.up = function(knex) {
    return knex.schema.createTable('spots', (tbl)=>{
        tbl.increments('id').unique().notNullable();
        tbl.text('spot_name');
        tbl.text('secret');// ESP8266 hashed ID
        tbl.boolean('alive_status');
        tbl.enum('spot_status', spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index();

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('spots');
};
