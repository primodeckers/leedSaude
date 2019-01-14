
exports.up = function(knex, Promise) {
    return knex.schema.createTable('plano_segurado', table => {
        table.increments('idPlanoSegurado').primary()
        table.integer('idPlano').references('idPlano').inTable('plano')
        table.integer('idSegurado').references('idSegurado').inTable('segurado')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('plano_segurado')
  
};
