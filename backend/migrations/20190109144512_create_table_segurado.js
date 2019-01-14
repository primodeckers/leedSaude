
exports.up = function(knex, Promise) {
    return knex.schema.createTable('segurado', table => {
        table.increments('idSegurado').primary()
        table.string('nome').notNull()
        table.string('email').notNull()
        table.string('telefone').notNull()
       
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('segurado')
  
};
