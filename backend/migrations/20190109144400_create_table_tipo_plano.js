
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tipo_plano', table => {
      table.increments('idTipoPlano').primary()
      table.string('descricao').notNull()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tipo_plano')
  
};
