
exports.up = function(knex, Promise) {
    return knex.schema.createTable('administradora', table => {
        table.increments('idAdministradora').primary()
        table.string('nomeAdministradora').notNull()
        table.string('codigoAdminstradora').notNull().unique()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('administradora')
  
};
