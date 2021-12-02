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

exports.up = async function(knex) {
    return knex.schema.alterTable('spots', function(tbl) {
        tbl.dropColumn('spot_status');
        tbl.enum('spot_status', spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index();
    });

};

exports.down = function(knex) {
    return knex.schema.alterTable('spots', function(tbl) {
        tbl.dropColumn('spot_status');
        tbl.enum('spot_status', previous_spot_status_enum, {useNative: true, enumName:'spot_status_enum'}).notNullable().index();
    });
};
