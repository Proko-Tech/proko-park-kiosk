
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('spots').del()
        .then(function() {
            // Inserts seed entries
            return knex('spots').insert([
                {id: 1, spot_name: 'spot1', secret:'dfjaksfsl', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 2, spot_name: 'spot2', secret:'dasfasfas', alive_status:true, spot_status:'UNOCCUPIED'},
                {id: 3, spot_name: 'spot3', secret:'afdasdfad', alive_status:true, spot_status:'UNOCCUPIED'},
            ]);
        });
};
