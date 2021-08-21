
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('spots').del()
        .then(function() {
            // Inserts seed entries
            return knex('spots').insert([
                {id: 1, spot_name: 'spot1', secret:'dfjaksfsl', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 2, spot_name: 'spot2', secret:'dasfasfas', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 3, spot_name: 'spot3', secret:'afdasdfad', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 4, spot_name: 'spot4', secret:'A0:20:A6:17:89:D6', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 5, spot_name: 'spot5', secret:'84:CC:A8:B0:23:E9', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 6, spot_name: 'spot6', secret:'84:CC:A8:AE:8F:0B', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 7, spot_name: 'spot7', secret:'cxvbxvbbv', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 8, spot_name: 'spot8', secret:'lkhkjgjkb', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 9, spot_name: 'spot9', secret:'zxccvcxzn', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 10, spot_name: 'spot10', secret:'qweerewrd', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 11, spot_name: 'spot11', secret:'hfsdfgfdd', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 12, spot_name: 'spot12', secret:'bvcxhncxx', alive_status:true, spot_status:'UNOCCUPIED'},
            ]);
        });
};
