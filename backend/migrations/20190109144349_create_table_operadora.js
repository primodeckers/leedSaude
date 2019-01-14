
exports.up = function(knex, Promise) {
    return knex.schema.createTable('operadora', table => {
        table.increments('idOperadora').primary()
        table.string('nome').notNull()
        table.string('codigoOperadora').notNull()
        table.integer('idAdministradora').references('idAdministradora')
             .inTable('administradora')
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('operadora')
  
};
