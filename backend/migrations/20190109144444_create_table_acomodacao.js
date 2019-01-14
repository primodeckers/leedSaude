
exports.up = function(knex, Promise) {
    return knex.schema.createTable('acomodacao', table => {
        table.increments('idAcomodacao').primary()
        table.string('descricao').notNull()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('acomodacao')
  
};
