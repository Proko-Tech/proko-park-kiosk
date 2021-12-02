const spot_status_enum = [
    'UNOCCUPIED',
    'RESERVED',
    'OCCUPIED',
    'OFF_LINE',
    'ILLEGAL_PARKING',
];

const previous_spot_status_enum = [
    'UNOCCUPIED',
    'RESERVED',
    'OCCUPIED',
    'OFF_LINE',
];

exports.up = function(knex) {
    knex.schema.alterTable('spots', function(table) {
        tbl.enum('spot_status', spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index().alter();
    });
};

exports.down = function(knex) {
    knex.schema.alterTable('spots', function(table) {
        tbl.enum('spot_status', previous_spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index().alter();
    });
};
