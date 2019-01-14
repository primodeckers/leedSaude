
exports.up = function(knex, Promise) {
    return knex.schema.createTable('abrangencia', table => {
        table.increments('idAbrangencia').primary()
        table.string('descricao').notNull()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('abrangencia')
  
};
