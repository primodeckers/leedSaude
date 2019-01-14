
exports.up = function(knex, Promise) {
    return knex.schema.createTable('plano', table => {
           table.increments('idPlano').primary()
           table.string('nome').notNull()
           table.integer('faixaInicial').notNull()
           table.integer('faixaFinal').notNull()
           table.float('valor').notNull()
           table.integer('idOperadora').references('idOperadora').inTable('operadora')
           table.integer('idAcomodacao').references('idAcomodacao').inTable('acomodacao')
           table.integer('idAbrangencia').references('idAbrangencia').inTable('abrangencia')
           table.integer('idTipoPlano').references('idTipoPlano').inTable('tipo_plano')
           table.timestamp('dtCadastro').defaultTo(knex.fn.now())
           table.timestamp('dtUpdate').defaultTo(knex.fn.now())
           
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('plano')
  
};
