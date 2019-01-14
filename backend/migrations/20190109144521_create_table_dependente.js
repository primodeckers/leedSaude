
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dependente', table => {
        table.increments('idDependente').primary()
        table.datetime('idade', 8)
        table.integer('idSegurado').references('idSegurado')
             .inTable('segurado')
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dependente')
  
};
