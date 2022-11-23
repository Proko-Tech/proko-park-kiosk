const spot_status_enum = [
    'UNOCCUPIED',
    'RESERVED',
    'OCCUPIED',
    'OFF_LINE',
    'VIOLATION',
];
exports.up = function(knex) {
    return knex.schema.createTable('spots', (tbl)=>{
        tbl.increments('id').unique().notNullable();
        tbl.text('spot_name');
        tbl.text('secret');// ESP8266 hashed ID
        tbl.boolean('alive_status');
        tbl.enum('spot_status', spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index();
        tbl.integer('firmware_version').defaultTo(1);
        tbl.integer('available_firmware_version').defaultTo(1);
        tbl.dateTime('firmware_updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('spots');
};
